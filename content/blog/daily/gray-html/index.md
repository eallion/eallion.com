---
authors:
- eallion
categories:
- 日志
date: '2013-04-23 15:09:00'
draft: false
lastmod: '2013-04-23 15:09:00'
slug: gray-html
summary: 使用XHTML 1.0过渡型文档声明确保网页标准兼容。通过CSS滤镜实现全站灰度效果，可直接在HTML头部插入样式代码或添加到现有CSS中。核心代码包括DOCTYPE声明和grayscale滤镜属性，支持IE和Webkit内核浏览器。
tags:
- 代码
- 网页
- html
- 黑白
title: 网页黑白代码
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