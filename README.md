<h1 align="center">A Hugo blog about Charles 'eallion' Chin</h1>

<p align="center">Chance favors the prepared mind.</p>

<p align="center">
    <img src="static/eallion.png" height=96>
</p>

<div align="center">

[![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/eallion/eallion.com)

</div>

<div align="center">

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_shield) ![GitHub repo size](https://img.shields.io/github/repo-size/eallion/eallion.com) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/eallion/eallion.com) ![GitHub commits since tagged version](https://img.shields.io/github/commits-since/eallion/eallion.com/v5.0.2/main) ![GitHub last commit](https://img.shields.io/github/last-commit/eallion/eallion.com) [![Better Uptime Badge](https://status.eallion.com/api/badge/2/uptime/168)](https://status.eallion.com/)
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
> <https://codeberg.org/eallion/eallion.com.git>  
> <https://git.eallion.com/eallion/eallion.com>

##### 添加备份仓库 Remote

> [!TIP]
> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```bash
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git

$ git remote -v
origin  https://github.com/eallion/eallion.com (fetch)
origin  https://github.com/eallion/eallion.com (push)
origin  https://gitlab.com/eallion/eallion.com.git (push)
origin  https://codeberg.org/eallion/eallion.com.git (push)
origin  https://git.eallion.com/eallion/eallion.com (push)
```

##### 架构备忘

- 国内：部署至阿里云 [OSS](https://www.aliyun.com/product/oss) (Jul 20, 2024)
- 境外：部署至 [Cloudflare Pages](https://pages.cloudflare.com/) (Jul 20, 2024)

##### GitHub Actions

> Update: Jul 20, 2024

- https://github.com/eallion/eallion.com/blob/main/.github/workflows/main.yml

### 🎨 主题 [Blowfish](https://github.com/nunocoracao/blowfish)

> Update: Apr 01, 2024

本博客使用主题为：[Blowfish](https://github.com/nunocoracao/blowfish)

此次更新，主题使用 `git submodule` 的方式引入，不破坏原主题任何文件结构，所有自定义样式不再在 Theme 目录下修改。

```bash
git submodule add https://github.com/eallion/blowfish.git themes/blowfish
```

克隆博客后同时克隆子模块：

```bash
pnpm run theme:init
# git submodule update --init --recursive
```

如果上游更新，更新项目中的子模块：

```bash
pnpm run theme:update
# git submodule update --remote --force themes/blowfish
```

Blowfish 编译 TailwindCSS 的 main.css，位于 [assets/css/compiled/main.css](https://github.com/eallion/eallion.com/blob/main/assets/css/compiled/main.css)：

```bash
# cd theme/blowfish
# pnpm install
# cd ../..

# pnpm run dev
pnpm run build
```

```bash
https://github.com/eallion/eallion.com/blob/main/assets/css/compiled/main.css
```

- 自定义 CSS 在 `assets/css/` 如：[custom.css](<https://github.com/eallion/eallion.com/blob/main/assets/css/custom.css>)：

```bash
https://github.com/eallion/eallion.com/blob/main/assets/css/custom.css
```

- 自定义 JS 在 `assets/js/` 如：[lazyload.iife.min.js](https://github.com/eallion/eallion.com/blob/main/assets/js/lazyload.iife.min.js)：

```bash
https://github.com/eallion/eallion.com/blob/main/assets/js/lazyload.iife.min.js
```

- 自定义模板，如嘀咕、书影音等页面，在 `layouts/_default/` 如：[layouts/_default/mastodon.html](https://github.com/eallion/eallion.com/blob/main/layouts/_default/mastodon.html)：

```bash
https://github.com/eallion/eallion.com/blob/main/layouts/_default/mastodon.html
```

- 页面数据在 `assets/data/` 如书影音数据：[assets/data/neodb/movie.json](https://github.com/eallion/eallion.com/blob/main/assets/data/neodb/movie.json)：

但是现在是通过 Directus API 获取数据，只有在构建时才创建这个目录和对应的文件。

```bash
https://github.com/eallion/eallion.com/blob/main/assets/data/neodb/movie.json
```

### 🧑‍💻 pnpm 命令

- `pnpm run build` 构建 Blowfish 的 TailwindCSS `assets/css/compiled/main.css`
- `pnpm run dev` 启动 TailwindCSS 监听
- `pnpm run directus`: 获取 Directus 数据
- `pnpm run directus:album`: 获取 Directus 随手拍数据
- `pnpm run directus:anynow`: 获取 Directus AnyNow 数据
- `pnpm run directus:goods`: 获取 Directus 好物推荐数据
- `pnpm run directus:friendslinks`: 获取 Directus 友情链接数据
- `pnpm run directus:mastodon`: 获取 Mastodon API 数据
- `pnpm run directus:neodb`: 获取官方 NeoDB API 数据
- `pnpm run directus:penta`: 获取 Directus 五杀数据
- `pnpm run hugo` 构建 Hugo，一般不用，都是交给 CI/CD 构建
- `pnpm run new` 创建新文章，直接输入文章标题，生成到 example 目录
- `pnpm run prepare` Git Commit Husky 勾子，目前用于提交时更新各个平台环境变量的 `HUGO_VERSION`
- `pnpm run preview` 启动 Hugo 服务器，即预览线上生成环境，会重新获取 Directus 数据
- `pnpm run server` 启动 Hugo 服务器
- `pnpm run shiki` 生成 Shiki 语法高亮
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

pnpm run preview # Preview Server

pnpm run hugo # Build Hugo

pnpm run build # Build Tailwind CSS main.css
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

<details><summary>
老方式：<b>DEPRECATED!</b>
</summary>  

##### 1. **生成新文章**

通过 Hugo 命令 New 一篇新文章模板：  
现改为 pnpm 命令：

```diff
- hugo new posts/daily/new_title.md
+ pnpm run new

# node scripts/new_post.js
```

如果需要用上 [彩云小译](https://docs.caiyunapp.com/lingocloud-api/) 自动翻译标题为 slug，需要 Token。

导入 Token

```bash
export CAIYUN_TOKEN=3975l6lr5pcbvidl6jl2
```

或者：复制 .env.example 为 .env.local

```txt
CAIYUN_TOKEN=3975l6lr5pcbvidl6jl2
```

##### 2. **缩略图**

放在文章目录中，命名为 feature*.png，格式建议为 `.png` 和 `.jpg` 。

##### 3. **背景图**

放在文章目录中，命名为 background*.png，格式建议为 `.png` 和 `.jpg` 。

##### 4. **图标 Icon**

Icon 可以从网上下载，放到 `assets/icons` 目录下，格式为 `.svg`，必须添加 `fill="currentColor"` 属性。可通过 Shortcodes `{{< icon "github" >}}`引用

##### 5. **编辑文章**

通过 [Typora](https://typora.io/) 或 [VSCode](https://code.visualstudio.com/) 编辑第一步 `pnpm run new` 出来的文章。  
这篇文章在 `example/blog/{title}` 目录下，文件名为：`{title}/index.md`，`{title}` 为`pnpm run new` 输入的文字。  
编辑好之后需要把这个文件复制到 `content/blog` 相应的目录中，再 `git push`。  
缩略图（OG:Image）放在文章同目录下，命名为：`feature*.png`

##### 6. **修改 Front matter**

- `title` (必填) 自动生成，按需修改
- `authors`：目录保持默认：`["eallion"]`，其他支持：`["shanzei"]`
- `categories` (必填) 按需修改
- `tags` (必填) 按需修改 (约定：本博客单篇文章标签数上限为 4)
- `slug` (必填) 按需修改，文章网址 URL
- `summary` (必填) AI 生成摘要
- `series` （选填）系列
- `series_weight`（选填）系列中的排序
- `seriesNavigation`（选填）是否需要显示在系列导航中
- `draft: true` (必填) 如果需要公开发表，需改为：`draft: false`

##### 7. **生成 AI 提要**

~~写完文章，按 `data` 目录中的 `summary.json` 文件手动生成摘要。~~

Summary 生成 AI 摘要现在添加到 `blog` 目录中的 Markdown 文件中的 Front Matter 中，依然采用手动生成的方式。

##### 8. **生成 缩略图 (OG:image)**

打开 https://cover.eallion.com ([备用](https://github.com/rutikwankhade/CoverView)) 生成缩略图，此缩略图如果命名为 `feature*.png` 也可以当成 [oEmbed](https://oembed.com/)(OG image)，放到博客文章同目录下。

##### 9. **维护其他页面**

注意查看 Layouts 中的模板和 `data` 中的数据文件。

- `嘀咕`：到 [e5n.cc](https://e5n.cc) 发 Toot；
- `观影`：到 [NeoDB](https://neodb.social) 标记；
- `友情链接`：数据按 `data` 目录中的 `friends/links.json` 文件更新；
- `随手拍`：到 [e5n.cc](https://e5n.cc) 发带有 `#ealbum` 标签的 Toot；
- `好物`：数据按 `data` 目录中的 `goods.json` 文件更新；
- `Penta`：数据按 `data` 目录中的 `penta.json` 文件更新。

##### 10. **Push**

完成写作后，Push 到 GitHub 仓库会自动构建部署。

```bash
git add .
git commit -m "docs: add a new post"
git push
```

##### 11. **本地预览** (~~Web Server~~)

> 完全没有必要把 Hugo 当成 Web Server

已添加脚本：

```diff
- ./server.sh
+ pnpm run server

# 查看博客实际效果 👇
# pnpm run preview

# git submodule update --remote --merge && \
# start http://192.168.0.5:1313 && \
# hugo server \
#   -w \
#   -D \
#   -p 1313 \
#   --bind 0.0.0.0 \
#   --contentDir example \
#   --minify \
#   --forceSyncStatic \
#   --ignoreCache \
#   --noHTTPCache \
#   --disableFastRender \
#   -e production \
#   --enableGitInfo \
#   --disableKinds RSS \
#   --printUnusedTemplates \
#   --templateMetrics \
#   --templateMetricsHints
```

> 运行脚本后会自动打开预览页面：<http://127.0.0.1:1313>

- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页
- `-w` 有文件变化立即刷新 (默认开启)
- `-D` 构建草稿，撰写新文章时很有用
- `-p 1313` 指定端口号 1313 (默认 1313)
- `-t hello-friend` 使用 hello-friend 主题
- `-enableGitInfo` 开启 GitIifo
- `--bind 0.0.0.0` 绑定 IP，局域网其他设备 Debug 时很有用
- `--contentDir example` 指定文章目录 `example`，默认为 `content`
- `--cleanDestinationDir` 清空目标目录
- `--forceSyncStatic` 强制同步静态文件
- `--ignoreCache` 忽略缓存
- `--noHTTPCache` 关闭 HTTP 缓存
- `--renderStaticToDisk` Hugo 0.97.0 新特性，从硬盘渲染静态文件，从内存渲染动态文件
- `--disableFastRender` DoIt 主题使用了 `.Scratch`，建议开启此参数
- `-e production` DoIt 的 `评论系统`、`CDN` 和 `fingerprint` 不会在 development 环境下启用
- `hugo server --help` 查看 server 所有命令

##### 12. **本地构建**

手动构建命令：

```diff
- hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
+ pnpm run hugo
```

- `--cleanDestinationDir` 构建前先清理目标目录，即 public
- `--forceSyncStatic` 强制同步 static 目录
- `--gc` 构建后执行一些清理任务 (删除掉一些没用的缓存文件)
- `--ignoreCache` 构建时忽略缓存
- `--minify` 压缩网页代码
- `--enableGitInfo` 开启 GitIifo
- `hugo --help` 查看所有命令

</details>

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
Theme Blowfish is licensed under [MIT](https://github.com/nunocoracao/blowfish/blob/main/LICENSE)  

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
