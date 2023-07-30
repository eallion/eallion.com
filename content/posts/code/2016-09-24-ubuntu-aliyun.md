---
title: "Ubuntu 源 阿里云"
images: ["https://api.eallion.com/og?title=Ubuntu%20%E6%BA%90%20%E9%98%BF%E9%87%8C%E4%BA%91"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","阿里云","源","更新源"]
draft: false
slug: "ubuntu-aliyun"
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
