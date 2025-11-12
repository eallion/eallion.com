const { spawn, execSync } = require('child_process');
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
  console.log(`Your new post is in \"example/posts\": ${today}-${filteredTitle}.md`);
  exec(`hugo new --kind post --contentDir example --quiet posts/${filteredTitle}.md `);
  rl.close();
});
