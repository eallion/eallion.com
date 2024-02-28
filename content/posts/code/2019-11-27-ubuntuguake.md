---
title: "Ubuntu 配置 Guake"
images: ["/assets/images/og/ubuntuguake.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","guake","onmyzsh","evervin","pcm"]
draft: false
slug: "ubuntuguake"
summary: "这篇文章介绍了如何配置Ubuntu的Guake终端。它建议使用源码安装，因为直接安装的Guake版本较旧且中文显示不完整。"
date: "2019-11-27 02:08:00"
lastmod: "2019-11-27 02:08:00"
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
