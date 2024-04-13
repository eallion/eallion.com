---
title: "备忘 - 解决 Gravatar 头像问题"
authors: ["eallion"]
categories: ["日志"]
tags: ["头像","多说","gravatar"]
draft: false
slug: "problem-of-gravatar"
summary: "这篇文章介绍了如何解决Gravatar头像问题。作者建议将var/Typecho/Common.php文件中第939行的内容更改为指定的值。"
date: "2015-01-23 16:33:00"
lastmod: "2015-01-23 16:33:00"
---

将 var/Typecho/Common.php 中的第 939 行中的 [http://www.gravatar.com/](http://www.gravatar.com/) 改为 [http://gravatar.duoshuo.com/](http://gravatar.duoshuo.com/) 即可！

```php
$url = $isSecure ? 'https://secure.gravatar.com' : 'http://gravatar.duoshuo.com/ ';
```
