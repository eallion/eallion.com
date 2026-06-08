<h1 align="center">A Hugo blog about Charles 'eallion' Chin</h1>

<p align="center">Chance favors the prepared mind.</p>

<p align="center">
    <img src="static/eallion.png" height=96>
</p>

<div align="center">

[![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/eallion/eallion.com)

</div>

<div align="center">

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_shield) ![GitHub repo size](https://img.shields.io/github/repo-size/eallion/eallion.com) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/eallion/eallion.com) ![GitHub commits since tagged version](https://img.shields.io/github/commits-since/eallion/eallion.com/v6.0.2/main) ![GitHub last commit](https://img.shields.io/github/last-commit/eallion/eallion.com) [![Better Uptime Badge](https://status.eallion.com/api/badge/2/uptime/168)](https://status.eallion.com/)

</div>

<div align="center">

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallion.s+blog@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallion.s+blog@gmail.com&logoColor=fff&style=flat)](mailto:eallion.s+blog@gmail.com) <a href="https://keyoxide.org/E685DDDDDDDDDDDD" target="_blank" rel="noopener noreferrer">
    <img class="nozoom" src="https://img.shields.io/badge/E685DDDDDDDDDDDD-blue?label=GPG&logoColor=fff&style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTYuMTQgMmMtNi43Ni4wNS05LjMgNi4yNy05LjM0IDcuN3Y1LjlINS4zNXYxNC4yNWgyMS4xOVYxNS41OWgtMS40MlY5Ljc4aC0uMDRjLS4wNy0uMzYtMS42OS03LjgzLTguOTUtNy43OHptLS4yIDQuMjJhNC43NSA0Ljc1IDAgMCAxIDQuNTkgMy41NnY1LjgxaC05LjJWOS44YTQuNzUgNC43NSAwIDAgMSA0LjYtMy41N3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUuNiAzLjJhNy42NSA3LjY1IDAgMCAwLTMuMjUuNzdjLTMuNDggMS43LTMuODggNS42Ni0zLjg4IDUuNjZjMy40NS03LjA1IDguMy02LjA3IDExLjEtNS42M2MwIDAtMS43NC0uODQtMy45OC0uOHptMTEuMTIgMTIuMjFzLTEuNC0uMDItMS42My4xYy0yLjcgMS40LTMuMjYgMS44NC01LjAzIDIuMmMtNS4wMSAxLTguMDQuNzEtMTAuNTIgMS42MmMtMS45LjctNC4yNiAzLjMzLTQuMjYgMy4zM0w1LjMyIDMwbDMuMzUtLjFzLjg4LS43IDEuOTctLjc5YzAgMCAxMC40LjY0IDEzLjIyLTQuMDNjMCAwLTUuMDMgMi41Mi0xMS4yMi44M2MwIDAgMTAuNjcuMzIgMTMuNjgtNi4wN2MtMS4zLjItNC40NyAzLjI4LTEwLjQyIDIuNDhjLjU4LjAzIDcuNjItMS43OCAxMC43LTUuMDJ6Ii8+PC9zdmc+">
  </a>
</div>

<div align="center">

✨ Live Preview：<https://www.eallion.com> ✨

</div>

<div align="center">

  <img src="assets/images/github/blog-flow.png">
</div>

# 备忘录

### 📦️ 主仓库

> <https://github.com/eallion/eallion.com>

##### 备份仓库

> <https://gitlab.com/eallion/eallion.com>  
> <https://codeberg.org/eallion/eallion.com>  
> <https://git.eallion.com/eallion/eallion.com>

##### 添加备份仓库 Remote

> [!TIP]
> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```bash
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git

$ git remote -v
origin	git@github.com:eallion/eallion.com.git (fetch)
origin	git@github.com:eallion/eallion.com.git (push)
origin	git@gitlab.com:eallion/eallion.com.git (push)
origin	git@codeberg.org:eallion/eallion.com.git (push)
origin	git@git.eallion.com:eallion/eallion.com.git (push)
```

##### 架构备忘

