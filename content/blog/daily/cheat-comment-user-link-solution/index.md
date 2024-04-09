---
title: "备忘 - 解决评论用户链接问题"
# images: ["/assets/images/og/cheat-comment-user-link-solution.png"]
authors: ["eallion"]
categories: ["日志"]
tags: ["链接","新窗口","target","blank"]
draft: false
slug: "cheat-comment-user-link-solution"
summary: "文章介绍了解决评论用户链接问题的方法，通过修改 Typecho 默认的 Comments.php 文件中的代码实现在新窗口打开链接。"
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
