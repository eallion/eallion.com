---
authors:
- eallion
categories:
- 代码
date: '2015-02-05 13:35:00'
draft: false
lastmod: '2015-02-05 13:35:00'
slug: ubuntu-vps-optimized
summary: 小内存Ubuntu VPS优化LNMP服务时，可先更新系统并卸载非必要软件包如Apache、邮件服务等，清理残留文件。建议安装32位系统以节省资源。
tags:
- Ubuntu
- vps
- 优化
- 主机
- lnmp
title: Ubuntu VPS 优化
---

如果选用小内存的 Ubuntu VPS，而且只需要 LNMP 做 web 服务的话，可以如下优化：

```bash
apt-get update 
apt-get upgrade 
apt-get -y purge apache2-* bind9-* xinetd samba-* nscd-* portmap sendmail-* sasl2-bin 
apt-get -y purge lynx memtester unixodbc python-* odbcinst-* sudo tcpdump ttf-*
apt-get autoremove && apt-get clean
```

小内存 VPS 推荐安装 32bitOS。