---
title: "Ubuntu VPS优化"
categories: ["代码"]
tags: ["Ubuntu","vps","优化","主机","lnmp"]
draft: false
slug: "ubuntu-vps-optimized"
date: "2015-02-05 13:35:00"
---

如果选用小内存的Ubuntu VPS，而且只需要LNMP做web服务的话，可以如下优化：
```bash
apt-get update 
apt-get upgrade 
apt-get -y purge apache2-* bind9-* xinetd samba-* nscd-* portmap sendmail-* sasl2-bin 
apt-get -y purge lynx memtester unixodbc python-* odbcinst-* sudo tcpdump ttf-*
apt-get autoremove && apt-get clean
```
小内存VPS推荐安装32bitOS。
