// fetch-movie.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const NEODB_ACCESS_TOKEN = process.env.NEODB_ACCESS_TOKEN;
const NEODB_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'neodb', 'movie.json');

/**
 * 从 NeoDB API 获取第 1 页数据（不再循环获取其它页）
 * @returns {Promise<Array>} 返回第 1 页的 NeoDB 数据数组
 */
async function fetchAllNeoDBData() {
  console.log('正在获取 NeoDB 数据...');

  try {
  // 直接获取第 1 页的数据（不再尝试确定总页数）
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

    // 获取总页数（只用于信息目的）
    const totalPages = firstPageData.pages || 1;
    console.log(`总共 ${totalPages} 页数据（仅获取第 1 页）`);

  // 返回完整的第一页响应对象（包含 data、pages、count 等）
  return firstPageData;
  } catch (error) {
    console.error(`获取 NeoDB 数据时发生错误:`, error);
    return [];
  }
}

/**
 * 保存 NeoDB 数据到 JSON 文件
 * @param {Array|Object} neodbData NeoDB 数据数组或完整响应对象
 */
function saveNeoDBDataToJson(neodbData) {
  // 确保目标目录存在
  const neodbDir = path.dirname(NEODB_JSON_PATH);
  if (!fs.existsSync(neodbDir)) {
    console.log(`创建目录：${neodbDir}`);
    fs.mkdirSync(neodbDir, { recursive: true });
  }

  // 写入 JSON 文件（保存原始响应对象或数组）
  fs.writeFileSync(NEODB_JSON_PATH, JSON.stringify(neodbData, null, 2), 'utf-8');

  // 计算并打印保存数量（优先使用 data 字段）
  let savedCount = 0;
  if (Array.isArray(neodbData)) {
    savedCount = neodbData.length;
  } else if (neodbData && Array.isArray(neodbData.data)) {
    savedCount = neodbData.data.length;
  }
  // console.log(`成功保存 ${savedCount} 条 NeoDB 数据到 ${NEODB_JSON_PATH}`);
}

// 主函数
async function main() {
  try {
    const result = await fetchAllNeoDBData();

    const hasItems = (Array.isArray(result) && result.length > 0) ||
      (result && Array.isArray(result.data) && result.data.length > 0);

    if (hasItems) {
      saveNeoDBDataToJson(result);
    } else {
      console.log('未找到任何 NeoDB 数据。');
    }
  } catch (error) {
    console.error('获取 NeoDB 数据时发生错误：', error);
  }
}

main();
