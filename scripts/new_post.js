const { spawn, execSync } = require('child_process');
const fs = require('fs');
var today = new Date().toJSON().slice(0,10);
const exec = commands => {
  execSync(commands, { stdio: 'inherit', shell: true });
};
const spawnProcess = commands => {
  spawn(commands, { stdio: 'inherit', shell: true });
};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input your post title (CJK Available): ', title => {
  const filteredTitle = title.trim().replace(/ /g, '-');
  console.log(`Your new draft is located in \"example/blog/${filteredTitle}\"`);
  exec(`hugo new --kind post --contentDir example --quiet blog/${filteredTitle}/${filteredTitle}.md `);

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

  rl.close();
});
