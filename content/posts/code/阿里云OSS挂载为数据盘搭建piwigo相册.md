---
title: "阿里云OSS挂载为数据盘搭建piwigo相册"
categories: ["代码"]
tags: ["阿里云","oss","piwigo","相册","挂载"]
draft: false
slug: "piwigo-in-alioss"
date: "2017-04-01 12:03:00"
---

> 本文主要分为两部分：
> 1、如何把阿里云的对象存储OSS的Bucket挂载为ECS的数据盘；
> 2、如何用piwigo搭建相册。

把OSS挂载成数据盘后，就可以解析PHP文件，而不再是只能设置一个静态html首页。利用OSS低价格高稳定性的优势，其实可以干很多事情，比如用ownCloud搭建一个私人网盘。

一、挂载OSS
=======

> 阿里云的官方git说明： <a href="https://github.com/aliyun/ossfs" target="_blank">https://github.com/aliyun/ossfs</a>

我用的是Ubuntu 16.04 64bit，推荐源码安装

1、安装依赖
------

```bash
su -root #切换到root用户
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

3、设置Bucket
----------

设置bucket name, access key/id信息，将其存放在/etc/passwd-ossfs 文件中， 注意这个文件的权限必须正确设置，建议设为640。
```bash
vim /etc/passwd-ossfs
```
按 i 输入：
```bash
eallionalbum:LTAI12345678E1kU:Jw3hHEBFwD1234567890MheR02CmOr
```

按 esc 输入`:wq`退出。

设置权限：
```bash
chmod 640 /etc/passwd-ossfs
```

4、挂载OSS Bucket
--------------
```bash
mkdir /html/eallionalbum.com #先建立一个打算挂载的目录
ossfs eallionalbum /html/eallionalbum.com -ourl=http://oss-cn-hangzhou-internal.aliyuncs.com -ouid=1001 -ogid=1001 -o allow_other -o umask=777
```
查看是否挂载成功
```bash
mount -l
```
如果没有挂载成功，可以到<a href="https://github.com/aliyun/ossfs" target="_blank">https://github.com/aliyun/ossfs</a>查找原因或提交issue。

5、卸载（若有需要）
--
```bash
umount /html/eallionalbum.com
fusermount -u /html/eallionalbum.com
```

二、搭建piwigo相册
============

中文官网：<a href="http://cn.piwigo.org/" target="_blank">http://cn.piwigo.org</a>，但中文官网的版本比较落后，建议切换到英文版。

1、下载
----------
国内主机还是建议下载源码安装，国外主机倒是可以下载Netinstaller。
官网：<a href="http://piwigo.org/basics/downloads" target="_blank">http://piwigo.org/basics/downloads</a>

2、上传
----

可以通过FTP上传，因为是OSS，所以也可以通过OSS客户端和网页上传。

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
 - 用户名*
 - 密码
 - 数据库名
 - Piwogo 表名前缀**

配置的时候，其实跟配置wordpress或typecho差不多的。
直接打开域名，如：http://eallionalbum.com
程序会自动导向安装页面。
安装的时候在填入管理员信息，要记下来：

 - 用户名
 - 密码
 - 邮箱

点击开始安装，程序就会自动安装了。

5、完成
----
安装完成后，打开网址就可以使用相册了。爱折腾的人还可以对相册进行一些优化。

> PS：本文涉及到的bucket name、域名、access key/id、目录均为虚拟信息，请替换成自己的。
