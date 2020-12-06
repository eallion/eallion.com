---
title: "短链接url压缩程序Polr"
categories: ["代码"]
tags: ["polr","url","shortener","压缩","短链接"]
draft: false
slug: "polr-url-shortener"
date: "2017-04-08 23:41:00"
---

> 开源项目地址：<a href="https://github.com/Cydrobolt/polr" target="_blank">https://github.com/Cydrobolt/polr</a>

案例：
> - <a href="https://go.eallion.com" target="_blank">https://go.eallion.com</a>
> - <a href="https://tk.ci" target="_blank">https://tk.ci</a>
> - <a href="https://5ch.in" target="_blank">https://5ch.in</a>

我一直在用这个短链接压缩程序，最近刚好有朋友问到，就写一下教程。
其实很简单，虚拟主机都能安装，但是推荐用vps安装，因为虚拟主机只能使用1.5.1版本。

以<a href="https://oneinstack.com/" target="_blank">Oneinstack</a> LNMP为例

服务器要求：
------

 - Apache, nginx, IIS, or lighttpd (作者建议使用Apache，我是使用的Nginx)
 - PHP >= 5.5.9
 - MariaDB or MySQL >= 5.5, SQLite 三个都可以
 - composer
 - PHP 扩展:

    - OpenSSL 
    - PDO 
    - php5-mysql
    - Mbstring 
    - Tokenizer 
    - JSON 

1、下载源码
------
```bash
# 切换到root
sudo su 
# 假设准备使用的域名是go.eallion.com，网站根目录：/data/wwwroot/go.eallion.com
cd /data/wwwroot/go.eallion.com 
# git下载源码
git clone https://github.com/cydrobolt/polr.git --depth=1 
# 设置权限
chmod -R 755 polr
chown -R www:www polr
```

2、用composer安装
-------------

```bash
cd polr
curl -sS https://getcomposer.org/installer | php
php composer.phar install --no-dev -o
```

3、配置虚拟主机conf
------------

如果没有php5-fpm，则需要安装
```bash
apt install php5-fpm
# 配置网站配置文件
vim /usr/local/nginx/conf/vhost/go.eallion.com.conf
```
我的配置：
```bash
upstream php {
    server unix:/var/run/php5-fpm.sock;
    server 127.0.0.1:9000;
}
server {
listen 80;
listen 443 ssl http2;
ssl_certificate /usr/local/nginx/conf/ssl/go.eallion.com.crt;
ssl_certificate_key /usr/local/nginx/conf/ssl/go.eallion.com.key;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
ssl_prefer_server_ciphers on;
ssl_session_timeout 10m;
ssl_session_cache builtin:1000 shared:SSL:10m;
ssl_buffer_size 1400;
add_header Strict-Transport-Security max-age=15768000;
ssl_stapling on;
ssl_stapling_verify on;
server_name go.eallion.com;
access_log /data/wwwlogs/go.eallion.com_nginx.log combined;
index index.html index.htm index.php;
root /html/go.eallion.com/polr/public; #注意要配置到public目录
if ($ssl_protocol = "") { return 301 https://$host$request_uri; }

location ~ .*\.(wma|wmv|asf|mp3|mmf|zip|rar|jpg|gif|png|swf|flv)$ {
    valid_referers none blocked *.go.eallion.com go.eallion.com www.go.eallion.com;
    if ($invalid_referer) {
        #rewrite ^/ http://www.linuxeye.com/403.html;
        return 403;
        }
    }
location ~ [^/]\.php(/|$) {
    #fastcgi_pass remote_php_ip:9000;
    fastcgi_pass unix:/dev/shm/php-cgi.sock;
    fastcgi_index index.php;
    include fastcgi.conf;
    }
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|ico)$ {
    expires 30d;
    access_log off;
    }
    location / {
            try_files $uri $uri/ /index.php$is_args$args;
            # rewrite ^/([a-zA-Z0-9]+)/?$ /index.php?$1;
    }

    location ~ \.php$ {
            try_files $uri =404;
            include /usr/local/nginx/conf/fastcgi_params;

            fastcgi_pass    php;
            fastcgi_index   index.php;
            fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param   HTTP_HOST       $server_name;
    }
location ~ .*\.(js|css)?$ {
    expires 7d;
    access_log off;
    }
```

4、准备MySQL数据库
------------
```bash
CREATE DATABASE polrdatabasename;
```
其实用phpMyAdmin更方便。

5、安装
----
先复制一个.env文件
```bash
cp .env.setup .env
```
因为一直是在root账号下操作，安装之前再修改一下权限
```bash
chown -R www:www /data/wwwroot/go.eallion.com/polr
```
然后就可以在线安装了
打开域名，如：<a href="https://go.eallion.com" target="_blank">https://go.eallion.com</a>
会自动跳转到安装页面，按提示一步步完成就可以了。
