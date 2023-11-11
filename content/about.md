---
title: "关于"
images: ["https://api.eallion.com/og?title=%E5%85%B3%E4%BA%8E"]
date: "2006-04-14 00:00:00"
type: "about"
layout: "about"
comment: true
---

<div class="greyQuote">
    <blockquote>
        <span id="hitokoto">:D 获取中...</span> - <cite><span id="author"></span></cite>
    </blockquote>
</div>
<script>
  fetch("https://api.eallion.com/hitokoto?c=k&charset=utf-8&encode=json")
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.querySelector('#hitokoto');
      hitokoto.innerText = data.hitokoto;
      const author = document.querySelector('#author');
        if (!data.from_who) {
          author.innerText = data.from;
        } else {
          author.innerText = data.from_who;
        }
    })
    .catch(console.error);
</script>

<img no-view src="/eallion.webp" alt="eallion">

我是「蜗牛」，不过一般都使用「大大的小蜗牛」作为网名。
本名没有什么内涵，略去不表。
早年常居鲁迅故里，钟情于江南水乡。
工作于电商之都。后为生计南下深港。

最喜欢的一句话，得于叔叔手札——「机会总是垂青于有准备的人！」

> [Chance favors the prepared mind.](https://en.wikipedia.org/wiki/Louis_Pasteur#Career) - _Louis Pasteur_

浅显易懂，并无玄机。后得知出处，是为座右铭。

### TL;DR

* 双子，B 型血，断掌，属虎。
* 已婚，有子。
* 不高不矮，~~不胖不瘦~~。
* 先天性乐观。
* 随意但不随便。
* 小众而不小资。
* 亦正亦邪。
* 不是个好人但从来不做坏事。

### 声明

本人只活跃在 [`GitHub`](https://github.com/eallion)、[`Mastodon`](https://e5n.cc/@eallion)、[`Steam`](https://steamcommunity.com/id/eallion)上，其他平台同名账号绝非本人所有。

本站拥有唯一域名 `eallion.com` 、二级域名 `www.eallion.com`。除此之外的相关、相似域名，除非由本人实名认证，或者备案在本人名下，否则皆为他人所有，或者被他人盗用信息，与本人无关。

本博客现在随缘更新，佛性写博。

自从简体中文网络环境越来越差，受网络监管和内容审查的影响，本博客已主动或被动删除 4000 多篇废话和流水账。 现在本博客基本上不会写时事，不会写政治，不蹭热点，不玩梗，不会发表犀利刻薄的评论。只会偶尔更新一些备忘录或小心得或无关紧要的随想。

以为刚开始，实际已结束。怀念过去的黄金时代。

不过多年以后，无论是现实还是网上的朋友，只要你来，只要没人逼我离开，我就还在这里。

> 另：本博客从 Typecho 转到 Hugo 时，脚本把 Typecho 中的几十篇草稿也转换了出来。所以本博客现在保留了一部分超简文章，虽然只有几个字，但是每当看到内容时，十多二十年前的旧时光就会从脑海徐徐漂过，当时的情景、当时的感受历历在目，仿佛从未远去。

### 说明

本博客嘀咕页面依赖 Mastodon 实例 https://e5n.cc ，评论系统依赖自建的 Artalk API: [https://api.eallion.com/artalk](https://api.eallion.com/artalk/sidebar) ，统计依赖自建的 Umami: https://a.eallion.com

### 版权信息

* [https://eallion.com/copyright/](https://eallion.com/copyright/)

### 隐私政策

* [https://eallion.com/privacy-policy/](https://eallion.com/privacy-policy/)

### 本站源码

* [https://github.com/eallion/eallion.com](https://github.com/eallion/eallion.com)

### Sitemap

* About me：[https://about.eallion.com](https://about.eallion.com/)
* 个人网址导航：[https://s.eallion.com](https://s.eallion.com/)
* 嘀咕：[https://eallion.com/toot/](https://eallion.com/toot/)
* 相册：[https://eallion.com/album/](https://eallion.com/album/)
* LOL Penta：[https://eallion.com/penta/](https://eallion.com/penta/)
* 观影记录：[https://eallion.com/movie/](https://eallion.com/movie/)
* 好物分享：[https://eallion.com/goods/](https://eallion.com/goods/)

### 联系方式

<div class="badge">
  <a><img no-view src="https://img.shields.io/badge/Gmail-eallions@gmail.com-blue?style=flat&labelColor=555&logo=gmail&logoColor=fff"></a>
  <a href="https://keybase.io/eallion/pgp_keys.asc?fingerprint=4f07c9a0617d7166f03be7cc6a9279328406fb6c" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/keybase/pgp/eallion?label=Keybase%20OpenPGP&logo=keybase&logoColor=fff&style=flat">
  </a>
</div>

### 社交

<div class="badge">
  <a href="https://github.com/eallion" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/GitHub-@eallion-blue?style=flat&labelColor=555&logo=GitHub&logoColor=fff">
  </a>
  <a href="https://e5n.cc/@eallion" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Mastodon-@eallion-blue?style=flat&labelColor=555&logo=mastodon&logoColor=fff">
  </a>
  <a href="https://steamcommunity.com/id/eallion" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Steam-@eallion-blue?style=flat&labelColor=555&logo=Steam&logoColor=fff">
  </a>
  <a href="https://twitter.com/eallion" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Twitter-@eallion-blue?style=flat&labelColor=555&logo=Twitter&logoColor=fff">
  </a>
  <a href="https://keybase.io/eallion" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Keybase-@eallion-blue?style=flat&labelColor=555&logo=Keybase&logoColor=fff">
  </a>
</div>

### 状态

<div class="badge">
  <a href="https://github.com/eallion/eallion.com/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/License-GLWT-green">
  </a>
  <a href="https://github.com/eallion/eallion.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/github/repo-size/eallion/eallion.com">
  </a>
  <a href="https://github.com/eallion/eallion.com/tags" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/github/v/tag/eallion/eallion.com">
  </a>
  <a href="https://github.com/eallion/eallion.com/tags" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/github/commits-since/eallion/eallion.com/v3.0.1/main">
  </a>
  <a href="https://github.com/eallion/eallion.com/commits/main" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/github/last-commit/eallion/eallion.com">
  </a>
</div>

### 鸣谢

<div class="badge">
  <a href="https://html5.org/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white">
  </a>
  <a href="https://www.w3.org/Style/CSS/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white">
  </a>
  <a href="https://www.javascript.com/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white">
  </a>
  <a href="https://gohugo.io" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/-Hugo-FF4088?style=flat&logo=Hugo&logoColor=white">
  </a>
</div>

<div class="badge">
  <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Aliyun-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=Alibaba-Cloud&amp;logoColor=fff">
  </a>
  <a href="https://artalk.js.org/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/AT-Artalk-blue">
  </a>
  <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Cloudflare-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=cloudflare&amp;logoColor=fff">
  </a>
  <a href="https://disqus.com/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Disqus-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=disqus&amp;logoColor=fff">
  </a>
  <a href="https://docker.com/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Docker-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=Docker&amp;logoColor=fff">
  </a>
  <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/GitHub-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=GitHub&amp;logoColor=fff">
  </a>
  <a href="https://github.com/actions" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/GitHub%20Actions-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=GitHub-Actions&amp;logoColor=fff">
  </a>
  <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Google-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=Google&amp;logoColor=fff">
  </a>
  <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Google%20Fonts-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=Google-Fonts&amp;logoColor=fff">
  </a>
  <a href="https://gravatar.com/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Gravatar-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=Gravatar&amp;logoColor=fff">
  </a>
  <a href="https://iconify.design/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Iconify-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=iconify&amp;logoColor=fff">
  </a>
  <a href="https://www.jsdelivr.com/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/jsDelivr-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=jsDelivr&amp;logoColor=fff">
  </a>
  <a href="https://cloud.tencent.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Tencent%20Cloud-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=tencent-qq&amp;logoColor=fff">
  </a>
  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/Vercel-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=Vercel&amp;logoColor=fff">
  </a>
  <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">
    <img no-view src="https://img.shields.io/badge/VS%20Code-blue?style=flat&amp;color=blue&amp;labelColor=555&amp;logo=visual-studio-code&amp;logoColor=fff">
  </a>
</div>
