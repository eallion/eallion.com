// directus-fetch-articles.js
// 这个脚本从 Directus API 获取文章数据，并生成 Hugo Markdown 文件
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


// -------------------------------------------------------------
// 配置部分（支持从环境变量读取）
// -------------------------------------------------------------
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_S3_URL = process.env.DIRECTUS_S3_URL; // S3 域名
const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const PENTA_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'penta', 'penta.json');
const GOODS_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'goods', 'goods.json');

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
  const response = await fetch(`${DIRECTUS_API_URL}items/Article?limit=${API_LIMIT}&offset=${offset}&fields=*,tags.Tag_id.*,categories.Category_id.*,authors.Author_id.*,serieses.Series_id.*,featureimage.*`);
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
 * 递归地从 Directus API 获取所有 Penta 数据
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有 Penta 数据的数组
 */
async function fetchAllPentaData(offset = 0) {
  console.log(`正在获取 Penta 数据，偏移量：${offset}...`);
  const response = await fetch(`${DIRECTUS_API_URL}items/Penta?limit=${API_LIMIT}&offset=${offset}&fields=*,screenshot.*`);
  const data = await response.json();

  if (!data || !data.data) {
    console.error('Penta API 返回的数据结构不正确。');
    return [];
  }

  const pentaItems = data.data;

  // 如果返回的项目数量等于 API_LIMIT，表示可能还有更多数据，继续获取下一页
  if (pentaItems.length === API_LIMIT) {
    const nextItems = await fetchAllPentaData(offset + API_LIMIT);
    return pentaItems.concat(nextItems);
  } else {
    return pentaItems;
  }
}

/**
 * 递归地从 Directus API 获取所有 Goods 数据
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有 Goods 数据的数组
 */
async function fetchAllGoodsData(offset = 0) {
  console.log(`正在获取 Goods 数据，偏移量：${offset}...`);
  const response = await fetch(`${DIRECTUS_API_URL}items/Goods?limit=${API_LIMIT}&offset=${offset}&fields=*,image.*`);
  const data = await response.json();

  if (!data || !data.data) {
    console.error('Goods API 返回的数据结构不正确。');
    return [];
  }

  const goodsItems = data.data;

  // 如果返回的项目数量等于 API_LIMIT，表示可能还有更多数据，继续获取下一页
  if (goodsItems.length === API_LIMIT) {
    const nextItems = await fetchAllGoodsData(offset + API_LIMIT);
    return goodsItems.concat(nextItems);
  } else {
    return goodsItems;
  }
}

/**
 * 保存 Penta 数据到 JSON 文件
 * @param {Array} pentaData Penta 数据数组
 */
function savePentaDataToJson(pentaData) {
  // 确保目标目录存在
  const pentaDir = path.dirname(PENTA_JSON_PATH);
  if (!fs.existsSync(pentaDir)) {
    console.log(`创建目录：${pentaDir}`);
    fs.mkdirSync(pentaDir, { recursive: true });
  }

  // 处理 Penta 数据中的截图字段
  const processedData = pentaData.map(item => {
    const processedItem = { ...item };

    // 处理 screenshot 字段，只保留 filename_disk 的值
    if (processedItem.screenshot && typeof processedItem.screenshot === 'object') {
      if (processedItem.screenshot.filename_disk) {
        processedItem.screenshot = `${processedItem.screenshot.filename_disk}`;
      } else {
        // 如果没有 filename_disk，删除整个 screenshot 字段
        delete processedItem.screenshot;
      }
    }

    return processedItem;
  });

  // 写入 JSON 文件
  fs.writeFileSync(PENTA_JSON_PATH, JSON.stringify(processedData, null, 2), 'utf-8');
  console.log(`成功保存 ${processedData.length} 条 Penta 数据到 ${PENTA_JSON_PATH}`);
}

/**
 * 保存 Goods 数据到 JSON 文件
 * @param {Array} goodsData Goods 数据数组
 */
