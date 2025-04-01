---
title: {{ replace .TranslationBaseName "-" " " | title }}
authors:
- eallion
categories:
- 日志
- 代码
- 分享
- 运营
tags:
- daily
- 博客
date: {{ .Date }}
draft: true
slug: {{ replace .Name " " "-" | title | lower }}
subtitle:
summary:
---
