---
title: "Destination Host Prohibited"
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","ssl","iptables","ufw","Destination"]
draft: false
slug: "destination-host-prohibited"
summary: "这篇文章介绍了如何解决“Destination Host Prohibited”的问题。问题出现的原因是由于服务器上的iptables配置导致的。文章给出的解决方法是检查filter表中的FORWARD链，查看是否包含有相关的行，如果有则删除该行。作者提供了删除该行的命令示例。"
date: "2016-09-25 00:19:00"
lastmod: "2016-09-25 00:19:00"
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
