---
title: "备份工具 Duplicati"
images: ["/assets/images/og/duplicati.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","备份","Duplicati"]
draft: false
slug: "duplicati"
summary: "这篇文章介绍了备份工具Duplicati的一些特点和使用情况。Duplicati是一个支持多种操作系统的备份工具，如Windows、Linux、MacOS和Synology等。文章提及了在Ubuntu上安装Duplicati的步骤，包括设置IP和启动等操作，可以方便地进行备份设置。"
date: "2019-11-25 22:30:00"
lastmod: "2019-11-25 22:30:00"
---

 [Duplicati](https://www.duplicati.com/download) 备份工具支持主流的系统，包括：Windows、 Linux、 MacOS、 Synology 等。

Ubuntu 安装：

```
wget https://updates.duplicati.com/beta/duplicati_2.0.4.23-1_all.deb
sudo apt --fix-broken install ./duplicati_2.0.4.23-1_all.deb
```

设置 IP：

```
sudo duplicati-server --webservice-interface=192.168.0.256
```

启动：

```
sudo systemctl enable duplicati
sudo systemctl start duplicati
```

打开 [http://192.168.0.256:8200](http://192.168.0.256:8200) 即可设置备份了。
