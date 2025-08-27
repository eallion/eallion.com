// directus-fetch-album.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// 配置部分（支持从环境变量读取）
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const ALBUM_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'album', 'album.json');

// Directus API 分页设置
const API_LIMIT = 100; // Directus 的默认限制通常是 100

/**
 * 递归地从 Directus API 获取所有 Album 数据
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有 Album 数据的数组
 */
async function fetchAllAlbumData(offset = 0) {
  console.log(`正在获取 Album 数据，偏移量：${offset}...`);
  const response = await fetch(`${DIRECTUS_API_URL}items/Album?limit=${API_LIMIT}&offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
  const data = await response.json();

  if (!data || !data.data) {
    console.error('Album API 返回的数据结构不正确。');
    return [];
  }

  const albumItems = data.data;

  // 如果返回的项目数量等于 API_LIMIT，表示可能还有更多数据，继续获取下一页
  if (albumItems.length === API_LIMIT) {
    const nextItems = await fetchAllAlbumData(offset + API_LIMIT);
    return albumItems.concat(nextItems);
  } else {
    return albumItems;
  }
}

/**
 * 替换 Album 数据中的文件 URL 域名
 * @param {Array} albumData Album 数据数组
 * @returns {Array} 处理后的 Album 数据数组
 */
function replaceAlbumUrls(albumData) {
  return albumData.map(item => {
    // 确保 item 是对象且包含必要的属性
    if (item && typeof item === 'object') {
      // 替换 url 字段中的域名
      if (item.url && typeof item.url === 'string') {
        item.url = item.url.replace('https://files.e5n.cc/', 'https://mstd-s3-files.eallion.com/');
      }

      // 替换 preview_url 字段中的域名
      if (item.preview_url && typeof item.preview_url === 'string') {
        item.preview_url = item.preview_url.replace('https://files.e5n.cc/', 'https://mstd-s3-files.eallion.com/');
      }
    }
    return item;
  });
}

/**
 * 保存 Album 数据到 JSON 文件
 * @param {Array} albumData Album 数据数组
 */
function saveAlbumDataToJson(albumData) {
  // 处理 URL 替换
  const processedAlbumData = replaceAlbumUrls(albumData);

  // 确保目标目录存在
  const albumDir = path.dirname(ALBUM_JSON_PATH);
  if (!fs.existsSync(albumDir)) {
    console.log(`创建目录：${albumDir}`);
    fs.mkdirSync(albumDir, { recursive: true });
  }

  // 写入 JSON 文件（无需特殊处理）
  fs.writeFileSync(ALBUM_JSON_PATH, JSON.stringify(processedAlbumData, null, 2), 'utf-8');
  console.log(`成功保存 ${processedAlbumData.length} 条 Album 数据到 ${ALBUM_JSON_PATH}`);
}

// 主函数
async function main() {
  try {
    const allAlbumData = await fetchAllAlbumData();
    if (allAlbumData.length > 0) {
      saveAlbumDataToJson(allAlbumData);
      console.log('所有 Album 数据已成功保存！');
    } else {
      console.log('未找到任何 Album 数据。');
    }
  } catch (error) {
    console.error('获取 Album 数据时发生错误：', error);
  }
}

main();
