---
authors:
- eallion
categories:
- 代码
date: '2015-01-12 09:58:00'
draft: false
lastmod: '2015-01-12 09:58:00'
slug: mobile-meta
summary: 移动端网页通过 meta 标签优化显示效果，包括强制 1:1 视口比例、禁止缩放、启用全屏模式、定制状态栏样式、禁用电话识别以及关联 App 下载提示。这些设置能提升不同设备的浏览体验！
tags:
- 代码
- html
- meta
- 标签
title: 手机网页 meta 解释
---
```html
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta name="apple-itunes-app" content="app-id=432274380">
```

第一个 meta 标签表示：强制让文档的宽度与设备的宽度保持 1:1，并且文档最大的宽度比例是 1.0，且不允许用户点击屏幕放大浏览；

- width - viewport 的宽度
- height - viewport 的高度
- initial-scale - 初始的缩放比例  
- minimum-scale - 允许用户缩放到的最小比例
- maximum-scale - 允许用户缩放到的最大比例  
- user-scalable - 用户是否可以手动缩放

第二个 meta 标签是 iphone 设备中的 safari 私有 meta 标签，它表示：允许全屏模式浏览；

第三个 meta 标签也是 iphone 的私有标签，它指定的 iphone 中 safari 顶端的状态条的样式；
在 web app 应用下状态条（屏幕顶部条）的颜色；
默认值为 default（白色），可以定为 black（黑色）和 black-translucent（灰色半透明）。
注意：若值为 “black-translucent” 将会占据页面 px 位置，浮在页面上方（会覆盖页面 20px 高度–iphone4 和 itouch4 的 Retina 屏幕为 40px）。

第四个 meta 标签表示：告诉设备忽略将页面中的数字识别为电话号码；

第五个 meta 标签表示：这个标签是告诉 iphone 的 safari 浏览器，这个网站对应的 app 是什么，然后在页面上面显示一个下载 banner。