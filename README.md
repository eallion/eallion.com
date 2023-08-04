<h1 align="center">A Hugo blog about Charles 'eallion' Chin</h1>

<p align="center">Chance favors the prepared mind.</p>

<p align="center">
    <img src="static/eallion.png" height=96>
</p>

<div align="center">

[![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml)

</div>

<div align="center">

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_shield) ![GitHub repo size](https://img.shields.io/github/repo-size/eallion/eallion.com) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/eallion/eallion.com) ![GitHub commits since tagged version](https://img.shields.io/github/commits-since/eallion/eallion.com/v2.0.2/main) ![GitHub last commit](https://img.shields.io/github/last-commit/eallion/eallion.com) [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/9pjg.svg)](https://betteruptime.com/?utm_source=status_badge)
</div>
<div align="center">

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallions@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallions@gmail.com&logoColor=fff&style=flat)](mailto:eallions@gmail.com) [![](https://img.shields.io/badge/t.me-@eallion-4ec100?labelColor=555&logo=telegram&logoColor=fff&style=flat)](https://t.me/eallion)
</div>

<div align="center">

✨DEMO: <https://eallion.com> ✨

</div>

# 备忘录

<div align="center">

  <img src="static/assets/images/github/blog-flow.png">
</div>

### 📦️ 主仓库

> <https://github.com/eallion/eallion.com.git>

#### 备份仓库

> Gitea：<https://git.eallion.com/eallion/eallion.com.git>

#### 添加备份仓库 Remote

> **Note**
> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git
```

#### 架构备忘

- 国内：部署至腾讯云 [COS](https://cloud.tencent.com/product/cos) + [CDN](https://cloud.tencent.com/product/cdn) (2020.12.27)
- 境外：部署至 [Vercel](https://vercel.com/) (2021.06.13)

<details>
<summary>GitHub Actions</summary>
<blockquote>Update:2022.12.12</blockquote>
构建 Hugo，部署至 GitHub Pages。

```
name: Build Hugo and Deploy

on:
  push:
    branches:
      - main
#  schedule:
#    - cron: 0 16 * * *
  workflow_dispatch:
  repository_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Setup timezone
        uses: zcong1993/setup-timezone@master
        with:
          timezone: Asia/Shanghai

      - uses: actions/checkout@v3
        with:
          submodules: false
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build Hugo
        run: |
          rm themes/DoIt -rf
          git clone https://github.com/eallion/hugo-theme-doit.git themes/DoIt --single-branch
          hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          personal_token: ${{ secrets.personal_token }}
          external_repository: eallion/eallion.github.io
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./public
          allow_empty_commit: true
          # commit_message: ${{ GitHub.event.head_commit.message }}
          full_commit_message: ${{ github.event.head_commit.message }}
          cname: eallion.com
          force_orphan: true
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'

      - name: Upload to Tencent COS
        uses: zkqiang/tencent-cos-action@v0.1.0
        with:
          args: upload -rsf --delete ./public/ /
          secret_id: ${{ secrets.SECRET_COS_ID }}
          secret_key: ${{ secrets.SECRET_COS_KEY }}
          bucket: ${{ secrets.COS_CN_BUCKET }}
          region: ap-shanghai

      - name: Tencent CDN Purge
        uses: keithnull/tencent-cloud-cdn-purge-cache@v1.0
        env:
          SECRET_ID: ${{ secrets.SECRET_COS_ID }}
          SECRET_KEY: ${{ secrets.SECRET_COS_KEY }}
          PATHS: "https://eallion.com/"
          FLUSH_TYPE: "delete" # optional
```

</details>
<details>
<summary>Coding 持续集成</summary>
<blockquote>Update:2022.12.12</blockquote>
Coding.net 持续集成部分命令：
<ul>
 <li>从 <a href="https://coding-public.coding.net/public-artifacts/public/downloads/hugo-linux-64bit.deb/version/13372160/guide">公开制品库</a> 拉取 Hugo 安装包</li>
 <li>构建 Hugo</li>
 <li>上传到腾讯云 COS</li>
 <li>刷新腾讯云 CDN</li>
 <li>处理 Sitemap 并提交到百度</li>
</ul>

```
pipeline {
  agent any
  stages {
    stage('Build Hugo') {
      agent {
        docker {
          reuseNode 'true'
          registryUrl 'https://eallion-docker.pkg.coding.net'
          registryCredentialsId "${env.DOCKER_REGISTRY_CREDENTIALS_ID}"
          image 'eallion/hugo/hugo:latest'
          args '-v /etc/localtime:/etc/localtime:ro'
        }

      }
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]],
          extensions: [[$class:'CloneOption',depth:1,noTags:false,reference:'',shallow:true,timeout:30]],
        ])
        sh 'git submodule update --init --recursive'
        sh 'hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo'
        sh 'wget "https://memos.eallion.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=10" -O ./public/memos.json'
      }
    }

    stage('COS Deploy') {
      steps {
        useCustomStepPlugin(key: 'coding-public:cos_upload', version: 'latest', params: [region:'ap-shanghai',bucket:'eallion-com-1251347414',remote:'/',local:'public/',secret_id:'${COS_SECRET_ID}',secret_key:'${COS_SECRET_KEY}'])
      }
    }

    stage('Refresh CDN') {
      steps {
        sh '/usr/bin/python3.9 -m pip install --upgrade pip'
        sh 'sudo pip install tccli'
        sh 'tccli --version'
        sh 'tccli configure set secretId ${COS_SECRET_ID} secretKey ${COS_SECRET_KEY} region ${COS_BUCKET_REGION} output json'
        sh 'tccli cdn PurgePathCache --cli-unfold-argument --Paths https://eallion.com/ --FlushType delete --UrlEncode False'
      }
    }

    stage('Baidu Sitemap') {
      steps {
        sh 'cat ./public/sitemap.xml | grep \'<loc\' | grep -oE \'https://[^<]+\' > urls.txt'
        sh 'curl -H \'Content-Type:text/plain\' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://eallion.com&token=xxxxxx"'
      }
    }

  }
}
```

</details>

### 🎨 主题 [DoIt](https://github.com/HEIGE-PCloud/DoIt)

> Update: 2022.12.12

本博客使用主题为：[DoIt](https://github.com/HEIGE-PCloud/DoIt)

此次更新，主题使用 `git submodule` 的方式引入，不破坏原主题任何文件结构，所有自定义样式不再在 Theme 目录下修改。

```bash
git submodule add https://github.com/eallion/hugo-theme-doit.git themes/DoIt
```

> 克隆博客后同时克隆主题：

```bash
git submodule update --init --recursive
```

如果上游主题有更新，更新主题 DoIt 的 submodule：

> 已更新脚本

```diff
- git submodule update --remote --merge
+ npm run update
```

- 自定义 CSS 在 [`assets\css\_custom.scss`](<https://github.com/eallion/eallion.com/blob/main/assets/css/_custom.scss>)：

```
https://github.com/eallion/eallion.com/blob/main/assets/css/_custom.scss
```

- 自定义 JS 在 [`assets\js\custom.js`](https://github.com/eallion/eallion.com/blob/main/assets/js/custom.js)：

```
https://github.com/eallion/eallion.com/blob/main/assets/js/custom.js
```

- 自定义模板，如嘀咕、豆瓣等页面，在 [`layouts\_defaut`](https://github.com/eallion/eallion.com/tree/main/layouts/_default)：

```
https://github.com/eallion/eallion.com/tree/main/layouts/_default
```

- 作者数据在 [`data\authors`](https://github.com/eallion/eallion.com/tree/main/data/authors)：

```
https://github.com/eallion/eallion.com/tree/main/data/authors
```

- 豆瓣观影数据在 [`data\douban`](https://github.com/eallion/eallion.com/tree/main/data/douban)：

```
https://github.com/eallion/eallion.com/tree/main/data/douban
```

### ✏️ 写新文章

1. **生成新文章**

通过 Hugo 命令 New 一篇新文章模板：

> 已更新脚本

```diff
- hugo new posts/daily/new_title.md
+ npm run new
```

2. **编辑文章**

通过 [Typora](https://typora.io/) 或 [VSCode](https://code.visualstudio.com/) 编辑第一步 New 出来的文章。
这篇文章在`content/posts/daily`目录下，文件名为：`new_title.md`。

3. **修改 Front matter**:

- `title` （必填）自动生成，按需修改
- `authors`: 目录保持默认：`["eallion"]`，其他支持：`["shanzei  "]`
- `categories`（必填）按需修改
- `tags`（必填）按需修改（约定：本博客单篇文章标签数上限为 4）
- `slug`（必填）按需修改，文章网址 URL
- `draft: true`（必填）如果需要公开发表，需改为：`draft: false`

4. **Push**:

```
git add .
git commit -m "docs: add a new post"
git push
```

5. **本地调试**（~~Web Server~~）

已添加脚本：

> 已更新脚本

```diff
- ./server.sh
+ npm run server
```

脚本内容：

```
hugo server -w -D -p 1313 -t hello-friend --bind 0.0.0.0  --contentDir example --cleanDestinationDir --forceSyncStatic --ignoreCache --noHTTPCache --disableFastRender -e production
```

> 运行脚本后会自动打开预览页面：<http://127.0.0.1:1313>

- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页
- `-w` 有文件变化立即刷新（默认开启）
- `-D` 构建草稿，撰写新文章时很有用
- `-p 1313` 指定端口号 1313（默认 1313）
- `-t hello-friend` 使用 hello-friend 主题
- `-enableGitInfo` 开启 GitIifo
- `--bind 0.0.0.0` 绑定 IP ，局域网其他设备 Debug 时很有用
- `--contentDir example` 指定文章目录`example`，默认为 `content`
- `--cleanDestinationDir` 清空目标目录
- `--forceSyncStatic` 强制同步静态文件
- `--ignoreCache` 忽略缓存
- `--noHTTPCache` 关闭 HTTP 缓存
- `--renderStaticToDisk` Hugo 0.97.0 新特性，从硬盘渲染静态文件，从内存渲染动态文件
- `--disableFastRender` DoIt 主题使用了`.Scratch`，建议开启此参数
- `-e production` DoIt 的`评论系统`、`CDN` 和 `fingerprint` 不会在 development 环境下启用
- `hugo server --help` 查看 server 所有命令

6. **本地构建**

手动构建命令：

> 已更新脚本

```diff
- hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
+ npm run build
```

- `--cleanDestinationDir` 构建前先清理目标目录，即 public
- `--forceSyncStatic` 强制同步 static 目录
- `--gc` 构建后执行一些清理任务（删除掉一些没用的缓存文件）
- `--ignoreCache` 构建时忽略缓存
- `--minify` 压缩网页代码
- `--enableGitInfo` 开启 GitIifo
- `hugo --help` 查看所有命令

### 🚨 刷新 jsDelivr 缓存

将资源文件链接中的`cdn.jsdelivr.net`改为 `purge.jsdelivr.net`，在浏览器中请求即可刷新 CDN。

```diff
- https://cdn.jsdelivr.net/gh/eallion/eallion.github.io/style.css
+ https://purge.jsdelivr.net/gh/eallion/eallion.github.io/style.css
```

### 💥 清理 Git 仓库

```
git rm -r --cached .
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### 💥 本地资源引用

