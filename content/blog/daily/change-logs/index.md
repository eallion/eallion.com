---
authors:
- eallion
categories:
- 日志
date: '2016-08-15 14:13:00'
draft: false
lastmod: '2016-08-15 14:13:00'
slug: change-logs
summary: 今天在移除博客评论的 UserAgent 信息时遇到意外错误，常规方法无效，最终发现是系统文件被误修改导致。耗时排查提醒我们：即使面对微小代码改动，养成注释和记录习惯也至关重要！
tags:
- 笔记
- log
- 备份
- 备忘
- 注释
title: 修改代码一定要做笔记
---
今天为了去掉我的博客的评论里面的 UserAgent 显示信息，老是出错，各种常规方法都试过了，还是出错。本来只是随手打算修改一下，没想到后来却要花费一些专门的时间来定位错误，结果显示是当时修改了系统文件。耽误了好多时间，哪怕是一个很小的代码，养成注释和笔记的习惯真的很重要。