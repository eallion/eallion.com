// directus-fetch-latest-10-articles.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 配置部分
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const DIRECTUS_S3_URL = process.env.DIRECTUS_S3_URL;
const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

/**
 * 从 Directus API 获取最近的 10 篇文章
 */
async function fetchLatest10Articles() {
  console.log('正在获取最近 10 篇文章...');
  const response = await fetch(`${DIRECTUS_API_URL}items/Article?fields=*,tags.Tag_id.*,categories.Category_id.*,authors.Author_id.*,serieses.Series_id.*,featureimage.*&sort=-date&limit=10`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
  const data = await response.json();

  if (!data || !data.data) {
    console.error('API 返回的数据结构不正确。');
    return [];
  }

  return data.data;
}

/**
 * 将 Directus 文章数据转换为 Hugo Markdown 文件
 */
async function createMarkdownFiles(articles) {
  // 确保目标目录存在
  if (!fs.existsSync(HUGO_CONTENT_DIR)) {
    console.log(`创建目录：${HUGO_CONTENT_DIR}`);
    fs.mkdirSync(HUGO_CONTENT_DIR, { recursive: true });
  }

  console.log(`总共获取到 ${articles.length} 篇文章。`);

  for (const article of articles) {
    let { slug, content, code, ...otherFields } = article;

    // 构建 Front Matter 对象
    const frontMatter = {};
    for (const key in otherFields) {
      const value = otherFields[key];
      // 排除 id 和值为 null 的字段
      if (key === 'id' || value === null || value === undefined) {
        continue;
      }

      newSlug = slug
        .trim() // 去掉首尾空格或换行符
        .replace(/\s+/g, '-') // 如果中间有空格替换为 -
        .toLowerCase(); // 如果有大写，转换为小写

      frontMatter['slug'] = newSlug;

      if (key === 'tags' && Array.isArray(value)) {
        // 提取 tags 的 name
        frontMatter[key] = value.map(tag => tag.Tag_id.name);
      } else if (key === 'categories' && Array.isArray(value)) {
        // 提取 categories 的 name
        frontMatter[key] = value.map(cat => cat.Category_id.name);
      }  else if (key === 'serieses' && Array.isArray(value)) {
        // 提取 series 的 name，并将字段名从 serieses 改为 series
        frontMatter['series'] = value.map(series => series.Series_id.name);
      } else if (key === 'authors' && Array.isArray(value)) {
        // 提取 authors 的 username
        frontMatter[key] = value.map(author => author.Author_id.username);
      } else if (key === 'featureimage') {
          // 特别处理 featureimage：从对象中提取 filename_disk 值
          try {
            if (value && typeof value === 'object' && 'filename_disk' in value) {
              if (value.filename_disk) {
                const imageUrl = `${DIRECTUS_S3_URL}${value.filename_disk}`;
                frontMatter[key] = imageUrl;
              } else {
                console.warn(`警告：featureimage 对象中的 filename_disk 字段为空`);
              }
            } else {
              console.warn(`警告：featureimage 字段不是预期的对象格式`);
            }
          } catch (error) {
            console.error(`处理 featureimage 时发生错误：${error.message}`);
            // 可选：将错误信息添加到 frontMatter 中以便追踪
            frontMatter[key] = null;
          }
      } else if (key === 'summary' && typeof value === 'string') {
        // 处理 summary 字段：移除换行符
        const cleanedSummary = value.replace(/\r?\n|\r/g, ' ');
        frontMatter[key] = cleanedSummary;
      } else {
        // 添加 null 检查
        if (value === null || value === undefined) {
          console.log(`跳过空值字段：${key}`);
          return;
        }
        frontMatter[key] = value;
      }
    }

    // 构建 Markdown 内容
    let markdownContent = '';

    // 添加 Front Matter (使用 JSON 格式)
    markdownContent += JSON.stringify(frontMatter, null, 2) + '\n\n';

    // 添加 code 字段内容（如果有）
    if (code) {
      markdownContent += `${code}\n\n`;
    }

    // 添加 content 字段内容（如果有）
    if (content) {
      markdownContent += content;
    }

    // 写入文件
    const filePath = path.join(HUGO_CONTENT_DIR, `${newSlug}.md`);
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    console.log(`成功创建文件：${filePath}`);
  }
}

// 主函数，执行脚本
async function main() {
  try {
    // 获取最近 10 篇文章
    const latestArticles = await fetchLatest10Articles();
    if (latestArticles.length > 0) {
      await createMarkdownFiles(latestArticles);
      console.log(`成功获取并处理了 ${latestArticles.length} 篇最新文章！`);
    } else {
      console.log('未找到任何文章数据。');
    }
  } catch (error) {
    console.error('获取文章过程中发生错误：', error);
  }
}

main();
