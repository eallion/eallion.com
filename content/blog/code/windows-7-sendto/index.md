---
title: "Win7 Sendto 文件夹"
# images: ["/assets/images/og/windows-7-sendto.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["WIN7","sendto","系统","发送到"]
draft: false
slug: "windows-7-sendto"
summary: "这篇文章介绍了Win7系统中的Sendto文件夹，作者喜欢右键菜单中的“发送到……”功能，并分享了如何在Win7系统中找到该文件夹的方法，包括通过搜索和逐级点开的方式进行查找。同时，提供了环境变量%APPDATA%的值作为文件夹路径。"
date: "2015-01-14 10:58:00"
lastmod: "2015-01-14 10:58:00"
---

我个人比较喜欢右键 “发送到……” 这个功能，新装系统也会清理 “发送到……” 里多余的选项，“发送到……” 对应的位置为文件夹 “SendTo”。

XP 系统直接按 Win+R 运行 “SendTo” 就能打开文件夹，而 Win7 则不行。

Win7 有个比较笨的方法是点开 C 盘按 Ctrl+F 搜索 “SendTo” 即可在找到。

另外一个办法就是一层一层点开 “SendTo”，位置：

```
C:\users\eallion\AppData\Roaming\Microsoft\Windows\SendTo
```

或者复制如下代码到地址栏：

```
% APPDATA%\Microsoft\Windows\SendTo
```

环境变量 `% APPDATA%` 的值为：

```
C:\users\<username>\AppData\Roaming
```
