---
title: "备忘 - 解决评论用户链接问题"
images: ["https://og.eallion.com/api/og?title=%E5%A4%87%E5%BF%98%20-%20%E8%A7%A3%E5%86%B3%E8%AF%84%E8%AE%BA%E7%94%A8%E6%88%B7%E9%93%BE%E6%8E%A5%E9%97%AE%E9%A2%98"]
authors: ["eallion"]
categories: ["日志"]
tags: ["链接","新窗口","target","blank"]
draft: false
slug: "cheat-comment-user-link-solution"
date: "2015-01-23 16:34:00"
lastmod: "2015-01-23 16:34:00"
---

Typecho 默认的评论用户链接不是在新窗口打开的，修改 \var\Widget\Abstract\ 夹下的 Comments.php 文件，找到 373 行左右的这句：
原始：

```php
echo '<a href="' , $this->url , '"' , ($noFollow ? ' rel="external nofollow"' : NULL) , '>' , $this->author , '</a>';
```

修改为：

```php
echo '<a href="' , $this->url , '"' , ($noFollow ? ' rel="external nofollow"' : NULL) , ' target="_blank">' , $this->author , '</a>';
```
