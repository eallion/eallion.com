---
title: "网页跳转备忘"
authors: ["eallion"]
categories: ["代码"]
tags: ["代码","网页","html","跳转"]
draft: false
slug: "gohtml"
summary: "这篇文章介绍了网页跳转备忘的实现方法，包括HTML和JavaScript的实现。"
date: "2013-05-12 17:12:00"
lastmod: "2013-05-12 17:12:00"
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
