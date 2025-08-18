// sync-directus.js
// 这个脚本从 Directus API 获取文章数据，并生成 Hugo Markdown 文件
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


// -------------------------------------------------------------
// 配置部分（支持从环境变量读取）
// -------------------------------------------------------------
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_FILES_URL = process.env.DIRECTUS_FILES_URL; // Directus 文件 API 的基础 URL
const DIRECTUS_S3_URL = process.env.DIRECTUS_S3_URL; // S3 域名
const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

// Directus API 分页设置
const API_LIMIT = 100; // Directus 的默认限制通常是 100

// -------------------------------------------------------------
// 脚本逻辑部分
// -------------------------------------------------------------

/**
 * 递归地从 Directus API 获取所有分页数据
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有文章的数组
 */
async function fetchAllArticles(offset = 0) {
  console.log(`正在获取数据，偏移量：${offset}...`);
  const response = await fetch(`${DIRECTUS_API_URL}?limit=${API_LIMIT}&offset=${offset}&fields=*,tags.Tag_id.*,categories.Category_id.*,authors.Author_id.*`);
  const data = await response.json();

  if (!data || !data.data) {
    console.error('API 返回的数据结构不正确。');
    return [];
  }

  const articles = data.data;

  // 如果返回的文章数量等于 API_LIMIT，表示可能还有更多文章，继续获取下一页
  if (articles.length === API_LIMIT) {
    const nextArticles = await fetchAllArticles(offset + API_LIMIT);
    return articles.concat(nextArticles);
  } else {
    return articles;
  }
}

/**
 * 从 Directus API 获取文件元数据
 * @param {string} fileId Directus 文件 ID
 * @returns {Promise<string|null>} 返回带扩展名的文件名，如果失败则返回 null
 */
async function getFileMeta(fileId) {
  try {
    const response = await fetch(`${DIRECTUS_FILES_URL}${fileId}?fields=filename_disk`);
    const data = await response.json();
    if (data && data.data && data.data.filename_disk) {
      return data.data.filename_disk;
    }
  } catch (error) {
    console.error(`无法获取文件元数据：${fileId}`, error);
  }
  return null;
}

/**
 * 将 Directus 文章数据转换为 Hugo Markdown 文件
 * @param {Array} articles 文章数据数组
 */
async function createMarkdownFiles(articles) {
  // 确保目标目录存在，如果不存在则自动创建。
  // `recursive: true` 选项会创建所有必要的父目录。
  if (!fs.existsSync(HUGO_CONTENT_DIR)) {
    console.log(`创建目录：${HUGO_CONTENT_DIR}`);
    fs.mkdirSync(HUGO_CONTENT_DIR, { recursive: true });
  }

  console.log(`总共获取到 ${articles.length} 篇文章。`);

  for (const article of articles) {
    const { slug, content, code, ...otherFields } = article;

    // 检查 slug 是否存在，如果不存在则跳过
    if (!slug) {
      console.warn('警告：发现一篇文章没有 slug 字段，已跳过。');
      continue;
    }

    // 构建 Front Matter 对象
    const frontMatter = {};
    for (const key in otherFields) {
      const value = otherFields[key];
      // 排除 id 和值为 null 的字段
      if (key === 'id' || value === null || value === undefined) {
        continue;
      }

      if (key === 'tags' && Array.isArray(value)) {
        // 提取 tags 的 name
        frontMatter[key] = value.map(tag => tag.Tag_id.name);
      } else if (key === 'categories' && Array.isArray(value)) {
        // 提取 categories 的 name
        frontMatter[key] = value.map(cat => cat.Category_id.name);
      } else if (key === 'authors' && Array.isArray(value)) {
        // 提取 authors 的 username
        frontMatter[key] = value.map(author => author.Author_id.username);
      } else if (key === 'featureimage' && typeof value === 'string') {
        // 特别处理 featureimage：获取文件元数据并拼接带扩展名的 S3 URL
        const fileName = await getFileMeta(value);
        if (fileName) {
          const imageUrl = `${DIRECTUS_S3_URL}${fileName}`;
          frontMatter[key] = imageUrl;
        } else {
          console.warn(`警告：无法为 ID ${value} 获取文件名，跳过 featureimage。`);
        }
      } else if (key === 'summary' && typeof value === 'string') {
        // 处理 summary 字段：移除换行符并转义双引号
        const cleanedSummary = value.replace(/\r?\n|\r/g, ' ').replace(/"/g, '\\"');
        // 将 cleanedSummary 包装在双引号中，强制其在 YAML 中为单行
        frontMatter[key] = `"${cleanedSummary}"`;
      } else {
        frontMatter[key] = value;
      }
    }

    // 构建 Markdown 内容
    let markdownContent = '';

    // 添加 Front Matter
    markdownContent += '---\n';
    markdownContent += yaml.dump(frontMatter, { skipInvalid: true, sortKeys: false });
    markdownContent += '---\n\n';

    // 添加 code 字段内容（如果有）
    if (code) {
      markdownContent += `${code}\n\n`;
    }

    // 添加 content 字段内容（如果有）
    if (content) {
      markdownContent += content;
    }

    // 写入文件
    const filePath = path.join(HUGO_CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    console.log(`成功创建文件：${filePath}`);
  }
}

// 主函数，执行脚本
async function main() {
  try {
    const allArticles = await fetchAllArticles();
    if (allArticles.length > 0) {
      await createMarkdownFiles(allArticles);
      console.log('所有文章已成功同步完成！');
    } else {
      console.log('未找到任何文章数据。');
    }
  } catch (error) {
    console.error('同步过程中发生错误：', error);
  }
}

main();
