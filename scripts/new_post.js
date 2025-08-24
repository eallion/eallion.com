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
		const url = "https://api.interpreter.caiyunai.com/v1/translator";
		const token = process.env.CAIYUN_TOKEN || '3975l6lr5pcbvidl6jl2'; // 使用环境变量中的 token，如果没有则使用公共 token

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

	const generateSlug = async (text) => {
		const translationResult = await translateText(text, "auto2en");
		if (translationResult.translated) {
			return translationResult.text.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
		}
		return text.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
	};

	const updateFrontMatter = (filePath, title) => {
		const content = fs.readFileSync(filePath, 'utf8');
		const lines = content.split('\n');
		let inFrontMatter = false;
		const newLines = lines.map(line => {
			if (line.trim() === '---') {
				inFrontMatter = !inFrontMatter;
				return line;
			}
			if (inFrontMatter && line.startsWith('title:')) {
				return `title: "${title}"`;
			}
			return line;
		});
		fs.writeFileSync(filePath, newLines.join('\n'));
	};

	// 首先用原始标题创建文章
	const sanitizedTitle = title.trim().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-');
	const tempDir = `example/blog/${sanitizedTitle}`;

	// 使用原始标题创建文章
	exec(`hugo new --kind post --contentDir example --quiet blog/${sanitizedTitle}/index.md`);

	// 更新 front matter 中的标题
	updateFrontMatter(`${tempDir}/index.md`, title);

	// 生成翻译后的 slug
	const slug = await generateSlug(title);

	// 如果生成的 slug 与原始标题不同，进行重命名
	if (sanitizedTitle !== slug) {
		const targetDir = `example/blog/${slug}`;

		// 确保目标目录不存在
		if (fs.existsSync(targetDir)) {
			fs.rmSync(targetDir, { recursive: true, force: true });
		}

		// 重命名目录
		fs.renameSync(tempDir, targetDir);
		console.log(`Your new draft is located in "example/blog/${slug}"`);
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
