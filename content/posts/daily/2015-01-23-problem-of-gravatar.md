---
title: "备忘 - 解决 Gravatar 头像问题"
authors: ["eallion"]
categories: ["日志"]
tags: ["头像","多说","gravatar"]
draft: false
slug: "problem-of-gravatar"
date: "2015-01-23 16:33:00"
---

将 var/Typecho/Common.php 中的第 939 行中的 <http://www.gravatar.com/> 改为 <http://gravatar.duoshuo.com/> 即可！

```php
$url = $isSecure ? 'https://secure.gravatar.com' : 'http://gravatar.duoshuo.com/ ';
```
