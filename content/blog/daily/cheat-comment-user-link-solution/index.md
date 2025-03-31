---
authors:
- eallion
categories:
- 日志
date: '2015-01-23 16:34:00'
draft: false
lastmod: '2015-01-23 16:34:00'
slug: cheat-comment-user-link-solution
summary: Typecho评论用户链接默认不在新窗口打开，需修改Comments.php文件。找到373行附近代码，在原有链接代码中加入target="_blank"属性即可实现新窗口打开效果。
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