---
authors:
- eallion
categories:
- 代码
date: 2024-08-15 22:42:21+08:00
draft: false
slug: hugo-syntax-highlight-shiki
summary: Shiki是一款基于VS Code语法高亮引擎的代码高亮工具，支持多种编程语言和主题。它无需维护自定义正则表达式、CSS或HTML，直接使用VS
  Code主题。在Hugo中配置Shiki只需几分钟，
tags:
- Hugo
- Highlight
- Shiki
- 高亮
title: 在 Hugo 中使用 Shiki
---

> 除了 Hugo 在其他静态博客如 Hexo 中都可以使用此方法。

### 官方简介

[Shiki](https://github.com/shikijs/shiki)（式，一个日语词汇，意为 “样式”） 是一款美观而强大的代码语法高亮器，它与 VS Code 的语法高亮引擎一样，基于 TextMate 的语法及主题。Shiki 能为几乎所有主流编程语言提供非常准确且快速的语法高亮。

你不需要维护自定义的正则表达式，不需要维护自定义的 CSS，也不需要维护自定义的 HTML；因为你在 VS Code 中使用的颜色主题一样可以用在 Shiki 上。

### 优势

只需几分钟即可在 Hugo 配置好 Shiki 代码语法高亮器。

我最喜欢它的一点是，它不像其他代码语法高亮器需要引入体积庞大的 JS 资源，Shiki 是写入 HTML 文件的，是纯静态的。Hugo 博客项目可以利用 [@shikijs/rehype](https://github.com/rehypejs/rehype) 插件实现 Shiki 代码语法高亮，在本地或 GitHub Actions 等构建平台都能轻松部署交付。

### 安装 Shiki

进入到 Hugo 博客的项目目录，安装：

- [`shiki`](https://github.com/shikijs/shiki)
- [`@shikijs/rehype`](https://github.com/rehypejs/rehype)
- [`rehype-cli`](https://github.com/rehypejs/rehype/tree/main/packages/rehype-cli)

前提是需要安装 `Node.js` 和 `Yarn` 。选择 `Yarn` 是它的 GitHub Actions 缓存友好。

```bash
# cd my-hugo-project

npm install shiki
npm install @shikijs/rehype
npm install rehype-cli
```

### 配置 Hugo

在 Hugo 的 config 中必须将 [`codeFences`](https://gohugo.io/getting-started/configuration-markup/#highlight) 设置为：`false`

```toml
[markup]
  [markup.highlight]
    codeFences = false
```

### 创建 `.rehyperc`

在 Hugo 目录中创建 `.rehyperc` 文件，我的配置内容如下：

```txt
{
  "plugins": [
    [
      "@shikijs/rehype",
      {
        "themes": {
          "light": "github-light",
          "dark": "github-dark-dimmed"
        }
      }
    ]
  ]
}
```

Rehype 有很多 [插件](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md) ，但我只配置了高亮主题，`light` 模式用的是 `github-light`，`dark` 模式用的是 `github-dark-dimmed` ，GitHub 的主题永远值得相信。

主题列表在这里： [https://shiki.tmrs.site/themes](https://shiki.tmrs.site/themes)

让暗黑模式生效，可能需要在原来的 Hugo 的 CSS 中适配一下，比如我的博客用的是 `<html class="dark">` 的方式来切换暗黑主题的，只需要在 [custom.css](https://github.com/eallion/eallion.com/blob/4776202069b6a1c570bf00bd697a367502f95c41/assets/css/custom.css#L11-L19) 中加入主题颜色变量即可：

```css
html.dark .shiki,
html.dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* 可选，用于定义字体样式 */
    /* font-style: var(--shiki-dark-font-style) !important; */
    /* font-weight: var(--shiki-dark-font-weight) !important; */
    /* text-decoration: var(--shiki-dark-text-decoration) !important; */
}
```

如果是用 `prefers-color-scheme: dark` 的方式切换暗黑模式，简单适配一下这几个变量即可：

```css
.shiki,
.shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* 可选，用于定义字体样式 */
    /* font-style: var(--shiki-dark-font-style) !important; */
    /* font-weight: var(--shiki-dark-font-weight) !important; */
    /* text-decoration: var(--shiki-dark-text-decoration) !important; */
}
```

### 生成 Shiki

先运行 `hugo` 命令构建 Hugo，假设构建产物在 `public/` 目录，再用 [`rehype-cli`](https://github.com/rehypejs/rehype/tree/main/packages/rehype-cli) 生成 Shiki :

```bash
# cd my-hugo-project

npx rehype-cli public -o
```

运行此命令可能会导致内存报错：

> FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory

需要限制一下内存使用：

```bash
export NODE_OPTIONS="--max_old_space_size=7168"
```

> 7168 ≈ 7G，可以根据自己的电脑配置调整，但 GitHub Actions 免费 Runner 最高是 7G

### 在 GitHub Actions 中使用 Shiki

在 Hugo 目录 [`package.json`](https://github.com/eallion/eallion.com/blob/4776202069b6a1c570bf00bd697a367502f95c41/package.json#L15) 的 `scripts` 中加入：

```json
  "scripts": {
    "shiki": "npx rehype-cli public -o"
  },
```

GitHub Actions Workflow：

```yaml
name: Build Hugo and Deploy With Shiki

on:
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build Hugo
        run: |
          hugo -gc --minify

      - name: Setup Node LTS
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: yarn

      - name: Install and run Shiki
        run: |
          export NODE_OPTIONS="--max_old_space_size=7168"
          yarn install
          yarn run shiki || true
          # 或 👇
          # npx rehype-cli public -o --silent || true

      - name: Keep going
        # 后续流程
```

为了预防 Shiki 报错而中断 Hugo 部署流程，可以加入 `|| true`，即使出错也会继续执行部署流程。常见的报错是以前的博文可能使用了不支持的代码名称。

在 Cloudflare Pages 暂时还不能配置内存限制，可以使用 [cloudflare/wrangler-action](https://github.com/cloudflare/wrangler-action) 这个Actions：

```yaml
      - name: Publish to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          quiet: true
          command: pages deploy public --project-name=${{ secrets.CLOUDFLARE_PROJECT_NAME }} --commit-dirty=true
```