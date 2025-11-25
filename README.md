<h1 align="center">A Hugo blog about Charles 'eallion' Chin</h1>

<p align="center">Chance favors the prepared mind.</p>

<p align="center">
    <img src="static/eallion.png" height=96>
</p>

<div align="center">

[![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/eallion/eallion.com)

</div>

<div align="center">

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_shield) ![GitHub repo size](https://img.shields.io/github/repo-size/eallion/eallion.com) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/eallion/eallion.com) ![GitHub commits since tagged version](https://img.shields.io/github/commits-since/eallion/eallion.com/v6.0.1/main) ![GitHub last commit](https://img.shields.io/github/last-commit/eallion/eallion.com) [![Better Uptime Badge](https://status.eallion.com/api/badge/2/uptime/168)](https://status.eallion.com/)
</div>
<div align="center">

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallion.s+blog@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallion.s+blog@gmail.com&logoColor=fff&style=flat)](mailto:eallion.s+blog@gmail.com) <a href="https://keyoxide.org/E685DDDDDDDDDDDD" target="_blank" rel="noopener noreferrer">
    <img class="nozoom" src="https://img.shields.io/badge/E685DDDDDDDDDDDD-blue?label=GPG&logoColor=fff&style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTYuMTQgMmMtNi43Ni4wNS05LjMgNi4yNy05LjM0IDcuN3Y1LjlINS4zNXYxNC4yNWgyMS4xOVYxNS41OWgtMS40MlY5Ljc4aC0uMDRjLS4wNy0uMzYtMS42OS03LjgzLTguOTUtNy43OHptLS4yIDQuMjJhNC43NSA0Ljc1IDAgMCAxIDQuNTkgMy41NnY1LjgxaC05LjJWOS44YTQuNzUgNC43NSAwIDAgMSA0LjYtMy41N3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUuNiAzLjJhNy42NSA3LjY1IDAgMCAwLTMuMjUuNzdjLTMuNDggMS43LTMuODggNS42Ni0zLjg4IDUuNjZjMy40NS03LjA1IDguMy02LjA3IDExLjEtNS42M2MwIDAtMS43NC0uODQtMy45OC0uOHptMTEuMTIgMTIuMjFzLTEuNC0uMDItMS42My4xYy0yLjcgMS40LTMuMjYgMS44NC01LjAzIDIuMmMtNS4wMSAxLTguMDQuNzEtMTAuNTIgMS42MmMtMS45LjctNC4yNiAzLjMzLTQuMjYgMy4zM0w1LjMyIDMwbDMuMzUtLjFzLjg4LS43IDEuOTctLjc5YzAgMCAxMC40LjY0IDEzLjIyLTQuMDNjMCAwLTUuMDMgMi41Mi0xMS4yMi44M2MwIDAgMTAuNjcuMzIgMTMuNjgtNi4wN2MtMS4zLjItNC40NyAzLjI4LTEwLjQyIDIuNDhjLjU4LjAzIDcuNjItMS43OCAxMC43LTUuMDJ6Ii8+PC9zdmc+">
  </a>
</div>

<div align="center">

✨Live Preview：<https://www.eallion.com> ✨

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

