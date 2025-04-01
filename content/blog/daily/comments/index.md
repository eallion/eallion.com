---
authors:
- eallion
categories:
- 代码
date: 2020-12-03 04:12:12
draft: false
lastmod: 2020-12-03 04:12:12
slug: comments
summary: 静态博客需依赖第三方评论系统，主要分为 SaaS 类（如 Disqus）、GitHub Issues 类（如 Utterances）和 PaaS
  类（如 Valine）。Disqus 虽稳定但国内访问受限，GitHub 类存在网络波动问题，Valine 因安全性和闭源引发争议。衍生品 Twikoo 和 Waline
  成为新选择，前者基于腾讯云开发，后者专注安全性。
tags:
- hugo
- blog
- 博客
- 评论
title: 静态博客评论系统的选择
---
### 前言

静态博客跟传统博客不一样，没有自带评论系统。

以 PHP + Mysql 为代表的 Wordpress 这类动态博客，天然带有数据库存储评论，而且博客前后端本地进行数据交互，提交评论、渲染评论都很快。而静态博客只产生静态网页文件，评论系统均需要依赖第三方评论系统。

流行的第三方评论系统大致可以分为 3 类：

- Disqus 这类 SaaS 评论解决方案，无需部署，引入 API 即可使用；
- Gitalk 这类基于 GitHub Issues 的评论系统，依靠 GitHub 提供服务；
- Valine 这类基于 PaaS 的评论系统，需要自己部署在诸如 LeanCloud 这类平台上。

### 使用感受

因为每个人的主观意愿不一样，只能简单评价一下我自己的使用感受。我只写我使用过或测试过的。在文末会给出一些网上收集的评论系统。

#### 1、Disqus

Disqus 就是目前最优秀的评论系统。久经考验，服务稳定，体验良好。不仅限于博客，在各行各业的网站上都能看到它的身影。

但是迫于中国的网络环境，在境内并不能使用原生 Disqus，所以不建议面向中文读者的网站使用 Disqus。

基于这个原因，衍生出了一些 Disqus 代理 API，其中有一些使用体验还不错，如：[DisqusJS](https://github.com/SukkaW/DisqusJS.git) 和 [DisqusPHP](https://github.com/fooleap/disqus-php-api.git)，奈何世无完人金无足赤。

Disqus 另一个（缺点？）是稍显臃肿。

跟 Disqus 同类型的：

- [**来必力（LiveRe**](https://www.livere.com/)：来自韩国的评论系统；
- [**remark.ninja**](https://remark.ninja/)：LeanCloud 的博客在用；
- **多说**：早已停止服务，此致，敬礼！

#### 2、GitHub 类

基于 GitHub Issues 的评论系统，比较有名的有：

- [Utterances](https://utteranc.es/)
- Gitalk
- Gitment

这类评论系统依托于 GitHub 仓库，把 GitHub 仓库当成存储评论的数据库。这种设计理念我也不知道是不是算好，有点滥用开源资源的嫌疑。这 3 个中我推荐使用 Utterances，因为它的权限要得少而合理，没有安全隐患。Gitalk 应用索要的权限着实离谱，反正我是不会授权我的 GitHub 登录 Gitalk 去评论的。

GitHub 类评论系统也有 Disqus 一样的网络问题，在境内访问 GitHub 极度不稳定。好一点的是勉强能连上，没有完全不能用……

#### 3、Valine 及衍生品

Valine 地登场很惊艳，火爆了很长时间，可以说到现在依然很火爆。部署简单，容易上手，有很多保姆级别的教程，还有数不胜数的自定义 CSS 样式，连小白也能轻松配置。很多大佬也为 Valine 贡献创意和代码。Valine 渗透到很多角落。

但是伴随着 Valine 流行度的上升和用户下沉，Valine 的问题也慢慢浮现。其中有几个问题非常严重：

- 一是它不再开源，这让很多用户无法接受；
- 二是安全问题越来越多；
- 三是后端 LeanCloud 限流，LeanCloud 自己也出过安全问题。

在种种情况下，Valine 的衍生品就来了啊，各路豪杰纷纷表示要重新创造轮子。在网上也能搜到不少半成品。

目前发现比较优秀的有这几个：

- [Twikoo](https://twikoo.js.org)

  官方 [特色](https://twikoo.js.org/#%E7%89%B9%E8%89%B2)。采用腾讯云开发 CloudBase 作为后端数据库，隐私安全……

- [Waline](https://waline.js.org)

  官方 [特性](https://waline.js.org/#%E7%89%B9%E6%80%A7)。诞生的主要原因就是为了解决 Valine 的安全性问题的。Waline 采用的思路是设计一个类似于中间件的后端，避免前端直连数据库。后端支持多种部署方式，数据库也支持多种部署方式……

### 我的选择

> [Waline](https://waline.js.org) (With backend Valine.)

以前用 WordPress 和 Typecho 的时候，一直使用原生评论系统，没有这方面的忧虑。直到 2019 年底换到静态博客后，才发现评论系统的问题很严重。但是又不想再换回 Typecho 了。所以使用了大半年的 DisqusJS API，自己搭建在腾讯云香港轻量服务器上，速度还可以，稳定性也不错。但是慢慢发现评论越来越少，有需要咨询问题的朋友宁愿通过邮件或者 QQ 这些途径联系，也不会在博客上留言讨论。这让我开始反思评论系统的选择了。

刚好在这个时间，我发现了 [Twikoo](https://twikoo.js.org)，它吸引我的地方在于，它是部署在腾讯云 CloudBase 的，刚好我的博客也是部署在 CloudBase 上的，这正合我意啊，部署博客、评论、嘀咕一把梭，全都部署在 CloudBase 。因为登录多一个网站就多一份麻烦，我很怕麻烦。能在一个平台解决所有事情那肯定是最好的选择。

在这段时间里，[怡红公子](https://imnerd.org) 也把博客转到了静态博客 Hugo，也在着手开发 [Waline](https://waline.js.org) 了。我记得与他对话时他说了句原话是 “如果我早点发现 Twikoo，我也不会去开发 Waline 了”。在我的轮番骚扰和不断测试下，Waline 也支持了部署在 CloudBase，所以我在测试了一下 Twikoo 后回到了 Waline。Waline 的特性在官网有完整的描述，有兴趣的可以去看看对比一下。目前 Waline 虽然还没有 Release 正式版，但现在的版本已经很稳定好用了。作者每天晚上和周末都提交了很多 Commit，版本也在快速迭代中。

在使用体验上，这三者的差别都不大，主要体现在前端 UI 不同和加载速度上的轻微差别。安装方式也是一模一样。后端部署也都有保姆教程。我推荐从这 3 个评论系统中选择一个喜欢的评论系统即可。

### 网上搜索的评论系统

- Disqus
- Valine
- Waline
- Twikoo
- remark.ninja
- 来必力
- Gitalk
- Gitment
- Staticman
- Utterances
- Vssue
- HyperComments
- remarkbox
- IntenseDebate
- Vuukle
- Muut
- Vicomi
- Civil Comments
- Widget Pack Rating & Comment System
- Facebook comments
- HashOver
- Isso
- Blog Comments2
- Commento
- MiniValine
- ……