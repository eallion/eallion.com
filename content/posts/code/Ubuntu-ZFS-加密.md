---
title: "Ubuntu ZFS 加密 Home 目录"
categories: ["代码"]
tags: ["Ubuntu","ZFS","encryption","加密","Linux"]
slug: "ubuntu-zfs-encryption"
draft: false
date: 2020-09-11T22:37:13+08:00
---

### 前言

Ubuntu 20.04 的安装镜像支持 ZFS 文件系统：
![](https://images.eallion.com/images/2020/09/install.png)

本文是**安装后**加密 ZFS Home 目录的备忘教程。  
另外有**安装前**加密 ZFS Root 文件系统的备忘教程。链接：[《Ubuntu ZFS 全盘加密 Root Boot》](https://eallion.com/ubuntu-zfs-root-encryption)

### 步骤：

1、安装时创建一个随意的临时账号，或者安装完成后，新建一个临时管理员用户，暂且把这个账号叫做：`tempuser`，并把它设置为自动登录，此账号必须为管理员账号。  
后面的步骤均在此临时账号下进行。

2、注销或重启后，登录`tempuser`账号，重新创建一个长期使用的用户,比如我的账号叫：`eallion`

3、查看 ZFS 数据集
```
sudo zfs list -r rpool
```  
记录下你要用到的用户名的数据集名称，每个人的快照名字都不一样。  
比如我的：`eallion_c1doe6`  
返回值如图所示：
![](https://images.eallion.com/images/2020/09/rpoollist.png)

4、取消挂载新用户`eallion`的数据集
```
sudo zfs set mountpoint=none rpool/USERDATA/<yourdatasetname> 
```
例如：
```
sudo zfs set mountpoint=none rpool/USERDATA/eallion_c1doe6
```
> 如果这一步遇到错误，如：target is busy，需要自行排错。比如我遇到的就是挂载了其他硬盘，导致不能取消数据集的挂载。

5、给新用户`eallion`创建一个新的加密数据集
```
sudo zfs create -o encryption=on -o keyformat=passphrase rpool/USERDATA/<yourusername>_encrypt
```
例如：
```
sudo zfs create -o encryption=on -o keyformat=passphrase rpool/USERDATA/eallion_encrypt
```
输入密码短语，回车。（一定要记住此密码。）

6、挂载这个加密数据集到新用户目录
```
sudo zfs set mountpoint=/home/<yourusername>  rpool/USERDATA/<yourusername>_encrypt
```
例如：
```
sudo zfs set mountpoint=/home/eallion  rpool/USERDATA/eallion_encrypt
```

7、检测一下是否配置正确（如果没有返回什么，就代表配置成功了）
```
sudo mount -a
```

8、检查一下加密是否成功（加密数据卷应该会有密码方式，如：`aes-256-gcm`）
```
sudo zfs list -r rpool -o name,encryption
```
如图：  
我用的是全盘加密，所以全部返回`aes-256-gcm`，  
如果只加密了 Home 目录，则其他目录返回的是 `None`。
![](https://images.eallion.com/images/2020/09/encryption.png)

9、让加密目录用上 ZFS 的自动快照功能，Grub 引导项中也能选择快照历史恢复系统。
```
sudo zfs set com.ubuntu.zsys:bootfs-datasets=rpool/ROOT/<nameofdataset> rpool/USERDATA/<yourusername>_encrypt
```
例如：（**注意**：你的数据集不一定叫`ubuntu_rroyp0`，通过第`3`步可以查看。）
```
sudo zfs set com.ubuntu.zsys:bootfs-datasets=rpool/ROOT/ubuntu_rroyp0 rpool/USERDATA/eallion_encrypt
```

10、请确保 Home 目录的权限
```
sudo chown <yourusername>:<yourusername> /home/<yourusername>
```
例如：
```
sudo chown -R eallion:eallion /home/eallion
```

11、安装 `ecryptfs-utils`加密交换空间 Swap
```
sudo apt install ecryptfs-utils
sudo ecryptfs-setup-swap
```
此时出现的一些错误提示例如`swapon: cannot open /dev/mapper/cryptswap1: No such file or device`可忽略。

12、查看一下是否成功
```
cat /etc/fstab
cat /etc/crypttab
```

PS、如果有多余的用户目录数据集占用空间，比如使用一断时间后才想起来想加密 Home 目录，老的数据集可以通过命令销毁，不过一定要记得备份重要数据。
```
sudo zfs destroy eallion1_123abc
```
**Reference:**  
<https://medium.com/@steinarlbergmyrvang/ubuntu-20-04-with-encrypted-home-f5ce490333cc>