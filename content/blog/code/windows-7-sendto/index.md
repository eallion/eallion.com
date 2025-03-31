---
authors:
- eallion
categories:
- 代码
date: '2015-01-14 10:58:00'
draft: false
lastmod: '2015-01-14 10:58:00'
slug: windows-7-sendto
summary: '"发送到"功能很实用，新系统安装后常需清理多余选项。XP系统直接运行"SendTo"就能打开对应文件夹，但Win7不行。Win7可通过搜索"SendTo"或逐层进入路径C:\users\用户名\AppData\Roaming\Microsoft\Windows\SendTo。'
tags:
- WIN7
- sendto
- 系统
- 发送到
title: Win7 Sendto 文件夹
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