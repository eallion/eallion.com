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

const KNOWN_CATEGORIES = new Set(['日志', '代码', '分享', '山贼', '精选', '演讲']);

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

function extractLexicalMarkdown(lexical) {
  const parsed = parseLexical(lexical);
  if (!parsed?.root?.children) return null;
  const first = parsed.root.children[0];
  if (first?.type === 'markdown' && first.markdown) {
    return first.markdown;
  }
  return null;
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
  const posts = await fetchAllPosts();
  console.log(`Total: ${posts.length} posts\n`);

  fs.mkdirSync(BLOG_DIR, { recursive: true });

  const existing = new Set(fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')));

  let written = 0;
  for (const post of posts) {
    const fm = buildFrontmatter(post);
    const markdown = extractLexicalMarkdown(post.lexical) || turndown.turndown(post.html || '');

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
