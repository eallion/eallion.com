# A Hugo blog about *Charles 'eallion' Chin*
![Deploy Hugo](https://github.com/eallion/hugo/workflows/Deploy%20Hugo/badge.svg)

> Chance favors the prepared mind.

# Live demo:

> <https://eallion.com>

# Any questions?

- Issue:
<https://github.com/eallion/eallion.com/issues/new>

- Email: 
<eallions@gmail.com>

- Slack:
<https://eallion.slack.com/archives/C016FNKM40K>

---

# 备忘录:

### 主仓库
> <https://github.com/eallion/eallion.com>  

### 备用仓库（多处备份）
> Keybase：<keybase://private/eallion/eallion.com>  
> 腾讯云 Coding： <https://e.coding.net/eallion/eallion.com/hugo.git>  
> 码云 Gitee： <https://gitee.com/eallion/eallion.com.git>  
> 阿里云 Codeup： <https://codeup.aliyun.com/eallion/hugo.git>  

### 架构备忘

- ~~国内：通过阿里云云效 Codeup & Flow 部署至：阿里云 OSS + CDN~~
- ~~国内：通过 [Coding](https://coding.net/) 部署至：[Gitee pages](https://eallion.gitee.io)~~
- ~~国内：通过 [Coding](https://coding.net/) 部署至：[Coding pages](https://blog.eallion.com)~~
- 国内：通过 GitHub Action 部署至腾讯云 [CloudBase](https://cloud.tencent.com/product/tcb)
- 境外：通过 GitHub Action 部署至 [GitHub Pages](https://eallion.github.io/)

### 添加备用仓库 remote
> default branch: main  
> remote url 传递 id:token 免输各个 git 仓库的账号密码

```
git remote set-url --add --push origin https://id:token@github.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@e.coding.net/eallion/eallion.com/hugo.git
git remote set-url --add --push origin https://id:token@gitee.com/eallion/eallion.com.git
git remote set-url --add --push origin https://id:token@codeup.aliyun.com/id/eallion/hugo.git
git remote set-url --add --push origin keybase://private/eallion/eallion
```

### 阿里云云效 Flow 部分命令
```
cd ../eallion_gohugo_????
dpkg -i hugo_latest.deb
cd ../eallion_hugo_????
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
find -maxdepth 1 -type d -not -name public -not -name "." -exec rm -rf {} \;
find -maxdepth 1 -type f -exec rm {} \;
rm -rf public/images
rm -rf public/photos
```

### Coding.net 流程部分命令
```
# Deploy to Coding Pages
rm -rf .git
cd public
git init
git remote add origin https://e.coding.net/eallion/eallion.com/public.git
git add .
git commit -m ${GIT_COMMIT}
git push -f https://id:token@e.coding.net/eallion/eallion.com/public.git HEAD:master

# Push public to Gitee Pages
# Deploy with GitHub Actions
rm -rf .git
git init
git remote add origin https://gitee.com/eallion/eallion.git
git add .
git commit -m ${GIT_COMMIT}
git push -f https://id:token@gitee.com/eallion/eallion.git HEAD:gh-pages
```

### 腾讯云 CloudBase Actions
> <https://github.com/marketplace/actions/tencent-cloudbase-github-action>

```
      - name: Deploy to Tencent CloudBase
        id: deployStatic
        uses: TencentCloudBase/cloudbase-action@v1.1.1
        with:
          secretId: ${{ secrets.CLOUDBASE_SECRET_ID }}
          secretKey: ${{ secrets.CLOUDBASE_SECRET_KEY }}
          envId: ${{ secrets.CLOUDBASE_ENV_ID }}
          staticSrcPath: public
```

### 部署到阿里云 OSS 的 Actions
> <https://github.com/marketplace/actions/uptoc-action>
```
      - name: Deploy to OSS
        uses: saltbo/uptoc@master
        with:
          driver: oss
          region: cn-shanghai
          bucket: ${{ secrets.bucket }}
          exclude: public/images,public/photos
          dist: public
        env:
          UPTOC_UPLOADER_AK: ${{ secrets.ACCESS_KEY_ID }}
          UPTOC_UPLOADER_SK: ${{ secrets.ACCESS_KEY_SECRET }}
```

### Gitee Pages Free 自动部署 Actions
> https://github.com/marketplace/actions/gitee-pages-action

```
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@master
        with:
          gitee-username: ${{ secrets.GITEE_USERNAME }}
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          gitee-repo: eallion/eallion
          branch: gh-pages
          # directory: /
          https: true
```

### 通过空提交运行 GitHub Acions

当没有新提交时， 通过 push empty commit 运行 GitHub Actions

```
git commit --allow-empty -m "Rerun GitHub Acions"
git push
```

### 写新文章

1. 生成新文章

```
hugo new posts/daily/new_title.md
```

2. 修改 Front matter:  

`categories` 删除多余的分类    
`tags` 按需添加
`draft: true` 改为：`draft: false`  
`slug` 按需修改

3. 写文章 

通过 Typora 或 VSCode 写文章

4. Push & auto deploy:

```
git add .
git commit -m "Post new_title"
git push
```

5. 本地调试（~~Web Server~~）

```
hugo server -w -D -p 8080 -t hello-friend
```
`hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页
`-w` 有文件变化立即刷新（默认开启）
`-D` 构建草稿，撰写新文章时很有用
`-p 8080` 端口+端口号（默认 1313）
`-t hello-friend` 使用 hello-friend 主题  
`hugo --help` 查看所有命令

- 6. 本地构建

```
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
```
`--cleanDestinationDir` 构建前先清理目标文件夹，即 public
`--forceSyncStatic` 强制同步 static 文件夹
`--gc` 构建后执行一些清理任务（删除掉一些没用的缓存文件）
`--ignoreCache` 构建时忽略缓存
`--minify` 压缩网页代码
`hugo --help` 查看所有命令

- 7. 本地部署至腾讯云 CloudBase
```
cd gpm/github.com/eallion/eallion.com

tcb hosting deploy public / -e TCB-envID
```
`public` 本地 Hugo 静态网页文件（能过第 6 步的命令构建）
`/` CloudBase 静态托管的目录，一般部署至根目录`/`
`-e TCB-envID` CloudBase 的环境 ID 
### 文章中图片处理方式

因为 jsDelivr 2020.08.15 的[新政策](https://www.jsdelivr.com/terms/acceptable-use-policy-jsdelivr-net)，现在没有用 GitHub + jsDelivr 当图床了。

现在写博客添加图片，需要手动添加图片地址。

原方法依然可用，注意图片URL即可。

- 图片存放目录：

> Hugo 目录的`static/images/`文件夹下（可按年月分类）。

- 文章中引用的图片 URL：

> `https://eallion.com/images` `+` `图片路径和名称`

- 如：

> `https://eallion.com/images/2020/05/ubuntu2004.jpg`

### 相册展示的照片

- 照片存放目录：

> 照片需要上传至腾讯云COS。但是本博客没有开启相册页面，无须操作。

> ~~Hugo 目录的`static/photos/`文件夹下，相册页面会自动索引。~~
