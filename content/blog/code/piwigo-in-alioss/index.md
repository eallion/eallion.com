---
title: "阿里云 OSS 挂载为数据盘搭建 piwigo 相册"
authors: ["eallion"]
categories: ["代码"]
tags: ["阿里云","oss","piwigo","相册","挂载"]
draft: false
slug: "piwigo-in-alioss"
summary: "这篇文章介绍了如何将阿里云的对象存储OSS的Bucket挂载为ECS的数据盘，并使用piwigo搭建相册。文章提供了详细的步骤，包括安装依赖、编译、设置Bucket等。挂载OSS为数据盘后，可以解析PHP文件，扩展了功能。同时，文章还介绍了piwigo的下载、上传、解压、配置安装等步骤，以及如何优化相册。最后提醒读者替换虚拟信息为自己的相关信息。"
date: "2017-04-01 12:03:00"
lastmod: "2017-04-01 12:03:00"
---

> 本文主要分为两部分：
> 1、如何把阿里云的对象存储 OSS 的 Bucket 挂载为 ECS 的数据盘；
> 2、如何用 piwigo 搭建相册。

把 OSS 挂载成数据盘后，就可以解析 PHP 文件，而不再是只能设置一个静态 html 首页。利用 OSS 低价格高稳定性的优势，其实可以干很多事情，比如用 ownCloud 搭建一个私人网盘。

一、挂载 OSS
=======

> 阿里云的官方 git 说明： [https://github.com/aliyun/ossfs](https://github.com/aliyun/ossfs)

我用的是 Ubuntu 16.04 64bit，推荐源码安装

1、安装依赖
------

```bash
su -root #切换到 root 用户
apt install automake autotools-dev g++ git libcurl4-gnutls-dev libfuse-dev libssl-dev libxml2-dev make pkg-config
```

2、编译
----

```bash
git clone https://github.com/aliyun/ossfs.git
cd ossfs
./autogen.sh
./configure
make
make install
```

3、设置 Bucket
----------

设置 bucket name, access key/id 信息，将其存放在 /etc/passwd-ossfs 文件中， 注意这个文件的权限必须正确设置，建议设为 640。

```bash
vim /etc/passwd-ossfs
```

按 i 输入：

```bash
eallionalbum:LTAI12345678E1kU:Jw3hHEBFwD1234567890MheR02CmOr
```

按 esc 输入 `:wq` 退出。

设置权限：

```bash
chmod 640 /etc/passwd-ossfs
```

4、挂载 OSS Bucket
--------------

```bash
mkdir /html/eallionalbum.com #先建立一个打算挂载的目录
ossfs eallionalbum /html/eallionalbum.com -ourl=http://oss-cn-hangzhou-internal.aliyuncs.com -ouid=1001 -ogid=1001 -o allow_other -o umask=777
```

查看是否挂载成功

```bash
mount -l
```

如果没有挂载成功，可以到 [https://github.com/aliyun/ossfs](https://github.com/aliyun/ossfs) 查找原因或提交 issue。

5、卸载（若有需要）
--

```bash
umount /html/eallionalbum.com
fusermount -u /html/eallionalbum.com
```

二、搭建 piwigo 相册
============

中文官网：[http://cn.piwigo.org](http://cn.piwigo.org/)，但中文官网的版本比较落后，建议切换到英文版。

1、下载
----------

国内主机还是建议下载源码安装，国外主机倒是可以下载 Netinstaller。
官网：[http://piwigo.org/basics/downloads](http://piwigo.org/basics/downloads)

2、上传
----

可以通过 FTP 上传，因为是 OSS，所以也可以通过 OSS 客户端和网页上传。

3、解压
----

可以解压之后上传，也可上传后解压。

```bash
cd /html/eallionalbum.com
unzip piwigo-*.zip
```

4、配置安装
------

安装之前要准备好数据库信息。

- 主机
- 用户名 *
- 密码
- 数据库名
- Piwogo 表名前缀 **

配置的时候，其实跟配置 WordPress 或 typecho 差不多的。
直接打开域名，如：[http://eallionalbum.com](http://eallionalbum.com)
程序会自动导向安装页面。
安装的时候在填入管理员信息，要记下来：

- 用户名
- 密码
- 邮箱

点击开始安装，程序就会自动安装了。

5、完成
----

安装完成后，打开网址就可以使用相册了。爱折腾的人还可以对相册进行一些优化。

> PS：本文涉及到的 bucket name、域名、access key/id、目录均为虚拟信息，请替换成自己的。
