import os
import re
import yaml
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
MAX_SUMMARY_LENGTH = 172 # 最大摘要长度
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
        # 手动解析 frontmatter
        fm_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
        match = re.match(fm_pattern, text, re.DOTALL)
        if match:
            frontmatter_content = match.group(1)
            body = match.group(2).strip()
            return body, yaml.safe_load(frontmatter_content)
        return text.strip(), {}
    except Exception as e:
        print(f"提取内容错误：{str(e)}")
        return text.strip(), {}

def analyze_content(text):
    """内容类型分析"""
    has_code = bool(re.search(r'```[\s\S]*?```', text))
    chinese_chars = len(re.findall(r'[\u4e00-\u9fa5]', text))
    english_words = len(re.findall(r'\b[a-zA-Z]+\b', text))
    total_chars = len(text)

    return {
        'is_code_only': has_code and chinese_chars < 50,  # 几乎只有代码
        'is_short': total_chars < 100,  # 短文本
        'is_mixed': has_code and chinese_chars >= 50,  # 混合内容
        'is_normal': not has_code and total_chars >= 100,  # 普通长文
        'chinese_ratio': chinese_chars / (total_chars + 0.1)
    }

def natural_truncate(text, max_length=140):
    """柔性智能截断文本，确保句子完整性但允许适度超出"""
    # 如果长度合适，直接返回
    if len(text) <= max_length + 20:  # 允许超出 20 个字符
        return text

    # 寻找合适的截断位置
    truncate_chars = ['。', '！', '？', '.', '!', '?']

    # 在允许范围内寻找句子结束符
    extended_max = min(len(text), max_length + 50)  # 允许更大的超出范围寻找句末
    for pos in range(extended_max, max(max_length - 30, 30), -1):
        if pos < len(text) and text[pos-1] in truncate_chars:
            return text[:pos]

    # 如果找不到合适位置，返回允许超出的文本
    if len(text) <= max_length + 50:
        return text

    # 实在太长，加省略号
    return text[:max_length + 30] + "..."

def clean_summary(summary):
    """清理和优化摘要"""
    # 移除格式说明
    cleaned = re.sub(r'(?:摘要：|总结：|概述：)', '', summary)
    cleaned = re.sub(r'(?:\(\d+字\)|全文严格遵循.*?限制|字数说明.*?$)', '', cleaned)

    # 确保不以逗号结尾
    if cleaned.endswith('，') or cleaned.endswith(','):
        for i in range(len(cleaned)-2, 0, -1):
            if cleaned[i] in ['。', '！', '？', '.', '!', '?']:
                cleaned = cleaned[:i+1]
                break
        else:
            # 如果没找到合适的句末，添加句号
            cleaned = cleaned[:-1] + "。"

    return cleaned.strip()

def generate_summary(content, content_type):
    """优化后的摘要生成"""
    prompt_rules = [
        "请用 160-170 个中文生成简洁的内容摘要",
        "必须以句号、感叹号或问号结尾",
        "摘要结果中英文排版遵循 vinta/pangu.js 的 auto-spacing 规则",
        "摘要结果中不能包含 HTML 和 Markdown 或者其他语言的语法代码",
        "摘要结果不能包含引号和其他容易对 python、yaml、html、js 等语言排版容易出错的符号",
        "摘要结果必须为一段话同一行显示，不能换行，不能分段，不能有空行，不能有多余的空格，不能包含 `\r` `\n` 等换行符",
        "必须以完整的句子结尾，避免句子中断",
        "摘要必须是完整的句子，不要以逗号结尾",
        "直接呈现核心结论或观点",
        "避免使用'本文'、'作者'等第三人称",
        "保持自然的博客文章表达风格",
        f"控制在 172 个全角中文汉字以内，严格计算英文和空格或其他半角符号的换算，但必须保证句子完整性"
    ]

    base_prompt = "要求：\n" + "\n".join(prompt_rules) + "\n内容：\n"

    # 根据内容类型处理
    if content_type['is_code_only']:
        # 纯代码片段，直接发送全部
        prompt = base_prompt + f"以下是一段代码片段，请生成描述其功能的摘要：\n{content}"
    elif content_type['is_short']:
        # 短文本直接发送全部
        prompt = base_prompt + f"以下是一段简短内容，请生成摘要：\n{content}"
    elif content_type['is_mixed']:
        # 混合内容（有代码有文字）
        prompt = base_prompt + f"以下是包含代码的技术内容，请生成摘要：\n{content}"
    else:
        # 普通长文
        prompt = base_prompt + f"请为以下内容生成摘要：\n{content}"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500,  # 设置较大的 token 限制
        "temperature": 0.5
    }

    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        raw_summary = result['choices'][0]['message']['content'].strip()

        # 清理和后处理
        cleaned_summary = clean_summary(raw_summary)

        # 柔性智能截断
        return natural_truncate(cleaned_summary, MAX_SUMMARY_LENGTH)

    except Exception as e:
        print(f"\nAPI 错误：{str(e)}")
        return None

def process_file(file_path):
    """处理单个文件"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            raw_content = f.read()

        raw_body, metadata = extract_content(raw_content)

        # 增加调试信息
        if not raw_body:
            file_name = os.path.basename(file_path)
            print(f"警告：提取内容为空 - {file_name}")
            print("原始内容前 200 字符：" + raw_content[:200].replace('\n', '\\n'))
            log_failure(file_path, "内容为空")
            return (file_path, False, "Empty content")

        content_type = analyze_content(raw_body)
        new_summary = generate_summary(raw_body, content_type)

        if not new_summary:
            log_failure(file_path, "摘要生成失败")
            return (file_path, False, "Summary generation failed")

        # 更新文件内容
        metadata['summary'] = new_summary

        # 重新组装文件内容
        new_content = "---\n"
        new_content += yaml.dump(metadata, allow_unicode=True)
        new_content += "---\n"
        new_content += raw_body

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)

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
