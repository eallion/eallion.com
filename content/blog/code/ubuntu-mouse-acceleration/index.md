---
title: "Ubuntu 鼠标加速度"
# images: ["/assets/images/og/ubuntu-mouse-acceleration.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["鼠标","Ubuntu","加速度","鼠标加速","xset m 0"]
draft: false
slug: "ubuntu-mouse-acceleration"
summary: "这篇文章介绍了作者在重新安装Ubuntu系统后遇到的鼠标灵敏度问题。作者提到尝试使用命令“xset m 0”来调整鼠标加速度，但在关机重启后设置失效。由于网上关于鼠标加速度设置的信息不全面，作者记录下了配置方法并分享给读者，以便日后参考。最后，作者提到在Ubuntu软件中搜索“Mouse”，安装“Keyboard and Mouse”模块可解决此问题。"
date: "2016-09-06 23:30:00"
lastmod: "2016-09-06 23:30:00"
---

我以前是玩 CS 的，对鼠标的灵敏度非常非常敏感，今天重装了一下笔记本的 Ubuntu，鼠标灵敏度一直不合手感。能用 “xset m 0” 来设置鼠标加速度，但关机重启后，设置又失效了。
前一次系统还是几年前配置的，我都忘记是怎么设置的了。网上关于鼠标加速度的设置也不全面，所以记录下来，方便以后配置，和有需要的人参考。
> 系统：Ubuntu 16.04.1 LTS 64bit
> 鼠标：Zowie EC2 eVo CL

1，在 Dashboard 里搜索：

> gnome-session-properties（启动应用程序）

2，点击添加：
> 名称：随意写（如：setmouse）
> 命令：`xset m 0` 或者 `xset m default`
> 注释：随意写

3，`sudo reboot`

更新：在 Ubuntu 软件里搜索 “Mouse”，找到 “Keyboard and Mouse"，安装即可。
