// fetch-goods.js
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const GOODS_JSON_PATH = path.join(__dirname, '..', 'assets', 'data', 'goods', 'goods.json');

const API_LIMIT = 100;

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

// 主函数
async function main() {
  try {
    const allGoodsData = await fetchAllGoodsData();
    if (allGoodsData.length > 0) {
      saveGoodsDataToJson(allGoodsData);
      console.log('所有 Goods 数据已成功保存！');
    } else {
      console.log('未找到任何 Goods 数据。');
    }
  } catch (error) {
    console.error('获取 Goods 数据时发生错误：', error);
  }
}

main();
