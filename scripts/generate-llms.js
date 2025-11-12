#!/usr/bin/env node
// directus-gen-llms.js
// 从原脚本中抽取用于生成 static/llms.txt 和 static/llms-full.txt 的逻辑。
// 用法：node scripts/directus-gen-llms.js <articles.json>

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 输出文件路径
const llmFilePath = path.join(__dirname, '..', 'static', 'llms.txt');
const llmFullFilePath = path.join(__dirname, '..', 'static', 'llms-full.txt');

// data 目录下的基线文件（不要修改这些文件，脚本将基于它们生成 static 下的新文件）
const DATA_LLM_FILE = path.join(__dirname, '..', 'data', 'llms', 'llms.txt');
const DATA_LLM_FULL_FILE = path.join(__dirname, '..', 'data', 'llms', 'llms-full.txt');

// content/blog 目录（用于在没有 JSON 输入时从 markdown 文件构建文章列表）
const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

/**
 * 递归查找指定目录下的所有 .md 文件
 * @param {string} dir
 * @returns {string[]} 文件的绝对路径数组
 */
function findMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const name of list) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results.push(...findMarkdownFiles(full));
    } else if (stat && stat.isFile() && name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * 从 content/blog 目录的 Markdown 文件中读取文章信息（slug, title, summary, content）
 * 修复：新增对以 { 开始的 JSON/JS 对象作为 Front Matter 的处理。
 * @returns {Array}
 */
function readArticlesFromContentBlog() {
  const files = findMarkdownFiles(BLOG_CONTENT_DIR);
  const articles = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      let front = {};
      let content = raw; // 默认是全部内容

      // 1. 尝试解析 JSON/JS 对象 Front Matter (基于上传文件的格式，它以 { 开始)
      // 模式：开头是 {，直到遇到第一个 } 后面跟上至少两个换行符 (即 Markdown 内容的开始)
      const jsonBlockStartMatch = raw.trimStart().startsWith('{') ? raw.match(/^([\s\S]*?})\s*[\r\n]{2,}([\s\S]*)/) : null;

      if (jsonBlockStartMatch) {
        const jsonBlock = jsonBlockStartMatch[1].trim();
        content = jsonBlockStartMatch[2]; // Remaining content, will be trimmed later

        try {
            // 使用 js-yaml.load 来解析，它对 JSON 格式通常兼容
            front = yaml.load(jsonBlock) || {};
        } catch (e) {
            console.warn(`[WARN] 解析 JSON/JS front matter 失败：${file}: ${e.message || e}`);
            front = {};
            content = raw; // 解析失败，回退到原始内容
        }
      }

      // 2. 如果 JSON/JS 对象解析失败或不存在，尝试解析 YAML Front Matter (---...---)
      if (Object.keys(front).length === 0) {
        const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
        if (fmMatch) {
            const fmText = fmMatch[1];
            try {
                front = yaml.load(fmText) || {};
            } catch (e) {
                console.warn(`[WARN] 解析 YAML front matter 失败，继续并将其视为空：${file}: ${e.message || e}`);
                front = {};
            }
            content = raw.slice(fmMatch[0].length);
        } else {
            // 3. 既不是 JSON/JS 对象，也不是 YAML，则 content 为 raw
            content = raw;
        }
      }

      // 确定 slug 与 title
      const filename = path.basename(file, '.md');
      // **修复关键点**：确保优先使用 frontmatter 中的 title 和 slug
      const slug = (front.slug && String(front.slug).trim()) || filename;
      const title = (front.title && String(front.title).trim()) || filename;

      // 只使用 frontmatter 的 summary 字段（不从正文回退）
      let frontSummary = '';
      if (front && front.hasOwnProperty('summary')) {
        if (typeof front.summary === 'string') frontSummary = front.summary.trim();
        else if (front.summary === null || front.summary === undefined) frontSummary = '';
        else frontSummary = JSON.stringify(front.summary);
      } else {
        frontSummary = '';
      }

      // 去掉 frontmatter 后的正文并清理
      const cleanedContent = content.trim();

      articles.push({ slug, title, frontSummary, content: cleanedContent });
    } catch (err) {
      // 忽略单个文件的错误
      console.warn(`读取文件 ${file} 时出错：`, err.message || err);
    }
  }

  return articles;
}

