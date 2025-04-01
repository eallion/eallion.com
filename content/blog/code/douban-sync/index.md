---
authors:
- eallion
categories:
- 代码
date: 2023-07-14 14:41:16
draft: false
series:
- NeoDB
seriesNavigation: true
series_weight: 3
slug: douban-sync
summary: 豆瓣图片防盗链升级导致依赖其图片的服务失效，促使将观影记录迁移至开源平台 NeoDB。怡红公子的 drone-doumark 项目已支持同步到 NeoDB，同时发现现有教程可将豆瓣标记通过
  RSS 同步至 Notion 和 NeoDB。过程中需注意豆瓣 RSS 仅显示最新 10 条活动记录，且需调整标记可见度参数为公开。Notion 集成功能位置已变更至
  Connections 选项。
tags:
- hugo
- 豆瓣
- neodb
- notion
title: 豆瓣同步到 Notion 和 Neodb
---
### 更新

> 2023-07-24 更新：

怡红公子的 <i class="fab fa-github fa-fw"></i>[lizheming/drone-doumark](https://github.com/lizheming/drone-doumark) 已支持同步到 NeoDB 了。用上了。

### TL;DR

本文不是教程，只是介绍了一篇教程。《[豆瓣标记导出到 Notion 并同步](https://zhuzi.dev/2021/06/05/douban-backup-sync-notion/)》
利用 GitHub Actions 同步豆瓣标记的 [RSS](https://www.douban.com/feed/people/eallion/interests) 到 Notion 和 NeoDB。
注意事项：豆瓣的 RSS 只能订阅最新的 10 条。这 10 条是包括你在豆瓣所有的活动记录，不限于只标记电影。

### 前言

豆瓣图片防盗链策略升级后，引用豆瓣的图片的服务全挂了。
这么多年来，那么多豆瓣应用来来去去，前浪和后浪都死了。
豆瓣又来草我，那老子滚。
从商业的角度讲，豆瓣是没有一点错的。以前免费提供服务，我们理应感谢它。
不过，这些东西应该在文档和公告之类的地方讲清楚的。但它就是想强奸你。

我没想过要修复豆瓣了，以前不想，这次彻底死心。
然后我就把观影记录迁移到了 NeoDB。
以后可能就长期使用 NeoDB 了。
这也是很早就有的想法了，最早观察的平台其实是 [TMDB](https://www.themoviedb.org/)。

NeoDB 是 FOSS 应用，它做不下去了，我就去给她捐钱，就去给她贡献代码。

### 造轮子

做了 NeoDB 的 Hugo 独立 [观影](https://eallion.com/movie/) 页面后，一直在研究怎么把豆瓣观影记录同步过去的方法。

在测试了数十个各种各样的方法后，还是准备自己造轮子。
当时有两套方案：

一是基于 [豆瓣一键看过](https://chrome.google.com/webstore/detail/%E8%B1%86%E7%93%A3%E4%B8%80%E9%94%AE%E7%9C%8B%E8%BF%87/pbgoembbkcojdnfoadodfogngapepfmn) 这个 Chrome 插件改造，在它的基础上 Hook NeoDB 的 API 实现豆瓣标记后自动 POST 到 NeoDB。

二是基于怡红公子的 <i class="fab fa-github fa-fw"></i>[lizheming/drone-doumark](https://github.com/lizheming/drone-doumark) ，CRUD 一下，添加同步到 NeoDB 的代码。

在改造过程中，调试的时候遇到一个 Bug，去搜索 Bug 的时候，发现了一个宝藏——《[豆瓣标记导出到 Notion 并同步](https://zhuzi.dev/2021/06/05/douban-backup-sync-notion/)》

### 折腾

发现已经有人做了豆瓣同步到 NeoDB 的方法后，我就放弃了自己造轮子。在《[豆瓣标记导出到 Notion 并同步](https://zhuzi.dev/2021/06/05/douban-backup-sync-notion/)》的基础上完成了折腾。
我 Fork 了一个仓库，我会在 <i class="fab fa-github fa-fw"></i>[eallion/douban-backup](https://github.com/eallion/douban-backup) 完整的记录下我的修改。

基于原文，有 2 个坑我踩过了，特别记录一下：

1. 原仓库中上传的标记可见度为 `仅自己`。
    需要修改 [sync-rss.js](https://github.com/eallion/douban-backup/blob/66e144c634a5aeed82c0aca28059880d616ced8e/sync-rss.js#L196) 中的 `visibility: 2,` 为 `0`。`0` 表示 `公开`；`1` 表示 `仅关注者`；`2` 表示 `仅自己`

![](/assets/images/posts/2023/07/douban_backup_neodb_visibility.png)

2. Notion 的 Integration 已经升级了。
   原博客中提到的方法也不太准确了，邀请 Integration 机器人到自己的 Database 的时候，不是在 `Share` 里了，而是搬到了右上角 `•••` 中的 `Connections` 里了。

![](/assets/images/posts/2023/07/notion_integration.png)