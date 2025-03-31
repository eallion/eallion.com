---
authors:
- eallion
categories:
- 日志
date: '2016-09-12 00:55:00'
draft: false
lastmod: '2016-09-12 00:55:00'
slug: getcdn
summary: 多家云服务商提供免费CDN服务，包括阿里云、腾讯云和七牛云，均支持HTTPS。作者因收到大量免费流量，搭建了自用前端加速服务getcdn.org。此前360的USESO停运导致多个WordPress站点瘫痪，促使作者意识到依赖第三方CDN的风险。目前getcdn.
tags:
- 阿里云
- cdn
- aliyun
- 网络分发
title: getcdn.org Aliyun CDN
---

> `getcdn.org`

很多云服务商都提供免费的 CDN，我在用的是阿里云，腾讯云，七牛云，都支持 HTTPS，不过腾讯云还在内测。

百度云不考虑。

突然之间，腾讯云和阿里云都给我送了好多 CDN 流量，抱着不用就是浪费的态度，我就做了一个前端静态文件加速：getcdn.org

起因是最近 360 的 USESO 突然停运，给很多人造成了不小的困扰。我正常运营的几个 WordPress ，前台后台都不能打开，最后从 MySQL 解决了问题。

连大厂的项目都不能信赖，看来还是自己能控制就自己控制。

虽然很多组织都提供前端库 CDN，不过经历了 USESO 这么个事，什么都不好说。

目前这个 getcdn.org 是自用的，实行域名白名单策略，成本几乎为 0，任何人都可以自己做 CDN 了，所以不会对外开放。