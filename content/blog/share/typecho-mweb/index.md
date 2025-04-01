---
authors:
- eallion
categories:
- 分享
date: '2017-04-10 08:36:00'
draft: false
lastmod: '2017-04-10 08:36:00'
slug: typecho-mweb
summary: 手机不离身却难及时记录灵感，浏览器写博客体验又差。发现 iOS 应用 MWeb 支持 Markdown 离线写作，通过 Metaweblog API
  配置博客地址、账号密码及 API 即可直接发布。需确保模板包含 EditURI 标签以兼容 API 调用，进阶用法可自定义 header 输出。此篇正是用 MWeb
  发布！
tags:
- typecho
- mweb
- ios
- 离线
title: iOS 离线发表博客的 APP MWeb
---
现在蹲在电脑前面的时间越来越少，但是手机都不会离身。
有时候出门在外，突然灵感迸发，如果没有及时记录下来，可能就永远也不会再回想起来了。
反正我自己就是这样的。

以前偶尔会用手机浏览器发表博客，但是手机浏览器的博客后台样式惨不忍睹啊。

最近终于找到了一款 iOS 上支持 markdown 的工具了。

[MWeb](http://zh.mweb.im/)

使用 MWeb 离线发表博客的方法：

 1. 在设置中增加发布服务
 2. 发布服务选择 Metaweblog API
 3. 在 Metaweblog API 中填入博客信息

     - 博客地址：[https://eallion.com](https://eallion.com) #你的博客首页
     - 账号：eallion #你的博客管理员用户名
     - 密码：111111 #你的账号的密码
     - API 地址：[https://eallion.com/action/xmlrpc](https://eallion.com/action/xmlrpc) #你的博客的 API
     - 博客名称：eallion #会自动提取

如果要正确使用 API 发表博客，请确保 `<head> </head>` 中有
`<link rel="EditURI"type="application/rsd+xml"title="RSD"href="https://eallion.com/action/xmlrpc?rsd">`

在模板的 header.php 里用 `<?php $this->header (); ?>` 会自动输出这些信息。
进阶用法：`<?php $this->header ("generator=&template=&keywords"); ?>`

> 本文就发表于 MWeb