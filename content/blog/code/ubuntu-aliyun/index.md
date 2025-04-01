---
authors:
- eallion
categories:
- 代码
date: '2016-09-24 15:32:00'
draft: false
lastmod: '2016-09-24 15:32:00'
slug: ubuntu-aliyun
summary: 该命令通过 sudo 权限编辑 Ubuntu 系统的软件源配置文件，将其替换为阿里云镜像源以加速软件包下载，涵盖 main、restricted、universe
  和 multiverse 等核心仓库及其安全更新！
tags:
- Ubuntu
- 阿里云
- 源
- 更新源
title: Ubuntu 源 阿里云
---
```bash
sudo vim /etc/apt/sources.list
```

```bash
deb http://mirrors.aliyun.com/ubuntu/xenial main restricted
deb http://mirrors.aliyun.com/ubuntu/xenial-updates main restricted
deb http://mirrors.aliyun.com/ubuntu/xenial universe
deb http://mirrors.aliyun.com/ubuntu/xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/xenial multiverse
deb http://mirrors.aliyun.com/ubuntu/xenial-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/xenial-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/xenial-security main restricted
deb http://mirrors.aliyun.com/ubuntu/xenial-security universe
deb http://mirrors.aliyun.com/ubuntu/xenial-security multiverse
```