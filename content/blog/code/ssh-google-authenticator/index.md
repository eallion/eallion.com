---
authors:
- eallion
categories:
- 代码
date: '2016-09-08 10:55:00'
draft: false
lastmod: '2016-09-08 10:55:00'
slug: ssh-google-authenticator
summary: 为提高SSH登录安全性，改用Google双重验证并更换默认端口。首先安装OpenSSH服务和Google-Authenticator工具，生成密钥后通过手机APP扫描绑定。修改PAM和SSH配置文件启用验证功能，最后重启SSH服务。登录时需输入手机动态验证码，兼顾安全性与便捷性。
tags:
- Ubuntu
- google
- ssh
- two factor
- authenticator
title: SSH Google Authenticator
---

我经常需要用 `SSH` 连加家到自己的电脑上，如果单独用密码验证，存在很多安全隐患，如果用密钥，又很麻烦，所以我选择的是用 Google 的双重验证。顺便换了一个非 22 端口。
下面的方法同样适用于 Ubuntu VPS，我的几个 VPS 都是这样设置的。

> Ubuntu 16.04.1 LTS 64bit
> OpenSSH server

### 1、安装 SSH 服务

```bash
sudo apt update
sudo apt install openssh-server
```

### 2、安装 Google-Authenticator

```bash
sudo apt update
sudo apt install libpam-google-authenticator
```

### 3、生成密钥

```bash
google-authenticator
```

过程中全部按 `y`。

### 4、配置手机 app

用 `Google-Authenticator`、`洋葱`、`Authy`、`身份宝` 等扫描上一步生成的二维码即可。
我个人使用的是 Authy。

### 5、配置

```bash
sudo vim /etc/pam.d/sshd
```

添加：

```bash
auth required pam_google_authenticator.so
```

配置：

```bash
sudo vim /etc/ssh/sshd_config
```

修改：

```bash
ChallengeResponseAuthentication yes #改为 yes
port 22222 #SSH 默认使用 22 端口，这里看个人喜好修改成其他的或不修改
```

5、重启 SSH

```bash
sudo service ssh restart
```

使用时，Verification code：输入手机 app 生成的验证码即可。