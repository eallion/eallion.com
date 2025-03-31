---
authors:
- eallion
categories:
- 代码
date: '2016-09-24 16:05:00'
draft: false
lastmod: '2016-09-24 16:05:00'
slug: ubuntu-source-in-hong-kong
summary: 用sudo权限编辑Ubuntu软件源配置文件，替换为香港中文大学的镜像源地址，包含xenial系统的主分支、更新、扩展组件及安全更新仓库。
tags:
- Ubuntu
- 香港
- 源
- 更新源
title: Ubuntu 源 香港中文大学
---

```bash
sudo vim /etc/apt/sources.list
```

```bash
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial main restricted
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-updates main restricted
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial universe
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-updates universe
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial multiverse
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-updates multiverse
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-backports main restricted universe multiverse
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-security main restricted
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-security universe
deb http://ftp.cuhk.edu.hk/pub/Linux/ubuntu/xenial-security multiverse
```