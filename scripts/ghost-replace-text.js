require('dotenv').config({ path: '.env.local' });

const jwt = require('jsonwebtoken');
const readline = require('readline');

const GHOST_API_URL = process.env.GHOST_ADMIN_API_URL || 'https://ghost.eallion.com';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;

const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('--dryrun');
const CONFIRMED = process.argv.includes('--confirm') || process.argv.includes('--force');

let RL = null;
function getRL() {
  if (!RL) RL = readline.createInterface({ input: process.stdin, output: process.stdout });
  return RL;
}

function prompt(query) {
  return new Promise(resolve => getRL().question(query, resolve));
}

async function askYesNo(question, defaultVal = 'y') {
  const hint = defaultVal === 'y' ? 'Y/n' : 'y/N';
  const answer = await prompt(`${question} (${hint}) `);
  const trimmed = answer.trim().toLowerCase();
  if (!trimmed) return defaultVal === 'y';
  return trimmed === 'y' || trimmed === 'yes';
}

function generateToken() {
  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/'
  });
}

function parseLexical(lexical) {
  if (!lexical) return null;
  if (typeof lexical === 'string') {
    try {
      lexical = JSON.parse(lexical);
    } catch {
      return null;
    }
  }
  if (typeof lexical === 'object' && lexical !== null) {
    const keys = Object.keys(lexical);
    if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k)))) {
      const sorted = keys.sort((a, b) => parseInt(a) - parseInt(b));
      const jsonStr = sorted.map(k => lexical[k]).join('');
      try { return JSON.parse(jsonStr); } catch { return null; }
    }
    return lexical;
  }
  return null;
}

function replaceInText(text, find, replace) {
  if (!text || typeof text !== 'string') return text;
  return text.split(find).join(replace);
}

function replaceInMarkdown(markdown, find, replace, skipFence) {
  if (!skipFence) return replaceInText(markdown, find, replace);
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  const result = [];
  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }
    result.push(line.split(find).join(replace));
  }
  return result.join('\n');
}

function walkAndReplace(node, find, replace, opts) {
  if (!node || typeof node !== 'object') return;

  if (opts.skipCodeBlock && (node.type === 'code-block' || node.type === 'code')) {
    return;
  }

  if (node.type === 'markdown' && node.markdown) {
    node.markdown = replaceInMarkdown(node.markdown, find, replace, opts.skipFence);
    return;
  }

  if (node.type === 'text' && node.text) {
    node.text = replaceInText(node.text, find, replace);
  }

  if (node.url && !opts.skipUrl) {
    node.url = replaceInText(node.url, find, replace);
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walkAndReplace(child, find, replace, opts);
    }
  }
}

async function fetchAll(type, find, replace, opts) {
  let page = 1;
  let foundIn = 0;

  while (true) {
    const url = `${GHOST_API_URL}/ghost/api/admin/${type}/?limit=100&page=${page}&formats=html,lexical&filter=status:published`;
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

    for (const item of list) {
      const parsed = parseLexical(item.lexical);
      if (!parsed?.root?.children) continue;

      const before = JSON.stringify(parsed);
      // Start recursion from root.children — the lexical tree root
      for (const child of parsed.root.children) {
        walkAndReplace(child, find, replace, opts);
      }
      const after = JSON.stringify(parsed);

      if (before !== after) {
        foundIn++;
        if (!DRY_RUN) {
          const putUrl = `${GHOST_API_URL}/ghost/api/admin/${type}/${item.id}/`;
          const putRes = await fetch(putUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Ghost ${generateToken()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              [type]: [{
                lexical: JSON.stringify(parsed),
                mobiledoc: null,
                updated_at: item.updated_at
              }]
            })
          });
          if (!putRes.ok) {
            const errText = await putRes.text();
            console.error(`  ✗ 失败: ${item.slug} (${errText.slice(0, 300)})`);
          } else {
            process.stdout.write(`  ✓`);
          }
        }
      }
    }

    process.stdout.write(`  ${type} 第${page}页: ${list.length} 篇, ${foundIn} 篇已修改\n`);
    page++;
  }

  return foundIn;
}

