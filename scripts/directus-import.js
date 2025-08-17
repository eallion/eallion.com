require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');
const axios = require('axios');

// 配置 Directus - 现在支持 .env.local 覆盖
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://cloud.directus.io';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD;
const BLOG_DIR = process.env.BLOG_DIR || path.join(__dirname, '../content/blog');

// 创建 Axios 实例
const directus = axios.create({
  baseURL: DIRECTUS_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 存储认证信息
let authToken = null;
let refreshToken = null;
let tokenExpiry = null;

// 登录获取访问令牌
async function login() {
  try {
    const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: DIRECTUS_EMAIL,
      password: DIRECTUS_PASSWORD
    });

    authToken = response.data.data.access_token;
    refreshToken = response.data.data.refresh_token;
    // 设置过期时间（比实际过期时间提前一些以确保安全）
    tokenExpiry = Date.now() + (response.data.data.expires - 60000); // 提前 1 分钟刷新

    // 更新 axios 实例的默认头部
    directus.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    console.log('✅ Directus 登录成功');
    return true;
  } catch (error) {
    console.error('❌ Directus 登录失败：', error.response?.data || error.message);
    return false;
  }
}

// 刷新访问令牌
async function refreshAccessToken() {
  try {
    const response = await axios.post(`${DIRECTUS_URL}/auth/refresh`, {
      refresh_token: refreshToken
    });

    authToken = response.data.data.access_token;
    // 更新过期时间
    tokenExpiry = Date.now() + (response.data.data.expires - 60000); // 提前 1 分钟刷新

    // 更新 axios 实例的默认头部
    directus.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    console.log('✅ Access token 已刷新');
    return true;
  } catch (error) {
    console.error('❌ 刷新 access token 失败：', error.response?.data || error.message);
    // 如果刷新失败，重新登录
    return await login();
  }
}

// 确保认证有效
async function ensureAuth() {
  // 如果没有令牌或即将过期，则重新登录
  if (!authToken || !tokenExpiry || Date.now() >= tokenExpiry) {
    if (refreshToken) {
      // 尝试刷新令牌
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        // 刷新失败则重新登录
        return await login();
      }
      return refreshed;
    } else {
      // 没有刷新令牌则直接登录
      return await login();
    }
  }
  return true;
}

// 缓存已存在的标签和分类
const tagCache = new Map();
const categoryCache = new Map();
const authorCache = new Map();

// 获取现有作者（不能创建新作者）
async function getExistingAuthor(authorName) {
  // 确保认证有效
  await ensureAuth();

  if (authorCache.has(authorName)) {
    return authorCache.get(authorName);
  }

  try {
    // 检查作者是否存在
    const { data } = await directus.get('/items/Author', {
      params: { filter: { name: { _eq: authorName } } }
    });

    if (data.data && data.data.length > 0) {
      const authorId = data.data[0].id;
      authorCache.set(authorName, authorId);
      return authorId;
    }

    // 作者不存在，返回 null 而不是创建新作者
    console.warn(`⚠️ 作者 "${authorName}" 不存在，将使用默认作者`);
    return null;
  } catch (error) {
    console.error(`查找作者 "${authorName}" 时出错:`, error.response?.data || error.message);
    throw error;
  }
}

// 获取或创建标签（可以创建新标签）
async function getOrCreateTag(tagName) {
  // 确保认证有效
  await ensureAuth();

  if (tagCache.has(tagName)) {
    return tagCache.get(tagName);
  }

  try {
    // 检查标签是否存在
    const { data } = await directus.get('/items/Tag', {
      params: { filter: { name: { _eq: tagName } } }
    });

    if (data.data && data.data.length > 0) {
      tagCache.set(tagName, data.data[0].id);
      return data.data[0].id;
    }

    // 创建新标签
    const response = await directus.post('/items/Tag', { name: tagName });
    const newTagId = response.data.data.id;
    tagCache.set(tagName, newTagId);
    return newTagId;
  } catch (error) {
    console.error(`处理标签 "${tagName}" 时出错:`, error.response?.data || error.message);
    throw error;
  }
}

