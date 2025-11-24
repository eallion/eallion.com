// fetch-links.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const FRIENDS_LINKS_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'friends', 'links.json');

const API_LIMIT = 100;

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
    throw new Error('Friends Links API 返回的数据结构不正确。');
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

// 主函数
async function main() {
  try {
    const allFriendsLinksData = await fetchAllFriendsLinksData();
    if (allFriendsLinksData.length > 0) {
      saveFriendsLinksDataToJson(allFriendsLinksData);
      console.log('所有 Friends Links 数据已成功保存！');
    } else {
      console.error('未找到任何 Friends Links 数据。');
      process.exit(1);
    }
  } catch (error) {
    console.error('获取 Friends Links 数据时发生错误：', error);
    process.exit(1);
  }
}

main();
