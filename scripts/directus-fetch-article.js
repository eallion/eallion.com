// directus-fetch-all-articles.js

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 配置部分
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const DIRECTUS_S3_URL = process.env.DIRECTUS_S3_URL;
const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

// 默认图片 URL
// 默认图片 URL (已移除)
// const DEFAULT_IMAGE_URL = 'https://images.eallion.com/directus/files/ce35a8bb-fbda-468c-9aa8-d3599e538566.jpg';

/**
 * 从 Directus API 分页获取所有非草稿文章
 * @returns {Array} 所有文章数据的数组
 */
async function fetchAllArticles() {
  console.log('正在分页获取所有非草稿文章...');
  const allArticles = [];
  const limit = 100;
  let offset = 0;
  let totalArticlesFromMeta = 0;

  try {
    do {
      // 确保只获取非草稿文章
      const url = `${DIRECTUS_API_URL}items/Article?fields=*,tags.Tag_id.*,categories.Category_id.*,authors.Author_id.*,serieses.Series_id.*,featureimage.*&sort=-date&filter[draft][_eq]=false&limit=${limit}&offset=${offset}&meta=total_count`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`API 请求失败，状态码：${response.status}`);
      }

      const data = await response.json();
      const currentArticles = data.data;

      if (!data || !currentArticles) {
        throw new Error('API 返回的数据结构不正确。');
      }

      // 仅在第一次请求时，记录 Directus 报告的总数
      if (offset === 0 && data.meta && data.meta.total_count) {
          totalArticlesFromMeta = data.meta.total_count;
          console.log(`Directus 报告的总非草稿文章数：${totalArticlesFromMeta} 篇。`);
      }

      // 将本页文章添加到总列表中
      allArticles.push(...currentArticles);

      // 检查当前页返回的文章数量是否小于 limit，如果是，则说明已获取完毕
      if (currentArticles.length < limit) {
          break;
      }

      // 只有在取满一页时才增加 offset
      offset += limit;

    } while (true);
  } catch (error) {
      console.error('获取文章过程中发生网络或解析错误：', error.message || error);
      throw error; // 重新抛出错误以便 main 函数捕获
  }

  return allArticles;
}

/**
 * 将 Directus 文章数据转换为 Hugo Markdown 文件
 */
async function createMarkdownFiles(articles) {
  // 确保目标目录存在
  const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
  if (!fs.existsSync(HUGO_CONTENT_DIR)) {
    console.log(`创建目录：${HUGO_CONTENT_DIR}`);
    fs.mkdirSync(HUGO_CONTENT_DIR, { recursive: true });
  }

  console.log(`准备处理 ${articles.length} 篇文章。`);
  let processedCount = 0;
  const skippedArticles = []; // **新增：用于存储被跳过的文章信息**

  for (const article of articles) {
    // 确保 article.id 和 article.title 存在，以备警告使用
    const articleId = article.id;
    const articleTitle = article.title || '无标题';

    let { slug, content, code, featureimage, ...otherFields } = article;

    const frontMatter = {};

    let newSlug = (slug || '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();

    // *** 关键修改：如果 slug 为空，记录并跳过 ***
    if (!newSlug) {
        console.warn(`警告：文章 ID ${articleId} (标题: ${articleTitle}) 没有有效 slug 字段，跳过创建文件。`);
        skippedArticles.push({ id: articleId, title: articleTitle });
        continue;
    }

    frontMatter['slug'] = newSlug;

    // --- 遍历其余字段并添加到 frontMatter ---
    for (const key in otherFields) {
      const value = otherFields[key];
      if (key === 'id' || key === 'slug' || value === null || value === undefined) {
        continue;
      }

      if (key === 'tags' && Array.isArray(value)) {
        frontMatter[key] = value.map(tag => tag.Tag_id.name);
      } else if (key === 'categories' && Array.isArray(value)) {
        frontMatter[key] = value.map(cat => cat.Category_id.name);
      }  else if (key === 'serieses' && Array.isArray(value)) {
        frontMatter['series'] = value.map(series => series.Series_id.name);
      } else if (key === 'authors' && Array.isArray(value)) {
        frontMatter[key] = value.map(author => author.Author_id.username);
      } else if (key === 'summary' && typeof value === 'string') {
        frontMatter[key] = value.replace(/\r?\n|\r/g, ' ');
      } else {
        frontMatter[key] = value;
      }
    }

    // --- 处理 featureimage 字段，并将其重命名为 image ---
    if (featureimage && typeof featureimage === 'object' && 'filename_disk' in featureimage && featureimage.filename_disk) {
        frontMatter['image'] = `${DIRECTUS_S3_URL}${featureimage.filename_disk}`;
    }


    // 如果 description 为空或不存在，使用 summary 的值替代
    if (!frontMatter.description && frontMatter.summary) {
      const summaryValue = frontMatter.summary.toString().replace(/^"(.*)"$/, '$1');
      frontMatter.description = summaryValue;
    }

    // 构建 Markdown 内容
    let markdownContent = '';
    markdownContent += JSON.stringify(frontMatter, null, 2) + '\n\n';
    if (code) {
      markdownContent += `${code}\n\n`;
    }
    if (content) {
      markdownContent += content;
    }

    // 写入文件
    const filePath = path.join(HUGO_CONTENT_DIR, `${frontMatter['slug']}.md`);
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    processedCount++;
  }

  console.log(`文章文件创建完毕。总共成功处理 ${processedCount} 篇文章！`);

  // **新增：打印被跳过的文章列表**
  if (skippedArticles.length > 0) {
      console.log('\n--- 未处理文章详情 (Slug 字段缺失/无效) ---');
      skippedArticles.forEach(item => {
          console.log(`ID: ${item.id}, 标题："${item.title}"`);
      });
      console.log(`总共跳过 ${skippedArticles.length} 篇文章。请检查这些文章的 Slug 字段是否已设置。`);
  }
}

// 主函数，执行脚本
async function main() {
  try {
    const allArticles = await fetchAllArticles();

    if (allArticles.length > 0) {
      await createMarkdownFiles(allArticles);
    } else {
      console.error('未找到任何文章数据。');
      process.exit(1);
    }
  } catch (error) {
    console.error('脚本执行时发生全局错误：', error);
    process.exit(1);
  }
}

main();
