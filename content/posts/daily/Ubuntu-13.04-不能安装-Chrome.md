---
title: "Ubuntu 13.04 不能安装 Chrome"
categories: ["日志"]
tags: ["Ubuntu","Chrome","147","依赖","libudev0"]
draft: false
slug: "ubuntu-13-04-chrome"
date: "2013-05-04 14:17:21"
---

Ubuntu13.04安装google-chrome-stable依赖问题: 依赖于 libudev0 (>= 147)

使用sudo apt-get install libudev0提示“未发现软件包 libudev0”。

Google后找到libudev0下载地址，附列如下：

i386：<a href="http://launchpadlibrarian.net/132294322/libudev0_175-0ubuntu19_i386.deb" target="_blank">http://launchpadlibrarian.net/132294322/libudev0_175-0ubuntu19_i386.deb</a>

amd64： <a href="http://launchpadlibrarian.net/132294155/libudev0_175-0ubuntu19_amd64.deb" target="_blank">http://launchpadlibrarian.net/132294155/libudev0_175-0ubuntu19_amd64.deb</a>

安装后，Chrome既可正常安装了。
