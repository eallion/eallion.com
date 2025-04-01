---
authors:
- eallion
categories:
- 代码
date: '2015-01-14 10:58:00'
draft: false
lastmod: '2015-01-14 10:58:00'
slug: windows-7-sendto
summary: Windows 系统中 SendTo 文件夹用于管理右键发送到功能，XP 可直接通过运行命令打开，Win7 需手动搜索或逐层进入 C 盘用户目录，也可使用
  %APPDATA% 环境变量快速定位。
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