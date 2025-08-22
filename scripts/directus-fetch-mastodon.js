// directus-fetch-mastodon.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// Mastodon API 配置
const MASTODON_API_URL = 'https://e5n.cc/api/v1/accounts/111136231674527355/statuses?limit=30&exclude_replies=true&exclude_reblogs=false';
const MASTODON_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'mastodon', 'mastodon.json');

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

// 主函数
async function main() {
  try {
    const mastodonData = await fetchMastodonData();
    if (mastodonData.length > 0) {
      saveMastodonDataToJson(mastodonData);
      console.log('所有 Mastodon 数据已成功保存！');
    } else {
      console.log('未找到任何 Mastodon 数据。');
    }
  } catch (error) {
    console.error('获取 Mastodon 数据时发生错误：', error);
  }
}

main();
