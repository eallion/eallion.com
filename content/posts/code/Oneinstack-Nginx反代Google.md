---
title: "Oneinstack Nginx反代Google"
categories: ["代码"]
tags: ["google","oneinstack","nginx","proxy"]
draft: false
slug: "oneinstack-nginx-google"
date: "2016-09-08 08:30:00"
---

> <a href="https://getgoogle.org" target="_blank">`GetGoogle.org`</a>
> （目前域名已经被墙，现在翻墙还是能够继续使用，但既然都能够翻墙了，也不需要用镜像来搜索了吧。：逃）

1、安装 <a href="https://5ch.in/ois" target="_blank">oneinstack</a>，如果只需要反代Google，nginx选择y，其他全部选择n;

2、安装编译Nginx，当前版本为1.10.1，注意用`nginx -V`查看一下Nginx版本号

    cd ~/oneinstack/src 

#下载源码

```
git clone https://github.com/cuber/ngx_http_google_filter_module 
git clone https://github.com/yaoweibin/ngx_http_substitutions_filter_module
wget http://mirrors.linuxeye.com/oneinstack/src/pcre-8.38.tar.gz
wget http://mirrors.linuxeye.com/oneinstack/src/openssl-1.0.2h.tar.gz
```

#解压

```
tar xzf pcre-8.38.tar.gz
tar xzf openssl-1.0.2h.tar.gz
tar xzf nginx-1.10.1.tar.gz
cd nginx-1.10.1
```

#编译

```
./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_stub_status_module --with-http_v2_module --with-http_ssl_module --with-ipv6 --with-http_gzip_static_module --with-http_realip_module --with-http_flv_module --with-openssl=../openssl-1.0.2h --with-pcre=../pcre-8.38 --with-pcre-jit --with-ld-opt='-ljemalloc' --add-module=../ngx_http_google_filter_module --add-module=../ngx_http_substitutions_filter_module

make  #不需要make install

mv /usr/local/nginx/sbin/nginx{,_`date +%m%d`}  #备份现有nginx

cp objs/nginx /usr/local/nginx/sbin/  #更新nginx

nginx -t  #检查nginx语法

service nginx restart
```

要正确使用ngx_http_google_filter_module模块，需要依赖扩展：

>  - pcre 正则
>  - ngx_http_proxy_module 反向代理
>  - ngx_http_substitutions_filter_module 多重替换

3、安装Let's Encrypt，Oneinstack已经集成了Let's Encrypt

```
cd /root/oneinstack
./addons.sh
```

选择7，安装Let's Encrypt即可。

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
6、重启Nginx
```
service nginx restart
```
教程主要参考：<a href="https://5ch.in/ong" target="_blank">https://blog.linuxeye.com/449.html</a>
