# A Hugo blog about *Charles 'eallion' Chin*

> Chance favors the prepared mind.

### Build status

[![构建状态](https://eallion.coding.net/badges/eallion/job/243839/main/build.svg)](https://eallion.coding.net/p/eallion/ci/job) [![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml)

### Any questions?

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallions@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallions@gmail.com&logoColor=fff&style=flat)](mailto:eallions@gmail.com) [![](https://img.shields.io/badge/t.me-@eallion-4ec100?labelColor=555&logo=telegram&logoColor=fff&style=flat)](https://t.me/eallion)

### Live demo:
- https://eallion.com

# 备忘录：

### 主仓库
> <https://github.com/eallion/eallion.com.git>

### 备份仓库
> Coding.net： <https://e.coding.net/eallion/eallion.com/hugo.git>

### 添加备份仓库 Remote

> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@git.eallion.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@e.coding.net/eallion/eallion.com/hugo.git
```

### 架构备忘

- 国内：通过 [Coding](https://coding.net/) 部署至腾讯云 [COS](https://cloud.tencent.com/product/cos) + [CDN](https://cloud.tencent.com/product/cdn) (2020.12.27)
- 境外：通过 GitHub Action 部署至 [GitHub Pages](https://eallion.github.io/) (2021.06.13)

<details>
<summary>CI/CD (Update:2021.07.31)</summary>
GitHub Actions
<pre>
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
          bash githash.sh
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
</pre>
Coding.net 持续集成部分命令
<pre>
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
        sh 'bash githash.sh'
        sh 'hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo'
        echo 'Hugo built!'
      }
    }
    stage('COS Deploy') {
      steps {
        sh 'coscmd config -a ${COS_SECRET_ID} -s ${COS_SECRET_KEY} -b ${COS_BUCKET_NAME} -r ${COS_BUCKET_REGION} -m 30'
        sh 'coscmd upload --delete --force -rs ${COS_UPLOAD_FROM_PATH} /'
        echo 'COS Deploy'
      }
    }
  }
}
</pre>
</details>

### 通过空提交运行 GitHub Acions

当没有新提交时， 通过 push empty commit 运行 GitHub Actions：

```
git commit --allow-empty -m "build: rerun github acions"
git push
```

### 写新文章

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
- `tags`（必填）按需修改
- `slug`（必填）按需修改
- `draft: true`（必填）改为：`draft: false`

4. **Push**:

```
git add .
git cz
# git commit -m "add: a new post"
git push
```

5. **本地调试**（~~Web Server~~）
```
hugo server -wD
```
个人常用：
```
hugo server -w -D -p 8080 -t hello-friend --enableGitInfo --bind 192.168.0.2 --baseURL 192.168.0.2
```
> 在浏览器中打开：http://192.168.0.2:8080
- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页
- `-w` 有文件变化立即刷新（默认开启）
- `-D` 构建草稿，撰写新文章时很有用
- `-p 8080` 指定端口号 8080（默认 1313）
- `-t hello-friend` 使用 hello-friend 主题
- `-enableGitInfo` 开启 GitIifo
- `--bind 192.168.0.2` 绑定 IP ，局域网其他设备 Debug 时很有用
- `--baseURL 192.168.0.2` 绑定域名（IP），局域网其他设备 Debug 时很有用
- `hugo server --help` 查看 server 所有命令

6. **本地构建**

本 Repo 已新增构建脚本：
- Linux 🖥️通过终端命令运行 `bash build.sh`
- Windows 🖱️双击鼠标运行 `build.bat`

手动构建命令：
```
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
```
- `--cleanDestinationDir` 构建前先清理目标目录，即 public
- `--forceSyncStatic` 强制同步 static 目录
- `--gc` 构建后执行一些清理任务（删除掉一些没用的缓存文件）
- `--ignoreCache` 构建时忽略缓存
- `--minify` 压缩网页代码
- `-enableGitInfo` 开启 GitIifo
- `hugo --help` 查看所有命令

### 静态文件（CSS、JS）
> Update: 2021.01.05

因为本博客整站都在 CDN 上，所以静态文件没有再使用另外的 CDN 加速了。
现在使用了 Hugo 自带的 Asset minification。

```
{{ $maincss := resources.Get "css/style.css" | resources.Minify | resources.Fingerprint "sha256" }}

<link rel="stylesheet" href="{{ $maincss.RelPermalink }}" integrity="{{ $maincss.Data.Integrity }}" crossorigin="anonymous">
```

### 刷新 jsDelivr 缓存

将资源文件链接中的`cdn.jsdelivr.net`改为 `purge.jsdelivr.net`，在浏览器中请求即可刷新 CDN。
```git
- https://cdn.jsdelivr.net/gh/eallion/eallion.github.io/style.css
+ https://purge.jsdelivr.net/gh/eallion/eallion.github.io/style.css
```
### 清理 Git 仓库
```
git rm -r --cached .
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### 安装插件 (可选)

新环境可选安装，若无必要可不用安装。

1. **安装插件**

> 可将 `-g` 改为 `--save-dev` 或 `-D`

```
npm install --save-dev postcss
npm install -g commitizen
npm install -g cz-conventional-changelog
npm install -g conventional-changelog-cli
npm install -g @commitlint/cli @commitlint/config-conventional
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
npm install -g husky
npx husky install
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

2. **规范提交**
```
git add .
git cz
# git commit -m "docs: post a new blog"
git push
```

Types:

```
feat 新功能
fix Bug 修复
docs 文档更新
style 代码的格式，标点符号的更新
refactor 代码重构
perf 性能优化
test 测试更新
build 构建系统或者包依赖更新
ci CI 配置，脚本文件等更新
chore 非 src 或者 测试文件的更新
revert commit 回退
```

3. **生成 ChangeLog**

```
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```
以上命令中参数`-p angular` 用来指定使用的 commit message 标准，参数-`i CHANGELOG.md` 表示从 `CHANGELOG.md` 读取 ChangeLog, `-s` 表示读写 ChangeLog 为同一文件。其中 `-r` 表示生成 ChangeLog 所需要使用的 release 版本数量，默认为 1，全部则是 0。

### 图片

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

### 相册

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

### Lighthouse

Google Lighthouse 跑分，本博客长期维持在满分 100 分。

- [查看实时跑分结果](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Feallion.com%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext#pwa)

### LICENSE

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
