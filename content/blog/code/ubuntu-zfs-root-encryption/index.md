---
authors:
- eallion
categories:
- 代码
date: 2020-09-11 15:48:35
draft: false
lastmod: 2020-09-11 15:48:35
slug: ubuntu-zfs-root-encryption
summary: Ubuntu 20.04 支持 ZFS 文件系统安装但默认不提供全盘加密功能。通过修改 LiveCD 中的 zsys-setup 文件，在 zpool
  create 命令前添加加密参数并设置密码短语，可实现原生加密 Root 和 Boot 目录。具体步骤包括编辑文件、添加加密选项并保存后运行安装程序。这种方法比仅加密
  Home 目录更安全！
tags:
- Ubuntu
- ZFS
- encryption
- 加密
- Linux
title: Ubuntu ZFS 原生全盘加密
---
### 前言

Ubuntu 20.04 的安装镜像支持 ZFS 文件系统（从 19.10 就开始支持了）：
![](/assets/images/posts/2020/09/install.png)

但是如果选择此项安装时，默认就没有全盘加密功能了。  
本文介绍如何安装 Ubuntu 到 ZFS 文件系统时使用原生加密。  
可加密 Root Boot 等目录。  
比 [《Ubuntu ZFS 加密 Home 目录》](https://eallion.com/ubuntu-zfs-encryption) 更优秀。

### 步骤

1、下载 Ubuntu 20.04 镜像，按常规方法制作 U 盘 LiveCD。

> [https://releases.ubuntu.com/](https://releases.ubuntu.com/)

2、通过 U 盘引导进入 LiveCD 后，选择 `试用 Ubuntu`（`Try Ubuntu`）。

3、按 `Ctrl`+`Alt`+`T` 打开终端  
用熟悉的文本编辑器编辑 `/usr/share/ubiquity/zsys-setup` 文件。

```
sudo vi /usr/share/ubiquity/zsys-setup
```

查找到 `zpool create`，Ubuntu 20.04.1 镜像的此文件含有 2 组 `zpool create`。  
找到最后一行包含 `rpool` 的这一组代码块。  
然后修改：

```
        zpool create -f \
```

改为：

```
        echo "mypassphrase" | zpool create -f \
```

其中 `mypassphrase` 修改为自己的密码短语，建议不要太简单。  
在 `rpool` 所在行的 **前面** 添加下面的参数：

```
           #-O recordsize=1M \ # 可选
            -O encryption=aes-256-gcm \
            -O keylocation=prompt \
            -O keyformat=passphrase \
```

按 `ESC` 输入 `:wq` 回车，保存后退出。

4、运行 `ubiquity` 开始安装 Ubuntu。

如图：（注意在 `rpool` 一行之前加入这些代码）
![](/assets/images/posts/2020/09/zsys-setup.png)

**Reference:**  
[https://linsomniac.gitlab.io/post/2020-04-09-ubuntu-2004-encrypted-zfs/](https://linsomniac.gitlab.io/post/2020-04-09-ubuntu-2004-encrypted-zfs/)