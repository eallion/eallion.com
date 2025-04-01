---
authors:
- eallion
categories:
- 代码
date: '2013-05-12 17:12:00'
draft: false
lastmod: '2013-05-12 17:12:00'
slug: gohtml
summary: HTML 可通过 meta 标签实现页面自动刷新或跳转，JavaScript 则使用 window.location.href 或 setTimeout
  进行即时或延迟跳转。
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