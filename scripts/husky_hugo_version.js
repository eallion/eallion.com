const axios = require('axios');
const fs = require('fs');

// 1. 获取 config.toml 的内容并提取 max 版本号
async function getMaxHugoVersion() {
    const url = 'https://raw.githubusercontent.com/nunocoracao/blowfish/refs/heads/main/config.toml';
    const response = await axios.get(url);
    const toml = response.data;

    const match = toml.match(/max\s*=\s*"([\d.]+)"/);
    if (!match) throw new Error('未找到 max 版本号');
    return match[1];
}

// 2. 更新 vercel.json
function updateVercelJson(version) {
    const file = 'vercel.json';
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(
        /(\s*)"HUGO_VERSION":\s*"\d+\.\d+\.\d+"/,
        `$1"HUGO_VERSION": "${version}"`
    );
    fs.writeFileSync(file, updated);
}

// 3. 更新 .cnb.yml
function updateCnbYml(version) {
    const file = '.cnb.yml';
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(
        /(\s*)image:\s*hugomods\/hugo:base-\d+\.\d+\.\d+/,
        `$1image: hugomods/hugo:base-${version}`
    );
    fs.writeFileSync(file, updated);
}

// 4. 更新 wrangler.toml
function updateWranglerToml(version) {
    const file = 'wrangler.toml';
    const content = fs.readFileSync(file, 'utf8');
    const vVersion = `v${version}`;
    const updated = content.replace(
        /(\s*)HUGO_VERSION\s*=\s*"(v?\d+\.\d+\.\d+)"/g,
        `$1HUGO_VERSION = "${vVersion}"`
    );
    fs.writeFileSync(file, updated);
}

// 5. 更新 .github/workflows/main.yml
function updateGithubWorkflow(version) {
    const file = '.github/workflows/main.yml';
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(
        /(\s*hugo-version:\s*')[^']+(')/g,
        `$1${version}$2`
    );
    fs.writeFileSync(file, updated);
}

// 6. 主流程
(async () => {
    const version = await getMaxHugoVersion();
    updateVercelJson(version);
    updateCnbYml(version);
    updateWranglerToml(version);
    updateGithubWorkflow(version);
    console.log(`已将 Hugo 版本号更新为 ${version}`);
})();
