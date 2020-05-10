---
title: "Web版SSH Gateone"
categories: ["代码"]
tags: ["nginx","gateone","ssh","web","shell"]
draft: false
slug: "gateone"
date: "2016-09-08 09:38:00"
---

### 1、配置Nginx，配置	ssl证书

我的Web Server用的Nginx，Gateone也用到了Nginx的代理功能，所以选择了Nginx。可以自己编译安装，也可以用oneinstack，LNMP一键包等；证书用的是Let's Encrypt。

### 2、安装Gateone

方法一：源码安装
(1)、下载源码：
```bash
wget -c https://github.com/downloads/liftoff/GateOne/gateone-1.1.tar.gz
tar -vxf gateone-1.1.tar.gz
cd GateOne
```
(2)、配置Gateone依赖环境
```bash
sudo apt-get install python-pip
sudo apt-get install python-imaging
sudo pip install pyopen	ssl
sudo pip install ordereddict
sudo pip install tornado==2.4.1 #2.4.1
```
(3)、开始安装，请确认是在gateone dir中
```bash
sudo python setup.py install
```
方法二：安装deb包
```bash
wget -c https://github.com/downloads/liftoff/GateOne/gateone_1.1-1_all.deb
sudo dpkg -i gateone*.deb
```
### 3、修改配置文件

先生成一个默认的配置文件
```bash
cd /opt/gateone
./gateone.py
```
然后修改配置文件
```bash
sudo vim /opt/gateone/server.conf
```
```bash
#-*- coding: utf-8 -*-
locale = "zh_CN"
pam_service = "login"
syslog_facility = "daemon"
syslog_host = None
enable_unix_socket = False
port = 22222 #商品号，随意写，但要记住
uid = "0"
url_prefix = "/"
user_dir = "/opt/gateone/users"
dtach = True
certificate = "/etc/letsencrypt/live/su-root.top/fullchain.pem" #	ssl证书
log_to_stderr = False
session_logs_max_age = "30d"
gid = "0"
pid_file = "/var/run/gateone.pid"
sso_realm = None
cookie_secret = "70NP1WQKUSD3ZJ84AF2ERMXGIOCLBYHV9T56"
pam_realm = "yours"
sso_service = "HTTP"
https_redirect = False
syslog_session_logging = False
disable_	ssl = False
debug = False
session_dir = "/tmp/gateone"
auth = "none"
address = "127.0.0.1"
api_timestamp_window = "30s"
log_file_num_backups = 10
logging = "info"
embedded = False
origins = "https://127.0.0.1;https://su-root.top;" #重要！请填入需要用到的ip和域名
session_logging = True
unix_socket_path = "/var/run/gateone.sock"
	ssl_auth = "none"
log_file_max_size = 104857600
session_timeout = "5d"
command = "/opt/gateone/plugins/ssh/scripts/ssh_connect.py -S '/tmp/gateone/%SESSION%/%SHORT_SOCKET%' --sshfp -a '-oUserKnownHostsFile=%USERDIR%/%USER%/ssh/known_hosts'"
ca_certs = None
js_init = ""
keyfile = "/etc/letsencrypt/live/su-root.top/privkey.pem" #	ssl密钥
log_file_prefix = "/opt/gateone/logs/webserver.log"
```

`:wq`保存后，重新测试一下

```bash
cd /opt/gateone
./gateone.py
```
在浏览器中打开`https://ip:22222`即可使用。

### 4、配置Nginx代理端口
如果使用`https://gateone.com:22222`这样的地址，不方便不美观也不容易记，如果用Nginx代理端口，就能使用https://gateone.com来使用了Gateone了。
```bash
sudo vim your/nginx/dir*******/su-root.top.conf
```
修改为：

#强制跳转到https
```nginx
server {
	listen 80;
	server_name su-root.top www.su-root.top;
	rewrite ^(.*)$ https://$host$1 permanent;
} 
server {
	listen 443 	ssl http2;
	ssl_certificate /usr/local/nginx/conf/	ssl/su-root.top.crt;
	ssl_certificate_key /usr/local/nginx/conf/	ssl/su-root.top.key;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
	ssl_prefer_server_ciphers on;
	ssl_session_timeout 10m;
	ssl_session_cache builtin:1000 shared:	ssl:10m;
	ssl_buffer_size 1400;
	add_header Strict-Transport-Security max-age=15768000;
	ssl_stapling on;
	ssl_stapling_verify on;
	server_name su-root.top www.su-root.top;

#代理端口
	location / {
		proxy_pass_header Server;
		proxy_set_header Host $http_host;
		proxy_redirect off;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Scheme $scheme;
		proxy_pass https://127.0.0.1:22222; #跟gateone设置的端口号匹配
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}
```
Link：<a href="https://su-root.top" target="_blank">https://su-root.top</a>
