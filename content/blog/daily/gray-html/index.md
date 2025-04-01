---
authors:
- eallion
categories:
- 日志
date: '2013-04-23 15:09:00'
draft: false
lastmod: '2013-04-23 15:09:00'
slug: gray-html
summary: 该代码片段首先声明使用 XHTML 1.0 Transitional 文档类型以确保网页标准兼容性，随后通过 CSS 的 filter 属性实现全站灰度化效果，兼容
  IE 的 DXImageTransform 和 WebKit 内核浏览器的 -webkit-filter 语法，可直接嵌入 head 标签内生效。
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