- 国内：部署至阿里云 [OSS](https://www.aliyun.com/product/oss) (Jul 20, 2024)
- 境外：部署至 [Cloudflare Pages](https://pages.cloudflare.com/) (Jul 20, 2024)

##### GitHub Actions

> Update: Jul 20, 2024

- https://github.com/eallion/eallion.com/blob/main/.github/workflows/main.yml

### 🎨 主题 [Pehe](https://github.com/eallion/pehe)

> Update: Nov 19, 2025

本博客使用主题为：[Pehe](https://github.com/eallion/pehe)

此次更新，主题使用 `git submodule` 的方式引入，不破坏原主题任何文件结构，所有自定义样式不再在 Theme 目录下修改。

```bash
git submodule add https://github.com/eallion/pehe.git themes/pehe
```

克隆博客后同时克隆子模块：

```bash
pnpm run theme:init
# git submodule update --init --recursive
```

如果上游更新，更新项目中的子模块：

```bash
pnpm run theme:update
# git submodule update --remote --force themes/pehe
```

Pehe 编译 TailwindCSS 的

```bash
pnpm install

# pnpm dev:css
pnpm build:css
```

- 构建为 `main.css`，位于 [assets/css/main.css](https://github.com/eallion/eallion.com/blob/main/assets/css/main.css)
- Tailwind CSS 配置入口文件在 [assets/css/input.css](<https://github.com/eallion/eallion.com/blob/main/assets/css/input.css>)
- 自定义 CSS 在 [assets/css/custom.css](<https://github.com/eallion/eallion.com/blob/main/assets/css/custom.css>)
- 自定义 JS 在 `assets/js/`，如：[lazyload.iife.min.js](https://github.com/eallion/eallion.com/blob/main/assets/js/lazyload.iife.min.js)
- 自定义模板，如嘀咕等页面，在 `layouts/_default/`，如：[mastodon.html](https://github.com/eallion/eallion.com/blob/main/layouts/_default/mastodon.html)
- 页面数据在 `assets/data/`，如书影音数据：[movie.json](https://github.com/eallion/eallion.com/blob/main/assets/data/neodb/movie.json)

### 📚 构建 Chroma CSS

`chroma.css` 位于 `assets/css/chroma.css`，用于代码高亮。

> 主题预览：https://xyproto.github.io/splash/docs/all.html

```bash
pnpm build:chroma
```

等同于：

```bash
hugo gen chromastyles --style=github | sed 's/\./html:not(.dark) ./' >> assets/css/chroma.css
hugo gen chromastyles --style=github-dark | sed 's/\./html.dark ./' >> assets/css/chroma.css
```

custom.css 覆盖背景颜色：

```css
html:not(.dark) .chroma,
html:not(.dark) .chroma * {
  /* GitHub Light */
  color: #24292f;
  background-color: #f6f8fa;
}

html.dark .chroma,
html.dark .chroma * {
  /* GitHub Dark Dimmed */
  color: #d1d7e0;
  background-color: #2d333b;
}
```

### 🧑‍💻 pnpm 命令

目前完整构建工作流：

```bash
pnpm run-s directus:article \
    directus:friendslinks \
    llms \
    build:hugo \
    build:pagefind
```

- `pnpm build` 完整构建
- `pnpm build:chroma` 构建 Chroma 代码高亮 CSS
- `pnpm build:css` 构建 Pehe 的 TailwindCSS `assets/css/main.css`
- `pnpm build:hugo` 构建 Hugo
- `pnpm build:pagefind` 构建 Pagefind 索引
- `pnpm clean` 清除 Hugo 本地文件以避免 Directus 冲突
- `pnpm clean:article` 清除文章数据
- `pnpm clean:data` 清除数据文件
- `pnpm clean:hugo` 清除 Hugo 本地构建产物
- `pnpm dev` 启动 TailwindCSS 监听
- `pnpm dev:css` 启动 TailwindCSS 监听
- `pnpm dev:hugo` 启动 Hugo server 监听
- `pnpm dev:pagefind` 启动 Pagefind 4000 端口监听
- `pnpm run directus`: 获取 Directus 数据
- `pnpm run directus:album`: 获取 Directus 随手拍数据
- `pnpm run directus:anynow`: 获取 Directus AnyNow 数据
- `pnpm run directus:article`: 获取 Directus 文章数据
- `pnpm run directus:friendslinks`: 获取 Directus 友情链接数据
- `pnpm run directus:goods`: 获取 Directus 好物推荐数据
- `pnpm run directus:latest`: 获取 Directus 最新 10 篇文章数据
- `pnpm run directus:mastodon`: 获取 Mastodon API 数据
- `pnpm run directus:neodb`: 获取官方 NeoDB API 数据
- `pnpm run directus:penta`: 获取 Directus 五杀数据
- `pnpm run llms` 生成 llms.txt
- `pnpm run theme:init` 递归更新 Submodule 子项目，一般第一次克隆本项目时使用
- `pnpm run theme:update` 更新 Submodule 子项目

### 🔊 嘀咕页面

嘀咕页面 [`https://www.eallion.com/mastodon`](https://www.eallion.com/mastodon/) 为 Mastodon 个人实例 [`e5n.cc`](https://e5n.cc/@eallion) 的数据展示。  
目前是自己写的页面样式。  

但也可以利用 [mastodon-embed-timeline](https://gitlab.com/idotj/mastodon-embed-timeline) 这个项目集成到博客页面。

### ✏️ 写新文章

> Breaking Change

现在用 Directus 管理文章，不再用 Hugo 命令生成。

写新文章，直接在 Directus 后台创建文章即可。

在 CI/CD 或本地预览时通过下面命令拉取 Directus 文章数据：

```bash
# pnpm install

pnpm run directus # node scripts/directus-fetch-articles.js

# pnpm run directus:latest # Fetch latest 10 articles only

pnpm build # Full Build

pnpm build:hugo # Build Hugo

pnpm build:css # Build Tailwind CSS main.css
```

### 🌐 环境变量

复制 `.env.example` 为 `.env.local`

```bash
cp .env.example .env.local
cat .env.local
```

```txt
ACCESS_KEY_ID=
ACCESS_KEY_SECRET=
CAIYUN_TOKEN=
DEEPSEEK_API_KEY=sk-
DIRECTUS_ACCESS_TOKEN=Lcd9-
DIRECTUS_API_URL=https://directus.example.com/
DIRECTUS_EMAIL=directus@example.com
DIRECTUS_PASSWORD=
DIRECTUS_S3_URL=https://images.example.com/directus/files/
DIRECTUS_TOKEN=eyJh
ESA_SITE_ID=
NEODB_ACCESS_TOKEN=
```

### 🖼️ 图片

> 因为 jsDelivr Aug 15,2020 的‘[新政策](https://www.jsdelivr.com/terms/acceptable-use-policy-jsdelivr-net)’，现在没有用 GitHub + jsDelivr 当图床了。

#### **文章配图**

目前方案是上传到 CDN 图床，文章中引用图片 URL。

#### **文章题图 (Feature Image)**

- **Method 1：远程图片**

> 不通过 Hugo 处理图片，直接用远程图片 URL 作为题图。

`config/params.toml` 中设置：

```toml
hotlinkFeatureImage = true
```

文章 Frontmatter 里的 `featureImage` 支持远程图片 URL。

- **Method 2：本地图片**

> 通过 Hugo 处理图片，生成不同尺寸的图片。

把题图放在文章同目录下，命名为 `feature*.png` 或 `feature*.jpg`。

#### **文章页背景图**

默认引用 `featureImage` 支持远程图片 URL 作为背景图。  
或者：把背景图放在文章同目录下，命名为 `background*.png` 或 `background*.jpg`。

### 📄 LICENSE

This project is licensed under [GLWTPL](https://github.com/me-shaon/GLWTPL/blob/master/translations/LICENSE_zh-CN)
Hugo is licensed under [Apache License 2.0](https://github.com/gohugoio/hugo/blob/master/LICENSE)
Theme Pehe is licensed under [MIT](https://github.com/eallion/pehe/blob/main/LICENSE)  

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_large)

```license
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
