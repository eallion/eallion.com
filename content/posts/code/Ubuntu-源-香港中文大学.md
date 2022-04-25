---
title: "Ubuntu 源 香港中文大学"
categories: ["代码"]
tags: ["Ubuntu","香港","源","更新源"]
draft: false
slug: "ubuntu-source-in-hong-kong"
date: "2016-09-24 16:05:00"
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

