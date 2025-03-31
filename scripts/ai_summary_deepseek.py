import os
import re
import frontmatter
import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm
from dotenv import load_dotenv

# 加载环境变量
load_dotenv('.env.local')  # 指定加载 .env.local 文件

# 配置参数
CONTENT_ROOT = "content/blog"
API_KEY = os.getenv("DEEPSEEK_API_KEY")  # 从环境变量读取
API_URL = "https://api.deepseek.com/v1/chat/completions"
MAX_SUMMARY_LENGTH = 140
EXCLUDE_DIRS = ["draft", "archived"]
MAX_WORKERS = 8
RATE_LIMIT_PER_MINUTE = 30
REQUEST_INTERVAL = 60 / RATE_LIMIT_PER_MINUTE

# 验证 API Key
if not API_KEY:
    raise ValueError("未找到 DEEPSEEK_API_KEY，请检查 .env.local 文件")

def log_failure(file_path, reason):
    """记录失败日志"""
    with open("summary.log", "a", encoding="utf-8") as f:
        f.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} | {file_path} | {reason}\n")

def extract_content(text):
    """增强型内容提取"""
    try:
        post = frontmatter.loads(text)
        body = post.content.strip()
        body = re.sub(r'^{% .*?%}', '', body, flags=re.DOTALL)
        body = re.sub(r'^\s*<!--.*?-->\s*', '', body, flags=re.DOTALL)
        return body.strip()
    except:
        return ""

def analyze_content(text):
    """内容类型分析"""
    has_code = bool(re.search(r'```[\s\S]*?```', text))
    chinese_chars = len(re.findall(r'[\u4e00-\u9fa5]', text))
    return {
        'is_code': has_code,
        'is_short': len(text) < 100,
        'chinese_ratio': chinese_chars / (len(text) + 0.1)
    }

def generate_summary(content, content_type):
    """优化后的摘要生成"""
    prompt_rules = [
        "请用中文生成简洁的内容摘要",
        "不要包含任何格式说明（如'摘要：'或字数标注）",
        "避免使用'本文'、'文章'等前缀",
        "直接陈述核心内容",
        "保持自然的口语化表达"
    ]

    base_prompt = "要求：\n" + "\n".join(prompt_rules) + "\n内容：\n"

    if content_type['is_code']:
        prompt = base_prompt + f"代码片段：\n{content[:1000]}"
    elif content_type['chinese_ratio'] < 0.3:
        prompt = base_prompt + f"混合内容：\n{content[:1000]}"
    elif content_type['is_short']:
        prompt = base_prompt + f"简短内容：\n{content}"
    else:
        prompt = base_prompt + f"{content[:2000]}"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 150,
        "temperature": 0.5
    }

    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        raw_summary = result['choices'][0]['message']['content'].strip()

        # 后处理清理
        cleaned_summary = re.sub(
            r'(?:\(\d+字\)|全文严格遵循.*?限制|字数说明.*?$)',
            '',
            raw_summary
        ).strip()

        # 自然截断
        truncate_chars = ['。', '！', '？', '.', '!', '?', '，']
        for pos in range(min(len(cleaned_summary), MAX_SUMMARY_LENGTH), 0, -1):
            if cleaned_summary[pos-1] in truncate_chars:
                return cleaned_summary[:pos]

        return cleaned_summary[:MAX_SUMMARY_LENGTH]

    except Exception as e:
        print(f"\nAPI 错误：{str(e)}")
        return None

def process_file(file_path):
    """处理单个文件"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            raw_content = f.read()

        raw_body = extract_content(raw_content)
        if not raw_body:
            log_failure(file_path, "内容为空")
            return (file_path, False, "Empty content")

        content_type = analyze_content(raw_body)
        new_summary = generate_summary(raw_body, content_type)

        if not new_summary:
            log_failure(file_path, "摘要生成失败")
            return (file_path, False, "Summary generation failed")

        # 更新文件内容
        post = frontmatter.loads(raw_content)
        post.metadata['summary'] = new_summary

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))

        return (file_path, True, new_summary)

    except Exception as e:
        log_failure(file_path, str(e))
        return (file_path, False, str(e))

def process_files():
    """多线程处理主函数"""
    # 初始化日志文件
    open("summary.log", "w").close()

    file_list = []
    for root, dirs, files in os.walk(CONTENT_ROOT):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        if "index.md" in files:
            file_list.append(os.path.join(root, "index.md"))

    total_files = len(file_list)
    print(f"发现 {total_files} 个待处理文件")

    success_count = 0
    failure_count = 0

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [executor.submit(process_file, fp) for fp in file_list]

        with tqdm(total=len(futures), desc="处理进度") as pbar:
            last_request_time = 0
            for future in as_completed(futures):
                try:
                    current_time = time.time()
                    # 速率控制
                    if current_time - last_request_time < REQUEST_INTERVAL:
                        time.sleep(REQUEST_INTERVAL - (current_time - last_request_time))
                    last_request_time = time.time()

                    file_path, status, message = future.result()
                    if status:
                        success_count += 1
                        tqdm.write(f"成功：{file_path}")
                    else:
                        failure_count += 1
                        tqdm.write(f"失败：{file_path} - {message}")

                except Exception as e:
                    failure_count += 1
                    tqdm.write(f"异常错误：{str(e)}")
                finally:
                    pbar.update(1)

    print(f"\n处理完成！成功：{success_count}，失败：{failure_count}")

if __name__ == "__main__":
    start_time = time.time()
    process_files()
    print(f"总耗时：{time.time()-start_time:.2f}秒")
