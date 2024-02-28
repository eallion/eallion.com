---
title: "Oneinstack Nginx 反代 Google"
images: ["/assets/images/og/oneinstack-nginx-google.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["google","oneinstack","nginx","proxy"]
draft: false
slug: "oneinstack-nginx-google"
summary: "这篇文章介绍了使用Oneinstack Nginx反代Google的方法。作者建议在安装Oneinstack时只选择反代Google的功能，然后编译Nginx并安装ngx_http_google_filter_module扩展。接下来，安装Let's Encrypt并绑定域名，最后修改配置文件并重启Nginx即可实现反代Google的功能。文章提供了教程供读者参考。"
date: "2016-09-08 08:30:00"
lastmod: "2016-09-08 08:30:00"
---

> [`GetGoogle.org`](https://getgoogle.org)
>（目前域名已经被墙，现在翻墙还是能够继续使用，但既然都能够翻墙了，也不需要用镜像来搜索了吧。：逃）

1、安装 [oneinstack](https://5ch.in/ois)，如果只需要反代 Google，nginx 选择 y，其他全部选择 n;

2、安装编译 Nginx，当前版本为 1.10.1，注意用 `nginx -V` 查看一下 Nginx 版本号

    cd ~/oneinstack/src 

# 下载源码

```
git clone https://github.com/cuber/ngx_http_google_filter_module 
git clone https://github.com/yaoweibin/ngx_http_substitutions_filter_module
wget http://mirrors.linuxeye.com/oneinstack/src/pcre-8.38.tar.gz
wget http://mirrors.linuxeye.com/oneinstack/src/openssl-1.0.2h.tar.gz
```

# 解压

```
tar xzf pcre-8.38.tar.gz
tar xzf openssl-1.0.2h.tar.gz
tar xzf nginx-1.10.1.tar.gz
cd nginx-1.10.1
```

# 编译

```
./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_stub_status_module --with-http_v2_module --with-http_ssl_module --with-ipv6 --with-http_gzip_static_module --with-http_realip_module --with-http_flv_module --with-openssl=../openssl-1.0.2h --with-pcre=../pcre-8.38 --with-pcre-jit --with-ld-opt='-ljemalloc' --add-module=../ngx_http_google_filter_module --add-module=../ngx_http_substitutions_filter_module

make  #不需要 make install

mv /usr/local/nginx/sbin/nginx {,_`date +% m% d`}  #备份现有 nginx

cp objs/nginx/usr/local/nginx/sbin/  #更新 nginx

nginx -t  #检查 nginx 语法

service nginx restart
```

要正确使用 ngx_http_google_filter_module 模块，需要依赖扩展：

> - pcre 正则
> - ngx_http_proxy_module 反向代理
> - ngx_http_substitutions_filter_module 多重替换

3、安装 Let's Encrypt，Oneinstack 已经集成了 Let's Encrypt

```
cd /root/oneinstack
./addons.sh
```

选择 7，安装 Let's Encrypt 即可。

4、绑定域名

```
cd /root/oneinstack
./vhost.sh
```

5、修改配置文件

```
vim /usr/local/nginx/conf/vhost/getgoogle.org.conf
```

```
 server {
    listen 443 ssl http2;
    server_name getgoogle.org www.getgoogle.org;
    ssl_certificate /etc/letsencrypt/live/getgoogle.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/getgoogle.org/privkey.pem;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers CHACHA20:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-RC4-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:RC4-SHA:!aNULL:!eNULL:!EXPORT:!DES:!3DES:!MD5:!DSS:!PKS;
    ssl_session_cache builtin:1000 shared:SSL:10m;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    location / {
        google on;
        google_scholar on;
        google_language zh-CN;
        }
    }
 
 server {
     listen 80;
     server_name getgoogle.org www.getgoogle.org;
     rewrite ^(.*)$ https://$host$1 permanent;
     }
```

6、重启 Nginx

```
service nginx restart
```

教程主要参考：[https://blog.linuxeye.com/449.html](https://5ch.in/ong)
