---
title: "Openssl 升级"
categories: ["代码"]
tags: ["升级","openssl"]
draft: false
slug: "openssl-upgrade"
date: "2016-09-29 16:47:00"
---

升级openssl环境至openssl-1.0.1g
1、查看源版本
```bash
openssl version -a
```

```bash
OpenSSL 1.0.1f 6 Jan 2014
```

2、下载openssl-1.0.2j.tar.gz
```bash
wget https://www.openssl.org/source/openssl-1.0.2j.tar.gz
```
3、更新zlib
```bash
apt install -y zlib
```
4、解压安装
```bash
tar zxf openssl-1.0.2j.tar.gz
cd openssl-1.0.2j
./config shared zlib
make
make install
mv /usr/bin/openssl /usr/bin/openssl.bak
mv /usr/include/openssl /usr/include/openssl.bak
ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/ssl/include/openssl /usr/include/openssl
echo “/usr/local/ssl/lib” >> /etc/ld.so.conf
ldconfig -v
```

5、查看是否升级成功

```bash
openssl version -a
```

```bash
OpenSSL 1.0.2j  26 Sep 2016
```
