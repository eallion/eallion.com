---
authors:
- eallion
categories:
- 代码
date: '2016-09-24 15:32:00'
draft: false
lastmod: '2016-09-24 15:32:00'
slug: ubuntu-aliyun
summary: 用sudo权限编辑apt软件源配置文件，替换为阿里云镜像源，包含xenial系统的主分支、更新、宇宙、多元宇宙及安全更新仓库地址。
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