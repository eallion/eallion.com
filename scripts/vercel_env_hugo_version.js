const axios = require('axios');
const fs = require('fs');

// 1. 定义函数获取 GitHub 最新 tag 的版本号
async function getLatestVersion() {
    const response = await axios.get('https://api.github.com/repos/gohugoio/hugo/releases/latest');

    const tag = response.data.tag_name;
    const latestVersion = tag.replace('v', '');

    return latestVersion;
  }


// 2. 获取最新版本号并将其保存到 vercel.json 文件中
async function updateVercelJson() {
  const latestVersion = await getLatestVersion();

  // 读取 vercel.json 文件
  const vercelJsonContent = fs.readFileSync('vercel.json', 'utf8');

  // 将 latestVersion 替换为 HUGO_VERSION 的值
  const updatedVercelJsonContent = vercelJsonContent.replace(/"HUGO_VERSION":\s*"\d+\.\d+.\d+"/, `"HUGO_VERSION": "${latestVersion}"`);

  // 将更新后的 vercel.json 文件保存
  fs.writeFileSync('vercel.json', updatedVercelJsonContent);

  console.log(`The latest version ${latestVersion} has been saved to vercel.json file.`);
}


// 3. 调用函数将最新版本号保存到 vercel.json 文件中
updateVercelJson();
