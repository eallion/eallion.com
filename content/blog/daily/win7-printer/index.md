---
title: "Win7 老打印机驱动解决方案"
authors: ["eallion"]
categories: ["日志"]
tags: ["WIN7","打印机","驱动","虚拟机","virtualbox"]
draft: false
slug: "win7-printer"
summary: "文章介绍了一个解决方案，用于在 Win7 系统中使用老的打印机驱动。作者发现自带的驱动效果不好，官方也没有提供适配 Win7 的驱动。最初尝试将打印机安装在 XP 系统上并共享给其他人使用，但存在不便之处。后来作者想到了一个办法，在虚拟机中安装 XP 系统，并将打印机共享给 Win7 使用。这个方法被证明是有效的。"
date: "2013-06-19 12:39:00"
lastmod: "2013-06-19 12:39:00"
---

我有一台 Epson LQ 1600 Kiii 的针式打印机，最近 5 台打印机都不够用了，想把这一台打印机也利用起来打发货单。Win7、Win8 自带的这款打印机驱动打出来的效果惨不忍睹，Epson 官方没有提供 Win7 驱动。XP 系统的驱动是最完美的。一开始，就把这台打印机安装在美工的 xp 电脑上，然后共享出来我用，不过这样也有弊端，主要是很不方便，美工不在的时候，也要把她的电脑开起来。后来，我又把美工的系统换成了 Win7，这样就没有 XP 环境了。用 Win7 打了几天的发货单，效果真的很差。无奈之后准备放弃的时候，灵光一闪想到一个办法，试验之后果然有效 —— 用 VirtualBox 虚拟机虚拟出来一个 XP 系统，然后把打印机安装在虚拟机上，再共享给 Win7 使用。