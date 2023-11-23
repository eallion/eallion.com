---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
authors: ["eallion"]
categories: ["日志"]
tags: 
  - daily
slug: "{{ replace .Name " " "-" | title | lower }}"
draft: true
Comments: true
date: {{ .Date }}
images: ["/assets/images/og/{{ replace .Name " " "-" | title | lower }}.png"]
---
