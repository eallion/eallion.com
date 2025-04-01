---
authors:
- eallion
categories:
- 代码
date: '2015-02-05 13:35:00'
draft: false
lastmod: '2015-02-05 13:35:00'
slug: ubuntu-vps-optimized
summary: 这段代码展示了如何为小内存 Ubuntu VPS 精简系统以优化 LNMP 环境，通过卸载非必要的 Apache、邮件服务等组件来释放资源，最后建议优先安装
  32 位系统以提升性能！
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