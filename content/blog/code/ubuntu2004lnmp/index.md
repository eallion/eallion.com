---
authors:
- eallion
categories:
- 代码
date: 2020-08-25 19:47:38
draft: false
lastmod: 2020-08-25 19:47:38
slug: ubuntu2004lnmp
summary: 在 Ubuntu 20.04.1 Desktop 中配置 Nginx、MySQL、PHP 和 phpMyAdmin 的完整流程，包括移除冲突软件、安装必要组件、修改验证方式、配置
  Nginx 访问权限以及管理服务启动选项。
tags:
- Ubuntu
- Nginx
- Mysql
- PHP
- LNMP
title: Ubuntu 20.04.1 配置 LNMP 本地环境备忘
---
本文主要记录在 Ubuntu 20.04.1 Desktop 版本中配置 Nginx、Mysql、PHP、phpMyAdmin。

提示：如果不太了解各项配置的意思，切勿在服务器生产环境中按本文配置！

### 安装 Nginx

- 移除老旧或冲突软件

```
sudo apt purge apache2* php7.0* mysql* phpmyadmin*
sudo apt autoremove
sudo apt autoclean
```

> 如果不能用`*`完全移除，可输入`sudo apt purge apache2-`然后按`tab`键一个一个删除。奇怪的 bug。

- 如果发生奇怪的事情，比如卸载`apache2`的时候把桌面或者设置都卸载了，趁重启前重装一下。

```
sudo apt install ubuntu-desktop
sudo apt install gnome-control-center
```

- 查找并清除 apache 配置

```
whereis apache2
sudo rm -rf /etc/apache2
```

- 移除 MySQL 的配置文件

```
sudo rm -rf /var/lib/mysql/
sudo rm -rf /etc/mysql/
```

- 最后再查看 apache2 是否还有残留

```
dpkg -l | grep apache2*
```

- 安装 Nginx

```
sudo apt install nginx -y
```

### 安装 PHP

```
sudo apt install php7.4 -y
sudo apt install php7.4-{common,curl,xsl,iconv,bcmath,bz2,intl,gd,mbstring,mysql,zip,fpm,cli,soap,redis,sqlite3} -y
```

### 安装 Mysql

```
sudo apt install mysql-server mysql-client libmysqlclient-dev -y
```

- 查看初始密码

```
sudo cat /etc/mysql/debian.cnf
```

### 安装 phpMyAdmin

```
sudo apt install phpmyadmin -y
```

- 修改验证方式

```
sudo mysql
mysql> SELECT user,plugin,host FROM mysql.user WHERE user = 'root';
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '******';
mysql> FLUSH PRIVILEGES;
mysql> quit;
```

- 新建`pma`用户或者`controluser`改为`root`

```
sudo vim /etc/phpmyadmin/config.inc.php
```

```
$cfg['Servers'][$i]['AllowNoPassword'] = TRUE;
$cfg['Servers'][$i]['controluser'] = 'root';
$cfg['Servers'][$i]['controlpass'] = '';
```

- 修改登录 PMA 用户为 `root`

```
sudo vim /etc/phpmyadmin/config-db.php
```

```
$dbuser='root';
```

- 配置 Nginx 访问 phpMyAdmin

```
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

```
cd /etc/nginx/sites-available/
sudo vim default
```

```
location /phpmyadmin {
    root /usr/share/;
    index index.php;
    try_files $uri $uri/ =404;

location ~ ^/phpmyadmin/(doc|sql|setup)/ {
    deny all;
    }

location ~ /phpmyadmin/(.+.php)${
    fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
    # include snippets/fastcgi-php.conf;
    }
}
```

### 禁止开机启动

```
sudo systemctl disable nginx
sudo systemctl disable mysql
sudo systemctl disable php7.4-fpm
#sudo systemctl disable apache2
```

### 需要用的时候手动打开

```
sudo systemctl start nginx
sudo systemctl start mysql
sudo systemctl start php7.4-fpm
# or
sudo service nginx start
```