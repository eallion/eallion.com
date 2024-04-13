---
title: "Ubuntu 13.04 不能安装 Chrome"
authors: ["eallion"]
categories: ["日志"]
tags: ["Ubuntu","Chrome","147","依赖","libudev0"]
draft: false
slug: "ubuntu-13-04-chrome"
summary: "这篇文章介绍了在Ubuntu 13.04上安装Chrome时遇到的依赖问题。作者使用sudo apt-get install libudev0命令来安装所需的libudev0软件包，但系统提示找不到此软件包。作者在Google上找到了libudev0的下载地址，并提供了i386和amd64两个版本的下载链接。安装完libudev0后，Chrome就可以正常安装了。"
date: "2013-05-04 14:17:21"
lastmod: "2013-05-04 14:17:21"
---

Ubuntu13.04 安装 google-chrome-stable 依赖问题：依赖于 libudev0 (>= 147)

使用 sudo apt-get install libudev0 提示 “未发现软件包 libudev0”。

Google 后找到 libudev0 下载地址，附列如下：

i386：[http://launchpadlibrarian.net/132294322/libudev0_175-0ubuntu19_i386.deb](http://launchpadlibrarian.net/132294322/libudev0_175-0ubuntu19_i386.deb)

amd64： [http://launchpadlibrarian.net/132294155/libudev0_175-0ubuntu19_amd64.deb](http://launchpadlibrarian.net/132294155/libudev0_175-0ubuntu19_amd64.deb)

安装后，Chrome 既可正常安装了。