function saveGoodsDataToJson(goodsData) {
  // 确保目标目录存在
  const goodsDir = path.dirname(GOODS_JSON_PATH);
  if (!fs.existsSync(goodsDir)) {
    console.log(`创建目录：${goodsDir}`);
    fs.mkdirSync(goodsDir, { recursive: true });
  }

  // 处理 Goods 数据中的 image 字段
  const processedData = goodsData.map(item => {
    const processedItem = { ...item };

    // 处理 image 字段，只保留 filename_disk 的值
    if (processedItem.image && typeof processedItem.image === 'object') {
      if (processedItem.image.filename_disk) {
        processedItem.image = `${processedItem.image.filename_disk}`;
      } else {
        // 如果没有 filename_disk，删除整个 image 字段
        delete processedItem.image;
      }
    }

    return processedItem;
  });

  // 写入 JSON 文件
  fs.writeFileSync(GOODS_JSON_PATH, JSON.stringify(processedData, null, 2), 'utf-8');
  console.log(`成功保存 ${processedData.length} 条 Goods 数据到 ${GOODS_JSON_PATH}`);
}

/**
 * 从 Directus API 获取文件元数据
 * @param {string} fileId Directus 文件 ID
 * @returns {Promise<string|null>} 返回带扩展名的文件名，如果失败则返回 null
 */

/**
 * 将文章列表追加到 static/llms.txt 文件
 * @param {Array} articles 文章数据数组
 */
function appendToLLMFile(articles) {
  const llmFilePath = path.join(__dirname, '..', 'static', 'llms.txt');

  // 确保 static 目录存在
  const staticDir = path.join(__dirname, '..', 'static');
  if (!fs.existsSync(staticDir)) {
    console.log(`创建目录：${staticDir}`);
    fs.mkdirSync(staticDir, { recursive: true });
  }

  let llmContent = '\n';

  // 按照指定格式生成内容
  for (const article of articles) {
    if (article.slug && article.title) {
      const title = article.title.replace(/\[/g, '\\[').replace(/\]/g, '\\]'); // 转义标题中的方括号
      const slug = article.slug;
      const summary = article.summary ? article.summary.replace(/\r?\n|\r/g, ' ').trim() : '';

      llmContent += `- [${title}](https://www.eallion.com/${slug}/) : ${summary}\n`;
    }
  }

  // 追加到文件末尾
  fs.appendFileSync(llmFilePath, llmContent, 'utf-8');
  console.log(`成功追加 ${articles.length} 篇文章到 ${llmFilePath}`);
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
      }  else if (key === 'serieses' && Array.isArray(value)) {
        // 提取 series 的 name，并将字段名从 serieses 改为 series
        frontMatter['series'] = value.map(series => series.Series_id.name);
      } else if (key === 'authors' && Array.isArray(value)) {
        // 提取 authors 的 username
        frontMatter[key] = value.map(author => author.Author_id.username);
      } else if (key === 'featureimage' && value && typeof value === 'object') {
          // 特别处理 featureimage：从对象中提取 filename_disk 值
          if (value.filename_disk) {
            const imageUrl = `${DIRECTUS_S3_URL}${value.filename_disk}`;
            frontMatter[key] = imageUrl;
          } else {
            console.warn(`警告：featureimage 对象中没有 filename_disk 字段`);
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

  // 追加到 static/llms.txt 文件
  appendToLLMFile(articles);
}

// 主函数，执行脚本
async function main() {
  try {
    // 获取并处理文章数据
    const allArticles = await fetchAllArticles();
    if (allArticles.length > 0) {
      await createMarkdownFiles(allArticles);
      console.log('所有文章已成功同步完成！');
    } else {
      console.log('未找到任何文章数据。');
    }

    // 获取并保存 Penta 数据
    const allPentaData = await fetchAllPentaData();
    if (allPentaData.length > 0) {
      savePentaDataToJson(allPentaData);
      console.log('所有 Penta 数据已成功保存！');
    } else {
      console.log('未找到任何 Penta 数据。');
    }

    // 获取并保存 Goods 数据
    const allGoodsData = await fetchAllGoodsData();
    if (allGoodsData.length > 0) {
      saveGoodsDataToJson(allGoodsData);
      console.log('所有 Goods 数据已成功保存！');
    } else {
      console.log('未找到任何 Goods 数据。');
    }
  } catch (error) {
    console.error('同步过程中发生错误：', error);
  }
}

main();
