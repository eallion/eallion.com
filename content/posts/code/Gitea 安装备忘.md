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

> DEMO：<https://git.eallion.com/>

Gitea 有多种安装方式，本文是介绍 Docker 安装 Gitea 时的一些关键信息备忘笔记。  
Gitea 采用 Go 开发，对系统资源的需求不高，甚至在树莓派上都可以运行。  
我个人也在配置极低的软路由上使用过一段时间。  

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
      - /data:/var/www/gitea/data
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
      - /data:/var/www/gitea/test
```

需要把 Gitea 文件持久化存储在本地，不然 Docker 重启，就会丢失数据。  
本实例数据映射到宿主机目录：`/var/www/gitea/test`。

> 更新：更新一个宝塔面板添加 Gitea 容器的截图：  
> ![Gitea Docker](https://images.eallion.com/images/2021/07/giteadocker.png)  
> 题外话：个人不建议在生产环境使用任何面板包括宝塔面板。  

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

> 官方文档：<https://docs.gitea.io/zh-cn/reverse-proxies/>

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

如果是个人使用，预计 Gitea 的使用量会很小的话，可以使用 Sqlite3 数据库。  

我这台 VPS 宿主机有 Mysql 环境，所以我的`docker-compose.yml` 没有拉取`db`镜像，而是直接使用了宿主机的 Mysql。（实际上使用 Docker compose 拉取数据库会更简单。）  

但是 Docker 的默认网络设置，访问 `localhost` 并不能访问到宿主机的 Mysql，所以需要在宿主机的 Mysql 里面授权 Gitea 的 IP 访问。  
查看 Gitea 容器的 ID：（多余的步骤）  
```
docker ps --format "table {{.ID}}\t{{.Names}}"
```
显示结果：
```
CONTAINER ID   IMAGE
7f888888884e   gitea/gitea:latest
```
查看 Gitea 容器的 IP：（假设容器 ID 为：`7f888888884e`）  
```
docker exec -it 7f888888884e /bin/sh
```
进入容器后：
```
ifconfig
```
显示结果：
```
eth0      Link encap:Ethernet  HWaddr RA:ND:OM:MA:CA:DD
          inet addr:172.17.0.3  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:15 errors:0 dropped:0 overruns:0 frame:0
          TX packets:11 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:1244 (1.2 KiB)  TX bytes:718 (718.0 B)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
```
记录下`inet addr`显示的 IP，如：`172.17.0.3`。  
在宿主机终端设置：
```
mysql -uroot -p
```
```
mysql>GRANT ALL PRIVILEGES ON showx.* TO 'showx'@'172.17.0.3' IDENTIFIED BY 'password' WITH GRANT OPTION;
mysql>flush privileges;
```
如果 Gitea 容器的 IP 变动，需要重新授权新 IP。  

> 更新：数据库管理面板中，数据库可能也需要授权一下 Docker 的 IP。  
> ![Gitea Mysql](https://images.eallion.com/images/2021/07/giteamysql.png)  

### 安装 Gitea

完成上面这些步骤后，在浏览器中输入绑定的域名，如：[https://git.eallion.com](https://git.eallion.com)按提示安装即可。如果是本例的架构方式，在填写数据库信息的时候，Mysql host 不要填写`localhost`，而要填写`ifconfig`显示的 IP，如本例的：`172.17.0.1`。

安装预览：
![Gitea installation](https://images.eallion.com/images/2021/07/giteainstallation.png)
