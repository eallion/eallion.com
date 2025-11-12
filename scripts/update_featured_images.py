import os
import re
import requests

def get_title_from_index_md(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    title_match = re.search(r'title: "(.*?)"', content)
    if title_match:
        return title_match.group(1)
    return None

def download_featured_image(title, output_path):
    url = f'https://og.eallion.com/api/og?title={title}'
    response = requests.get(url)
    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            f.write(response.content)
    else:
        print(f'Error downloading image for title: {title}')

def main():
    current_directory = os.getcwd()
    for entry in os.scandir(current_directory):
        if entry.is_dir():
            index_md_path = os.path.join(entry.path, 'index.md')
            if os.path.exists(index_md_path):
                title = get_title_from_index_md(index_md_path)
                if title:
                    featured_png_path = os.path.join(entry.path, 'featured.png')
                    if os.path.exists(featured_png_path):
                        os.remove(featured_png_path)
                    download_featured_image(title, featured_png_path)

if __name__ == '__main__':
    main()
