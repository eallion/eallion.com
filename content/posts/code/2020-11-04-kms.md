---
title: "KMS Windows 激活服务器"
categories: ["代码"]
tags: ["KMS","Windows","激活"]
slug: "kms"
draft: false
Comments: true
date: 2020-11-04T12:51:22+08:00
toc: false
---

最近因朋友需要激活 Windows 10 ，拉了个 Docker 镜像，建了个激活服务器。

### 服务器地址

- [kms.eallion.com](https://kms.eallion.com)

激活服务器部署在腾讯云香港轻量云服务器上，此网页能打开则表示激活服务可用。  
只支持激活 VOL 版本的 Windows 和 Office。  
KMS 方式激活，激活一次其有效期只有 180 天，每隔一段时间系统会自动向 KMS 服务器请求续期。  

### 源码

- Docker 镜像源码：<https://hub.docker.com/r/mikolatero/vlmcsd>  
- GitHub 源码：<https://github.com/Wind4/vlmcsd>

### GVLK KMS 客户端安装密钥

- Windows: <https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys>
- Office 2013: <https://technet.microsoft.com/zh-cn/library/dn385360.aspx>
- Office 2016 & 2019: <https://technet.microsoft.com/zh-cn/library/dn385360 (v=office.16).aspx>

### 激活教程
激活过程需要用管理员权限打开 `CMD` 命令提示符。   
不同的版本，需要更换为对应的 ipk 密钥。

- ** 激活 Windows**
```
slmgr.vbs -upk
slmgr.vbs -ipk NRG8B-VKK3Q-CXVCJ-9G2XF-6Q84J
slmgr.vbs -skms kms.eallion.com
slmgr.vbs -ato
slmgr.vbs -dlv
```

- ** 激活 32 位 Office**
> 需要找到 `OSPP.VBS` 文件所在的目录
```
cd \Program Files (x86)\Microsoft Office\Office16
cscript ospp.vbs/sethst:kms.eallion.com
cscript ospp.vbs/inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP
cscript ospp.vbs/act
cscript ospp.vbs/dstatusall
```

- ** 激活 64 位 Office**
> 需要找到 `OSPP.VBS` 文件所在的目录
```
cd \Program Files\Microsoft Office\Office16
cscript ospp.vbs/sethst:kms.eallion.com
cscript ospp.vbs/inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP
cscript ospp.vbs/act
cscript ospp.vbs/dstatusall
```
