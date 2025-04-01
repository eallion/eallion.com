---
authors:
- eallion
categories:
- 日志
date: '2015-01-23 16:34:00'
draft: false
lastmod: '2015-01-23 16:34:00'
slug: cheat-comment-user-link-solution
summary: 通过修改 Typecho 的 Comments.php 文件，在评论用户链接的 a 标签中新增 target=_blank 属性，使所有用户点击链接时默认在新窗口打开页面。
tags:
- 链接
- 新窗口
- target
- blank
title: 备忘 - 解决评论用户链接问题
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