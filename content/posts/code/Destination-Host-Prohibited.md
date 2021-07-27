---
title: "Destination Host Prohibited"
categories: ["代码"]
tags: ["Ubuntu","ssl","iptables","ufw","Destination"]
draft: false
slug: "destination-host-prohibited"
date: "2016-09-25 00:19:00"
---

```bash
ping 1.1.1.1
From 1.1.1.1 icmp_seq=1 Destination Host Prohibited
```
出现这个问题原因是因为服务器上iptables配置原因造成的。

干脆点的话，直接
```bash
sudo apt remove iptablels
```
其他解决方法：
检查filter表中的FORWARD链
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
找到这一行的行号，我的主机上显示为11行

执行删除命令，删除第11行
```bash
iptables -D INPUT 11 #-D是删除参数
```
