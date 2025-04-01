---
authors:
- eallion
categories:
- 代码
date: '2019-11-25 22:30:00'
draft: false
lastmod: '2019-11-25 22:30:00'
slug: duplicati
summary: Duplicati 是一款跨平台备份工具，支持 Windows、Linux、MacOS 和 Synology 等系统。在 Ubuntu 中可通过下载
  .deb 包并修复依赖完成安装，配置指定 IP 后启用服务即可通过网页界面进行备份设置。
tags:
- Ubuntu
- 备份
- Duplicati
title: 备份工具 Duplicati
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