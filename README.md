<h1 align="center">A Hugo blog about Charles 'eallion' Chin</h1>

<p align="center">Chance favors the prepared mind.</p>

<p align="center">
    <img src="static/eallion.jpg">
</p>
    
<div align="center">
    
[![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml)  
    
</div>

<div align="center">
    
![GitHub](https://img.shields.io/github/license/eallion/eallion.com) ![GitHub repo size](https://img.shields.io/github/repo-size/eallion/eallion.com) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/eallion/eallion.com) ![GitHub commits since tagged version](https://img.shields.io/github/commits-since/eallion/eallion.com/v1.0.9/main) ![GitHub last commit](https://img.shields.io/github/last-commit/eallion/eallion.com) [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/9pjg.svg)](https://betteruptime.com/?utm_source=status_badge)
    
</div>
<div align="center"> 
    
[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallions@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallions@gmail.com&logoColor=fff&style=flat)](mailto:eallions@gmail.com) [![](https://img.shields.io/badge/t.me-@eallion-4ec100?labelColor=555&logo=telegram&logoColor=fff&style=flat)](https://t.me/eallion)
</div>

<div align="center"> 
    
✨DEMO: https://eallion.com ✨

</div>

# 备忘录：

### 📦️主仓库
> <https://github.com/eallion/eallion.com.git>

#### 备份仓库
> Coding.net：<https://e.coding.net/eallion/eallion.com/hugo.git>



## [hugo contact form](https://fabform.io/a/hugo-contact-form)


#### 添加备份仓库 Remote

> **Note**  
> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@e.coding.net/eallion/eallion.com/hugo.git
```

#### 通过空提交运行 GitHub Acions

当没有新提交时， 通过 push empty commit 运行 GitHub Actions：

```
git commit --allow-empty -m "build: rerun github acions"
git push
```

#### 架构备忘

- 国内：通过 [Coding](https://coding.net/) 部署至腾讯云 [COS](https://cloud.tencent.com/product/cos) + [CDN](https://cloud.tencent.com/product/cdn) (2020.12.27)
- 境外：通过 GitHub Action 部署至 [GitHub Pages](https://eallion.github.io/) (2021.06.13)

<details>
<summary>GitHub Actions</summary>
<blockquote>Update:2021.07.31</blockquote> 
构建 Hugo，部署至 GitHub Pages。

```
name: Build Hugo and Deploy
on:
  push:
    branches:
      - main
  schedule:
    - cron: 0 16 * * *
jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
      - name: Setup timezone
        uses: zcong1993/setup-timezone@master
        with:
          timezone: Asia/Shanghai
      - uses: actions/checkout@v2
        with:
          submodules: false
          fetch-depth: 1
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: false
      - name: Build Hugo
        run: |
          hugo version
          hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
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
```
</details>
<details>
<summary>Coding 持续集成</summary>
<blockquote>Update:2022.04.12</blockquote>
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
        sh 'bash coding.sh'
        sh 'hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify'
      }
    }
    stage('COS Deploy') {
      steps {
        useCustomStepPlugin(key: 'coding-public:cos_upload', version: 'latest', params: [region:'ap-shanghai',bucket:'eallion-com-1251347414',remote:'/',local:'public/',secret_id:'${COS_SECRET_ID}',secret_key:'${COS_SECRET_KEY}'])
      }
    }
    stage('Refresh CDN') {
      steps {
        sh 'sudo pip install tccli'
        sh 'tccli --version'
        sh 'tccli configure set secretId ${COS_SECRET_ID} secretKey ${COS_SECRET_KEY} region ${COS_BUCKET_REGION} output json'
        sh 'tccli cdn PurgePathCache --cli-unfold-argument --Paths https://eallion.com/ --FlushType delete --UrlEncode False'
      }
    }
    stage('Baidu Sitemap') {
      steps {
        sh 'cat ./public/sitemap.xml | grep \'<loc\' | grep -oE \'https://[^<]+\' > urls.txt'
        sh 'curl -H \'Content-Type:text/plain\' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://eallion.com&token=ZWIiTFJWJkGQ11ZJ"'
      }
    }
  }
}
```
</details>

### ✏️写新文章

1. **生成新文章**

通过 Hugo 命令 New 一篇新文章模板：

```
hugo new posts/daily/new_title.md
```

2. **编辑文章**

通过 [Typora](https://typora.io/) 或 [VSCode](https://code.visualstudio.com/) 编辑第一步 New 出来的文章。  
这篇文章在`content/posts/daily`目录下，文件名为：`new_title.md`。  

3. **修改 Front matter**:

- `categories`（必填）按需修改
- `tags`（必填）按需修改（约定：本博客单篇文章标签数上限为 4）
- `slug`（必填）按需修改
- `draft: true`（必填）改为：`draft: false`

4. **Push**:

```
git add .
git commit -m "docs: add a new post"
git push
```

5. **本地调试**（~~Web Server~~）

已添加脚本：
```
./server.sh
```
脚本内容：
```
hugo server -w -D -p 8080 -t hello-friend --bind 192.168.0.5 --baseURL 192.168.0.5 --contentDir example --cleanDestinationDir --forceSyncStatic --ignoreCache --noHTTPCache
```
> 运行脚本后会自动打开预览页面：http://192.168.0.5:8080
- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页
- `-w` 有文件变化立即刷新（默认开启）
- `-D` 构建草稿，撰写新文章时很有用
- `-p 8080` 指定端口号 8080（默认 1313）
- `-t hello-friend` 使用 hello-friend 主题
- `-enableGitInfo` 开启 GitIifo
- `--bind 192.168.0.5` 绑定 IP ，局域网其他设备 Debug 时很有用
- `--baseURL 192.168.0.5` 绑定域名（IP），局域网其他设备 Debug 时很有用
- `--contentDir example` 指定文章目录`example`，默认为 `content`
- `--cleanDestinationDir` 清空目标目录
- `--forceSyncStatic` 强制同步静态文件
- `--ignoreCache` 忽略缓存
- `--noHTTPCache` 关闭 HTTP 缓存
- `--renderStaticToDisk` Hugo 0.97.0 新特性，从硬盘渲染静态文件，从内存渲染动态文件
- `hugo server --help` 查看 server 所有命令

6. **本地构建**

手动构建命令：
```
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
```
- `--cleanDestinationDir` 构建前先清理目标目录，即 public
- `--forceSyncStatic` 强制同步 static 目录
- `--gc` 构建后执行一些清理任务（删除掉一些没用的缓存文件）
- `--ignoreCache` 构建时忽略缓存
- `--minify` 压缩网页代码
- `-enableGitInfo` 开启 GitIifo
- `hugo --help` 查看所有命令

### 🚀Shortcodes
<details>
    <summary> <code>bilibili</code> </summary>

插入 B 站视频 

```html
{{< bilibili AV 号或 BV 号 >}}
{{< bilibili AV 号或 BV 号 分 P 号 >}}
```

| Name | Value               | Description                           |
| ---- | ------------------- | ------------------------------------- |
| vid  | AV 号 / BV 号 [分 P 号]  | 必填参数。(Type: String) 视频资源 ID。 |

</details>

<details>
    <summary> <code>code</code> </summary>

原始主题自带代码块。  
**已弃用**，一般都用 Markdown 自带语法。
<pre>
```html
  // your code here
```
</pre>

</details>

<details>
    <summary> <code>image</code> </summary>

插入图片

```html
{{< image src="hello.png" alt="" position="" style="" >}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
| src | string | 图片链接 |
| alt | text | 图片描述 |
| position | left(default) \| center \| right | 图片位置 |
| style | border-radius: 8px; | 图片样式 |

</details>

<details>
    <summary> <code>figure</code> </summary>

`figure` 是`image` 的进阶版

```html
{{< figure src="hello.png" alt="" position="" style="" caption="" captionPosition="" captionStyle=" >}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
| src | string | 图片链接 |
| alt | text | 图片描述 |
| position | left(default) \| center \| right | 图片位置 |
| style | border-radius: 8px; | 图片样式 |
|caption|text| 图片标题 |
|captionPosition|left \| center(default) \| right| 图片标题位置 |
|captionStyle|color: red;| 图片标题样式 |
    
</details>

<details>
    <summary> <code>friend</code> </summary>

友情链接

```html
{{< friend name="" des="" url="" domain="" src="avatar.png" >}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
|name|text| 友链名称 |
|des|text| 友链描述 |
|url|website| 友链的链接 |
|domain|domain| 友链的域名 |
|src|icon url| 友链图标 |
    
</details>

<details>
    <summary> <code>gist</code> </summary>

GitHub Gist Embed

```html
{{< gist id hash >}}
```
```html
{{< gist id hash filename >}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
| id | text | 填入 GitHub Gist UserID |
| hash |text| 填入 Gist 代码片段的 Hash |
| filename |text| 填入 Gist 代码片段的文件名 |

注意事项：Gist 可能在中国大陆地区打不开。
    
</details>

<details>
    <summary> <code>imgproc</code> </summary>

图片处理
 
```html
{{< imgproc "hello.png" Resize "250x" center />}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
|option|`Resize` `Fit` `Fill` `Crop` `Filter` `Exif`| 图片处理的参数 |
|position|left \| center \| right| 位置 |

参考：<https://gohugo.io/content-management/image-processing/>
    
</details>

<details>
    <summary> <code>link</code> </summary>

本站文章内链

```html
{{< link "blog" >}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
|filename|text| 填入 Frontmatter 中的 `Slug` |
    
</details>

<details>
    <summary> <code>music</code> </summary>

插入音乐

```html
{{< music auto="https://music.163.com/#/playlist?id=60198" >}}
```

|Name               |Value      |Description|
|:--------------------|:------------:|:----------|
|auto            |options       |music link, support: `netease`, `tencent`, `xiami`|

更多参数：[MetingJS](https://github.com/metowolf/MetingJS)
    
</details>

<details>
    <summary> <code>video</code> </summary>

插入视频
 
```html
<!-- just video src -->
{{< video "./video.mp4">}}

<!-- Other option -->
{{< video src="./video.mp4" autoplay="true" poster="./video-poster.png" >}}
```

| Name     | Value          | Description                                     |
| :------- | :------------- | ----------------------------------------------- |
| src      | relative paths | 必填参数。(Type: String) 视频文件（相对）路径。 |
| autoplay | true / false   | 可选参数。(Type: String) 自动播放。             |
| poster   | relative paths | 可选参数。(Type: String) 视频封面（相对）路径。 |
    
</details>

<details>
    <summary> <code>youtube</code> </summary>

插入 Youtube 视频

```html
<!-- just video src -->
{{< youtube jflq6vNcZyA >}}

<!-- Other option -->
{{< youtube id="jflq6vNcZyA" autoplay="true" >}}
```

| Name     | Value        | Description                                   |
| :------- | :----------- | --------------------------------------------- |
| id       | video id     | 必填参数。(Type: String) 视频 ID。             |
| autoplay | true / false | 可选参数。(Type: String) 进入页面后自动播放。 |

</details>

### 🗃️静态文件（CSS、JS）

> Update: 2022.04.27

因为本博客整站都在 CDN 上，所以静态文件没有再使用另外的 CDN 加速了。
现在使用了 Hugo 自带的 Asset minification。

```
{{ $maincss := resources.Get "css/style.css" | resources.Minify | resources.Fingerprint "sha256" }}

<link rel="stylesheet" href="{{ $maincss.RelPermalink }}" integrity="{{ $maincss.Data.Integrity }}" crossorigin="anonymous">
```

> 更新：

部分静态文件已经放到 CDN 上，另一部分用 Webpack 打包。
```
npm install
# or
# npm update --save
npm run build
```

### 👍添加图标

> **Warning**  
> 目前博客使用的是 iconfont.cn 的图标。  
> 下面方法可用，但构建性能极差。

添加 Iconify 图标的方式：
> <https://icon-sets.iconify.design/>
```html
{{ partial "iconify.html" (dict "prefix" "akar-icons" "icon" "moon-fill" "width" "16" "height" "16") }}
```

### 🚨刷新 jsDelivr 缓存

将资源文件链接中的`cdn.jsdelivr.net`改为 `purge.jsdelivr.net`，在浏览器中请求即可刷新 CDN。
```diff
- https://cdn.jsdelivr.net/gh/eallion/eallion.github.io/style.css
+ https://purge.jsdelivr.net/gh/eallion/eallion.github.io/style.css
```
### 💥清理 Git 仓库
```
git rm -r --cached .
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### ➕安装插件 (可选)

新环境可选安装，若无必要可不用安装。

1. **安装插件**

```
npm install
```

2. **规范提交**
```
git add .
git commit -m "docs: post a new blog"
git push
```

Types:

```
feat        #新功能
fix         #Bug 修复
docs        #文档更新
style       #代码的格式，标点符号的更新
refactor    #代码重构
perf        #性能优化
test        #测试更新
build       #构建系统或者包依赖更新
ci CI       #配置，脚本文件等更新
chore       #非 src 或者 测试文件的更新
revert      #commit 回退
```

3. **Webpack**

```
npm run build
```

4. **生成 ChangeLog**

```
whatchanged --help
```

> or generate on [@release-lab/whatchanged](https://release-lab.github.io/?repo=https%3A%2F%2Fgithub.com%2Feallion%2Feallion.com&branch=main)

### 🖼️图片

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

### 📷相册

把照片放到 Hugo 仓库的`static/photos/`目录下，Hugo 会自动索引并生成相册页面。  
如：
- <https://eallion.com/penta/>
- <https://eallion.com/photos/>

也可利用相册模板新建相册：
```html
<div class="page-photos">
    <figure>
        <img loading="lazy" src="https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@gh-pages/photos/Focal-Fossa.png" alt="Focal-Fossa.png">
        <figcaption>Focal-Fossa</figcaption>
    </figure>
</div>
```

### 💡Lighthouse

Google Lighthouse 跑分。

- [查看跑分结果](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Feallion.github.io%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext)

### 📄LICENSE

This project is licensed under [MIT](https://opensource.org/licenses/MIT/) & [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) & [GLWTPL](https://github.com/me-shaon/GLWTPL/blob/master/translations/LICENSE_zh-CN).
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
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_large)
