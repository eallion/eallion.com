---
authors:
- eallion
categories:
- 日志
date: '2015-01-23 16:33:00'
draft: false
lastmod: '2015-01-23 16:33:00'
slug: problem-of-gravatar
summary: 修改Typecho的Gravatar默认地址，把Common.php文件第939行的gravatar.com域名换成duoshuo.com的镜像站。具体操作是替换代码中的URL字符串，非加密连接时使用http://gravatar.duoshuo.com/这个新地址。
tags:
- 头像
- 多说
- gravatar
title: 备忘 - 解决 Gravatar 头像问题
---

将 var/Typecho/Common.php 中的第 939 行中的 [http://www.gravatar.com/](http://www.gravatar.com/) 改为 [http://gravatar.duoshuo.com/](http://gravatar.duoshuo.com/) 即可！

```php
$url = $isSecure ? 'https://secure.gravatar.com' : 'http://gravatar.duoshuo.com/ ';
```