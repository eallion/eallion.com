---
authors:
- eallion
categories:
- 日志
date: '2013-05-04 18:02:00'
draft: false
lastmod: '2013-05-04 18:02:00'
slug: ubuntu-ipv6
summary: 禁用 IPv6 的三种方法：推荐通过修改 sysctl.conf 文件添加 disable_ipv6 参数并重启生效，也可编辑 grub 文件加入
  ipv6.disable=1 参数后更新配置，或用 ip a | grep inet6 验证是否禁用成功！
tags:
- Ubuntu
- ipv6
- 禁用
title: Ubuntu 禁用 IPv6
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