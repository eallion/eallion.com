// directus-fetch-all.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// -------------------------------------------------------------
// 配置部分（支持从环境变量读取）
// -------------------------------------------------------------
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const DIRECTUS_S3_URL = process.env.DIRECTUS_S3_URL; // S3 域名
const NEODB_ACCESS_TOKEN = process.env.NEODB_ACCESS_TOKEN; // NeoDB 访问令牌
const HUGO_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const PENTA_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'penta', 'penta.json');
const GOODS_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'goods', 'goods.json');
const FRIENDS_LINKS_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'friends', 'links.json');
const NEODB_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'neodb', 'movie.json');
const MASTODON_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'mastodon', 'mastodon.json');

// Directus API 分页设置
const API_LIMIT = 100; // Directus 的默认限制通常是 100

// Mastodon API 配置
const MASTODON_API_URL = 'https://e5n.cc/api/v1/accounts/111136231674527355/statuses?limit=30&exclude_replies=true&exclude_reblogs=false';

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
  const response = await fetch(`${DIRECTUS_API_URL}items/Article?limit=${API_LIMIT}&offset=${offset}&fields=*,tags.Tag_id.*,categories.Category_id.*,authors.Author_id.*,serieses.Series_id.*,featureimage.*`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
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
  const response = await fetch(`${DIRECTUS_API_URL}items/Penta?limit=${API_LIMIT}&offset=${offset}&fields=*,screenshot.*`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
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
  const response = await fetch(`${DIRECTUS_API_URL}items/Goods?limit=${API_LIMIT}&offset=${offset}&fields=*,image.*`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
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
 * 递归地从 Directus API 获取所有 Friends Links 数据
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有 Friends Links 数据的数组
 */
async function fetchAllFriendsLinksData(offset = 0) {
  console.log(`正在获取 Friends Links 数据，偏移量：${offset}...`);
  const response = await fetch(`${DIRECTUS_API_URL}items/Friendslinks?limit=${API_LIMIT}&offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
  const data = await response.json();

  if (!data || !data.data) {
    console.error('Friends Links API 返回的数据结构不正确。');
    return [];
  }

  const friendsLinksItems = data.data;

  // 如果返回的项目数量等于 API_LIMIT，表示可能还有更多数据，继续获取下一页
  if (friendsLinksItems.length === API_LIMIT) {
    const nextItems = await fetchAllFriendsLinksData(offset + API_LIMIT);
    return friendsLinksItems.concat(nextItems);
  } else {
    return friendsLinksItems;
  }
}

/**
 * 从 NeoDB API 获取所有分页数据
 * @returns {Promise<Array>} 返回所有 NeoDB 数据的数组
 */
async function fetchAllNeoDBData() {
  console.log('正在获取 NeoDB 数据...');

  try {
    // 首先获取第一页数据以确定总页数
    const firstPageResponse = await fetch(
      'https://neodb.social/api/me/shelf/complete?page=1',
      {
        headers: {
          'Authorization': `Bearer ${NEODB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!firstPageResponse.ok) {
      console.error(`NeoDB API 请求失败，状态码：${firstPageResponse.status}`);
      return [];
    }

    const firstPageData = await firstPageResponse.json();

    if (!firstPageData || !firstPageData.data) {
      console.error('NeoDB API 返回的数据结构不正确。');
      return [];
    }

    // 获取总页数
    const totalPages = firstPageData.pages || 1;
    console.log(`总共 ${totalPages} 页数据`);

    // 存储所有数据
    let allNeoDBItems = [...firstPageData.data];

    // 如果有多页，继续获取其他页的数据
    if (totalPages > 1) {
      const pagePromises = [];

      // 从第 2 页开始获取数据
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(fetchNeoDBPage(page));
      }

      // 等待所有页面的数据获取完成
      const pageResults = await Promise.all(pagePromises);

      // 合并所有页面的数据
      for (const pageData of pageResults) {
        if (pageData && Array.isArray(pageData)) {
          allNeoDBItems = allNeoDBItems.concat(pageData);
        }
      }
    }

    return allNeoDBItems;
  } catch (error) {
    console.error(`获取 NeoDB 数据时发生错误:`, error);
    return [];
  }
}

/**
 * 获取 NeoDB 指定页的数据
 * @param {number} page 页码
 * @returns {Promise<Array|null>} 返回该页的数据或null
 */
async function fetchNeoDBPage(page) {
  console.log(`正在获取 NeoDB 数据，页码：${page}...`);

  try {
    const response = await fetch(
      `https://neodb.social/api/me/shelf/complete?page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${NEODB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error(`NeoDB API 请求第${page}页失败，状态码：${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`获取 NeoDB 第${page}页数据时发生错误:`, error);
    return null;
  }
}

/**
 * 从 Mastodon API 获取数据
 * @returns {Promise<Array>} 返回 Mastodon 状态数据数组
 */
async function fetchMastodonData() {
  console.log('正在获取 Mastodon 数据...');

  try {
    const response = await fetch(MASTODON_API_URL);

    if (!response.ok) {
      console.error(`Mastodon API 请求失败，状态码：${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      console.error('Mastodon API 返回的数据结构不正确。');
      return [];
    }

    console.log(`成功获取 ${data.length} 条 Mastodon 数据`);
    return data;
  } catch (error) {
    console.error('获取 Mastodon 数据时发生错误：', error);
    return [];
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
 * 保存 Friends Links 数据到 JSON 文件
 * @param {Array} friendsLinksData Friends Links 数据数组
 */
function saveFriendsLinksDataToJson(friendsLinksData) {
  // 确保目标目录存在
  const friendsLinksDir = path.dirname(FRIENDS_LINKS_JSON_PATH);
  if (!fs.existsSync(friendsLinksDir)) {
    console.log(`创建目录：${friendsLinksDir}`);
    fs.mkdirSync(friendsLinksDir, { recursive: true });
  }

  // 写入 JSON 文件（无需特殊处理）
  fs.writeFileSync(FRIENDS_LINKS_JSON_PATH, JSON.stringify(friendsLinksData, null, 2), 'utf-8');
  console.log(`成功保存 ${friendsLinksData.length} 条 Friends Links 数据到 ${FRIENDS_LINKS_JSON_PATH}`);
}

/**
 * 保存 NeoDB 数据到 JSON 文件
 * @param {Array} neodbData NeoDB 数据数组
 */
function saveNeoDBDataToJson(neodbData) {
  // 确保目标目录存在
  const neodbDir = path.dirname(NEODB_JSON_PATH);
  if (!fs.existsSync(neodbDir)) {
    console.log(`创建目录：${neodbDir}`);
    fs.mkdirSync(neodbDir, { recursive: true });
  }

  // 写入 JSON 文件（无需特殊处理）
  fs.writeFileSync(NEODB_JSON_PATH, JSON.stringify(neodbData, null, 2), 'utf-8');
  console.log(`成功保存 ${neodbData.length} 条 NeoDB 数据到 ${NEODB_JSON_PATH}`);
}

/**
 * 保存 Mastodon 数据到 JSON 文件
 * @param {Array} mastodonData Mastodon 数据数组
 */
function saveMastodonDataToJson(mastodonData) {
  // 确保目标目录存在
  const mastodonDir = path.dirname(MASTODON_JSON_PATH);
  if (!fs.existsSync(mastodonDir)) {
    console.log(`创建目录：${mastodonDir}`);
    fs.mkdirSync(mastodonDir, { recursive: true });
  }

  // 写入 JSON 文件
  fs.writeFileSync(MASTODON_JSON_PATH, JSON.stringify(mastodonData, null, 2), 'utf-8');
  console.log(`成功保存 ${mastodonData.length} 条 Mastodon 数据到 ${MASTODON_JSON_PATH}`);
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

    // 获取并保存 Friends Links 数据
    const allFriendsLinksData = await fetchAllFriendsLinksData();
    if (allFriendsLinksData.length > 0) {
      saveFriendsLinksDataToJson(allFriendsLinksData);
      console.log('所有 Friends Links 数据已成功保存！');
    } else {
      console.log('未找到任何 Friends Links 数据。');
    }

    // 获取并保存 NeoDB 数据
    const allNeoDBData = await fetchAllNeoDBData();
    if (allNeoDBData.length > 0) {
      saveNeoDBDataToJson(allNeoDBData);
      console.log('所有 NeoDB 数据已成功保存！');
    } else {
      console.log('未找到任何 NeoDB 数据。');
    }

    // 获取并保存 Mastodon 数据
    const mastodonData = await fetchMastodonData();
    if (mastodonData.length > 0) {
      saveMastodonDataToJson(mastodonData);
      console.log('所有 Mastodon 数据已成功保存！');
    } else {
      console.log('未找到任何 Mastodon 数据。');
    }
  } catch (error) {
    console.error('同步过程中发生错误：', error);
  }
}

main();
