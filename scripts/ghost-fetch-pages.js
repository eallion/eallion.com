require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { stringify } = require('smol-toml');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

const IMAGE_STYLENAME = '!hugo.webp';
const GHOST_API_URL = process.env.GHOST_ADMIN_API_URL || 'https://ghost.eallion.com';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const CONTENT_DIR = path.join(__dirname, '..', 'content');

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
    .replace(/\[([^\]]*)\]\(%5B(https?:\/\/[^%]+)%5D\\\(https?:\/\/[^\s)]+\)\s*([^\s)]+)\)/g, (_m, text, url, extra) =>
      '[' + text + '](' + url.replace(/\/$/, '') + '/' + extra + ')'
    );
}

const SPECIAL_LAYOUTS = {
  about: 'single',
  copyright: 'copyright',
  links: 'links',
  'privacy-policy': 'privacy-policy',
  mastodon: 'mastodon',
  milestone: 'timeline',
  stats: 'stats'
};

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

function buildFrontmatter(page) {
  const layout = SPECIAL_LAYOUTS[page.slug] || 'single';

  return {
    slug: page.slug,
    title: page.title,
    type: 'page',
    draft: page.status === 'draft',
    date: page.published_at,
    layout,
    authors: 'eallion'
  };
}

async function fetchAllPages() {
  let pages = [];
  let page = 1;

  while (true) {
    const url = `${GHOST_API_URL}/ghost/api/admin/pages/?limit=100&page=${page}&formats=html,lexical&filter=status:published`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Ghost ${generateToken()}` }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text.slice(0, 200)}`);
    }

    const data = await res.json();
    if (!data.pages || data.pages.length === 0) break;

    pages = pages.concat(data.pages);
    console.log(`  Page ${page}: ${data.pages.length} pages`);
    page++;
  }

  return pages;
}

async function main() {
  if (!GHOST_ADMIN_API_KEY) {
    console.error('Error: GHOST_ADMIN_API_KEY not set in .env.local');
    process.exit(1);
  }

  console.log('Fetching pages from Ghost...');
  let pages = await fetchAllPages();
  if (args.slug) {
    const slugs = args.slug.split(',').map(s => s.trim());
    pages = pages.filter(p => slugs.includes(p.slug));
  }
  if (args.limit > 0) pages = pages.slice(0, args.limit);
  console.log(`Total: ${pages.length} pages\n`);

  if (args.dryRun) {
    for (const page of pages) {
      const markdown = addImageStylename(extractLexicalMarkdown(page.lexical) || turndown.turndown(page.html || ''));
      console.log(`  ${page.slug}/index.md (${markdown.length} chars)`);
    }
    console.log(`\nDry-run: ${pages.length} pages would be written.`);
    return;
  }

  for (const page of pages) {
    const fm = buildFrontmatter(page);
    const markdown = addImageStylename(extractLexicalMarkdown(page.lexical) || turndown.turndown(page.html || ''));

    const frontmatter = stringify(fm);
    const content = `+++\n${frontmatter}+++\n\n${markdown}\n`;

    const dir = path.join(CONTENT_DIR, page.slug);
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, 'index.md');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ${page.slug}/index.md`);
  }

  console.log(`\nDone! ${pages.length} pages written.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
