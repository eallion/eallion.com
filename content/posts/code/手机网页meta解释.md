---
title: "手机网页meta解释"
categories: ["代码"]
tags: ["代码","html","meta","标签"]
draft: false
slug: "mobile-meta"
date: "2015-01-12 09:58:00"
---

```html
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta name="apple-itunes-app" content="app-id=432274380">
```

第一个meta标签表示：强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览；

 - width - viewport的宽度
 - height - viewport的高度   
 - initial-scale - 初始的缩放比例  
 - minimum-scale - 允许用户缩放到的最小比例   
 - maximum-scale - 允许用户缩放到的最大比例  
 - user-scalable - 用户是否可以手动缩放

第二个meta标签是iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览；

第三个meta标签也是iphone的私有标签，它指定的iphone中safari顶端的状态条的样式；
在web app应用下状态条（屏幕顶部条）的颜色；
默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。
注意：若值为“black-translucent”将会占据页面px位置，浮在页面上方（会覆盖页面20px高度–iphone4和itouch4的Retina屏幕为40px）。 

第四个meta标签表示：告诉设备忽略将页面中的数字识别为电话号码；

第五个meta标签表示：这个标签是告诉iphone的safari浏览器，这个网站对应的app是什么，然后在页面上面显示一个下载banner。
