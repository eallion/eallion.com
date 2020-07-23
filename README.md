# A Hugo blog about *Charles 'eallion' Chin*
![Deploy Hugo](https://github.com/eallion/hugo/workflows/Deploy%20Hugo/badge.svg)

> Chance favors the prepared mind.

# Live demo:
> <https://eallion.com>

# Any questions?

- Issue:
<https://github.com/eallion/eallion.com/issues/new>

- Email: 
`echo -n "ZWFsbGlvbnNAZ21haWwuY29t" | base64 -d`

---

# 备忘录:

### 主仓库
> <https://github.com/eallion/eallion.com>

### 备用仓库
> <https://codeup.aliyun.com>

### 架构备忘

- 国内：通过阿里云云效 Codeup & Flow 部署至：阿里云 OSS + CDN
- 境外：通过 GitHub Action 部署至 GitHub Pages

### 添加阿里云云效 Codeup remote
```
git remote set-url --add --push origin https://codeup.aliyun.com/abcdefghijklmnopqrstuvwxyz/eallion/hugo.git
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
hugo version
```

### 通过空提交运行 GitHub Acions

当没有新提交时， 通过 push empty commit 运行 GitHub Actions

```
git commit --allow-empty -m "Rerun GitHub Acions"
git push
```

### 写新文章
- 1、生成新文章

```
hugo new posts/chat/new_title.md

hugo new posts/code/new_title.md

hugo new posts/daily/new_title.md

hugo new posts/operation/new_title.md

hugo new posts/share/new_title.md
```

- 2、修改 Front matter:  

`categories` 删除多余的分类    
`draft: true` 改为：`draft: false`  
`slug` 按需修改

- 3、写文章  

- 4、Push & auto deploy:
```
git add .
git commit -m "Post new_title"
git push
```

### 文章中图片处理方式
- 图片存放目录：

> Path/hugo/static/images/year/month/images_name.xxx

- 文章中图片 URL：

> `https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@master/images` + `/year/month/` + `images_name.xxx`  

- 如：

> `https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@master/images/2006/04/eallion.jpg`