---
title: "备忘-解决Gravatar头像问题"
categories: ["日志"]
tags: ["头像","多说","gravatar"]
draft: false
slug: "problem-of-gravatar"
date: "2015-01-23 16:33:00"
---

将var/Typecho/Common.php中的第939行中的http://www.gravatar.com/改为http://gravatar.duoshuo.com/即可！
```php
$url = $isSecure ? 'https://secure.gravatar.com' : 'http://gravatar.duoshuo.com/ ';
```
