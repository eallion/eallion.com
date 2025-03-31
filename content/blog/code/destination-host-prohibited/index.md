---
authors:
- eallion
categories:
- 代码
date: '2016-09-25 00:19:00'
draft: false
lastmod: '2016-09-25 00:19:00'
slug: destination-host-prohibited
summary: 服务器返回"Destination Host Prohibited"错误通常由iptables配置引起。最快解决方法是卸载iptables，但更推荐检查并修改配置。查看filter表FORWARD链是否存在"REJECT
  all"规则，
tags:
- Ubuntu
- ssl
- iptables
- ufw
- Destination
title: Destination Host Prohibited
---

```bash
ping 1.1.1.1
From 1.1.1.1 icmp_seq=1 Destination Host Prohibited
```

出现这个问题原因是因为服务器上 iptables 配置原因造成的。

干脆点的话，直接

```bash
sudo apt remove iptablels
```

其他解决方法：
检查 filter 表中的 FORWARD 链

```bash
iptables -t filter --list
```

看看结果中是否有这一句

```bash
REJECT all -- anywhere anywhere reject-with icmp-host-prohibited
```

如果有，就删除它

```bash
iptables -L INPUT --line-numbers 
```

找到这一行的行号，我的主机上显示为 11 行

执行删除命令，删除第 11 行

```bash
iptables -D INPUT 11 #-D是删除参数
```