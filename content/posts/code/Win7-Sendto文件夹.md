---
title: "Win7 Sendto文件夹"
categories: ["代码"]
tags: ["WIN7","sendto","系统","发送到"]
draft: false
slug: "windows-7-sendto"
date: "2015-01-14 10:58:00"
---

我个人比较喜欢右键“发送到……”这个功能，新装系统也会清理“发送到……”里多余的选项，“发送到……”对应的位置为文件夹“SendTo”。

XP系统直接按Win+R运行“SendTo”就能打开文件夹，而Win7则不行。

Win7有个比较笨的方法是点开C盘按Ctrl+F搜索“SendTo”即可在找到。

另外一个办法就是一层一层点开“SendTo”，位置：

```
C:\users\eallion\AppData\Roaming\Microsoft\Windows\SendTo
```

或者复制如下代码到地址栏：

```
%APPDATA%\Microsoft\Windows\SendTo
``` 

环境变量`%APPDATA%`的值为：
```
C:\users\<username>\AppData\Roaming
```
