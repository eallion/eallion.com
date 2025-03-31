---
authors:
- eallion
categories:
- 代码
date: '2013-05-12 17:12:00'
draft: false
lastmod: '2013-05-12 17:12:00'
slug: gohtml
summary: HTML可通过meta标签实现页面刷新或定时跳转，设置content属性控制时间与目标地址。JavaScript提供两种跳转方式：location.href直接跳转，setTimeout实现延迟跳转，时间单位为毫秒。
tags:
- 代码
- 网页
- html
- 跳转
title: 网页跳转备忘
---

1、html 的实现：

```html
<head>
    <!-- 以下方式只是刷新不跳转到其他页面 -->
    <meta http-equiv="refresh" content="10">
    <!-- 以下方式定时转到其他页面 -->
    <meta http-equiv="refresh" content="5;url=hello.html"> 
</head>
```

2、javascript 的实现：

```js
<script language="javascript" type="text/javascript"> 
    // 以下方式直接跳转
    window.location.href='hello.html';
    // 以下方式定时跳转
    setTimeout ("javascript:location.href='hello.html'", 5000); 
</script>
```