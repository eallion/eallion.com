// 需要先安装依赖:
// npm install dotenv axios form-data

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// 配置 Directus
const DIRECTUS_API_URL = process.env.DIRECTUS_API_URL;
const DIRECTUS_ACCESS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN;
const IMAGES_DIR = path.join(__dirname, '..', 'images');

// 创建 Axios 实例
const directus = axios.create({
  baseURL: DIRECTUS_API_URL,
  headers: {
    'Authorization': `Bearer ${DIRECTUS_ACCESS_TOKEN}`
  }
});

/**
 * 获取所有 Directus 文件记录
 * @param {number} offset 当前偏移量
 * @returns {Promise<Array>} 返回所有文件数据的数组
 */
async function fetchAllFiles(offset = 0) {
  console.log(`正在获取文件数据，偏移量：${offset}...`);
  try {
    const response = await directus.get(`/files?limit=100&offset=${offset}`);
    const data = response.data;

    if (!data || !data.data) {
      console.error('文件 API 返回的数据结构不正确。');
      return [];
    }

    const files = data.data;

    // 如果返回的项目数量等于 100，表示可能还有更多数据，继续获取下一页
    if (files.length === 100) {
      const nextFiles = await fetchAllFiles(offset + 100);
      return files.concat(nextFiles);
    } else {
      return files;
    }
  } catch (error) {
    console.error('获取文件数据时出错:', error.response?.data || error.message);
    return [];
  }
}

/**
 * 查找本地对应的文件
 * @param {string} downloadFilename 下载文件名
 * @returns {string|null} 本地文件路径或 null
 */
function findLocalFile(downloadFilename) {
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    // 查找完全匹配的文件
    const matchedFile = files.find(file => file === downloadFilename);
    if (matchedFile) {
      return path.join(IMAGES_DIR, matchedFile);
    }
    
    // 查找前缀匹配的文件（处理 uuid 生成的不同格式）
    const prefix = downloadFilename.split('.')[0];
    const prefixMatchedFile = files.find(file => file.startsWith(prefix));
    if (prefixMatchedFile) {
      return path.join(IMAGES_DIR, prefixMatchedFile);
    }
    
    return null;
  } catch (error) {
    console.error(`查找本地文件 ${downloadFilename} 时出错:`, error.message);
    return null;
  }
}

/**
 * 更新 Directus 中的文件
 * @param {string} fileId 文件 ID
 * @param {string} filePath 本地文件路径
 */
async function patchFile(fileId, filePath) {
  try {
    // 创建 multipart/form-data 请求
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    
    // 使用 axios 发送 PATCH 请求
    const response = await directus.patch(`/files/${fileId}`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    
    console.log(`✅ 成功更新文件 ${fileId} (${path.basename(filePath)})`);
    return response.data;
  } catch (error) {
    console.error(`❌ 更新文件 ${fileId} 时出错:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    // 检查 images 目录是否存在
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`❌ images 目录不存在: ${IMAGES_DIR}`);
      process.exit(1);
    }

    console.log('🔍 正在获取所有 Directus 文件记录...');
    const allFiles = await fetchAllFiles();
    console.log(`📋 共获取到 ${allFiles.length} 个文件记录`);

    let updatedCount = 0;
    let notFoundCount = 0;

    for (const file of allFiles) {
      // 检查是否有 filename_download 字段
      if (file.filename_download) {
        const localFilePath = findLocalFile(file.filename_download);
        
        if (localFilePath) {
          console.log(`🔄 正在更新文件 ${file.id} (${file.filename_download})...`);
          await patchFile(file.id, localFilePath);
          updatedCount++;
        } else {
          console.log(`⚠️  未找到本地文件: ${file.filename_download}`);
          notFoundCount++;
        }
      }
    }

    console.log(`\n📊 更新完成:`);
    console.log(`   成功更新: ${updatedCount} 个文件`);
    console.log(`   未找到本地文件: ${notFoundCount} 个文件`);
    
  } catch (error) {
    console.error('❌ 执行过程中出错:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();