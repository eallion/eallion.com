---
authors:
- eallion
categories:
- 日志
date: '2015-01-23 16:33:00'
draft: false
lastmod: '2015-01-23 16:33:00'
slug: problem-of-gravatar
summary: 该代码片段将 Typecho 默认的 Gravatar 头像服务地址从 http://www.gravatar.com/ 替换为 http://gravatar.duoshuo.com/，以解决国内访问
  Gravatar 不稳定的问题！
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