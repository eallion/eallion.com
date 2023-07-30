---
title: "Typecho 中英文之间自动加上空格"
images: ["https://api.eallion.com/og?title=Typecho%20%E4%B8%AD%E8%8B%B1%E6%96%87%E4%B9%8B%E9%97%B4%E8%87%AA%E5%8A%A8%E5%8A%A0%E4%B8%8A%E7%A9%BA%E6%A0%BC"]
authors: ["eallion"]
categories: ["代码"]
tags: ["空格","space","pangu"]
draft: false
slug: "autospace"
date: "2019-11-29 09:29:00"
lastmod: "2019-11-29 09:29:00"
---

以前写博客，不太注意排版细节，而且那个时候也还没有 Markdown。
最近无意中点开几篇老文章看起来比较混乱。
所以决定统一调整一下格式，其中有一项就是把中英文之间自动加上空格。
本文主要讲怎么把中英文之间怎么自动加上空格。

GitHub 上有 2 个项目：
> [https://github.com/vinta/pangu.js](https://github.com/vinta/pangu.js "https://github.com/vinta/pangu.js")  

>[https://github.com/mastermay/text-autospace.js](https://github.com/mastermay/text-autospace.js "https://github.com/mastermay/text-autospace.js")

我选用了 `pangu.js`。
（当然也有 PHP 版本的：[pangu.php](https://github.com/linclancey/pangu.php)）

**# 用法**：
1、在 `footer.php` 中引入 pangu.js：

```
<script src="//cdn.jsdelivr.net/npm/pangu@4.0.7/dist/browser/pangu.min.js"></script>
```

（我加了白名单，请勿直接引用的我 cdn。）

2、在 `footer.php` 中加上：

```
<script>pangu.spacingElementById ('main');</script>
```

其中：

```
 pangu.spacingElementById ('main');
```

可以替换成：

```
  pangu.spacingElementById ('main');
  pangu.spacingElementByClassName ('comment');
  pangu.spacingElementByTagName ('p');
```

PS：`pangu.js` CDN：

```
 #  jsDelivr
 <script src="https://cdn.jsdelivr.net/npm/pangu@4.0.7/dist/browser/pangu.min.js"></script>
 
 # cdnjs
 <script src="https://cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js"></script>
 
 # 75 团 baomitu
 <script  src="https://lib.baomitu.com/pangu/4.0.7/pangu.min.js"></script>
 ```
