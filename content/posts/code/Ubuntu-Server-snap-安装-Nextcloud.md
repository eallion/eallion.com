---
title: "Ubuntu Server snap 安装 Nextcloud"
categories: ["代码"]
tags: ["Ubuntu","server","网盘","nexecloud","snap"]
draft: false
Comments: true
slug: "nextcloud"
date: "2019-11-25 16:08:00"
---

Nextcloud 官网提供了很多种安装方式，我选择通过 snap 安装。
其实 Ubuntu server 已经内置了 Nextcloud ，安装的时候最后一步选上就可以了。

> 官方项目地址：[https://github.com/nextcloud/nextcloud-snap](https://github.com/nextcloud/nextcloud-snap)

```
sudo snap install nextcloud
```

如果系统没有 snap ，需要先安装 snap ：
```
sudo apt update
sudo apt install snap
```

配置访问端口：

```
sudo snap set nextcloud ports.http=80 ports.https=443
```

如果需要使用域名访问，除了把域名解析到服务器，还需要把域名添加到 config：

config 配置文件在 `/var/snap/nextcloud/current/nextcloud/config`
```
cd /var/snap/nextcloud/current/nextcloud/config
vi config.php
```

找到 `trusted_domains` 这一行，在 `array` 里面按格式添加域名，注意结尾的逗号。
```
'trusted_domains' =>
        array (
            0 => '192.168.0.256',
            1 => 'eallion.com',
        ),
```
如果需要配置 https：

- Let's Encrypt 证书

```
sudo nextcloud.enable-https lets-encrypt
```

按提示输入邮箱和域名，即可签发证书。

- 自签名证书
```
sudo nextcloud.enable-https self-signed
```

- 购买的证书
下载 Apache 格式的证书，上传至：`/var/snap/nextcloud/current/certs/custom`

文件名改为：`cert.pem` `chain.pem` `privkey.pem`

配置证书：
```
sudo nextcloud.enable-https custom -s cert.pem chain.pem privkey.pem
```
备份 Nextcloud：
```
cd /var/snap/nextcloud/common
mkdir baskups
nextcloud.export
```
然后在 `/var/snap/nextcloud/common/backups/` 文件夹下就有最新的备份文件了。

