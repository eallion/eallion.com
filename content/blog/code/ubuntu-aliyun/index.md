---
title: "Ubuntu 源 阿里云"
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","阿里云","源","更新源"]
draft: false
slug: "ubuntu-aliyun"
summary: "这篇文章介绍了阿里云对Ubuntu操作系统的支持，提供了Ubuntu的软件源。阿里云通过这个软件源，为用户提供稳定可靠的软件下载和更新服务。这个软件源被称为“大大的小蜗牛”，可以让Ubuntu用户更方便地获取所需的软件资源。"
date: "2016-09-24 15:32:00"
lastmod: "2016-09-24 15:32:00"
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
