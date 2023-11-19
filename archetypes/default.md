---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
authors: ["eallion"]
categories: ["日志"]
tags: 
  - hugo
  - blog
slug: "{{ replace .Name " " "-" | title | lower }}"
draft: true
Comments: true
date: {{ .Date }}
images: ["https://og.eallion.com/api/og?title={{ replace .TranslationBaseName "-" "%20" | title }}"]
---
