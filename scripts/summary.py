# 从 summary.json 中读取 summary 并插入到 posts .md 文件的 frontmatter 中

import os
import json

# 读取 summary.json 文件
with open("summary.json", "r", encoding="utf-8") as f:
    summaries = json.load(f)["summaries"]

# 遍历 posts 目录及其子目录
for root, dirs, files in os.walk("posts"):
    for file in files:
        if file.endswith(".md"):
            md_file = os.path.join(root, file)

            # 读取 md 文件内容
            with open(md_file, "r", encoding="utf-8") as f:
                lines = f.readlines()

            # 查找 slug 行
            slug_line = -1
            for i, line in enumerate(lines):
                if line.startswith("slug:"):
                    slug_line = i
                    break

            if slug_line != -1:
                # 在 slug 行下一行插入 summary 行
                slug = lines[slug_line].strip().split(": ")[1].strip('"')
                summary_text = ""
                for summary in summaries:
                    if summary["slug"] == slug:
                        summary_text = summary["summary"]
                        break

                if summary_text:
                    lines.insert(slug_line + 1, f'summary: "{summary_text}"\n')

                    # 将修改后的内容写回 md 文件
                    with open(md_file, "w", encoding="utf-8") as f:
                        f.writelines(lines)
