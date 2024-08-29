const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const exec = commands => {
  execSync(commands, { stdio: 'inherit', shell: true });
};

const spawnProcess = commands => {
  spawn(commands, { stdio: 'inherit', shell: true });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input your post title (CJK Available): ', async title => {
  const translateText = async (source, direction) => {
    const url = "http://api.interpreter.caiyunai.com/v1/translator";
    const token = process.env.CAIYUN_TOKEN;

    if (!token) {
      console.warn('No token provided for translation. Skipping translation.');
      return { translated: false, text: source };
    }

    const payload = {
      source: source,
      trans_type: direction,
      request_id: "demo",
      detect: true,
    };

    const headers = {
      "content-type": "application/json",
      "x-authorization": "token " + token,
    };

    try {
      const response = await axios.post(url, payload, { headers: headers });
      return { translated: true, text: response.data.target };
    } catch (error) {
      console.error('Translation failed:', error.message);
      return { translated: false, text: source };
    }
  };

  const parseFrontMatter = (content) => {
    const lines = content.split('\n');
    const frontMatter = {};
    let inFrontMatter = false;

    lines.forEach(line => {
      if (line.trim() === '---') {
        inFrontMatter = !inFrontMatter;
      } else if (inFrontMatter) {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value) {
          frontMatter[key] = value;
        }
      }
    });

    return frontMatter;
  };

  const getOldestPost = (dir, excludeDirs) => {
    const directories = fs.readdirSync(dir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !excludeDirs.includes(dirent.name))
      .map(dirent => dirent.name);

    let oldestDate = new Date();
    let oldestDir = null;

    directories.forEach(directory => {
      const filePath = path.join(dir, directory, 'index.md');
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontMatter = parseFrontMatter(content);
        if (frontMatter.date) {
          const date = new Date(frontMatter.date);
          if (date < oldestDate) {
            oldestDate = date;
            oldestDir = directory;
          }
        }
      }
    });

    return oldestDir;
  };

  const translationResult = await translateText(title, "auto2en");
  const translatedTitle = translationResult.text;
  const filteredTitle = translationResult.translated ? translatedTitle.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : translatedTitle;
  console.log(`Your new draft is located in "example/blog/${filteredTitle}"`);
  exec(`hugo new --kind post --contentDir example --quiet blog/${filteredTitle}/${filteredTitle}.md`);

  // 创建目录和文件
  const targetDir = `example/blog/${filteredTitle}`;
  const oldFile = `${targetDir}/${filteredTitle}.md`;
  const newFile = `${targetDir}/index.md`;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  if (!fs.existsSync(newFile)) {
    fs.writeFileSync(newFile, '');
  }

  // 重命名文件
  if (fs.existsSync(oldFile)) {
    fs.renameSync(oldFile, newFile);
  }

  // 删除最老的一篇文章所在的目录
  const blogDir = 'example/blog';
  const excludeDirs = ['en', 'doudou', 'markdown-syntax']; // 添加更多要排除的目录
  const oldestPostDir = getOldestPost(blogDir, excludeDirs);
  if (oldestPostDir && !excludeDirs.includes(oldestPostDir)) {
    const oldestDirPath = path.join(blogDir, oldestPostDir);
    fs.rmSync(oldestDirPath, { recursive: true, force: true });
    console.log(`Deleted oldest post directory: ${oldestDirPath}`);
  }

  rl.close();
});
