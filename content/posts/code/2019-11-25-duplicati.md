---
title: "备份工具 Duplicati"
images: ["https://og.eallion.com/api/og?title=%E5%A4%87%E4%BB%BD%E5%B7%A5%E5%85%B7%20Duplicati"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","备份","Duplicati"]
draft: false
slug: "duplicati"
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
