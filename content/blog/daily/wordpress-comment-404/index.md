---
authors:
- eallion
categories:
- 日志
date: '2010-07-21 15:40:25'
draft: false
lastmod: '2010-07-21 15:40:25'
slug: wordpress-comment-404
summary: 博客评论功能因数据库表 wp_comments 中多出的 comment_favicon_url 字段而异常，删除该字段后恢复正常。推测是之前安装的插件卸载时未清理数据库导致。教训是谨慎装卸插件以避免类似问题！
tags:
- 提交评论
title: WordPress 提交评论出现 404 错误的解决办法
---
本博客的评论重新启动

坦白的说
中间这一段时间并不是我有意关闭了评论
我也是很无奈啊
莫名其妙的就不能提交评论了
从来没遇到过这样的情况
又没有时间去排查情况
既然不能提交评论索性我就把它给关了

今天无意在本地测试了一下 WordPress 的一个功能
配置好 localhost 环境
新建 Mysql 之后在各个数据表间大概浏览了一下
也没注意里面的情况就退出来了
（包括出问题的 wp_comments 也没仔细查看）
然后我就下载了服务器上的数据库导入到 localhost
发现导入到一半的时候出现 1054 错误

> #1054 – Unknown column ‘comment_favicon_url’ in ‘field list’

然后我再到我服务器上的 phpmyadmin 里面检查了一下 wp_commnets 表
这里面居然比健康的数据表多出 comment_favicon_url 这个字段
备份数据库之后毫不犹豫的删除它
然后……
博客评论功能完好如初了

分析原因之后
可能导致 wp_commnets 里多出 comment_favicon_url 是因为装了某个插件
插件卸载之后数据库却不会自动清理
所以好长一段时间里面的我博客都不能评论
我还因此沮丧过好长时间
明明很多的点击率却没人留言
原来是不能提交留言啊
很杯具
这教育我们不要随便装卸插件是对的