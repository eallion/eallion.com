# 统计博客中有多少汉字（去重）

import os
import re

def count_unique_chinese_characters(text):
    # 使用正则表达式匹配所有汉字
    chinese_chars = re.findall(r'[\u4e00-\u9fff]', text)
    # 使用集合存储不重复的汉字
    unique_chinese_chars = set(chinese_chars)
    return unique_chinese_chars

def process_directory(directory, excluded_dirs):
    unique_chinese_set = set()

    # 遍历目录中的所有文件
    for root, dirs, files in os.walk(directory):
        # 跳过排除的目录
        dirs[:] = [d for d in dirs if d not in excluded_dirs]

        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    unique_chars = count_unique_chinese_characters(content)
                    unique_chinese_set.update(unique_chars)
                    # 打印细节
                    # print(f"File: {file_path}, Unique Chinese Characters: {len(unique_chars)}")

    # 统计汉字
    print(f"Total Unique Chinese Characters: {len(unique_chinese_set)}")
    # 打印所有汉字
    # print("Unique Chinese Characters:", unique_chinese_set)

if __name__ == "__main__":
    # 获取工作目录
    current_directory = 'content'
    # 需要排除的目录
    excluded_directories = {
        'node_modules', '.git', '.idea', 'venv', '__pycache__', 'dist', 'build',
        '.vscode', '.github', 'target', 'out', 'bin', 'obj', 'scripts', 'public'
    }
    process_directory(current_directory, excluded_directories)
