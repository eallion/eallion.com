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

// TBD