function getArg(flag, short) {
  const idx = process.argv.indexOf(flag);
  const idx2 = short ? process.argv.indexOf(short) : -1;
  const found = idx !== -1 ? idx : idx2;
  if (found !== -1 && found + 1 < process.argv.length) return process.argv[found + 1];
  return null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

async function main() {
  const argsGiven = hasFlag('--find') || hasFlag('-f') || hasFlag('--replace') || hasFlag('-r');

  if (process.argv.length <= 2 && !argsGiven) {
    console.log('');
    console.log('  用法: node scripts/ghost-replace-text.js [options]');
    console.log('');
    console.log('  必选:');
    console.log('    --find, -f <text>     查找文本');
    console.log('    --replace, -r <text>  替换文本');
    console.log('    --confirm             确认执行');
    console.log('');
    console.log('  可选:');
    console.log('    --dry-run             预览模式，不写入');
    console.log('    --scope <s>           范围: posts|pages|all (默认: all)');
    console.log('    --skip-fence          跳过 ``` 围栏代码块 (默认: true)');
    console.log('    --no-skip-fence       不跳过围栏代码块');
    console.log('    --skip-code-block     跳过 code-block 节点 (默认: true)');
    console.log('    --no-skip-code-block  不跳过 code-block');
    console.log('    --skip-url            跳过 URL 字段 (默认: false)');
    console.log('    --no-skip-url         不跳过 URL 字段');
    console.log('');
    console.log('  交互模式 (省略 --find):');
    console.log('    node scripts/ghost-replace-text.js --confirm');
    console.log('');
    console.log('  非交互模式:');
    console.log('    node scripts/ghost-replace-text.js --find "images.eallion.com" --replace "cdn.example.com" --confirm');
    console.log('');
    return;
  }

  if (!GHOST_ADMIN_API_KEY) {
    console.error('错误: 未设置 GHOST_ADMIN_API_KEY，请检查 .env.local');
    process.exit(1);
  }

  if (argsGiven) {
    // CLI mode
    const skipFence = hasFlag('--skip-fence') ? true : hasFlag('--no-skip-fence') ? false : true;
    const skipCodeBlock = hasFlag('--skip-code-block') ? true : hasFlag('--no-skip-code-block') ? false : true;
    const skipUrl = hasFlag('--skip-url') ? true : hasFlag('--no-skip-url') ? false : false;
    const opts = { skipFence, skipCodeBlock, skipUrl };

    const scopeArg = getArg('--scope') || 'all';
    const processPosts = scopeArg === 'posts' || scopeArg === 'all';
    const processPages = scopeArg === 'pages' || scopeArg === 'all';

    const findText = getArg('--find', '-f');
    if (!findText) { console.error('错误: 请提供 --find 参数'); process.exit(1); }

    const replaceText = getArg('--replace', '-r') || '';

    console.log(`  保护: fence=${skipFence}, code-block=${skipCodeBlock}, skip-url=${skipUrl}`);
    console.log(`  范围: ${scopeArg}`);
    console.log(`  查找: "${findText}" → "${replaceText}"\n`);

    let totalFound = 0;
    if (processPosts) {
      console.log('获取文章中...');
      totalFound += await fetchAll('posts', findText, replaceText, opts);
    }
    if (processPages) {
      console.log('\n获取页面中...');
      totalFound += await fetchAll('pages', findText, replaceText, opts);
    }

    console.log(`\n=== 完成 ===`);
    console.log(`共修改: ${totalFound} 篇`);
    if (DRY_RUN) console.log('\n预览模式已完成。加 --confirm 执行写入。');
    return;
  }

  // Interactive mode
  console.log('--- 保护选项 ---\n');

  const skipFence = await askYesNo('跳过 ``` 围栏代码块？', 'y');
  const skipCodeBlock = await askYesNo('跳过行内 `code` 和代码块节点？', 'y');
  const skipUrl = await askYesNo('跳过 URL 链接字段？', 'n');

  const opts = { skipFence, skipCodeBlock, skipUrl };

  console.log('\n--- 替换范围 ---\n');

  const scopeAnswer = await prompt('处理内容: 1=仅文章, 2=仅页面, 3=全部 (默认 3) ');
  const scope = scopeAnswer.trim() || '3';
  const processPosts = scope === '1' || scope === '3';
  const processPages = scope === '2' || scope === '3';

  console.log('\n--- 查找替换 ---\n');

  const findText = await prompt('输入要查找的文本: ');
  if (!findText) {
    console.error('错误: 查找文本不能为空。');
    process.exit(1);
  }

  const replaceText = await prompt('输入替换文本: ');

  console.log(`\n  保护: fence=${skipFence}, code-block=${skipCodeBlock}, skip-url=${skipUrl}`);
  console.log(`  范围: ${processPosts && processPages ? '文章 + 页面' : processPosts ? '仅文章' : '仅页面'}`);
  console.log(`  查找: "${findText}" → "${replaceText}"\n`);

  let totalFound = 0;

  if (processPosts) {
    console.log('获取文章中...');
    totalFound += await fetchAll('posts', findText, replaceText, opts);
  }

  if (processPages) {
    console.log('\n获取页面中...');
    totalFound += await fetchAll('pages', findText, replaceText, opts);
  }

  console.log(`\n=== 完成 ===`);
  console.log(`共修改: ${totalFound} 篇`);

  if (DRY_RUN) {
    console.log('\n预览模式已完成。加 --confirm 执行写入。');
  }

  RL?.close();
}

main().catch(err => {
  console.error('错误:', err.message);
  process.exit(1);
});
