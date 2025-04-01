---
authors:
- eallion
categories:
- 代码
date: '2015-11-17 21:28:00'
draft: false
lastmod: '2015-11-17 21:28:00'
slug: windows10-winsock
summary: Win10 系统能登录 QQ 但无法打开网页并提示 DNS_PROBE_FINISHED_DXDOMAIN 或 DNS_PROBE_PROSSIBLE
  错误时，可能是 WinSock 故障导致。解决方法是以管理员身份运行 CMD 或 PowerShell，依次输入 netsh winsock reset 和 netsh
  advfirewall reset 命令，最后重启电脑即可修复问题！
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