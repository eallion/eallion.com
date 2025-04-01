---
authors:
- eallion
categories:
- 代码
date: '2019-11-27 02:08:00'
draft: false
lastmod: '2019-11-27 02:08:00'
slug: ubuntuguake
summary: Guake 是一款美观实用的终端工具，推荐通过源码安装以获得最新版本并解决中文显示问题，具体步骤包括克隆仓库、运行脚本并编译安装，也可直接通过 apt
  安装但功能可能受限。
tags:
- Ubuntu
- guake
- onmyzsh
- evervin
- pcm
title: Ubuntu 配置 Guake
---
终端推荐安装 Guake ，又好看又方便：

### 安装 Guake

直接安装的 Guake 版本不够新，而且中文显示不全。
推荐源码安装：

```
sudo apt update
sudo apt -y install git curl wget
cd ~
git clone https://github.com/Guake/guake.git
cd guake
./scripts/bootstrap-dev-debian.sh run make
make
sudo make install
```

如果需要直接安装：

```
sudo apt install guake
```