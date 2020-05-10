---
title: "Gravatar替换为v2ex"
categories: ["嘀咕"]
tags: ["Gravatar替换为v2ex"]
draft: false
slug: "replace-gravatar-with-v2ex"
date: "2019-06-05 16:16:00"
---

Gravatar 替换为 v2ex 
直接打开 Typecho 安装目录下的 `config.inc.php` 文件，加入以下代码即可：
```
define('__TYPECHO_GRAVATAR_PREFIX__', 'https://cdn.v2ex.com/gravatar/');
```
好处是不用改程序代码
