require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { stringify } = require('smol-toml');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

const GHOST_API_URL = process.env.GHOST_ADMIN_API_URL || 'https://ghost.eallion.com';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

const IMAGE_STYLENAME = '!hugo.webp';
const KNOWN_CATEGORIES = new Set(['日志', '代码', '分享', '山贼', '精选', '演讲']);

const args = parseArgs();
function parseArgs() {
  const argv = process.argv.slice(2);
  const opts = { slug: '', limit: 0, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--slug' || argv[i] === '-s') opts.slug = argv[++i] || '';
    else if (argv[i] === '--limit' || argv[i] === '-n') opts.limit = parseInt(argv[++i]) || 0;
    else if (argv[i] === '--dry-run') opts.dryRun = true;
  }
  return opts;
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  bulletListMarker: '-'
}).use(gfm);

turndown.addRule('br', {
  filter: 'br',
  replacement: () => '<br>'
});

function cleanupMarkdown(md) {
  return md
    .replace(/%60/g, '`')
    .replace(/(https?:\/\/|[?&=])`([A-Z][A-Z0-9_]+)`/g, '$1{$2}')
    .replace(/`([A-Z][A-Z0-9_]+)`([\/?&])/g, '{$1}$2')
    .replace(
      /\[([^\]]*)\]\(%5B(https?:\/\/[^%]+)%5D\\\(https?:\/\/[^\s)]+\)\s*([^\s)]+)\)/g,
      (_m, text, url, extra) =>
        '[' + text + '](' + url.replace(/\/$/, '') + '/' + extra + ')'
    );
}

function restoreGhostRelativeUrls(content) {
  if (!content) return content;
  const urls = [
    GHOST_API_URL,
    process.env.GHOST_ADMIN_API_URL,
    'https://admin.eallion.com',
    'https://ghost.eallion.com'
  ].filter(Boolean);

  const uniqueUrls = [...new Set(urls.map(u => u.replace(/\/$/, '')))];
  let result = content;
  for (const u of uniqueUrls) {
    const escaped = u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escaped + '(?=/)', 'g'), '');
  }
  return result;
}

function addImageStylename(md) {
  const blocks = [];
  let result = md.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g, m => {
    blocks.push(m);
    return `\x00BLOCK${blocks.length - 1}\x00`;
  });

  result = result.replace(
    /https?:\/\/images\.eallion\.com\/[^\s)"'<>]+/g,
    url => url.endsWith(IMAGE_STYLENAME) ? url : url + IMAGE_STYLENAME
  );

  return result.replace(/\x00BLOCK(\d+)\x00/g, (_, i) => blocks[parseInt(i)]);
}

function parseLexical(lexical) {
  if (!lexical) return null;
  if (typeof lexical === 'object' && lexical !== null) {
    const keys = Object.keys(lexical);
    if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k)))) {
      const sorted = keys.sort((a, b) => parseInt(a) - parseInt(b));
      const jsonStr = sorted.map(k => lexical[k]).join('');
      try { return JSON.parse(jsonStr); } catch { return null; }
    }
    return lexical;
  }
  if (typeof lexical === 'string') {
    try { return JSON.parse(lexical); } catch { return null; }
  }
  return null;
}

function serializeInlineNode(node) {
  if (!node) return '';
  if (node.type === 'text') {
    let text = node.text || '';
    if (!text) return '';
    const format = node.format || 0;
    if (format & 16) text = `\`${text}\``;
    if (format & 1) text = `**${text}**`;
    if (format & 2) text = `*${text}*`;
    if (format & 4) text = `~~${text}~~`;
    if (format & 8) text = `<u>${text}</u>`;
    return text;
  }
  if (node.type === 'link') {
    const text = (node.children || []).map(serializeInlineNode).join('') || node.url || '';
    return `[${text}](${node.url || ''})`;
  }
  if (node.type === 'linebreak') {
    return '\n';
  }
  if (Array.isArray(node.children)) {
    return node.children.map(serializeInlineNode).join('');
  }
  return node.text || '';
}

