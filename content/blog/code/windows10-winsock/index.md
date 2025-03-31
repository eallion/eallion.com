---
authors:
- eallion
categories:
- 代码
date: '2015-11-17 21:28:00'
draft: false
lastmod: '2015-11-17 21:28:00'
slug: windows10-winsock
summary: Win10能登QQ但网页打不开，浏览器提示DNS错误，可能是WinSock故障。解决方法：用管理员权限打开CMD或PowerShell，依次输入两条重置命令，最后重启电脑即可。
tags:
- dns
- win10
- windows10
- winsock
- 打不开网页
title: Windows10 WinSock
---

如果 Win10 系统能上 QQ 但是打不开网页，浏览器提示 “DNS_PROBE_FINISHED_DXDOMAIN"或者"DNS_PROBE_PROSSIBLE", 在尝试了各种卫士管家的修复后，仍然打不开网页的话，有可能是 WinSock 出问题了。
解决办法：
1、以管理员身份运行 CMD 或者 PowerShell；
2、输入 `netsh winsock reset` ；
3、输入 `netsh advfirewall reset`；
4、重启电脑。