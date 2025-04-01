---
authors:
- eallion
categories:
- 代码
date: '2019-11-24 16:12:00'
draft: false
lastmod: '2019-11-24 16:12:00'
slug: mosh
summary: Mosh 是一款基于 UDP 的远程连接工具，支持跨平台使用。服务端和客户端安装均通过 sudo apt install mosh 命令完成，Ubuntu
  用户也可选择 Termius 管理多台服务器。手机端推荐 JuiceSSH 或 Termux（安卓）以及 Blink Shell（iOS）。使用前需在防火墙开放
  UDP 端口（默认 60001），云服务器还需配置安全组。
tags:
- Ubuntu
- server
- vps
- ssh
- mosh
title: Ubuntu Server 安装 Mosh
---
服务端安装 Mosh：

```
sudo apt install mosh
```

客户端安装 Mosh：

Ubuntu：

```
sudo apt install mosh
```

Ubuntu 上也可以安装 Termius ，也支持 Mosh 连接。当服务器比较多时，Termius 比自带终端方便统一管理。

手机端：

- 安卓：JuiceSSH / Termux
- iOS：Blink Shell

其他系统安装方式参考官网：

> [https://mosh.org/#getting](https://mosh.org/#getting)

Mosh 通过 UDP 连接，服务端需要打开防火墙，开放 `60001` 端口，如果有多个连接，开放多个端口，如 `60002` 。

```
sudo iptables -I INPUT -p udp --dport 60001 -j ACCEPT
```

如果云服务器有安全组，同时需要去云服务商后台在安全组中开放端口。

Mosh 支持很多选项，可以用 `mosh —help` 看到：

```
mosh --help 
```

Mosh 的连接方法：

```
mosh USERNAME@IP
```

假设你的服务器 ip 是 `114.114.114.114` ，用户名是 `root`：

```
mosh root@114.114.114.114
```

如果你不想用默认的 `60001` 端口，可以用 `-p` 指定端口：

```
mosh -p 9527 root@114.114.114.114
```

如果你修改过默认的 SSH 登录端口，如把 `22` 改成了 `22222`

```
mosh --ssh="ssh -p 22222" root@114.114.114.114
```

Mosh 也支持 [Google Authenticator](https://eallion.com/ssh-google-authenticator) 二步验证。