// directus-fetch-mastodon.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// Mastodon API 配置
const MASTODON_API_BASE_URL = 'https://e5n.cc/api/v1/accounts/111136231674527355/statuses?only_media=true&limit=40';
const MASTODON_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'album', 'album.json');

/**
 * 从 Mastodon API 获取数据
 * @returns {Promise<Array>} 返回 Mastodon 状态数据数组
 */
async function fetchMastodonData() {
  console.log('正在获取 Mastodon 数据...');

  let allData = [];
  let maxId = null;

  try {
    while (true) {
      // 构造请求 URL
      let requestUrl = MASTODON_API_BASE_URL;
      if (maxId) {
        requestUrl += `&max_id=${maxId}`;
      }

      console.log(`正在请求：${requestUrl}`);
      const response = await fetch(requestUrl);

      if (!response.ok) {
        console.error(`Mastodon API 请求失败，状态码：${response.status}`);
        break;
      }

      const data = await response.json();

      if (!data || !Array.isArray(data)) {
        console.error('Mastodon API 返回的数据结构不正确。');
        break;
      }

      // 如果没有更多数据，退出循环
      if (data.length === 0) {
        break;
      }

      // 筛选 media_attachments.description 精确包含 'ealbum' 的数据
      const filteredData = data.filter(status =>
        status.media_attachments &&
        status.media_attachments.some(media =>
          media.description &&
          media.description.includes('ealbum')
        )
      );

      console.log(`本页获取到 ${data.length} 条数据，筛选后剩余 ${filteredData.length} 条`);
      allData = allData.concat(filteredData);

      // 设置下一页的 max_id 为当前页最后一条数据的 id
      const lastItem = data[data.length - 1];
      if (lastItem && lastItem.id) {
        maxId = lastItem.id;
      } else {
        // 如果无法获取最后一条数据的 ID，退出循环
        break;
      }
    }

    console.log(`成功获取 ${allData.length} 条符合条件的 Mastodon 数据`);
    return allData;
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
  // 处理数据，替换域名并删除描述中的 ealbum
  const processedData = mastodonData.map(status => {
    const processedStatus = { ...status };

    if (processedStatus.media_attachments) {
      processedStatus.media_attachments = processedStatus.media_attachments.map(media => {
        const processedMedia = { ...media };

        // 精确替换域名 file.e5n.cc 为 mstd-s3-files.eallion.com
        if (processedMedia.url) {
          processedMedia.url = processedMedia.url.replace(
            'files.e5n.cc',
            'mstd-s3-files.eallion.com'
          );
        }

        if (processedMedia.preview_url) {
          processedMedia.preview_url = processedMedia.preview_url.replace(
            'files.e5n.cc',
            'mstd-s3-files.eallion.com'
          );
        }

        // 删除描述中的 ealbum 或 \nealbum
        if (processedMedia.description) {
          processedMedia.description = processedMedia.description.replace(/\nealbum\s*$/, '').replace(/ealbum\s*$/, '');
        }

        return processedMedia;
      });
    }

    return processedStatus;
  });

  // 确保目标目录存在
  const mastodonDir = path.dirname(MASTODON_JSON_PATH);
  if (!fs.existsSync(mastodonDir)) {
    console.log(`创建目录：${mastodonDir}`);
    fs.mkdirSync(mastodonDir, { recursive: true });
  }

  // 写入 JSON 文件
  fs.writeFileSync(MASTODON_JSON_PATH, JSON.stringify(processedData, null, 2), 'utf-8');
  console.log(`成功保存 ${processedData.length} 条 Mastodon 数据到 ${MASTODON_JSON_PATH}`);
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
