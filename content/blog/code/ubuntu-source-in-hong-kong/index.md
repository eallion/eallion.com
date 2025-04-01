---
authors:
- eallion
categories:
- 代码
date: '2016-09-24 16:05:00'
draft: false
lastmod: '2016-09-24 16:05:00'
slug: ubuntu-source-in-hong-kong
summary: 该代码片段通过 sudo vim 命令编辑 Ubuntu 系统的软件源配置文件 sources.list，将其替换为香港中文大学的镜像源，包含 xenial
  版本的主仓库、更新、宇宙、多元宇宙及安全更新等组件，以提升软件下载速度或解决官方源访问问题！
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