---
title: "Gitea 安装备忘"
categories: ["日志"]
tags: 
  - git
  - gitea
  - vps
  - server
slug: "gitea"
draft: false
date: 2021-07-30T01:21:11+08:00
toc: false
---

计划自建 Gitea 时，默认您具有一定的`Docker`、`Nginx` 、`Mysql`基础。

Request：

- Docker
- Docker compose
- Nginx
- Mysql（非必需）
- 域名（非必需）

### Docker 安装 Gitea

> 官方文档：[https://docs.gitea.io/zh-cn/install-with-docker/](https://docs.gitea.io/zh-cn/install-with-docker/)

镜像名：[gitea/gitea:latest](https://hub.docker.com/r/gitea/gitea)

个人使用的数据库是宿主机的 Mysql，所以没有拉取`db`镜像。

`docker-compose.yml` 内容：

```yml
version: "3"

networks:
  gitea:
    external: false

services:
  server:
    image: gitea/gitea:1.14.5
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
#     - DB_TYPE=mysql
#     - DB_HOST=db:3306
#     - DB_NAME=gitea
#     - DB_USER=gitea
#     - DB_PASSWD=gitea
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/var/www/gitea/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
     ports:
       - "3000:3000"
       - "22222:22"
#    depends_on:
#      - db
#
#  db:
#    image: mysql:8
#    restart: always
#    environment:
#      - MYSQL_ROOT_PASSWORD=gitea
#      - MYSQL_USER=gitea
#      - MYSQL_PASSWORD=gitea
#      - MYSQL_DATABASE=gitea
#    networks:
#      - gitea
#    volumes:
#      - ./mysql:/var/lib/mysql
```

数据持久化：

```
volumes:
      - ./gitea:/var/www/gitea/data
```

需要把 Gitea 文件持久化存储在本地，不然 Docker 重启，就会丢失数据。

本实例数据映射到宿主机：`/var/www/gitea/data`目录。

### Nginx 反代

如果需要域名访问 Gitea，可选 Nginx 绑定域名。

绑定过程就省略了。

在`docker-compose.yml` 里映射的端口为`3000`。

```yml
ports:
       - "3000:3000"
```

所以需要利用 Nginx 反代实现域名访问 Gitea，不然需要添加端口号才能访问，如：`https://git.eallion.com:3000`，这样的带有端口号的 URL 不美观。

反代配置：

```conf
server
{
    listen 80;
	listen 443 ssl http2;
    server_name git.eallion.com;
    
# ......
# 其他配置
# ......

# 反代 Gitea 配置
location /
{
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    add_header X-Cache $upstream_cache_status;
    #Set Nginx Cache
    	add_header Cache-Control no-cache;
}

# ......

}
```

### 数据库

如果预计 Gitea 的使用量会很小，可以使用 Sqlite3 数据库。

因为这台 VPS 宿主机有 Mysql 环境，所以 Docker compose 没有拉取`db`镜像，而是直接使用了宿主机的 Mysql。

但是 Docker 的默认网络设置，访问 `localhost` 并不能访问到宿主机的 Mysql，所以需要在宿主机的 Mysql 里面授权 Gitea 的 IP 访问。

查看 Gitea 容器的 IP：（假设容器 ID 为：`7f888888884e`）

```
docker exec -it 7f888888884e /bin/sh

/ # ifconfig
```

记录下命令 `ifconfig`显示`eth0`的`inet addr`，如：`172.17.0.3`。

在宿主机终端设置：

```
mysql -uroot -p
```

```
mysql>GRANT ALL PRIVILEGES ON showx.* TO 'showx'@'172.17.0.3' IDENTIFIED BY 'password' WITH GRANT OPTION;
mysql>flush privileges;
```

数据库管理面板中，数据库可能也需要授权一下 Docker 的 IP。

### 安装 Gitea

完成上面这些步骤后，在浏览器中输入绑定的域名，如：[https://git.eallion.com](https://git.eallion.com)按提示安装即可。如果是本例的架构方式，在填写数据库信息的时候，Mysql host 不要填写`localhost`，而要填写`ifconfig`显示的 IP，如本例的：`172.17.0.1`。