/**
 * 将文章列表追加到 static/llms.txt 和 static/llms-full.txt
 * @param {Array} articles 文章数据数组
 */
function appendToLLMFile(articles) {
  // 确保 static 目录存在
  const staticDir = path.join(__dirname, '..', 'static');
  if (!fs.existsSync(staticDir)) {
    console.log(`创建目录：${staticDir}`);
    fs.mkdirSync(staticDir, { recursive: true });
  }

  let llmContentAppend = '\n';
  let llmFullContentAppend = '\n';

  // 按照指定格式生成要追加的内容
  for (const article of articles) {
    if (article.slug && article.title) {
      const title = article.title.replace(/\[/g, '\\[').replace(/\]/g, '\\]'); // 转义标题中的方括号
      const slug = article.slug;
      // 使用 frontSummary（只来自 frontmatter 的 summary 字段）
      let summary = '';
      if (article.frontSummary) {
        summary = String(article.frontSummary).replace(/\r?\n|\r/g, ' ').trim();
      } else {
        summary = '';
      }
      const content = article.content ? article.content : '';

      // llms.txt 格式：- [title](url)：summary
      llmContentAppend += `- [${title}](https://www.eallion.com/${slug}/)：${summary}\n`;
      // llms-full.txt 格式：- [title](url)：\n"""""\ncontent\n"""""\n\n
      llmFullContentAppend += `- [${title}](https://www.eallion.com/${slug}/)：\n"""""\n${content}\n"""""\n\n`;
    }
  }

  // 读取 data 目录下的基线文件（如果存在），然后把新的追加内容写入 static 目录下的新文件
  let baseLlms = '';
  let baseLlmsFull = '';

  try {
    if (fs.existsSync(DATA_LLM_FILE)) {
      baseLlms = fs.readFileSync(DATA_LLM_FILE, 'utf-8');
    }
  } catch (e) {
    console.warn(`读取基线文件 ${DATA_LLM_FILE} 失败：`, e.message || e);
  }

  try {
    if (fs.existsSync(DATA_LLM_FULL_FILE)) {
      baseLlmsFull = fs.readFileSync(DATA_LLM_FULL_FILE, 'utf-8');
    }
  } catch (e) {
    console.warn(`读取基线文件 ${DATA_LLM_FULL_FILE} 失败：`, e.message || e);
  }

  // 写入 static 下的新文件（覆盖写入，以合并 data 中原有内容和新追加内容）
  const finalLlms = baseLlms + llmContentAppend;
  const finalLlmsFull = baseLlmsFull + llmFullContentAppend;

  fs.writeFileSync(llmFilePath, finalLlms, 'utf-8');
  console.log(`已生成 ${llmFilePath}（基于 ${DATA_LLM_FILE || '空内容'}，追加 ${articles.length} 篇文章）`);
  fs.writeFileSync(llmFullFilePath, finalLlmsFull, 'utf-8');
  console.log(`已生成 ${llmFullFilePath}（基于 ${DATA_LLM_FULL_FILE || '空内容'}，追加 ${articles.length} 篇文章）`);
}

module.exports = { appendToLLMFile };

// 如果直接运行此脚本：仅从 content/blog/*.md 读取文章并生成 static 下的文件
if (require.main === module) {
  try {
    console.log('从 content/blog/*.md 读取文章并生成 llms 列表...');
    const articles = readArticlesFromContentBlog();
    console.log(`找到 ${articles.length} 篇文章`);

    if (!articles || articles.length === 0) {
      console.log('未找到任何文章，退出。');
      process.exit(0);
    }

    appendToLLMFile(articles);
  } catch (err) {
    console.error('处理时发生错误：', err);
    process.exit(1);
  }
}
