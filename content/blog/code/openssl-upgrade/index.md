---
authors:
- eallion
categories:
- 代码
date: '2016-09-29 16:47:00'
draft: false
lastmod: '2016-09-29 16:47:00'
slug: openssl-upgrade
summary: 先查看当前openssl版本，下载openssl-1.0.2j安装包并更新zlib。解压后进入目录，配置编译安装，备份旧版本文件并创建软链接，添加库路径后更新配置。最后验证新版本是否生效。
tags:
- 升级
- openssl
title: Openssl 升级
---

升级 openssl 环境至 openssl-1.0.1g
1、查看源版本

```bash
openssl version -a
```

```bash
OpenSSL 1.0.1f 6 Jan 2014
```

2、下载 openssl-1.0.2j.tar.gz

```bash
wget https://www.openssl.org/source/openssl-1.0.2j.tar.gz
```

3、更新 zlib

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
mv /usr/bin/openssl/usr/bin/openssl.bak
mv /usr/include/openssl/usr/include/openssl.bak
ln -s /usr/local/ssl/bin/openssl/usr/bin/openssl
ln -s /usr/local/ssl/include/openssl/usr/include/openssl
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