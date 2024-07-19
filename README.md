<h1 align="center">A Hugo blog about Charles 'eallion' Chin</h1>

<p align="center">Chance favors the prepared mind.</p>

<p align="center">
    <img src="static/eallion.png" height=96>
</p>

<div align="center">

[![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml)

</div>

<div align="center">

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_shield) ![GitHub repo size](https://img.shields.io/github/repo-size/eallion/eallion.com) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/eallion/eallion.com) ![GitHub commits since tagged version](https://img.shields.io/github/commits-since/eallion/eallion.com/v4.0.5/main) ![GitHub last commit](https://img.shields.io/github/last-commit/eallion/eallion.com) [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/9pjg.svg)](https://betteruptime.com/?utm_source=status_badge)
</div>
<div align="center">

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallions@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallions@gmail.com&logoColor=fff&style=flat)](mailto:eallions@gmail.com) [![](https://img.shields.io/badge/t.me-@eallion-4ec100?labelColor=555&logo=telegram&logoColor=fff&style=flat)](https://t.me/eallion)
</div>

<div align="center">

✨Live Preview：<https://www.eallion.com> ✨

</div>

<div align="center">

  <img src="static/assets/images/github/blog-flow-light-bg.png">
</div>

# 备忘录

### 📦️ 主仓库

> <https://github.com/eallion/eallion.com>

##### 备份仓库

> <https://eallion@bitbucket.org/eallion/eallion.com>  
> <https://gitlab.com/eallion/eallion.com>

##### 添加备份仓库 Remote

> [!TIP]
> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```bash
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git

$ git remote -v
origin  https://github.com/eallion/eallion.com (fetch)
origin  https://github.com/eallion/eallion.com (push)
origin  https://eallion@bitbucket.org/eallion/eallion.com.git (push)
origin  https://gitlab.com/eallion/eallion.com.git (push)
origin  https://git.eallion.com/git/eallion/eallion.com.git (push)
```

##### 架构备忘

- 国内：部署至腾讯云 [EdgeOne](https://e5n.cc/s/teo) (2024.01.06)
- 境外：部署至腾讯云 [EdgeOne](https://e5n.cc/s/teo) (2024.01.06)

##### GitHub Actions

> Update:2024.01.06

- https://github.com/eallion/eallion.com/blob/main/.github/workflows/main.yml

### 🎨 主题 [Blowfish](https://github.com/nunocoracao/blowfish)

> Update：2024.04.10

本博客使用主题为：[Blowfish](https://github.com/nunocoracao/blowfish)

此次更新，主题使用 `git submodule` 的方式引入，不破坏原主题任何文件结构，所有自定义样式不再在 Theme 目录下修改。

```bash
git submodule add https://github.com/eallion/blowfish.git themes/DoIt
```

克隆博客后同时克隆 [主题](https://github.com/eallion/blowfish.git) 和 [mastodon-embed-timeline](https://github.com/eallion/mastodon-embed-timeline.git)：

```bash
git submodule update --init --recursive

# pnpm recursive
```

如果上游主题有更新，更新 [主题](https://github.com/eallion/blowfish.git) 和 [mastodon-embed-timeline](https://github.com/eallion/mastodon-embed-timeline.git)：

```diff
- git submodule update --remote --merge
+ pnpm theme
```

Blowfish 编译 TailwindCSS 的 main.css ，位于 [assets/css/compiled/main.css](https://github.com/eallion/eallion.com/blob/main/assets/css/compiled/main.css)：

```bash
# cd theme/blowfish
# npm install
# ../..

# pnpm dev
pnpm build
```

```bash
https://github.com/eallion/eallion.com/blob/main/assets/css/compiled/main.css
```

- 自定义 CSS 在 `assets/css/` 如：[assets/css/mastodon-timeline-custom.scss](<https://github.com/eallion/eallion.com/blob/main/assets/css/mastodon-timeline-custom.scss>)：

```bash
https://github.com/eallion/eallion.com/blob/main/assets/css/custom.css
```

- 自定义 JS 在 `assets/js/` 如：[pangu.custom.js](https://github.com/eallion/eallion.com/blob/main/assets/js/pangu.custom.js)：

```bash
https://github.com/eallion/eallion.com/blob/main/assets/js/pangu.custom.js
```

- 自定义模板，如嘀咕、豆瓣等页面，在 `layouts/_default` 如：[layouts/_default/mastodon.html](https://github.com/eallion/eallion.com/blob/main/layouts/_default/mastodon.html)：

```bash
https://github.com/eallion/eallion.com/blob/main/layouts/_default/mastodon.html
```

- 页面数据在 `data` 如书影音数据：[data/neodb/movie.json](https://github.com/eallion/eallion.com/blob/main/data/neodb/movie.json)：

```bash
https://github.com/eallion/eallion.com/blob/main/data/neodb/movie.json
```

### 🧑‍💻 pnpm 命令

- `pnpm new` 创建新文章
- `pnpm server` 启动 Hugo 服务器，文档内容为 `example` 目录
- `pnpm preview` 启动 Hugo 服务器，即预览线上生成环境，文档内容为 `content` 目录
- `pnpm update` 更新 Submodule 子项目
- `pnpm build` 构建 TailwindCSS 适用于生产环境的 main.css
- `pnpm hugo` 构建 Hugo，一般不用，都是交给 CI/CD 构建
- `pnpm dev` 启动 TailwindCSS 监听
- `pnpm recursive` 递归更新 Submodule 子项目，一般第一次克隆本项目时使用
- `pnpm changelog`  生成 CHANGELOG.md
- `pnpm vercel` 构建适用于 Vercel 平台的 Hugo，在 Vercel 平台使用

### 🔊 嘀咕页面

嘀咕页面 [`https://www.eallion.com/mastodon`](https://www.eallion.com/mastodon/) 为 Mastodon 个人实例 [`e5n.cc`](https://e5n.cc/@eallion) 的数据展示。  
利用 [mastodon-embed-timeline](https://gitlab.com/idotj/mastodon-embed-timeline) 这个项目集成到博客页面。  

通过 Git submodule 添加：

```bash
git submodule add https://github.com/eallion/mastodon-embed-timeline.git assets/lib/mastodon-embed-timeline
```

### ✏️ 写新文章

##### 1. **生成新文章**

通过 Hugo 命令 New 一篇新文章模板：  
现改为 npm (pnpm) 命令：

```diff
- hugo new posts/daily/new_title.md
+ pnpm new

# node scripts/post_title_prompt.js && bash scripts/format_filename.sh
```

##### 2. **缩略图**

放在文章目录中，命名为 feature*.png，格式建议为 `.png` 和 `.jpg` 。

##### 3. **背景图**

放在文章目录中，命名为 background*.png，格式建议为 `.png` 和 `.jpg` 。

##### 4. **图标 Icon**

Icon 可以从网上下载，放到 `assets/icons` 目录下，格式为 `.svg`，必须添加 `fill="currentColor"` 属性。可通过 Shortcodes `{{< icon "github" >}}`引用

##### 5. **编辑文章**

通过 [Typora](https://typora.io/) 或 [VSCode](https://code.visualstudio.com/) 编辑第一步 `pnpm new` 出来的文章。  
这篇文章在 `example/blog/{title}` 目录下，文件名为：`{title}/index.md`，`{title}` 为`pnpm new` 输入的文字。  
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

##### 8. **生成 缩略图(OG:image)**

打开 https://cover.eallion.com ([备用](https://github.com/rutikwankhade/CoverView)) 生成缩略图，此缩略图如果命名为 `feature*.png` 也可以当成 [oEmbed](https://oembed.com/)(OG image)，放到博客文章同目录下。

##### 9. **维护其他页面**

注意查看 Layouts 中的模板和 `data` 中的数据文件。

- `嘀咕`：到 [e5n.cc](https://e5n.cc) 发 Toot；
- `观影`：到 [NeoDB](https://neodb.social) 标记；
- `友情链接`：数据按 `data` 目录中的 `friends/links.json` 文件更新；
- `随手拍`：到 [e5n.cc](https://e5n.cc) 发带有 `#ealbum` 标签的 Toot；
- `好物`：数据按 `data` 目录中的 `goods.json` 文件更新；
- `Penta`：数据按 `data` 目录中的 `penta.json` 文件更新；
- `Steam`：数据在 `data` 目录中的 `steam_web_api.json` 每周 GitHub Actions 更新。

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
+ pnpm server

# 查看博客实际效果 👇
# pnpm preview

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
+ pnpm build
```

- `--cleanDestinationDir` 构建前先清理目标目录，即 public
- `--forceSyncStatic` 强制同步 static 目录
- `--gc` 构建后执行一些清理任务 (删除掉一些没用的缓存文件)
- `--ignoreCache` 构建时忽略缓存
- `--minify` 压缩网页代码
- `--enableGitInfo` 开启 GitIifo
- `hugo --help` 查看所有命令

### 🖼️ 图片

> 因为 jsDelivr 2020.08.15 的 ‘[新政策](https://www.jsdelivr.com/terms/acceptable-use-policy-jsdelivr-net)’，现在没有用 GitHub + jsDelivr 当图床了。

- **方法一**

手动添加图床。  
现在写博客添加图片，需要手动添加图片地址。  
一般本博客会使用腾讯云 COS，图床链接为：`https://images.eallion.com/`

- **方法二**

直接把图片丢到 Hugo 仓库的 `static/assets/images` 或者 `assets/images` 目录下即可。  
对于存放在 `static/assets/images` 目录下 (可按年月分类) 的图片有 2 种方法引用图片 URL：

```bash
/assets/images/1970/01/01.jpg
https://www.eallion.com/assets/images/1970/01/01.jpg
```

对于存放在 `assets/images` 目录下的图片一般用 `resources.Get` ：

```bash
{{ with resources.Get "images/a.jpg" }}
  <img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}" alt="">
{{ end }}
```

### 📷 相册

现在的相册页面采用 e5n.cc 的 `#ealbum` 标签动态渲染，只是一个示例页面。

- <https://www.eallion.com/photos/>

### 📷 LOL 五杀

数据按 `data/penta/penta.json` 格式维护即可，五杀截图放到 `static/assets/images/penta/screenshot` 目录。  
英雄头像腾讯官方 API [https://lol.qq.com/cguide/Guide/PublicResources/Images.html](https://lol.qq.com/cguide/Guide/PublicResources/Images.html#%E8%8B%B1%E9%9B%84%E5%A4%B4%E5%83%8F)

- <https://www.eallion.com/penta/>

### 📄 LICENSE

This project is licensed under [GLWTPL](https://github.com/me-shaon/GLWTPL/blob/master/translations/LICENSE_zh-CN)  
Hugo is licensed under [Apache License 2.0](https://github.com/gohugoio/hugo/blob/master/LICENSE)  
Theme Blowfish is licensed under [MIT](https://github.com/nunocoracao/blowfish?tab=MIT-1-ov-file)  

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_large)

```license
GLWT（Good Luck With That，祝你好运）公共许可证
版权所有© 每个人，除了作者

任何人都被允许复制、分发、修改、合并、销售、出版、再授权或
任何其它操作，但风险自负。

作者对这个项目中的代码一无所知。
代码处于可用或不可用状态，没有第三种情况。


                祝你好运公共许可证
            复制、分发和修改的条款和条件

0 ：在不导致作者被指责或承担责任的情况下，你可以做任何你想
要做的事情。

无论是在合同行为、侵权行为或其它因使用本软件产生的情形，作
者不对任何索赔、损害承担责任。

祖宗保佑。
```
