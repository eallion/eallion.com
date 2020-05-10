---
title: "Oneinstack手动修复OpenSSL OCSP"
categories: ["代码"]
tags: ["oneinstack","nginx","openssl","ocsp","cve-2016-6304"]
draft: false
slug: "oneinstack-repair-openssl-ocsp"
date: "2016-09-26 22:33:00"
---

> 参考:
> <a href="http://security.360.cn/cve/CVE-2016-6304/CN.html" target="_blank">http://security.360.cn/cve/CVE-2016-6304/CN.html</a>
> <a href="https://www.openssl.org/news/secadv/20160922.txt" target="_blank">https://www.openssl.org/news/secadv/20160922.txt</a>

目前“Oneinstack”、“LNMP一键包”默认的OpenSSL版本都不是最新版，修复此漏洞需要重新编译。

Oneinstack不要用`openssl version`查看版本号，要用`nginx -V`查看版本号。

1、查看nginx
```bash
nginx -V
```

查看nginx版本和openssl版本，顺便复制configure arguments后面的全部内容，比如我的是：
```bash
–prefix=/usr/local/nginx –user=www –group=www –with-http_stub_status_module –with-http_v2_module –with-http_ssl_module –with-ipv6 –with-http_gzip_static_module –with-http_realip_module –with-http_flv_module –with-openssl=../openssl-1.0.2h –with-pcre=../pcre-8.39 –with-pcre-jit –with-ld-opt=-ljemalloc
```
 
2、下载源码
```bash
cd ~/oneinstack/src
```

下载对应的nginx：
```bash
wget http://mirrors.linuxeye.com/oneinstack/src/nginx-1.10.1.tar.gz
```

下载对应的openssl：
```bash
wget https://www.openssl.org/source/openssl-1.0.2j.tar.gz 
```

（所有版本在这里 <a href="https://www.openssl.org/source/" target="_blank">https://www.openssl.org/source/</a> ）

3、解压：
```bash
tar xzvf openssl-1.0.2j.tar.gz
tar xzvf nginx-1.10.1.tar.gz
```
4、编译nginx：
```bash
cd nginx-1.10.1
```

```bash
./configure –prefix=/usr/local/nginx –user=www –group=www –with-http_stub_status_module –with-http_v2_module –with-http_ssl_module –with-ipv6 –with-http_gzip_static_module –with-http_realip_module –with-http_flv_module –with-openssl=../openssl-1.0.2j –with-pcre=../pcre-8.39 –with-pcre-jit –with-ld-opt=-ljemalloc
```
（主要修改`–with-openssl=../openssl-1.0.2j`，其他不变）
```bash
make
mv /usr/local/nginx/sbin/nginx{,_`date +%m%d`} #备份现有nginx
cp objs/nginx /usr/local/nginx/sbin/ #更新nginx
service nginx restart #重启nginx
```
