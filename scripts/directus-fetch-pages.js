// directus-fetch-pages.js

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// 配置部分
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const DIRECTUS_S3_URL = process.env.DIRECTUS_S3_URL;
const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content');

/**
 * 从 Directus API 分页获取所有非草稿页面
 * @returns {Array} 所有页面数据的数组
 */
async function fetchAllPages() {
  console.log('正在分页获取所有非草稿页面...');
  const allPages = [];
  const limit = 100;
  let offset = 0;
  let totalPagesFromMeta = 0;

  try {
    do {
      // 确保只获取非草稿页面
      const url = `${DIRECTUS_API_URL}items/Page?fields=*,authors.Author_id.*,aliases.alias_id.*&filter[draft][_eq]=false&limit=${limit}&offset=${offset}&meta=total_count`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`API 请求失败，状态码：${response.status}`);
      }

      const data = await response.json();
      const currentPages = data.data;

      if (!data || !currentPages) {
        throw new Error('API 返回的数据结构不正确。');
      }

      // 仅在第一次请求时，记录 Directus 报告的总数
      if (offset === 0 && data.meta && data.meta.total_count) {
          totalPagesFromMeta = data.meta.total_count;
          console.log(`Directus 报告的总非草稿页面数：${totalPagesFromMeta} 篇。`);
      }

      // 将本页页面添加到总列表中
      allPages.push(...currentPages);

      // 检查当前页返回的页面数量是否小于 limit，如果是，则说明已获取完毕
      if (currentPages.length < limit) {
          break;
      }

      // 只有在取满一页时才增加 offset
      offset += limit;

    } while (true);
  } catch (error) {
      console.error('获取页面过程中发生网络或解析错误：', error.message || error);
      throw error; // 重新抛出错误以便 main 函数捕获
  }

  return allPages;
}

/**
 * 将 Directus 页面数据转换为 Hugo Markdown 文件
 */
async function createPageFiles(pages) {
  // 确保目标目录存在 (content 目录通常存在，但为了保险)
  if (!fs.existsSync(HUGO_CONTENT_DIR)) {
    console.log(`创建目录：${HUGO_CONTENT_DIR}`);
    fs.mkdirSync(HUGO_CONTENT_DIR, { recursive: true });
  }

  console.log(`准备处理 ${pages.length} 个页面。`);
  let processedCount = 0;
  const skippedPages = [];

  for (const page of pages) {
    const pageId = page.id;
    const pageTitle = page.title || '无标题';

    let { slug, content, code, featureimage, ...otherFields } = page;

    const frontMatter = {};

    let newSlug = (slug || '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();

    if (!newSlug) {
        console.warn(`警告：页面 ID ${pageId} (标题: ${pageTitle}) 没有有效 slug 字段，跳过创建文件。`);
        skippedPages.push({ id: pageId, title: pageTitle });
        continue;
    }

    frontMatter['slug'] = newSlug;

    // --- 遍历其余字段并添加到 frontMatter ---
    for (const key in otherFields) {
      const value = otherFields[key];
      if (key === 'id' || key === 'slug' || value === null || value === undefined) {
        continue;
      }

      if (key === 'authors' && Array.isArray(value)) {
        frontMatter[key] = value.map(author => author.Author_id.username);
      } else if (key === 'aliases' && Array.isArray(value)) {
        frontMatter[key] = value.map(alias => alias.alias_id.slug);
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
    // 目录名为 slug
    const pageDir = path.join(HUGO_CONTENT_DIR, newSlug);
    if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
    }

    // 文件名为 index.md
    const filePath = path.join(pageDir, 'index.md');
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    processedCount++;
  }

  console.log(`页面文件创建完毕。总共成功处理 ${processedCount} 个页面！`);

  if (skippedPages.length > 0) {
      console.log('\n--- 未处理页面详情 (Slug 字段缺失/无效) ---');
      skippedPages.forEach(item => {
          console.log(`ID: ${item.id}, 标题："${item.title}"`);
      });
      console.log(`总共跳过 ${skippedPages.length} 个页面。请检查这些页面的 Slug 字段是否已设置。`);
  }
}

// 主函数，执行脚本
async function main() {
  try {
    const allPages = await fetchAllPages();

    if (allPages.length > 0) {
      await createPageFiles(allPages);
    } else {
      console.error('未找到任何页面数据。');
      process.exit(1);
    }
  } catch (error) {
    console.error('脚本执行时发生全局错误：', error);
    process.exit(1);
  }
}

main();