function serializeLexicalNode(node) {
  if (!node) return '';

  switch (node.type) {
    case 'markdown':
      return node.markdown ? node.markdown.trimEnd() : '';

    case 'html':
      return node.html ? node.html.trim() : '';

    case 'code': {
      const lang = node.language || '';
      const code = node.code || '';
      const caption = node.caption ? `\n*${node.caption}*` : '';
      return '```' + lang + '\n' + code.trim() + '\n```' + caption;
    }

    case 'horizontalrule':
    case 'horizontal-rule':
    case 'divider':
      return '---';

    case 'image': {
      const alt = node.alt || node.caption || '';
      const caption = node.caption ? `\n*${node.caption}*` : '';
      return `![${alt}](${node.src})${caption}`;
    }

    case 'embed': {
      if (node.html) return node.html.trim();
      if (node.url) return `<iframe src="${node.url}" loading="lazy"></iframe>`;
      return '';
    }

    case 'callout': {
      const emoji = node.calloutEmoji ? `${node.calloutEmoji} ` : '';
      const text = (node.calloutText || '').split('\n').join('\n> ');
      return `> ${emoji}${text}`;
    }

    case 'toggle': {
      const heading = node.heading || '';
      const content = node.content || '';
      return `<details>\n<summary>${heading}</summary>\n\n${content}\n\n</details>`;
    }

    case 'button': {
      const url = node.buttonUrl || '#';
      const text = node.buttonText || 'Link';
      return `<p><a href="${url}" target="_blank" rel="noopener noreferrer" class="btn">${text}</a></p>`;
    }

    case 'audio': {
      const title = node.title ? `<p><strong>${node.title}</strong></p>\n` : '';
      return `${title}<audio controls src="${node.src}"></audio>`;
    }

    case 'video': {
      const caption = node.caption ? `\n*${node.caption}*` : '';
      return `<video controls src="${node.src}"></video>${caption}`;
    }

    case 'file': {
      const name = node.fileTitle || node.fileName || 'Attachment';
      return `[${name}](${node.src})`;
    }

    case 'bookmark': {
      const title = node.metadata?.title || node.caption || node.url;
      const desc = node.metadata?.description ? `\n> ${node.metadata.description}` : '';
      return `> [${title}](${node.url})${desc}`;
    }

    case 'heading': {
      const level = node.tag ? parseInt(node.tag.replace(/^h/i, '')) || 2 : 2;
      const text = (node.children || []).map(serializeInlineNode).join('').trim();
      return text ? `${'#'.repeat(level)} ${text}` : '';
    }

    case 'quote': {
      const text = (node.children || []).map(serializeInlineNode).join('').trim();
      return text ? `> ${text.split('\n').join('\n> ')}` : '';
    }

    case 'paragraph': {
      return (node.children || []).map(serializeInlineNode).join('').trim();
    }

    case 'list': {
      const isOrdered = node.listType === 'number';
      return (node.children || [])
        .map((item, idx) => {
          const prefix = isOrdered ? `${idx + 1}. ` : '- ';
          const content = (item.children || []).map(serializeInlineNode).join('').trim();
          return `${prefix}${content}`;
        })
        .join('\n');
    }

    default:
      if (Array.isArray(node.children) && node.children.length > 0) {
        return node.children.map(serializeInlineNode).join('').trim();
      }
      return '';
  }
}

function extractLexicalMarkdown(lexical) {
  const parsed = parseLexical(lexical);
  if (!parsed?.root?.children || parsed.root.children.length === 0) return null;

  const parts = [];
  for (const child of parsed.root.children) {
    const serialized = serializeLexicalNode(child);
    if (serialized && serialized.trim().length > 0) {
      parts.push(serialized.trim());
    }
  }

  return parts.length > 0 ? parts.join('\n\n') : null;
}

function generateToken() {
  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/'
  });
}

function buildFrontmatter(post) {
  const allTags = (post.tags || []).map(t => t.name);
  const categories = allTags.filter(t => KNOWN_CATEGORIES.has(t));
  const tags = allTags.filter(t => !KNOWN_CATEGORIES.has(t));

  return {
    slug: post.slug,
    title: post.title,
    draft: post.status === 'draft',
    date: post.published_at,
    summary: post.custom_excerpt || post.excerpt || '',
    description: post.meta_description || post.custom_excerpt || post.excerpt || '',
    tags,
    categories,
    image: post.feature_image || '',
    featured: post.featured || false,
    authors: ['eallion']
  };
}

async function fetchAllPosts() {
  let posts = [];
  let page = 1;

  while (true) {
    const url = `${GHOST_API_URL}/ghost/api/admin/posts/?limit=100&page=${page}&include=tags,authors&formats=html,lexical&filter=status:published`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Ghost ${generateToken()}` }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text.slice(0, 200)}`);
    }

    const data = await res.json();
    if (!data.posts || data.posts.length === 0) break;

    posts = posts.concat(data.posts);
    console.log(`  Page ${page}: ${data.posts.length} posts`);
    page++;
  }

  return posts;
}

async function main() {
  if (!GHOST_ADMIN_API_KEY) {
    console.error('Error: GHOST_ADMIN_API_KEY not set in .env.local');
    process.exit(1);
  }

  console.log('Fetching posts from Ghost...');
  let posts = await fetchAllPosts();
  if (args.slug) {
    const slugs = args.slug.split(',').map(s => s.trim());
    posts = posts.filter(p => slugs.includes(p.slug));
  }
  if (args.limit > 0) posts = posts.slice(0, args.limit);
  console.log(`Total: ${posts.length} posts\n`);

  if (args.dryRun) {
    for (const post of posts) {
      const fm = buildFrontmatter(post);
      const rawMd = extractLexicalMarkdown(post.lexical) || turndown.turndown(post.html || '');
      const markdown = addImageStylename(restoreGhostRelativeUrls(rawMd));
      console.log(`  ${post.slug}.md (${markdown.length} chars)`);
    }
    console.log(`\nDry-run: ${posts.length} posts would be written.`);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });

  const existing = new Set(fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')));

  let written = 0;
  for (const post of posts) {
    const fm = buildFrontmatter(post);
    const rawMd = extractLexicalMarkdown(post.lexical) || turndown.turndown(post.html || '');
    const markdown = addImageStylename(restoreGhostRelativeUrls(rawMd));

    const frontmatter = stringify(fm);
    const content = `+++\n${frontmatter}+++\n\n${markdown}\n`;

    const filePath = path.join(BLOG_DIR, `${post.slug}.md`);
    fs.writeFileSync(filePath, content, 'utf8');
    written++;
  }

  const currentSlugs = new Set(posts.map(p => `${p.slug}.md`));
  for (const file of existing) {
    if (!currentSlugs.has(file)) {
      fs.unlinkSync(path.join(BLOG_DIR, file));
      console.log(`  Removed stale: ${file}`);
    }
  }

  console.log(`\nDone! ${written} posts written.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