// 获取现有分类（不能创建新分类）
async function getExistingCategory(categoryName) {
  // 确保认证有效
  await ensureAuth();

  if (categoryCache.has(categoryName)) {
    return categoryCache.get(categoryName);
  }

  try {
    // 检查分类是否存在
    const { data } = await directus.get('/items/Category', {
      params: { filter: { name: { _eq: categoryName } } }
    });

    if (data.data && data.data.length > 0) {
      const categoryId = data.data[0].id;
      categoryCache.set(categoryName, categoryId);
      return categoryId;
    }

    // 分类不存在，返回 null 而不是创建新分类
    console.warn(`⚠️ 分类 "${categoryName}" 不存在，将跳过该分类`);
    return null;
  } catch (error) {
    console.error(`查找分类 "${categoryName}" 时出错:`, error.response?.data || error.message);
    throw error;
  }
}

// 处理 Markdown 文件
async function processMarkdownFile(filePath) {
  try {
    const normalizedPath = path.normalize(filePath);
    const fileContent = fs.readFileSync(normalizedPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // 处理标签关系 - 构造嵌套对象格式
    let tagData = [];
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      for (const tagName of frontmatter.tags) {
        try {
          const tagId = await getOrCreateTag(tagName);
          tagData.push({
            Tag_id: {
              id: tagId,
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, '-')
            }
          });
        } catch (tagError) {
          console.error(`⚠️ 标签 "${tagName}" 处理失败:`, tagError.response?.data?.errors?.[0]?.message || tagError.message);
        }
      }
    }

    // 处理分类关系 - 构造嵌套对象格式
    let categoryData = [];
    if (frontmatter.categories && Array.isArray(frontmatter.categories)) {
      for (const categoryName of frontmatter.categories) {
        try {
          const categoryId = await getExistingCategory(categoryName);
          if (categoryId) {
            categoryData.push({
              Category_id: {
                id: categoryId,
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/\s+/g, '-')
              }
            });
          }
        } catch (categoryError) {
          console.error(`⚠️ 分类 "${categoryName}" 查找失败:`, categoryError.response?.data?.errors?.[0]?.message || categoryError.message);
        }
      }
    }

    // 处理日期字段，统一转换为 ISO 时间戳格式
    let dateValue;
    if (frontmatter.date) {
      try {
        // 尝试解析各种日期格式
        const dateObj = new Date(frontmatter.date);
        if (!isNaN(dateObj.getTime())) {
          // 转换为包含秒数的 ISO 格式
          dateValue = dateObj.toISOString();
        } else {
          // 如果解析失败，使用当前时间
          dateValue = new Date().toISOString();
        }
      } catch (dateError) {
        // 如果出现任何错误，使用当前时间
        console.warn(`⚠️ 无法解析日期 "${frontmatter.date}"，使用当前时间`);
        dateValue = new Date().toISOString();
      }
    } else {
      // 如果没有提供日期，使用当前时间
      dateValue = new Date().toISOString();
    }

    // 处理最后修改日期字段
    let lastmodValue = null;
    if (frontmatter.lastmod) {
      try {
        const lastmodObj = new Date(frontmatter.lastmod);
        if (!isNaN(lastmodObj.getTime())) {
          lastmodValue = lastmodObj.toISOString();
        }
      } catch (lastmodError) {
        console.warn(`⚠️ 无法解析最后修改日期 "${frontmatter.lastmod}"`);
      }
    }

    // 处理作者字段 - 构造嵌套对象格式
    let authorData = [];
    if (frontmatter.authors && Array.isArray(frontmatter.authors)) {
      // 获取第一个作者（如果有多个作者的话）
      const authorName = frontmatter.authors[0];
      try {
        const authorId = await getExistingAuthor(authorName);
        if (authorId) {
          authorData.push({
            Author_id: {
              id: authorId,
              name: authorName
            }
          });
        } else {
          console.warn(`⚠️ 作者 "${authorName}" 不存在`);
        }
      } catch (authorError) {
        console.error(`⚠️ 查找作者 "${authorName}" 失败`);
      }
    }

    // 准备文章数据
    // 先创建一个不包含特殊字段的 frontmatter 副本
    const cleanFrontmatter = { ...frontmatter };
    delete cleanFrontmatter.authors;

    const articleData = {
      title: frontmatter.title || path.basename(filePath, '.md'),
      slug: frontmatter.slug || path.basename(filePath, '.md').toLowerCase().replace(/\s+/g, '-'),
      content: content,
      // draft 字段处理：如果没有提供则默认为 false
      draft: frontmatter.draft !== undefined ? Boolean(frontmatter.draft) : false,
      date: dateValue,
      lastmod: lastmodValue,
      summary: frontmatter.summary || '',
      ...cleanFrontmatter
    };

    // 添加标签、分类和作者数据
    if (tagData.length > 0) {
      articleData.tags = tagData;
    }

    if (categoryData.length > 0) {
      articleData.categories = categoryData;
    }

    if (authorData.length > 0) {
      articleData.authors = authorData;
    }

    // 确保认证有效后再创建文章
    await ensureAuth();

    // 创建文章
    console.log(`📝 正在创建文章：${articleData.title}`);
    const response = await directus.post('/items/Article', articleData);
    console.log(`✅ 已创建文章：${articleData.title} (ID: ${response.data.data.id})`);
    return response.data.data.id;
  } catch (error) {
    console.error(`❌ 处理文件 ${filePath} 时出错:`, error.response?.data || error.message);

    // 提供更详细的错误信息
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((err, index) => {
        console.error(`   错误 ${index + 1}:`, err.message);
        if (err.extensions?.code) {
          console.error(`   错误代码：${err.extensions.code}`);
        }
      });
    }

    return null;
  }
}

