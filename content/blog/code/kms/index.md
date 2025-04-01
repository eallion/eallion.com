---
authors:
- eallion
categories:
- 代码
date: 2020-11-04 04:51:22
draft: false
lastmod: 2020-11-04 04:51:22
slug: kms
summary: 为帮助朋友激活 Windows 10，基于 Docker 部署了 KMS 激活服务器 kms.eallion.com，支持 VOL 版 Windows
  和 Office 的 180 天循环激活。使用 mikolatero/vlmcsd 镜像搭建，提供详细激活命令和对应版本密钥，需管理员权限执行 CMD 脚本完成配置！
tags:
- KMS
- Windows
- 激活
title: KMS Windows 激活服务器
---
最近因朋友需要激活 Windows 10 ，拉了个 Docker 镜像，建了个激活服务器。

### 服务器地址

- [kms.eallion.com](https://kms.eallion.com)

激活服务器部署在腾讯云香港轻量云服务器上，此网页能打开则表示激活服务可用。  
只支持激活 VOL 版本的 Windows 和 Office。  
KMS 方式激活，激活一次其有效期只有 180 天，每隔一段时间系统会自动向 KMS 服务器请求续期。  

### 源码

- Docker 镜像源码：[https://hub.docker.com/r/mikolatero/vlmcsd](https://hub.docker.com/r/mikolatero/vlmcsd)  
- GitHub 源码：[https://github.com/Wind4/vlmcsd](https://github.com/Wind4/vlmcsd)

### GVLK KMS 客户端安装密钥

- Windows: [https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys](https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys)
- Office 2013: [https://technet.microsoft.com/zh-cn/library/dn385360.aspx](https://technet.microsoft.com/zh-cn/library/dn385360.aspx)
- Office 2016 & 2019: [https://technet.microsoft.com/zh-cn/library/dn385360?v=office.16.aspx](https://technet.microsoft.com/zh-cn/library/dn385360?v=office.16.aspx)

### 激活教程

激活过程需要用管理员权限打开 `CMD` 命令提示符。
不同的版本，需要更换为对应的 ipk 密钥。

- **激活 Windows**

```
slmgr.vbs -upk
slmgr.vbs -ipk NRG8B-VKK3Q-CXVCJ-9G2XF-6Q84J
slmgr.vbs -skms kms.eallion.com
slmgr.vbs -ato
slmgr.vbs -dlv
```

- **激活 32 位 Office**

> 需要找到 `OSPP.VBS` 文件所在的目录

```
cd \Program Files (x86)\Microsoft Office\Office16
cscript ospp.vbs/sethst:kms.eallion.com
cscript ospp.vbs/inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP
cscript ospp.vbs/act
cscript ospp.vbs/dstatusall
```

- **激活 64 位 Office**

> 需要找到 `OSPP.VBS` 文件所在的目录

```
cd \Program Files\Microsoft Office\Office16
cscript ospp.vbs/sethst:kms.eallion.com
cscript ospp.vbs/inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP
cscript ospp.vbs/act
cscript ospp.vbs/dstatusall
```