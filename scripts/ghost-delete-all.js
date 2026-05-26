require('dotenv').config({ path: '.env.local' });

const jwt = require('jsonwebtoken');

const GHOST_API_URL = process.env.GHOST_ADMIN_API_URL || 'https://ghost.eallion.com';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;

const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('--dryrun');
const CONFIRMED = process.argv.includes('--confirm') || process.argv.includes('--force');

function generateToken() {
  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/'
  });
}

async function fetchAll(type) {
  const items = [];
  let page = 1;

  while (true) {
    const url = `${GHOST_API_URL}/ghost/api/admin/${type}/?limit=100&page=${page}&filter=status:published`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Ghost ${generateToken()}` }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Fetch ${type} error (${res.status}): ${text.slice(0, 200)}`);
    }

    const data = await res.json();
    const list = data[type] || [];
    if (list.length === 0) break;

    items.push(...list);
    console.log(`  Page ${page}: ${list.length} ${type}`);
    page++;
  }

  return items;
}

async function deleteItem(type, id, slug) {
  const url = `${GHOST_API_URL}/ghost/api/admin/${type}/${id}/`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Authorization': `Ghost ${generateToken()}` }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`  FAILED: ${slug} (${text.slice(0, 100)})`);
    return false;
  }
  return true;
}

async function main() {
  if (!GHOST_ADMIN_API_KEY) {
    console.error('Error: GHOST_ADMIN_API_KEY not set in .env.local');
    process.exit(1);
  }

  console.log('Fetching published posts...');
  const posts = await fetchAll('posts');
  console.log(`\nTotal published posts: ${posts.length}`);
  console.log('Sample slugs:');
  posts.slice(0, 5).forEach(p => console.log(`  - ${p.slug} (${p.title})`));

  console.log('\nFetching published pages...');
  const pages = await fetchAll('pages');
  console.log(`\nTotal published pages: ${pages.length}`);
  pages.forEach(p => console.log(`  - ${p.slug} (${p.title})`));

  const total = posts.length + pages.length;
  console.log(`\nTotal to delete: ${total} items`);

  if (total === 0) {
    console.log('Nothing to delete.');
    return;
  }

  if (!DRY_RUN && !CONFIRMED) {
    console.log('\n⚠ WARNING: This will delete ALL published posts and pages!');
    console.log('Run with --dry-run first to preview, then add --confirm to execute.');
    console.log('Example: node scripts/ghost-delete-all.js --confirm\n');
    return;
  }

  if (DRY_RUN) {
    console.log('\nDRY RUN: No deletions performed. Run without --dry-run to execute.');
    return;
  }

  console.log(`\nDeleting ${posts.length} posts...`);
  let success = 0;
  let fail = 0;

  for (const post of posts) {
    const ok = await deleteItem('posts', post.id, post.slug);
    if (ok) success++; else fail++;
    if ((success + fail) % 20 === 0 || ok === false) {
      process.stdout.write(`\r  Progress: ${success + fail}/${posts.length} (${success} OK, ${fail} failed)`);
    }
  }
  console.log(`\n  Posts done: ${success} deleted, ${fail} failed`);

  console.log(`\nDeleting ${pages.length} pages...`);
  for (const page of pages) {
    const ok = await deleteItem('pages', page.id, page.slug);
    if (ok) success++; else fail++;
    process.stdout.write(`\r  Progress: ${success + fail - posts.length}/${pages.length}`);
  }
  console.log(`\n  Pages done.`);

  console.log(`\n=== Done ===`);
  console.log(`Total deleted: ${success}, Failed: ${fail}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
