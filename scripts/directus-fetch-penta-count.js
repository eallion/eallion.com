// fetch-penta.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const PENTA_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'penta', 'penta.json');

const API_LIMIT = 100;

/**
 * 递归地从 Directus API 获取所有 Penta 数据
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有 Penta 数据的数组
 */
async function fetchAllPentaData(offset = 0) {
  console.log(`正在获取 Penta 数据，偏移量：${offset}...`);
  const response = await fetch(`${DIRECTUS_API_URL}items/Penta?aggregate[count]=*`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
    }
  });
  const data = await response.json();

  if (!data || !data.data) {
    throw new Error('Penta API 返回的数据结构不正确。');
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

// 主函数
async function main() {
  try {
    const allPentaData = await fetchAllPentaData();
    if (allPentaData.length > 0) {
      savePentaDataToJson(allPentaData);
      console.log('所有 Penta 数据已成功保存！');
    } else {
      console.error('未找到任何 Penta 数据。');
      process.exit(1);
    }
  } catch (error) {
    console.error('获取 Penta 数据时发生错误：', error);
    process.exit(1);
  }
}

main();
