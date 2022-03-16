# A Hugo blog about *Charles 'eallion' Chin*

> Chance favors the prepared mind.

### Build status

[![构建状态](https://eallion.coding.net/badges/eallion/job/884628/build.svg)](https://eallion.coding.net/p/eallion/ci/job) [![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml)

### Any questions?

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallions@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallions@gmail.com&logoColor=fff&style=flat)](mailto:eallions@gmail.com) [![](https://img.shields.io/badge/t.me-@eallion-4ec100?labelColor=555&logo=telegram&logoColor=fff&style=flat)](https://t.me/eallion)

### Live demo:
- https://eallion.com

# 备忘录：

博客仓库结构：
```
.
├── .editorconfig                           # Editor 格式化插件配置文件
├── .frontmatter                            # Frontmatter 插件
│   └──content
│       └──mediaDb.json
│   └──templates
│       ├──code.md
│       ├──daily.md
│       ├──operation.md
│       ├──pages.md
│       └──share.md
├── .gitattributes                          # 定义文件的属性
├── .github                                 # GitHub Actions Workflow
│   └── workflows                           
│       ├── CODEOWNERS                      
│       └── main.yml                        
├── .gitignore                              # Ignore 文件
├── .gitlab-ci.yml                          # GitLab 的 CI 配置文件
├── .husky                                  # Husky 插件
│   ├── _                                   
│   │   ├── .gitignore                      
│   │   └── husky.sh                        
│   └── commit-msg                          
├── CHANGELOG.md                            # 自动生成的 Changlog 文件
├── GLWTPL                                  # GLWTPL 协议
├── LICENSE                                 # LICENSE 许可协议
├── README.md                               # Readme 说明文件
├── archetypes                              # 生成 Hugo 文章的模板
│   └── default.md                          
├── autocorrect                             # 中英文自动排版插件
├── coding.sh                               # 在 Coding.net CI 中用到的安装 Hugo 脚本
├── commitlint.config.js                    # Git 规范提交插件的配置文件
├── config.toml                             # Hugo 全站的配置文件
├── content                                 # 存放 Hugo 文章的目录
│   ├── _index.md                           
│   ├── about.md                            # 关于页面
│   ├── archives                            # 归档页面
│   │   └── _index.md                       
│   ├── book.md                             # 豆瓣阅读页面
│   ├── books.md                            # 豆瓣阅读页面
│   ├── copyright.md                        # 版权说明页面
│   ├── film.md                             # 豆瓣电影页面
│   ├── guestbook.md                        # 留言板页面
│   ├── link.md                             # 友情链接页面
│   ├── links.md                            # 友情链接页面
│   ├── movie.md                            # 豆瓣电影页面
│   ├── movies.md                           # 豆瓣电影页面
│   ├── penta.md                            # LOL 五杀相册页面
│   ├── photos.md                           # 相册页面
│   ├── posts                               # 存放 Hugo 博客文章的目录
│   │   ├── _index.md                       
│   │   ├── code                            # 代码博客分类目录
│   │   ├── daily                           # 日志博客分类目录
│   │   ├── operation                       # 运营小记博客分类目录
│   │   ├── share                           # 分享博客分类目录
│   │   └── sz                              # 朋友山贼写的博客的目录
│   ├── privacy-policy.md                   # 隐私条款页面
│   ├── search.md                           # 博客搜索页面
│   ├── tags                                # 博客 Tag 标签页面
│   │   └── _index.md                       
│   ├── talk.md                             # 嘀咕页面
│   ├── talks.md                            # 嘀咕搜索页面 Algolia 版
│   └── video.md                            # 豆瓣电影页面
├── data                                    # 生成友情链接的数据
│   └── hellofriend                         
│       └── social.toml                     
├── frontmatter.json                        # Frontmatter 配置文件
├── githash.sh                              # 获取最新一条 Git log hash 的脚本
├── package.json                            # NPM 包
├── resources                               
│   └── _gen                                
│       ├── assets                          
│       └── images                          
├── static                                  # 构建时自动同步的静态文件
│   ├── .well-known                         
│   │   └── keybase.txt                     # 用于 Keybase 认证文件
│   ├── 404.html                            # 404 页面
│   ├── CNAME                               # GitHub Pages 绑定域名的 CNAME 文件
│   ├── README.md                           # 用于 GitHub Pages 仓库的说明文件
│   ├── android-chrome-192x192.png          # PWA
│   ├── android-chrome-512x512.png          # PWA
│   ├── apple-touch-icon.png                # PWA
│   ├── favicon-16x16.png                   # PWA
│   ├── favicon-32x32.png                   # PWA
│   ├── favicon.ico                         # 博客图标
│   ├── key                                 # 个人公钥
│   ├── keybase.txt                         # 用于 Keybase 认证文件
│   ├── manifest.json                       # PWA
│   ├── mstile-150x150.png                  # PWA
│   ├── penta                               # LOL 五杀相册页面
│   ├── pgp_keys.asc                        # pgp keys
│   ├── photos                              # 相册页面
│   └── service-worker.js                   # PWA
├── themes                                  # 主题目录
│   └── hello-friend                        # Hello Friend 主题
│       ├── README.md                       # 主题的说明
│       ├── assets                          # 主题的静态资源目录
│       │   ├── css                         # CSS
│       │   │   ├── Bmdb.min.css            # Bmdb
│       │   │   ├── iconfont.css            # iconfont
│       │   │   ├── prism.css               # 代码高亮
│       │   │   └── style.css               # 主样式
│       │   └── js                          # JS
│       │       ├── Bmdb.js                 # Bmdb
│       │       ├── all.js                  # 新增的全部 JS
│       │       ├── jquery.toTop.js         # Go to top 插件
│       │       ├── lately.js               # 相对时间 JS 插件
│       │       ├── lately.old.js           # 相对时间 JS 插件备份
│       │       ├── main.js                 # 主 JS
│       │       ├── prism.js                # 代码高亮
│       │       ├── privacy.js              # ？
│       │       ├── search.js               # 搜索
│       │       ├── slimbox2.js             # 灯箱插件
│       │       └── waterfall.js            # ？
│       ├── layouts                         # 主题模板
│       │   ├── _default                    # 默认模板
│       │   │   ├── _markup                 
│       │   │   │   └── render-image.html   # 渲染图片
│       │   │   ├── about.html              # 关于页面
│       │   │   ├── baseof.html             # 基础框架
│       │   │   ├── books.html              # 豆瓣阅读页面
│       │   │   ├── chat.html               # Chat 分类目录专用
│       │   │   ├── copyright.html          # 版权信息模板
│       │   │   ├── link.html               # 友情链接模板
│       │   │   ├── list.atom.xml           # Atom RSS Feed 模板
│       │   │   ├── list.html               # List 模板
│       │   │   ├── list.html.html          # 主要的 List 模板
│       │   │   ├── movies.html             # 豆瓣电影模板
│       │   │   ├── path.html               # 读取相册目录的模板
│       │   │   ├── penta.html              # LOL 五杀相册的模板
│       │   │   ├── photos.html             # 相册模板
│       │   │   ├── privacy-policy.html     # 隐私政策的模板
│       │   │   ├── search.html             # 搜索模板
│       │   │   ├── single.html             # 文章页面模板
│       │   │   ├── talk.html               # 嘀咕页面模板
│       │   │   ├── talks.html              # 嘀咕搜索 Algolia 模板
│       │   │   └── terms.html              # Terms 模板
│       │   ├── archives                    # 归档目录
│       │   │   └── list.html               # 归档页面模板
│       │   ├── chat                        # Chat 目录
│       │   │   └── list.html               # Chat 模板
│       │   ├── index.json                  # 构建时自动生成用于搜索的 json 文件
│       │   ├── partials                    # 框架模板
│       │   │   ├── analytics.html          # 统计代码模板
│       │   │   ├── breadcrumb.html         # 文章头面包屑模板
│       │   │   ├── comments.html           # 评论模板
│       │   │   ├── footer-js.html          # 页脚压缩 JS 的模板
│       │   │   ├── footer.html             # 页脚模板
│       │   │   ├── githash.html            # 生成最新一条 Git log hash 的模板
│       │   │   ├── greater-icon.html       # Menu 图标模板
│       │   │   ├── head.html               # 页头模板
│       │   │   ├── header.html             # Header 模板
│       │   │   ├── lastmod.html            # 最新修改时间显示模板
│       │   │   ├── logo.html               # LOGO 模板
│       │   │   ├── menu.html               # Menu 模板
│       │   │   ├── pagination.html         # 分页模板
│       │   │   ├── talk.html               # 文章页引用面包屑样式的嘀咕模板
│       │   │   ├── theme-icon.html         # 切换暗黑样式的模板
│       │   │   └── toc.html                # 文章页 TOC 目录模板
│       │   ├── shortcodes                  # 集成的 Shortcodes
│       │   │   ├── code.html               # 代码
│       │   │   ├── figure.html             # 相册
│       │   │   ├── friend.html             # 友情链接
│       │   │   ├── image.html              # 图片
│       │   │   ├── imgproc.html            # 图片
│       │   │   ├── link.html               # 引用链接
│       │   │   └── music.html              # 音乐播放器
│       │   └── tags                        # 标签
│       │       └── list.html               # 标签 List
│       └── theme.toml                      # 主题配置

```

### 主仓库
> <https://github.com/eallion/eallion.com.git>

### 备份仓库
> Coding.net： <https://e.coding.net/eallion/eallion.com/hugo.git>

### 添加备份仓库 Remote

> Remote url 传递 id:token 免输各个 git 仓库的账号密码

```
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git
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
        useCustomStepPlugin(key: 'coding-public:cos_upload', version: 'latest', params: [region:'${COS_BUCKET_REGION}',bucket:'${COS_BUCKET_NAME}',remote:'/',local:'public/',secret_id:'${COS_SECRET_ID}',secret_key:'${COS_SECRET_KEY}'])
        echo 'COS Deploy'
      }
    }
#    stage('Tencent CloudBase Deploy') {
#      agent {
#        docker {
#          reuseNode true
#          registryUrl 'https://coding-public-docker.pkg.coding.net'
#          image 'public/docker/nodejs:14'
#          args '-v /root/.npm/:/root/.npm/'
#        }
#      }
#      steps {
#        sh 'npm i -g @cloudbase/cli'
#        sh 'tcb login --apiKeyId ${TCB_SECRET_ID} --apiKey ${TCB_SECRET_KEY}'
#        sh 'tcb hosting delete / -e ${TCB_SECRET_ENVID}'
#        sh 'tcb hosting deploy public -e ${TCB_SECRET_ENVID}'
#        echo 'CloudBase Deployed'
#      }
#    }
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
hugo server -w -D -p 8080 -t hello-friend --enableGitInfo --bind 192.168.0.5 --baseURL 192.168.0.5
```
> 在浏览器中打开：http://192.168.0.5:8080
- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页
- `-w` 有文件变化立即刷新（默认开启）
- `-D` 构建草稿，撰写新文章时很有用
- `-p 8080` 指定端口号 8080（默认 1313）
- `-t hello-friend` 使用 hello-friend 主题
- `-enableGitInfo` 开启 GitIifo
- `--bind 192.168.0.5` 绑定 IP ，局域网其他设备 Debug 时很有用
- `--baseURL 192.168.0.5` 绑定域名（IP），局域网其他设备 Debug 时很有用
- `hugo server --help` 查看 server 所有命令

6. **本地构建**

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
```diff
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
commitizen init cz-conventional-changelog --save --save-exact
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

Google Lighthouse 跑分。

- [查看跑分结果](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Feallion.github.io%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext)

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