- 国内、境外：统一部署至腾讯云 [EdgeOne Pages](https://edgeone.ai/)

---

## Content Pipeline

```txt
Ghost Admin API → ghost-fetch-*.js → Markdown (content/blog/) → Hugo → Pagefind → Deploy
```

- **Ghost 6** 作为 Headless CMS 管理文章内容
- `scripts/ghost-fetch-posts.js` 通过 Admin API 拉取文章，转换为 Hugo Markdown
- `scripts/ghost-fetch-pages.js` 拉取页面（about、links、stats 等）
- `scripts/fetch-stats.js` 聚合外部 API 数据（Mastodon、Steam、NeoDB、Penta、GitHub）
- `scripts/generate-llms.js` 生成 `LLMs.txt` 供 AI 工具使用
- **Hugo** 构建静态站点，**Pagefind** 构建搜索索引

---

## pnpm 命令

```bash
# 完整构建
pnpm build

# 仅拉取 Ghost 内容 + 构建
pnpm run fetch:ghost && pnpm run gen:llms && pnpm run build:hugo && pnpm run build:pagefind
```

### Ghost 内容拉取

```bash
# 拉取所有文章+页面+统计数据
pnpm run fetch:ghost

# 仅文章
pnpm run fetch:ghost:posts

# 仅页面
pnpm run fetch:ghost:pages

# 仅统计数据
pnpm run fetch:stats
```

两个抓取脚本支持 CLI 参数：

```bash
node scripts/ghost-fetch-posts.js --slug=chrome-extensions,italians --dry-run
node scripts/ghost-fetch-posts.js --limit=3
node scripts/ghost-fetch-pages.js --slug=about --dry-run
```

| 参数          | 简写     | 说明                       |
| ------------- | -------- | -------------------------- |
| `--slug <s>`  | `-s <s>` | 按 slug 过滤，逗号分隔多个 |
| `--limit <n>` | `-n <n>` | 限制获取数量               |
| `--dry-run`   | —        | 仅预览，不写文件           |

### 构建步骤

```bash
# TailwindCSS
pnpm build:css

# Chroma 代码高亮 CSS
pnpm build:chroma

# Hugo 静态站点
pnpm build:hugo

# Pagefind 搜索索引
pnpm build:pagefind

# LLMs.txt
pnpm gen:llms
```

### 开发

```bash
# Tailwind 监听 + Hugo server
pnpm dev

# 本地搜索预览
pnpm dev:pagefind
```

### 清理

```bash
pnpm clean
```

### 主题管理

```bash
# 首次初始化子模块
pnpm theme:init

# 更新子模块
pnpm theme:update
```

---

## Ghost API 细节

- **必须使用 Admin API**（非 Content API）—— 导入的文章 `visibility: paid`，Content API 不返回正文
- 分页：`?page=N&limit=50`，响应含 `meta.pagination`
- 格式：`?formats=html,lexical`，同时拉取 HTML 和 Lexical JSON
- Lexical Markdown card：`{ root: { children: [{ type: 'markdown', version: 1, markdown: "..." }] } }`
- 脚本自动处理 Lexical 扁平索引和 Markdown card 提取，回退到 Turndown HTML→Markdown 转换

---

## 主题 Pehe

博客使用主题 [Pehe](https://github.com/eallion/pehe)，通过 `git submodule` 引入。

- Tailwind CSS 入口：`assets/css/input.css`
- 自定义样式：`assets/css/custom.css`
- 代码高亮：`assets/css/chroma.css`（`pnpm build:chroma` 生成）
- 自定义模板：`layouts/_default/`（嘀咕页、统计页等）
- 页面数据：`assets/data/`（书影音、友情链接等）

---

## 嘀咕页面

嘀咕页面 [`/mastodon`](https://www.eallion.com/mastodon/) 展示 Mastodon 个人实例 [`e5n.cc/@eallion`](https://e5n.cc/@eallion) 的数据。

博客评论系统也基于 Mastodon，通过 Mastodon API 拉取嘟文回复作为文章评论。

---

## 写新文章

在 **Ghost 后台** 撰写文章，保存发布后运行：

```bash
pnpm run fetch:ghost:posts
# 或完整构建
pnpm build
```

抓取脚本会从 Ghost Admin API 拉取文章，自动处理 Lexical Markdown 转换，并给 CDN 图片 URL 追加 stylename（`!hugo.webp`，代码块内不处理）。

---

## 环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

| 变量                  | 说明                 |
| --------------------- | -------------------- |
| `GHOST_ADMIN_API_KEY` | Ghost Admin API 密钥 |
| `GHOST_ADMIN_API_URL` | Ghost API 地址       |
| `STEAM_WEB_API_KEY`   | Steam API 密钥       |
| `NEODB_ACCESS_TOKEN`  | NeoDB API 访问令牌   |
| `DEEPSEEK_API_KEY`    | DeepSeek API 密钥    |

---

## 图片

### 文章题图

通过 Ghost 后台的图片上传功能上传，文章中直接引用图片 CDN URL。如果没有设置题图，可在 `config/params.toml` 中提供默认图片。

### 文章配图

- **图床**：先上传到图床，获取 URL 后插入文章内容

---

## 构建 Chroma CSS

```bash
pnpm build:chroma
```

等同于：

```bash
hugo gen chromastyles --style=github | sed 's/\./html:not(.dark) ./' >> assets/css/chroma.css
hugo gen chromastyles --style=github-dark | sed 's/\./html.dark ./' >> assets/css/chroma.css
```

---

## License

This project is licensed under [GLWTPL](https://github.com/me-shaon/GLWTPL/blob/master/translations/LICENSE_zh-CN)  
Hugo is licensed under [Apache License 2.0](https://github.com/gohugoio/hugo/blob/master/LICENSE)  
Theme Pehe is licensed under [MIT](https://github.com/eallion/pehe/blob/main/LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_large)

```txt
GLWT（Good Luck With That，祝你好运）公共许可证
            版权所有© 除作者外的所有人

任何人都被允许复制、分发、修改、合并、销售、出版、再授权
或任何其它行为，但风险自负。

作者对这个项目中的代码的行为一无所知。
代码处于可用或不可用状态，没有第三种可能

                祝你好运公共许可证
            复制、分发和修改的条款和条件

  0. 只要你永远不要留下任何可以追踪到原作者的线索，
你就可以随心所欲地做任何事，因此，不能因此责怪或追究
原作者的责任。

在任何情况下，作者均不对因使用或与本软件有关的合同诉讼、
侵权或其他方式产生的任何索赔、损害或其他责任负责。

自求多福吧。
```
