// fetch-movie.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const NEODB_ACCESS_TOKEN = process.env.NEODB_ACCESS_TOKEN;
const NEODB_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'neodb', 'movie.json');

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

// 主函数
async function main() {
  try {
    const allNeoDBData = await fetchAllNeoDBData();
    if (allNeoDBData.length > 0) {
      saveNeoDBDataToJson(allNeoDBData);
      console.log('所有 NeoDB 数据已成功保存！');
    } else {
      console.log('未找到任何 NeoDB 数据。');
    }
  } catch (error) {
    console.error('获取 NeoDB 数据时发生错误：', error);
  }
}

main();
