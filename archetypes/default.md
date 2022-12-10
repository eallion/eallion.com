---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
authors: ["eallion"]
categories: ["日志"]
tags: 
  - hugo
  - blog
slug: "{{ replace .Name "-" " " | title }}"
draft: true
Comments: true
date: {{ .Date }}
---
