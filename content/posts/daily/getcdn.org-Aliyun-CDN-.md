---
title: "getcdn.org Aliyun CDN "
categories: ["日志"]
tags: ["阿里云","cdn","aliyun","网络分发"]
draft: false
slug: "getcdn"
date: "2016-09-12 00:55:00"
---

> `getcdn.org`

很多云服务商都提供免费的CDN，我在用的是阿里云，腾讯云，七牛云，都支持HTTPS，不过腾讯云还在内测。

百度云不考虑。

突然之间，腾讯云和阿里云都给我送了好多CDN流量，抱着不用就是浪费的态度，我就做了一个前端静态文件加速：getcdn.org

起因是最近360的USESO突然停运，给很多人造成了不小的困扰。我正常运营的几个 WordPress ，前台后台都不能打开，最后从MySQL解决了问题。

连大厂的项目都不能信赖，看来还是自己能控制就自己控制。

虽然很多组织都提供前端库CDN，不过经历了USESO这么个事，什么都不好说。

目前这个getcdn.org是自用的，实行域名白名单策略，成本几乎为0，任何人都可以自己做CDN了，所以不会对外开放。