> [DoIt](https://github.com/HEIGE-PCloud/DoIt) 主题功能

有三种方法来引用**图片**和**音乐**等本地资源:

1. 使用[页面包](https://gohugo.io/content-management/page-bundles/)中的[页面资源](https://gohugo.io/content-management/page-resources/)。
    你可以使用适用于 `Resources.GetMatch` 的值或者直接使用相对于当前页面目录的文件路径来引用页面资源.
2. 将本地资源放在 **assets** 目录中，默认路径是 `/assets`。
   引用资源的文件路径是相对于`assets`目录的。
3. 将本地资源放在 **static** 目录中，默认路径是 `/static`。
   引用资源的文件路径是相对于`static`目录的。

引用的**优先级**符合以上的顺序.

在这个主题中的很多地方可以使用上面的本地资源引用，
例如 **链接**、 **图片**、`image` & `music` shortcode 和**前置参数**中的部分参数。

页面资源或者 **assets** 目录中的[图片处理](https://gohugo.io/content-management/image-processing/)会在未来的版本中得到支持.
非常酷的功能! :(far fa-grin-squint fa-fw):
{{< /admonition >}}

### 🖼️ 图片

因为 jsDelivr 2020.08.15 的『[新政策](https://www.jsdelivr.com/terms/acceptable-use-policy-jsdelivr-net)』，现在没有用 GitHub + jsDelivr 当图床了。

- **方法一**

手动添加图床。
现在写博客添加图片，需要手动添加图片地址。
一般本博客优先使用腾讯云 COS，图床链接为：`https://images.eallion.com/`

- **方法二**

原方法。
直接把图片丢到 Hugo 仓库的`static/images/`目录下即可。
图片存放目录：
> Hugo 目录的`static/images/`目录下（可按年月分类）。

文章中引用的图片 URL：
> `https://eallion.com/images/1970/01/01.jpg`

### 📷 相册

相册页面可以用主题内置的 [`{{< figure >}}`](https://hugodoit.pages.dev/zh-cn/theme-documentation-built-in-shortcodes/#figure)、[`{{< image >}}`](<https://hugodoit.pages.dev/zh-cn/theme-documentation-extended-shortcodes/#image>) Shortcodes 生成。
如：

- <https://eallion.com/penta/>
- <https://eallion.com/photos/>

```markdown
{{< image src="https://images.eallion.com/penta/20150218-Shaco.jpg" alt="Shaco" caption="Shaco" >}}
```

### 📄 LICENSE

This project is licensed under [GLWTPL](https://github.com/me-shaon/GLWTPL/blob/master/translations/LICENSE_zh-CN).
Hugo is licensed under [Apache License 2.0](https://github.com/gohugoio/hugo/blob/master/LICENSE).
Theme DoIt is licensed under [MIT](https://github.com/HEIGE-PCloud/DoIt/blob/main/LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_large)

```
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
