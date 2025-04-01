---
authors:
- eallion
categories:
- 代码
date: '2016-09-25 00:19:00'
draft: false
lastmod: '2016-09-25 00:19:00'
slug: destination-host-prohibited
summary: 服务器 ping 返回 Destination Host Prohibited 错误通常由 iptables 配置导致。快速解决方法是卸载 iptables，或检查并删除
  filter 表中包含 icmp-host-prohibited 的 REJECT 规则。通过 iptables -L 定位规则行号后用 -D 参数删除即可解决问题！
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