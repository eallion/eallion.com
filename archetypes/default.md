---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
categories: ["日志"]
tags: 
  - hugo
  - blog
slug: "{{ replace .Name "-" " " | title }}"
draft: true
date: {{ .Date }}
toc: false
---
