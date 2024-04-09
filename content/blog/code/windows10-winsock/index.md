---
title: "Windows10 WinSock"
# images: ["/assets/images/og/windows10-winsock.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["dns","win10","windows10","winsock","打不开网页"]
draft: false
slug: "windows10-winsock"
summary: "这篇文章介绍了如何解决Windows 10系统中遇到的无法打开网页的问题。当系统可以正常使用QQ但无法打开网页时，可能是由于WinSock出现问题导致。文章提供了解决方法，即以管理员身份运行CMD或PowerShell，然后输入特定命令来重置WinSock和防火墙设置，最后重启电脑即可解决该问题。"
date: "2015-11-17 21:28:00"
lastmod: "2015-11-17 21:28:00"
---

如果 Win10 系统能上 QQ 但是打不开网页，浏览器提示 “DNS_PROBE_FINISHED_DXDOMAIN"或者"DNS_PROBE_PROSSIBLE", 在尝试了各种卫士管家的修复后，仍然打不开网页的话，有可能是 WinSock 出问题了。
解决办法：
1、以管理员身份运行 CMD 或者 PowerShell；
2、输入 `netsh winsock reset` ；
3、输入 `netsh advfirewall reset`；
4、重启电脑。
