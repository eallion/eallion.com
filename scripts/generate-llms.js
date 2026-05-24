#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'static', 'llms.txt');
const DATA_BASE_FILE = path.join(__dirname, '..', 'data', 'llms', 'llms.txt');
const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

function findMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const name of fs.readdirSync(dir)) {
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

function readArticlesFromContentBlog() {
  const files = findMarkdownFiles(BLOG_CONTENT_DIR);
  const articles = [];
  const yaml = require('js-yaml');

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      let front = {};
      let content = raw;

      const jsonBlockStartMatch = raw.trimStart().startsWith('{') ? raw.match(/^([\s\S]*?})\s*[\r\n]{2,}([\s\S]*)/) : null;
      if (jsonBlockStartMatch) {
        const jsonBlock = jsonBlockStartMatch[1].trim();
        content = jsonBlockStartMatch[2];
        try {
          front = yaml.load(jsonBlock) || {};
        } catch {
          front = {};
          content = raw;
        }
      }

      if (Object.keys(front).length === 0) {
        const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
        if (fmMatch) {
          try {
            front = yaml.load(fmMatch[1]) || {};
          } catch {
            front = {};
          }
          content = raw.slice(fmMatch[0].length);
        }
      }

      const filename = path.basename(file, '.md');
      const slug = (front.slug && String(front.slug).trim()) || filename;
      const title = (front.title && String(front.title).trim()) || filename;

      let frontSummary = '';
      if (front && front.hasOwnProperty('summary')) {
        if (typeof front.summary === 'string') frontSummary = front.summary.trim();
        else if (front.summary === null || front.summary === undefined) frontSummary = '';
        else frontSummary = JSON.stringify(front.summary);
      }

      articles.push({ slug, title, frontSummary, content: content.trim() });
    } catch (err) {
      console.warn(`读取文件 ${file} 时出错：`, err.message || err);
    }
  }
  return articles;
}

function appendToLLMFile(articles) {
  const staticDir = path.join(__dirname, '..', 'static');
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }

  let appendContent = '';

  for (const article of articles) {
    if (article.slug && article.title) {
      const title = article.title.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
      const content = article.content || '';

      appendContent += `"""""\n\# [${title}](https://www.eallion.com/${article.slug}/)：\n\n${content}\n"""""\n\n`;
    }
  }

  let baseContent = '';
  try {
    if (fs.existsSync(DATA_BASE_FILE)) {
      baseContent = fs.readFileSync(DATA_BASE_FILE, 'utf-8');
    }
  } catch (e) {
    console.warn(`读取基线文件 ${DATA_BASE_FILE} 失败：`, e.message || e);
  }

  fs.writeFileSync(OUTPUT_FILE, baseContent + appendContent, 'utf-8');
  console.log(`已生成 ${OUTPUT_FILE}（基于 ${DATA_BASE_FILE}，追加 ${articles.length} 篇文章）`);
}

if (require.main === module) {
  try {
    console.log('从 content/blog/*.md 读取文章并生成 llms.txt...');
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