// 添加权限测试函数
async function testDirectusConnection() {
  try {
    // 确保认证有效
    await ensureAuth();

    // 测试连接和权限
    const response = await directus.get('/users/me');
    console.log('✅ Directus 连接成功，当前用户：', response.data.data.email);

    // 测试对各个集合的访问权限
    try {
      await directus.get('/items/Article', { params: { limit: 1 } });
      console.log('✅ Article 集合访问权限正常');
    } catch (error) {
      console.error('❌ Article 集合访问失败：', error.response?.status);
    }

    try {
      await directus.get('/items/Author', { params: { limit: 1 } });
      console.log('✅ Author 集合访问权限正常');
    } catch (error) {
      console.error('❌ Author 集合访问失败：', error.response?.status);
    }

    try {
      await directus.get('/items/Category', { params: { limit: 1 } });
      console.log('✅ Category 集合访问权限正常');
    } catch (error) {
      console.error('❌ Category 集合访问失败：', error.response?.status);
    }

    try {
      await directus.get('/items/Tag', { params: { limit: 1 } });
      console.log('✅ Tag 集合访问权限正常');
    } catch (error) {
      console.error('❌ Tag 集合访问失败：', error.response?.status);
    }

  } catch (error) {
    console.error('❌ Directus 连接失败：', error.response?.data || error.message);
    throw new Error('无法连接到 Directus，请检查 URL 和令牌');
  }
}

// 主函数
async function main() {
  try {
    console.log("当前工作目录：", process.cwd());
    console.log("脚本所在目录：", __dirname);
    console.log("博客目录路径：", BLOG_DIR);

    // 验证目录存在
    if (!fs.existsSync(BLOG_DIR)) {
      console.error(`❌ 目录不存在：${BLOG_DIR}`);
      return;
    }

    // 检查认证信息
    if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
      throw new Error('缺少 Directus 认证信息。请设置 DIRECTUS_EMAIL 和 DIRECTUS_PASSWORD 环境变量');
    }

    // 登录获取访问令牌
    const loggedIn = await login();
    if (!loggedIn) {
      throw new Error('无法登录到 Directus');
    }

    // 获取所有 Markdown 文件
    const pattern = path.join(BLOG_DIR, '**/*.md').replace(/\\/g, '/');
    const files = glob.sync(pattern, {
      nodir: true,
      dot: true
    });

    console.log(`找到 ${files.length} 个 Markdown 文件`);

    await testDirectusConnection();

    // 处理所有文件
    for (const file of files) {
      await processMarkdownFile(file);
    }

    console.log('🎉 所有文件处理完成！');
  } catch (error) {
    console.error('❌ 脚本执行出错：', error.message);
    process.exit(1);
  }
}

// 执行脚本
main();
