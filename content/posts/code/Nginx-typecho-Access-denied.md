---
title: "Nginx typecho Access denied"
categories: ["代码"]
tags: ["typecho","nginx","access","denied","403"]
draft: false
Comments: true
slug: "Nginx-typecho-access-denied"
date: "2017-03-19 01:08:00"
---

今天重新配置服务器，又到遇到了这个问题。
当配置好站点，重写 rewrite 规则，做好优化，准备收工的时候，发现 typecho 的所有二给页面都打不开，显示 `Access denied.`

官方已经给出了解决办法：<a href="http://docs.typecho.org/servers" target="_blank">http://docs.typecho.org/servers</a>

主要就是要修改 `/etc/php5/fpm/php.ini`：
```bash
cgi.fix_pathinfo = 1
```
但是 OneinStack 的位置在：`/usr/local/php/etc/php.ini`

然后重启 php 和 nginx 即可。


