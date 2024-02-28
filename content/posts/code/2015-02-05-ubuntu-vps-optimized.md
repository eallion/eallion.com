---
title: "Ubuntu VPS 优化"
images: ["/assets/images/og/ubuntu-vps-optimized.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","vps","优化","主机","lnmp"]
draft: false
slug: "ubuntu-vps-optimized"
summary: "这篇文章介绍了如何优化Ubuntu VPS，特别是针对小内存的VPS。如果只需要使用LNMP进行web服务，可以采取以下优化措施：对于小内存VPS，建议安装32位的操作系统。"
date: "2015-02-05 13:35:00"
lastmod: "2015-02-05 13:35:00"
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
