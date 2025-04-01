---
authors:
- eallion
categories:
- 代码
date: '2017-03-19 01:08:00'
draft: false
lastmod: '2017-03-19 01:08:00'
slug: nginx-typecho-access-denied
summary: 服务器配置 Typecho 时遇到二级页面 Access denied 问题，需修改 php.ini 中的 cgi.fix_pathinfo 参数并重启服务。OneinStack
  环境下文件路径为 /usr/local/php/etc/php.ini，官方文档提供了详细解决方案！
tags:
- typecho
- nginx
- access
- denied
- '403'
title: Nginx typecho Access denied
---
今天重新配置服务器，又到遇到了这个问题。
当配置好站点，重写 rewrite 规则，做好优化，准备收工的时候，发现 typecho 的所有二给页面都打不开，显示 `Access denied.`

官方已经给出了解决办法：[http://docs.typecho.org/servers](http://docs.typecho.org/servers)

主要就是要修改 `/etc/php5/fpm/php.ini`：

```bash
cgi.fix_pathinfo = 1
```

但是 OneinStack 的位置在：`/usr/local/php/etc/php.ini`

然后重启 php 和 nginx 即可。