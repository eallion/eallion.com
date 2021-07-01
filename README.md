# A Hugo blog about *Charles 'eallion' Chin*

> Chance favors the prepared mind.

### Build status

[![构建状态](https://eallion.coding.net/badges/eallion/job/243839/build.svg)](https://eallion.coding.net/p/eallion/ci/job) [![Build Hugo and Deploy](https://github.com/eallion/eallion.com/actions/workflows/main.yml/badge.svg)](https://github.com/eallion/eallion.com/actions/workflows/main.yml)

### Any questions?

[![GitHub issues](https://img.shields.io/github/issues/eallion/eallion.com?logo=GitHub&color=4ec100&style=flat)](https://github.com/eallion/eallion.com/issues/new) [![](https://img.shields.io/badge/eallions@gmail.com-4ec100?labelColor=555&logo=gmail&label=Gmail&link=mailto:eallions@gmail.com&logoColor=fff&style=flat)](mailto:eallions@gmail.com) [![](https://img.shields.io/badge/t.me-@eallion-4ec100?labelColor=555&logo=telegram&logoColor=fff&style=flat)](https://t.me/eallion)

### Live demo:
- https://eallion.com  
- https://eallion.gitee.io
- https://eallion.github.io
- https://eallion.gitlab.io
- https://eallion.netlify.app
- https://eallion.pages.dev
- https://eallion.vercel.app
- https://eallion.web.app

# 备忘录:

### 主仓库
> <https://github.com/eallion/eallion.com.git>  

### 备份仓库
> Keybase：<keybase://private/eallion/eallion.com.git>  
> Coding.net： <https://e.coding.net/eallion/eallion.com/hugo.git>  
> 码云 Gitee： <https://gitee.com/eallion/eallion.com.git>  
> 阿里云 Codeup： <https://codeup.aliyun.com/eallion/hugo.git>    
> 腾讯工蜂： <https://git.code.tencent.com/eallion/eallion.com.git>  

### 添加备份仓库 Remote
> default branch: main  
> remote url 传递 id:token 免输各个 git 仓库的账号密码

```
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@e.coding.net/eallion/eallion.com/hugo.git
git remote set-url --add --push origin https://id:token@git.code.tencent.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@gitee.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@codeup.aliyun.com/id/eallion/hugo.git
git remote set-url --add --push origin keybase://private/eallion/eallion
```

### 架构备忘
- 国内：通过 [Coding](https://coding.net/) 部署至腾讯云 [COS](https://cloud.tencent.com/product/cos) + [CDN](https://cloud.tencent.com/product/cdn) (2020.12.27)
- 境外：通过 GitHub Action 部署至 [GitHub Pages](https://eallion.github.io/) (2021.06.13)

<details>
<summary>CI/CD</summary>

### Coding.net 持续集成部分命令
```
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]]])
        }
      }
      stage('Build Hugo') {
        agent {
          docker {
            image 'envimate/hugo:latest'
            reuseNode true
          }
        }
        steps {
          sh 'hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify'
        }
      }
      stage('上传到 COS Bucket') {
        steps {
          sh 'coscmd config -a ${COS_SECRET_ID} -s ${COS_SECRET_KEY} -b ${COS_BUCKET_NAME} -r ${COS_BUCKET_REGION} -m 30'
          sh 'coscmd upload -r ${COS_UPLOAD_FROM_PATH} /'
          echo '部署成功！'
        }
      }
    }
  }
```

### 同步到 Gitee 并自动部署 Gitee Pages
```
name: Sync to Gitee and Deploy

on: page_build

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
           source-repo: git@github.com:eallion/eallion.github.io.git
          # 注意替换为你的 Gitee 目标仓库地址
           destination-repo: git@gitee.com:eallion/eallion.git

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
           gitee-username: eallion
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
           gitee-repo: eallion/eallion
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh-pages
```
</details>

### 通过空提交运行 GitHub Acions

当没有新提交时， 通过 push empty commit 运行 GitHub Actions：

```
git commit --allow-empty -m "👷build: rerun github acions"
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

3. **修改 Front matter**:  

- `categories` 按需修改  
- `tags` 按需修改  
- `slug` 按需修改  
- `draft: true` 改为：`draft: false`  

4. **Push**:

```
git add .
git commit -m "📝add: a new post"
git push
```

Push 后自动运行的 CI/CD：
- GitHub Pages
- Coding.net
- CloudBase
- GitLab CI
- Firebase
- Netlify
- Vercel
- Cloudflare Pages
- Gitee

5. **本地调试**（~~Web Server~~）
```
hugo server -wD
```
个人常用：
```
hugo server -w -D -p 8080 -t hello-friend --bind 192.168.0.2 --baseURL 192.168.0.2
```
> 在浏览器中打开：http://192.168.0.2:8080
- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页  
- `-w` 有文件变化立即刷新（默认开启）  
- `-D` 构建草稿，撰写新文章时很有用  
- `-p 8080` 指定端口号 8080（默认 1313）  
- `-t hello-friend` 使用 hello-friend 主题  
- `--bind 192.168.0.2` 绑定 IP ，局域网其他设备 Debug 时很有用  
- `--baseURL 192.168.0.2` 绑定域名（IP），局域网其他设备 Debug 时很有用  
- `hugo server --help` 查看 server 所有命令  

6. **本地构建**

本 Repo 已新增构建脚本：
- Linux，通过终端命令运行 `bash build.sh`
- Windows 鼠标双击运行 `build.bat`

手动构建命令：
```
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
```
- `--cleanDestinationDir` 构建前先清理目标文件夹，即 public  
- `--forceSyncStatic` 强制同步 static 文件夹  
- `--gc` 构建后执行一些清理任务（删除掉一些没用的缓存文件）  
- `--ignoreCache` 构建时忽略缓存  
- `--minify` 压缩网页代码  
- `hugo --help` 查看所有命令  

### 静态文件（CSS、JS）
> Update: 2021.01.05  

因为本博客整站都在 CDN 上，所以静态文件没有再使用另外的 CDN 加速了。  
现在使用了 Hugo 自带的 Asset minification。  

```
{{ $maincss := resources.Get "css/style.css" | resources.Minify | resources.Fingerprint "sha256" }}
<link rel="stylesheet" href="{{ $maincss.RelPermalink }}" integrity="{{ $maincss.Data.Integrity }}" crossorigin="anonymous">
```

<details>
<summary>Update: 2020.12.18</summary>

2020.12.18 从腾讯云换到了 jsDelivr。  
</details>

#### PS：刷新 CDN

将资源文件链接中的`cdn.jsdelivr.net`改为 `purge.jsdelivr.net`，在浏览器中请求即可刷新 CDN。

<details>
<summary>旧方法：</summary>

通过打 Tag 的方式刷新 jsDelivr 的 CDN  
`tag`对应`commit`  
```
git tag vX.X.X
git push origin vX.X.X

# git push origin --tags # 推送所有 Tags
```
</details>

### 文章中图片处理方式

因为 jsDelivr 2020.08.15 的[新政策](https://www.jsdelivr.com/terms/acceptable-use-policy-jsdelivr-net)，现在没有用 GitHub + jsDelivr 当图床了。

现在写博客添加图片，需要手动添加图片地址。

一般本博客优先使用腾讯云 COS，图床链接为：`https://images.eallion.com/`

<details>
<summary>原方法：</summary>

原方法依然可用，注意图片URL即可。

- 图片存放目录：

> Hugo 目录的`static/images/`文件夹下（可按年月分类）。

- 文章中引用的图片 URL：

> `https://eallion.com/images` `+` `图片路径和名称`

- 如：

> `https://eallion.com/images/2020/05/ubuntu2004.jpg`
</details>

### 相册展示的照片

- 照片存放目录：

> 本博客没有开启相册页面，无须操作。

Hugo 目录的`static/photos/`文件夹下，相册页面会自动索引。白嫖的 jsDelivr CDN。


### Lighthouse

Google Lighthouse 跑分，本博客长期维持在满分 100 分。

- [查看跑分结果](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Feallion.com%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext#pwa)

### LICENSE

This project is licensed under [MIT](https://opensource.org/licenses/MIT/) & [GLWTPL](https://github.com/me-shaon/GLWTPL/blob/master/translations/LICENSE_zh-CN).
<details>
<summary>MIT license</summary>

```
MIT License

Copyright (c) 2021 Charles Chin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
</details>

<details>
<summary>GLWT Public License</summary>

```
GLWT（Good Luck With That，祝你好运）公共许可证
版权所有 © 每个人，除了作者

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
</details>

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Feallion%2Feallion.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Feallion%2Feallion.com?ref=badge_large)