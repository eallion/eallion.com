---
authors:
- eallion
categories:
- 日志
date: 2020-12-19 15:38:00+08:00
draft: false
lastmod: 2020-12-19 15:38:00+08:00
slug: waline
summary: 博客评论系统多次更换，从Artalk、Disqus到Twikoo，最终因成本问题选择Waline。作者认为评论系统选择全凭个人喜好，推荐Disqus、Waline、Twikoo等，不推荐Gitalk和Valine。Waline是一款带后端的Valine衍生品，
tags:
- hugo
- blog
- waline
- comment
- 评论
title: 启用 Waline
---

> 更新：评论系统切换到 Artalk。

> 更新：因为维护成本偏高，评论系统已迁移至 Disqus。

> 更新：因为本博客部署在腾讯云，评论已启用 Twikoo。

> 更新：新开的腾讯云 CloudBase 的免费额度已不足以支撑评论系统的正常使用了。

> 更新：QA：“没有什么是国人玩不坏的。”

### 前言

经过一段时间的测试，现在本博客决定启用 Waline 评论系统。

在开始写这篇博文之前，我列了很多大纲，我以为我会写一篇长篇大论，实际开始写之后，我发现没什么好写的。人与人之间的感受并不相通。你喜欢的别人不见得会认同。就像 Waline 的作者怡红公子天天推荐我用 Vercel ，但我就是不太想用。

关于博客评论系统的选择，总结起来就是一句话，喜欢什么就用什么，什么顺手就用什么。

推荐的有：

- [Disqus](https://disqus.com/)
- [Waline](https://waline.js.org/)
- [Twikoo](https://twikoo.js.org/)
- [Artalk](https://artalk.js.org/)
- [Utterances](https://utteranc.es/)

不推荐的有：

- Gitalk
- Valine

更多详情可以参考 [《静态博客评论系统的选择》](https://eallion.com/comments/) 这篇流水账。

### Waline 简介

Waline - 一款从 [Valine](https://valine.js.org/) 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine。

**Waline 特性**

- 快速
- 真・安全
- Markdown 语法支持
- 轻量易用
- 免费部署
- 多种部署部署方式和存储服务支持，每列选择一项多达 48 种部署方式任君选择

| **客户端脚本** | **服务端部署** | **数据存储** |
| -------------- | -------------- | ------------ |
| @waline/client | Vercel         | LeanCloud    |
| MiniValine     | CloudBase      | CloudBase    |
|                | Docker         | MongoDB      |
|                | 独立部署       | MySQL        |
|                |                | SQLite       |
|                |                | PostgreSQL   |

其中，我为 CloudBase 和 Docker 作了不少贡献。

也正是因为在我的建议下，怡红公子非常积极的开发 CloudBase 版，我才选择使用 Waline。

### 彩蛋

Waline 有提供数据迁移助手。~~ 目前是一个隐藏界面，没有公开。~~

> [https://waline.js.org/migration/tool.html](https://waline.js.org/migration/tool.html)

支持从 5 种来源、3 种目标一共 15 种数据迁移方式。

| 来源    | 目标                                  |
| ------- | ------------------------------------- |
| Valine  | LeanCloud Waline                      |
| Disqus  | CloudBase Waline                      |
| Twikoo  | Waline MySQL/PostgreSQL/SQLite Waline |
| Typecho |                                       |
| Artalk  |                                       |

### 疑惑

> Q：Waline 部署在 LeanCloud 有流控吗？

A：**没有！** Waline 的设计理念就是一个后端程序，是一个网页客户端与数据库之间的「中间件」。比如选择 Vercel + LeanCloud 的方式部署 Waline，那么 LeanCloud 只是存储评论数据的数据库，而类似于 Valine-admin 这样的邮件通知服务是在 Vercel 后端完成的（同理部署在 CloudBase 上就由云函数完成），跟 LeanCloud 的「云引擎」无关。

> Q：免费额度够用吗？

A：作为正常博客使用，Vercel、CloudBase、Docker 都是够的。

- Vercel： 免费 100G / 月（[说明文档](https://vercel.com/pricing)）
- CloudBase：免费 1000GBs / 月、500 读操作数 / 天（[说明文档](https://cloud.tencent.com/document/product/876/47816)）
- Docker / VPS：取决于自己的 VPS 额度

> Q：这是不是软文？

A：我也不知道算不算。这是我自愿写的，作者也没有给我广告费。在前段时间的 Valine 刷评风波中，我相信应该不是作者去搞的，我选择支持一波。

> Q：有没有其他好东西推荐？

A：没有！就算你有发现，也不应该说出来，大家都懂得的。没有什么是国人玩不坏的。