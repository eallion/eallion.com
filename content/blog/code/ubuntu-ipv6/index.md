---
title: "Ubuntu 禁用 IPv6"
authors: ["eallion"]
categories: ["日志"]
tags: ["Ubuntu","ipv6","禁用"]
draft: false
slug: "ubuntu-ipv6"
summary: "这篇文章介绍了如何禁用Ubuntu的IPv6。作者提供了三种禁用IPv6的方法。方法一是使用命令ip a | grep inet6来确认IPv6是否已禁用。方法二是使用ifconfig命令查看网卡信息，并逐个禁用IPv6，或者直接编辑配置文件来禁用IPv6。方法三是修改GRUB配置文件，添加变量来禁用IPv6，并更新GRUB配置。最后，需要重启系统使修改生效。"
date: "2013-05-04 18:02:00"
lastmod: "2013-05-04 18:02:00"
---

记不住这几个命令，新装系统都要去 google，索性放在这里好了。
可以使用 `ip a | grep inet6`，若没有结果则说明禁用 IPv6 成功。

### 方法 1、（推荐）

先用命令 `ifconfig` 查看网卡信息，如 `lo` `eth0` `enp0s3`，然后一个一个禁用

    echo "#disable ipv6" | sudo tee -a /etc/sysctl.conf
    echo "net.ipv6.conf.all.disable_ipv6 = 1" | sudo tee -a /etc/sysctl.conf
    echo "net.ipv6.conf.default.disable_ipv6 = 1" | sudo tee -a /etc/sysctl.conf
    echo "net.ipv6.conf.lo.disable_ipv6 = 1" | sudo tee -a /etc/sysctl.conf
    echo "net.ipv6.conf.eth0.disable_ipv6 = 1" | sudo tee -a /etc/sysctl.conf

也可直接编辑配置文件

    sudo vim /etc/sysctl.conf

添加：

> net.ipv6.conf.all.disable_ipv6 = 1
> net.ipv6.conf.default.disable_ipv6 = 1
> net.ipv6.conf.lo.disable_ipv6 = 1
> net.ipv6.conf.eth0.disable_ipv6 = 1

最后重启 `sudo sysctl -p` 生效。

### 方法 2、

    sudo vim /etc/default/grub
查找包含 "GRUBCMDLINELINUX" 的行，并如下编辑：

    GRUB_CMDLINE_LINUX="ipv6.disable=1"

同样可以加入名为 "GRUBCMDLINELINUX_DEFAULT" 的变量，这同样有用。保存并关闭文件，重新生成 grub 配置。

    sudo update-grub2

### 方法 3、

    sudo vim /etc/default/grub

将文件中的  GRUB_CMDLINE_LINUX_DEFAULT="quiet spalsh"  修改为

    GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1 quiet splash"

运行 `sudo update-grub` 更新
