---
authors:
- eallion
categories:
- 日志
date: 2024-01-14 12:58:31
draft: false
series:
- Mastodon
seriesNavigation: true
series_weight: 1
slug: fediverse
summary: 联邦宇宙 (Fediverse) 是一个由独立服务器组成的去中心化社交网络，用户只需注册任意实例账号即可跨平台互动，无需理解复杂技术原理。它通过
  ActivityPub 等开放协议实现互通，类比电话网络或电子邮件系统的互联逻辑。自建实例门槛低，2C2G 服务器即可运行 Mastodon，推荐使用 Docker
  部署。Meta 旗下 Threads 的加入印证了联邦化趋势，而轻量级方案如 GoToSocial 更适合低配设备。
tags:
- Fediverse
- Mastodon
- ActivityPub
- 联邦宇宙
- 长毛象
title: 联邦宇宙及 Mastodon 简介
---
> <i class="fab fa-mastodon"></i> [@e5n.cc@eallion](https://e5n.cc/@eallion)

### 前言：联邦宇宙没有门槛

![](/assets/images/posts/2024/01/14/A_view_into_the_Fediverse.png)

> 不要试图去理解它，要去感受它。——《信条》

**联邦宇宙** ([Fediverse <i class="fas fa-external-link-alt"></i>](https://zh.wikipedia.org/zh-cn/%E8%81%94%E9%82%A6%E5%AE%87%E5%AE%99) = federation + universe) 也许会给新用户带来高深莫测的感觉，但就像《信条》的这句名言一样，不要试图去理解它，要去使用它！联邦宇宙的使用没有门槛，上手非常简单——选择一个开放实例；注册一个账号；遵守它的规则；开始使用！如果不喜欢这个实例的规则？换一个就好。一个实例一般情况下就是一个域名网站。
联邦宇宙的使用没有门槛！你只需要有某一个实例的账号，就可以关注、评论、点赞其他实例上的用户及其文章。这些账号的域名不一样也没有关系，只要联邦协议相同，就能通信。
自建实例有门槛吗？只要你能想到要自建一个实例，那就没有门槛了。网上有非常多的手把手教程。
本人于 2017 年 4 月自建 Mastodon 服务，并 [加入联邦宇宙](https://mastodon.social/@eallion/3726552)，至今已有 7 年多。后因不明原因清空此 Mastodon（和 QQ 空间、微博、Twitter、Facebook 等），于 2023 年更换域名并公开实例 [e5n.cc](https://e5n.cc/)，所以对联邦宇宙略有心得，简单地分享一下经验。

> ╰(*°▽°*)╯：e5n = eallion 的 k8s 写法；cc = Charles Chin 的简写。

### 举个栗子 🌰

##### 1. 电话宇宙

如果你有一个「中国移动」的手机号，你可以给你朋友的 iPhone 中的「中国联通」手机号打电话、发短信，也可以给美国网友的三星手机中的「AT&T」手机号打电话、发短信。只要你知道了一个人的手机号，只要对方的手机和手机号所属运营商支持相同的通信协议，那你就可以给对方打电话、发短信了。
这样的一个手机通信网络，就可以称作一个「电话宇宙」或者「手机宇宙」。

##### 2. 电子邮件宇宙

上网冲浪的人，应该都有电子邮箱。你用 QQ 邮箱，可以给 Gmail 邮箱发电子邮件，可以给网易 163 邮箱发电子邮件，可以给 Hotmail 邮箱发电子邮件。只要对方提供的邮箱账号使用相同的电子邮件通信协议，那就可以互相收发邮件了。
这样的一个电子邮件通信网络，就可以称作一个「电子邮件宇宙」。

##### 3. 小结（转自维基百科）

[**联邦宇宙**](https://zh.wikipedia.org/zh-cn/%E8%81%94%E9%82%A6%E5%AE%87%E5%AE%99) 由一系列自由软件组成，有一组互联的服务器（用户自建或第三方托管），一起提供网络发布（如社交媒体、微博、博客或者网站）或者文件托管功能。虽然各个服务器是独立运行的，且各个实例繁多，内容多样，但服务器之间可以彼此互通。在不同的服务器（实例）上，用户可以创建不同帐号。这些帐号能够跨越实例边界而通信，因为服务器上运行的软件支持一种或多种遵循开放标准的通信协议。 [^1] 用户通过联邦宇宙中的帐号，可以发布文本或者其他媒体文件，也可以关注其他用户。[^2] 在某些情况下，用户可以公布或分享数据（如音频、视频、文本文件等），使其对所有或部分人开放并允许他们共同编辑内容（例如日历和黄页）。

![](/assets/images/posts/2024/01/14/Fediverse_branches_1.2.png)

### 名词解释

> 转自：《[联邦宇宙概论](https://zerovip.vercel.app/zh/59563/)》（[Web Archive](https://web.archive.org/web/20231206211606/https://zerovip.vercel.app/zh/59563/)）

##### 联邦宇宙 (fediverse)

所有联邦服务 (Federated Server) 的集合叫作联邦宇宙。

##### 联邦服务

是指独立部署但能互相通信的服务。这里的要点是能互相通信，功能是无关紧要的：社交网络、微博客、博客、普通网站、文件存储都可以。通信以联邦协议为标准。

##### 联邦协议

联邦宇宙中不同实例 (Instance) 间互相通信的协议 (Protocol)。

##### 实例 (Instance)

一个联邦服务叫作一个实例。也有人管一个实例叫一个 Pod。任何人都可以自选联邦协议写一个全新的实例，但更流行的做法是选择一个联邦宇宙软件生成一个实例。

##### 联邦宇宙软件

方便他人快速部署新实例的软件，可以按照某个联邦协议设计软件 API，也可以设计独有的 API。
最著名的软件就是：Mastodon。

##### 身份 (Identity)

在实例上注册的帐号叫作身份。在下文中我也会用用户这个大家比较熟悉的词。

##### 协议 (Protocol)

一套约定好的标准。协议相同意味着可以通信，即使两个实例分属于不同的联邦宇宙软件，只要协议相同就能通信。因此联邦宇宙是一个非常大的概念。
目前主流协议就是 Mastodon 所用的 ActivityPub 协议。

##### API（应用程序编程接口）

在一个联邦宇宙中 API 是指一个实例留出来的、可供其他程序与该实例通信的方法。完全自己写的实例要自己设计 API，用联邦宇宙软件生成的实例一般就是直接使用联邦宇宙软件设计的 API。

关于协议与 API 的区别：协议只是标准，API 是协议的具体实现。API 可以完全遵守协议，也可以只遵守一部分协议，也可以设计协议以外的 API。试着打个比方：假设全人类有共同的道德标准，那这套道德标准就是协议，各个国家的法律就是 API。有更好的比方嘛？

### 联邦协议举例

> 转自：《[联邦宇宙概论](https://zerovip.vercel.app/zh/59563/)》（[Web Archive](https://web.archive.org/web/20231206211606/https://zerovip.vercel.app/zh/59563/)）

常见的联邦协议有：

##### Zot 或 Zot/6 协议

给独立网站提供通信、身份（用户）管理、权限控制的去中心化网络连接。是一个近两年才出现的协议，但网站好像已经访问不了了，维基百科 Fediverse 词条中介绍到这里时给了一个官网的 InternetArchive 存档。

##### Diaspora 协议

[维基百科](https://en.wikipedia.org/wiki/Diaspora_%28social_network%29) 上写的是非营利、用户所有、分布式社交网络；<i class="fab fa-github fa-fw"></i>[Github 主页](https://github.com/diaspora/diaspora) 上写的是隐私感知、分布式、开源社交网络。
使用这个协议的联邦宇宙软件应该只有 diaspora*，也就是他们自己在用。这个联邦宇宙软件在 GitHub 上有 12.5k 的 star，2.9k 的 fork，2010 年开始的项目，到现在已经十年了，开发还是很活跃，release 有 88 个，但版本号升得很保守，才到 0.7.14.0。
说句题外话，在他们的 GitHub 主页我找到了一个 [所有开源社交网络服务的列表](https://podupti.me/)，里面记录了非常多的实例，以及它们的实例版本、所用的联邦宇宙软件、使用的协议、服务在线的运行时间（多少百分比的时间里服务没有宕机）、是否支持 IPv6、网络延迟、是否开放注册、用户数量等等非常非常多的信息。我试着搜索了一下我自己所在的实例，是可以搜索得到的。这个列表更新及时，真是一个宝藏列表！

##### OStatus 协议

根据 [维基百科](https://en.wikipedia.org/wiki/OStatus)，这是一个专门搞联邦微博客的协议，像长毛象 (Mastodon) 最早就是使用的这个协议。
这个协议是老前辈协议了，2010 年左右就搞出来了。2012 年 1 月 W3C 社区小组想维护并进一步开发这个协议，结果好景不长，2014 年 7 月来了个联邦社交网络工作小组 (W3C Federated Social Web Working Group)，这个联邦社交网络工作小组直接创造了一个新的协议，就把 Ostatus 协议给干趴下了。

##### ActivityPub 协议

这就是联邦社交网络工作小组创造出来的新协议，就是它掩盖了 Ostatus 协议的光芒。
按照维基百科、一个 <i class="fab fa-github fa-fw"></i>[Github issue #228：Ostatus，pump,io 和 ActivityPub 有什么不同](https://github.com/w3c/activitypub/issues/228) 以及 [ActivityPub 协议最后的致谢部分](https://www.w3.org/TR/activitypub/#acknowledgements) 来看，这个协议是基于 pump.io 的 API 设计的。且在设计之初就充分吸取了 OStatus 的经验教训，最后成为了一个成功的协议。
这个地方不知道有没有大佬给讲讲它和 Ostatus 协议具体的区别和改进的点是什么呀~ 我没有深入去查，反正知道 ActivityPub 很厉害就对了。
2017 年 9 月长毛象开始使用 ActivityPub 协议；2018 年 1 月 W3C 把这个协议作为了推荐标准；2019 年 1 月长毛象 [不再支持之前的 OStatus 协议](https://github.com/tootsuite/mastodon/pull/11205)。

### 实例推荐

> 转自：[https://o3o.ca/@jiangshanghan/105966250069371678](https://o3o.ca/@jiangshanghan/105966250069371678)

在 https://fediverse.party/en/portal/servers/ 这个页面可以按分类找到自己感兴趣的实例。
因为有的站长并不希望实例被公开，在此例举一些比较官方或者大型开放的实例：

| 原平台    | 平替      | 大型实例                             |
| --------- | --------- | ------------------------------------ |
| Twitter   | Mastodon  | https://joinmastodon.org/servers     |
| 微博      | Misskey   | https://misskey-hub.net/en/servers/  |
| Instagram | Pixelfed  | https://pixelfed.org/servers         |
| Facebook  | Friendica | https://dir.friendica.social/servers |
| Youtube   | Peertube  | https://joinpeertube.org/instances   |
| 写作      | Writee    | https://writee.org/                  |

为避免类似于支付宝嘲讽 Windows Phone 用户——“你为什么选择 1% 的生活？”所以我个人比较推荐选择联邦宇宙中支持 ActivityPub 主流协议的 Mastodon 及其 Fork 版本的实例。
Mastodon 官方运营的实例是：[https://mastodon.social/](https://mastodon.social/)
Misskey 的热度也很高，也很适合二次元用户。

PS：**推荐阅读**

- 《[Mastodon | 我流长毛象中文使用指北](https://mantyke.icu/posts/2021/386276df/)》（[Web Archive](https://web.archive.org/web/20240114161209/https://mantyke.icu/posts/2021/386276df/)）
- 《[Fediverse 不止 Mastodon——Misskey 介绍](https://akaito.xyz/post/misskey/)》（[Web Archive](https://web.archive.org/web/20240114161222/https://akaito.xyz/post/misskey/)）

### 自建实例

自建 Mastodon 实例的门槛主要在于服务器配置，1C1G 的配置确实很难运行 Mastodon 实例（优化后还是能用的），甚至 2C2G 的配置也要适当优化一下。目前我的个人实例 [e5n.cc](https://e5n.cc/) 就运行在 2C2G 的腾讯云轻量服务器上，限制了 256M 的 PostgreSQL 和 1 线程的 Sidekiq 任务。

另一个门槛是服务器不要位于局域网环境，才能和其他实例通信。

Mastodon 的媒体文件（图片、视频、表情等）存储逻辑是把其他实例的用户的媒体文件缓存到自己的实例中，并且官方实例默认（不魔改）不支持大多数 HTML 标签，不能用 `<img>` 贴图，所以需要比较大的硬盘空间来缓存。一般更实惠的做法是把媒体文件缓存到 s3 对象存储中。目前我的个人实例接入了 7 个 Relay 中继，一天产生 3-5G 的内容，这个取决于你关注的用户和中继站上的用户是不是话痨，是不是爱发图。实际体验中 Cloudflare R2 的免费 10G，缓存 2 天媒体是不够用的。

非常推荐这篇文章《[如何利用 Docker 搭建 Mastodon 实例（一）：基础搭建篇](https://pullopen.github.io/%E5%9F%BA%E7%A1%80%E6%90%AD%E5%BB%BA/2020/10/19/Mastodon-on-Docker.html)》（[Web Archive](https://web.archive.org/web/20240114161216/https://pullopen.github.io/%E5%9F%BA%E7%A1%80%E6%90%AD%E5%BB%BA/2020/10/19/Mastodon-on-Docker.html)）可以参考这篇文章手把手地通过 Docker 部署自己的 Mastodon 实例。不需要什么技术，只要你成功部署过 Docker 应用，那就可以顺利部署 Mastodon。如果不想用 Docker 部署也可以通过源代码安装 Mastodon，甚至更容易，官方文档写得很详细 https://docs.joinmastodon.org/admin/install/ 。

我的自建成本：

- 域名：e5n.cc ￥39.00/年
- 服务器：腾讯云轻量 硅谷 2C2G ￥144.00/年
- s3 存储：Cloudflare R2 低于 $1.00/月

特别推荐：如果手里只有低配的服务器，也想加入联邦宇宙，可以试试 Go 开发的基于 ActivityPub 协议的 [GoToSocial](https://gotosocial.org/)，个人体验过几个月，非常轻量，资源占用甚至低于 Memos：[Ref Status](https://e5n.cc/@eallion/111137527879448878)，缺点是没有自带前端应用（不算缺点），需要使用第三方应用发嘟文。

![](/assets/images/posts/2024/01/14/gotosocial_docker_stat.webp)

### 有趣的生态

> 长期更新

##### Mastodon 时间轴嵌入网站

> 源码：<i class="fab fa-gitlab fa-fw"></i>[idotj/mastodon-embed-timeline](https://gitlab.com/idotj/mastodon-embed-timeline) <i class="fab fa-github fa-fw"></i>[GitHub Mirror](https://github.com/eallion/mastodon-embed-timeline)

在您的网站上嵌入 Mastodon 时间线，展示帖子。非常容易设置，无需依赖项、无跟踪器、符合 WCAG 标准并且完全响应式。

我的博客中目前集成的 [嘀咕](https://www.eallion.com/toot/) 页面，就是用这个工具嵌入的。

##### Mastofeed

> 源码：<i class="fab fa-github fa-fw"></i>[fenwick67/mastofeed](https://github.com/fenwick67/mastofeed)

ActivityPub feed => iframe embed.
为博客等嵌入 Mastodon feeds。
在官网 [https://www.mastofeed.com/](https://www.mastofeed.com/) 页面上，简单地填入自己联邦账号信息就可以生成一段 `<iframe>` HTML 代码。

##### masto.js

> 源码：<i class="fab fa-github fa-fw"></i>[neet/masto.js](https://github.com/neet/masto.js/)

通用的 Mastodon API JavaScript 客户端。ELK 客户端就是用的 masto.js。

- 🌎 通用性：适用于 Node.js、浏览器和 Deno
- 📦 轻量级：运行时代码更少，压缩后只有 7kB+
- 📚 TypeScript：使用 TypeScript 编写，并提供类型定义
- 🧪 经过测试：使用真实的 Mastodon 服务器进行了 99% 的测试覆盖率
- 🤓 维护良好：自 2018 年以来由一个 Fediverse 爱好者积极维护

##### Wildebeest - 构建在 Cloudflare 上的 Fediverse

> 源码：<i class="fab fa-github fa-fw"></i>[cloudflare/wildebeest](https://github.com/cloudflare/wildebeest)

[Wildebeest](https://github.com/cloudflare/wildebeest) 是一个易于部署的开源服务器，与 ActivityPub 和 Mastodon 兼容，完全构建在 Cloudflare 的 Supercloud 之上。若想在 Fediverse 中运行自己的服务器，现在您可以完全通过 Cloudflare 实现。

Cloudflare 官方博客介绍：《[欢迎光临 Wildebeest：Cloudflare 上的 Fediverse](https://blog.cloudflare.com/zh-cn/welcome-to-wildebeest-the-fediverse-on-cloudflare-zh-cn/)》

Wildebeest 是一个兼容 ActivityPub 和 Mastodon 的服务器，其目标是让任何人都能在自己的域上运行他们的 Fediverse 服务器和身份，而无需保留基础设施，并且只需进行最少的设置和维护即可在几分钟内运行起来。

Wildebeest 在 Cloudflare 的 Supercloud 之上运行，使用 Workers、Pages、Durable Objects、Queues 以及 D1 数据库来存储元数据和配置信息。它还采用了 Zero Trust Access 来处理身份验证，并使用 Images 来处理媒体。

##### Mravatar

> 源码：<i class="fab fa-github fa-fw"></i>[HolgerHuo/Mravatar](https://github.com/HolgerHuo/Mravatar)

类似于 Gravatar 的 Mastodon 全球认可的头像 API。基于 Python 开发，可自行部署。

我的头像：`https://mravatar.r669.live/avatar/@eallion@e5n.cc`

##### Mastodon 驱动的博客评论系统

> 原文：[Toot toot! Mastodon-powered Blog Comments](https://cassidyjames.com/blog/fediverse-blog-comments-mastodon/)（[Web Archive](https://web.archive.org/web/20240115110326/https://cassidyjames.com/blog/fediverse-blog-comments-mastodon/)）

作者介绍了一种新鲜的做法，将 Mastodon 社交网络用作网站评论。它的最大好处是数据开放，不会被第三方控制，因为 Mastodon 是一个开放式、无中心的网络服务。

PS：《[长毛象 Mastodon / GoToSocial 做博客评论系统](https://www.ftls.xyz/posts/2023-08-14-mastodon-comments/)》- 恐咖兵糖

##### Mastodon Token 生成器

> 源码：<i class="fab fa-github fa-fw"></i>[takahashim/mastodon-access-token](https://github.com/takahashim/mastodon-access-token)

访问 Mastodon API 需要 Access_token，但由于 Mastodon 设置屏幕上目前没有直接获取 Access_token 的用户界面，因此我们创建了一个 SPA（单页应用程序）站点来从外部获取 Access_token。 （但是，如果您创建的是一个成熟的应用程序，而且第三方也将使用该应用程序，那么您应该在应用程序本身中实现这种机制，因此请将其视为仅供试验之用）。
我以前写过一篇文章《[NeoDB 获取 Access Token](https://www.eallion.com/neodb_token/)》，也可以用这个工具生成。

##### 仅用 6 个文件部署联邦实例

> 源码：<i class="fab fa-github fa-fw"></i>[rothgar/static-mastodon](https://github.com/rothgar/static-mastodon)

这篇文章的作者介绍道：他用 6 个文件部署了一个 Mastodon 实例。我试了下，真的可以关注他，只是不能通信。
实际只需要 1 个文件，但让实例看起来更完整用了 6 个文件：

- 2 个文件创建用户
- 2 个文件假装我们很受欢迎
- 2 张图片为了美观起见

```bash
.
├── .well-known
│  └── webfinger    <- user discovery (optional)
├── banner.png      <- banner image (optional)
├── followers       <- how many followers (optional)
├── following       <- how many following (optional)
├── image.jpg       <- profile image (optional)
└── justin          <- user information
```

### 几件小事

“种一棵树最好的时间是十年前，其次是现在”。联邦宇宙正生机勃勃，你觉得什么时候加入联邦宇宙是最好的时机呢？

##### Meta 的 Threads 为何要整合联邦宇宙

> [https://www.solidot.org/story?sid=77121](https://www.solidot.org/story?sid=77121)

> 去年底，Meta 邀请联邦宇宙的开发者和代表在其旧金山办公室召开了一次对话会议，Meta 的参与者包括了 Threads 团队和法务团队。联邦宇宙的规模仍然很小，如微博客服务 Mastodon 只有数百万活跃者，而 Threads 尽管只上线了 8 个月，相比 Mastodon 已经是一个相当于哥斯拉的庞然大物了。虽然 Meta 在 Threads 上线之初就宣布要支持联邦宇宙协议 ActivityPub，但几个月之后很多人认为 Threads 永远不会再整合 ActivityPub 实现与 Mastodon 等平台的互操作。然而 Meta 仍在推动这一计划，它已经宣布了整合时间表，目前处于第一阶段。为什么以围墙花园封闭著称的 Meta 会想要开放和互操作？与会者心中都有这一疑问。Meta 开发者的回答是他们认为这是社交总体上的一个发展方向。在马斯克收购 Twitter 之后，社交媒体名人对平台事实上拥有他们的跟随者越来越感到不舒服，他们想要一种能自由迁移的能力。这个观点有一定的道理，但说服力不高。与会代表则认为：1）Meta 觉得 Twitter 作为时代精神的一部分，重要而强大，对此深感兴趣，它效仿了 Google 应对 苹果 iPhone 的策略，推广一个他们能从中受益的开放竞争对手；2）Meta 担心对社交媒体的监管会加强，因此构建了一个绝对开放的平台，消除审查保守派言论或反垄断的争议，开放意味着用户可以自由迁移和自由转换；3）差异化，也许是某个产品经理的突发奇想；4) 扎克伯格真的讨厌埃隆马斯克，正尽一切努力摧毁 Twitter/X。

##### NeoDB 去年底至今主要更新

> [https://neodb.social/announcement/](https://neodb.social/announcement/9/)

> 个人标记增加了年度统计、筛选和排序；支持 BoardGameGeek 链接，Letterboxd 导入；启用了 ActivityPub，无论通过邮件还是联邦实例注册本站，每个用户有一个 @neodb.social 的身份与其它联邦宇宙实例互联。

### 扩展阅读

- [联邦宇宙 - 维基百科](https://zh.wikipedia.org/zh-cn/%E8%81%94%E9%82%A6%E5%AE%87%E5%AE%99)
- [Fediverse - Wikipedia](https://en.wikipedia.org/wiki/Fediverse)
- [https://o3o.ca/@jiangshanghan/105966250069371678](https://o3o.ca/@jiangshanghan/105966250069371678)
- 《[联邦宇宙概论](https://zerovip.vercel.app/zh/59563/)》（[Web Archive](https://web.archive.org/web/20231206211606/https://zerovip.vercel.app/zh/59563/)）
- 《[Mastodon | 我流长毛象中文使用指北](https://mantyke.icu/posts/2021/386276df/)》（[Web Archive](https://web.archive.org/web/20240114161209/https://mantyke.icu/posts/2021/386276df/)）
- 《[Fediverse 不止 Mastodon——Misskey 介绍](https://akaito.xyz/post/misskey/)》（[Web Archive](https://web.archive.org/web/20240114161222/https://akaito.xyz/post/misskey/)）
- 《[如何利用 Docker 搭建 Mastodon 实例（一）：基础搭建篇](https://pullopen.github.io/%E5%9F%BA%E7%A1%80%E6%90%AD%E5%BB%BA/2020/10/19/Mastodon-on-Docker.html)》（[Web Archive](https://web.archive.org/web/20240114161216/https://pullopen.github.io/%E5%9F%BA%E7%A1%80%E6%90%AD%E5%BB%BA/2020/10/19/Mastodon-on-Docker.html)）
- 《[Meta 的 Threads 为何要整合联邦宇宙](https://www.solidot.org/story?sid=77121)》
- 《[NeoDB 去年底至今主要更新](https://neodb.social/announcement/9/)》
- [Themed servers - Fediverse.Party - explore federated networks](https://fediverse.party/en/portal/servers/)
- [Mastodon - Decentralized social media](https://joinmastodon.org/)
- [GoToSocial - Fast, fun, ActivityPub server, powered by Go.](https://gotosocial.org/)
- [Misskey Hub – Official website of the Misskey Project](https://misskey-hub.net/en/)

[^1]: [Fed FAQ](https://web.archive.org/web/20170409030653/http://mastoguide.info/Pages/fedFAQ.html). Mastodon User Guide.([原始内容](http://mastoguide.info/Pages/fedFAQ.html) 存档于 2017-04-09).
[^2]: [What on Earth is the fediverse and why does it matter？](https://newatlas.com/what-is-the-fediverse/56385/). New Atlas. [2021-10-10]. （原始内容 [存档](https://web.archive.org/web/20210225021835/https://newatlas.com/what-is-the-fediverse/56385/) 于 2021-02-25).
