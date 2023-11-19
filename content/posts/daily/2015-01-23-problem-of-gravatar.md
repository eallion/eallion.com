---
title: "备忘 - 解决 Gravatar 头像问题"
images: ["https://og.eallion.com/api/og?title=%E5%A4%87%E5%BF%98%20-%20%E8%A7%A3%E5%86%B3%20Gravatar%20%E5%A4%B4%E5%83%8F%E9%97%AE%E9%A2%98"]
authors: ["eallion"]
categories: ["日志"]
tags: ["头像","多说","gravatar"]
draft: false
slug: "problem-of-gravatar"
date: "2015-01-23 16:33:00"
lastmod: "2015-01-23 16:33:00"
---

将 var/Typecho/Common.php 中的第 939 行中的 [http://www.gravatar.com/](http://www.gravatar.com/) 改为 [http://gravatar.duoshuo.com/](http://gravatar.duoshuo.com/) 即可！

```php
$url = $isSecure ? 'https://secure.gravatar.com' : 'http://gravatar.duoshuo.com/ ';
```
