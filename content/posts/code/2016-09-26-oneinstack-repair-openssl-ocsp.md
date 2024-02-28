---
title: "Oneinstack 手动修复 OpenSSL OCSP"
images: ["/assets/images/og/oneinstack-repair-openssl-ocsp.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["oneinstack","nginx","openssl","ocsp"]
draft: false
slug: "oneinstack-repair-openssl-ocsp"
summary: "这篇文章介绍了如何手动修复Oneinstack中的OpenSSL OCSP漏洞。作者建议不要使用“openssl version”命令查看版本号，而要使用“nginx -V”命令。然后根据nginx版本号，下载相应的nginx和openssl源码，在编译nginx时修改参数“--with-openssl=../openssl-1.0.2j”。"
date: "2016-09-26 22:33:00"
lastmod: "2016-09-26 22:33:00"
---

> 参考：
> [http://security.360.cn/cve/CVE-2016-6304/CN.html](http://security.360.cn/cve/CVE-2016-6304/CN.html)  
> [https://www.openssl.org/news/secadv/20160922.txt](https://www.openssl.org/news/secadv/20160922.txt)

目前 “Oneinstack”、“LNMP 一键包” 默认的 OpenSSL 版本都不是最新版，修复此漏洞需要重新编译。

Oneinstack 不要用 `openssl version` 查看版本号，要用 `nginx -V` 查看版本号。

1、查看 nginx

```bash
nginx -V
```

查看 nginx 版本和 openssl 版本，顺便复制 configure arguments 后面的全部内容，比如我的是：

```bash
–prefix=/usr/local/nginx –user=www –group=www –with-http_stub_status_module –with-http_v2_module –with-http_ssl_module –with-ipv6 –with-http_gzip_static_module –with-http_realip_module –with-http_flv_module –with-openssl=../openssl-1.0.2h –with-pcre=../pcre-8.39 –with-pcre-jit –with-ld-opt=-ljemalloc
```

2、下载源码

```bash
cd ~/oneinstack/src
```

下载对应的 nginx：

```bash
wget http://mirrors.linuxeye.com/oneinstack/src/nginx-1.10.1.tar.gz
```

下载对应的 openssl：

```bash
wget https://www.openssl.org/source/openssl-1.0.2j.tar.gz 
```

（所有版本在这里 [https://www.openssl.org/source/](https://www.openssl.org/source/) ）

3、解压：

```bash
tar xzvf openssl-1.0.2j.tar.gz
tar xzvf nginx-1.10.1.tar.gz
```

4、编译 nginx：

```bash
cd nginx-1.10.1
```

```bash
./configure –prefix=/usr/local/nginx –user=www –group=www –with-http_stub_status_module –with-http_v2_module –with-http_ssl_module –with-ipv6 –with-http_gzip_static_module –with-http_realip_module –with-http_flv_module –with-openssl=../openssl-1.0.2j –with-pcre=../pcre-8.39 –with-pcre-jit –with-ld-opt=-ljemalloc
```

（主要修改 `–with-openssl=../openssl-1.0.2j`，其他不变）

```bash
make
mv /usr/local/nginx/sbin/nginx {,_`date +% m% d`} #备份现有 nginx
cp objs/nginx/usr/local/nginx/sbin/ #更新 nginx
service nginx restart #重启 nginx
```
