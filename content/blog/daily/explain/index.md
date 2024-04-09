---
title: "简单说明 [新主机空间 域名备案]"
# images: ["/assets/images/og/explain.png"]
authors: ["eallion"]
categories: ["日志"]
tags: ["伪静态","说明"]
draft: false
slug: "explain"
summary: "文章讲述了作者原本使用美国主机的经历，但由于敏感词被墙，不得不更换主机。作者选择了三艾网络的主机，并解决了伪静态问题。文章还提到作者的博客因为转发韩寒的博文而受到和谐影响，导致部分页面无法打开。最后，作者通过在本地模拟 PHP 环境删除数据库中相关文章来解决问题，并表示以后会偶尔写一些心情小文。"
date: "2010-06-12 12:41:08"
lastmod: "2010-06-12 12:41:08"
---

本来一直用美国主机用得好好的。

可是 20 年前敏感词日期那几天原主机莫名其妙的被墙了。

虽然主机商免费提供了更换 IP。

但是那 IP 动不动就是 300+ms 偶尔还丢包超过 50%。

每天花在 PING 它的时间上远远多过聊 QQ 的时间了。

纠结之下就换了个三艾网络的主机。

200M 空间，正和我意。

win 2003 的系统虽然没有原来用的那几个 linux 主机用着那么方便。

但今天也把伪静态给解决了。

再加上这主机上海双线的网络。

速度那是刷刷刷的。

随便贴一下我现在用的这个伪静态 url rewrite rules 的完整 httpd.ini 文件内容。

```[ISAPI_Rewrite]

# Defend your computer from some worm attacks
#RewriteRule .*(?:global.asa|default\.ida|root\.exe|\.\.).* . [F,I,O]

# 3600 = 1 hour
 CacheClockRate 3600
 RepeatLimit 32
 # Protect httpd.ini and httpd.parse.errors files
 # from accessing through HTTP
 # Rules to ensure that normal content gets through
 RewriteRule /software-files/(.*) /software-files/$1 [L]
 RewriteRule /images/(.*) /images/$1 [L]
 RewriteRule /sitemap.xml/sitemap.xml [L]
 RewriteRule /favicon.ico/favicon.ico [L]
 # For file-based WordPress content (i.e. theme), admin, etc.
 RewriteRule /wp-(.*) /wp-$1 [L]
 # For normal WordPress content, via index.php
 RewriteRule ^/$ /index.php [L]
 RewriteRule /(.*) /index.php/$1 [L]
 ```

伪静态效果为 “域名 +postname” 即为本文地址栏里面的样式。

希望贴出来对有用的人有帮助。

好东西要分享嘛。

这个域名其实早就有备案号了。

趁现在这个机会就弄了个国内空间算了，反正也有备案号。

不得不顺便说一下国内的和谐啊。

我这博客里转发了韩寒 5 月 2 号的那篇博文。

原来好好的一直没事。

今天解析到三艾主机导入数据库后问题就来了。

发现只要出现了那篇博文里的被屏蔽的关键字的页面都打不开。

后台都打不开。

后台打不开的话那就意味着删除那篇文章都无法做到。

悲了个剧的。

纠结了很久之后灵机一动想到个笨办法。

把数据库导出到本地之后再在 localhost 模拟 PHP 环境后把数据库里的那篇文章才给删除。

万恶的和谐。

以后偶尔来写点心情小文算了。
