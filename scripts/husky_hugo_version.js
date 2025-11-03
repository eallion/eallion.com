const axios = require('axios');
const fs = require('fs');

// 1. 从 hugo-latest.txt 获取最新的 Hugo 版本号
async function getHugoVersions() {
    const url = 'https://raw.githubusercontent.com/nunocoracao/blowfish/refs/heads/main/release-versions/hugo-latest.txt';
    const response = await axios.get(url);
    const version = response.data.trim();

    if (!version) throw new Error('未获取到版本号');

    // 去掉版本号前的 'v' 前缀（如果存在）
    const cleanVersion = version.replace(/^v/, '');

    return {
        hugoVersion: cleanVersion
    };
}

// 2. 更新 module.toml
function updateModuleToml(versions) {
    const file = 'config/_default/module.toml';
    let content = fs.readFileSync(file, 'utf8');

    // 更新 Hugo 版本号
    content = content.replace(
        /(max\s*=\s*")([\d.]+)(")/,
        `$1${versions.hugoVersion}$3`
    );

    fs.writeFileSync(file, content);
}

// 3. 更新 vercel.json
function updateVercelJson(version) {
    const file = 'vercel.json';
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(
        /(\s*)"HUGO_VERSION":\s*"\d+\.\d+\.\d+"/,
        `$1"HUGO_VERSION": "${version}"`
    );
    fs.writeFileSync(file, updated);
}

// 4. 更新 .cnb.yml
function updateCnbYml(version) {
    const file = '.cnb.yml';
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(
        /(\s*)image:\s*hugomods\/hugo:base-\d+\.\d+\.\d+/,
        `$1image: hugomods/hugo:base-${version}`
    );
    fs.writeFileSync(file, updated);
}

// 5. 更新 wrangler.toml
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

// 6. 更新 .github/workflows/main.yml
function updateGithubWorkflow(version) {
    const file = '.github/workflows/main.yml';
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(
        /(\s*hugo-version:\s*')[^']+(')/g,
        `$1${version}$2`
    );
    fs.writeFileSync(file, updated);
}

// 7. 主流程
(async () => {
    const versions = await getHugoVersions();
    updateModuleToml(versions);
    updateVercelJson(versions.hugoVersion);
    updateCnbYml(versions.hugoVersion);
    updateWranglerToml(versions.hugoVersion);
    updateGithubWorkflow(versions.hugoVersion);
    console.log(`已将 Hugo 版本更新为 ${versions.hugoVersion}`);
})();
