# A Hugo blog about *Charles 'eallion' Chin*
![Deploy Hugo](https://github.com/eallion/hugo/workflows/Deploy%20Hugo/badge.svg)

> Chance favors the prepared mind.

# Live demo:
> [https://eallion.com](https://eallion.com)

# Any questions?

> By Issue: [https://github.com/eallion/hugo/issues/new](https://github.com/eallion/hugo/issues/new)  
> By Email: `echo -n "ZWFsbGlvbkBlYWxsaW9uLmNvbQo=" | base64 -d`

---

# 备忘录:

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

>`https://cdn.jsdelivr.net/gh/eallion/hugo@gh-pages/images` + `/year/month/` + `images_name.xxx`  

- 如：
> `https://cdn.jsdelivr.net/gh/eallion/hugo@gh-pages/images/2006/04/eallion.jpg`