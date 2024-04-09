---
title: "网页黑白代码"
# images: ["/assets/images/og/gray-html.png"]
authors: ["eallion"]
categories: ["日志"]
tags: ["代码","网页","html","黑白"]
draft: false
slug: "gray-html"
summary: "这篇文章介绍了网页黑白代码，通过使用最新的网页标准协议以及添加CSS代码，可以实现网页的黑白显示。如果网页没有全站CSS代码，可以在<head>标签和<body>标签之间添加HTML代码来实现。"
date: "2013-04-23 15:09:00"
lastmod: "2013-04-23 15:09:00"
---

1，确认使用最新的网页标准协议：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
```

2，添加 CSS 代码：

```html
html { filter:progid:DXImageTransform.Microsoft.BasicImage (grayscale=1); -webkit-filter: grayscale (1); }
```

若没有全站 CSS 代码，可在 < head > 和 </head > 之间添加 html 代码：

```html
<style>html { filter:progid:DXImageTransform.Microsoft.BasicImage (grayscale=1); -webkit-filter: grayscale (1); }</style>
```
