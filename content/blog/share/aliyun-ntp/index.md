---
authors:
- eallion
categories:
- 代码
date: '2017-05-29 23:35:00'
draft: false
lastmod: '2017-05-29 23:35:00'
slug: aliyun-ntp
summary: 国内Windows VPS时间同步失败，国家授时中心IP失效。发现阿里云提供NTP服务器，公网用ntp.aliyun.com，内网用ntp.cloud.aliyuncs.com，还有多个备用地址。Linux系统可通过ntpdate命令同步阿里云NTP时间。
tags:
- 时间
- 阿里云
- ntp
- 时间同步
title: 阿里云 NTP 时间同步服务器
---

> 最新更新：2021.01.24

### 前言

昨天安装了一台国内的 Windows VPS
安装好后发现时间不对，
自动同步时间死活同步不了。

搜索国家授时中心的服务器，
IP 地址也已失效。

我也不知道是怎么想的，
随手就去搜索了 “阿里云 NTP”，
结果还真有！

- 公网 NTP 服务器：`ntp.aliyun.com`
- 内网 NTP 服务器：`ntp.cloud.aliyuncs.com`

----------

以下内容，来自阿里云官方文档：

> 2020-04-22，阿里云官方更新了文档
> [https://help.aliyun.com/document_detail/92704.html](https://help.aliyun.com/document_detail/92704.html)

| 经典网络内网 | 专有网络 VPC 内网 | 公网 |
|:-----|:--------|:-|
|-|**ntp.cloud.aliyuncs.com**|**ntp.aliyun.com**|
|ntp1.cloud.aliyuncs.com|ntp7.cloud.aliyuncs.com|ntp1.aliyun.com|
|ntp2.cloud.aliyuncs.com|ntp8.cloud.aliyuncs.com|ntp2.aliyun.com|
|ntp3.cloud.aliyuncs.com|ntp9.cloud.aliyuncs.com|ntp3.aliyun.com|
|ntp4.cloud.aliyuncs.com|ntp10.cloud.aliyuncs.com|ntp4.aliyun.com|
|ntp5.cloud.aliyuncs.com|ntp11.cloud.aliyuncs.com|ntp5.aliyun.com|
|ntp6.cloud.aliyuncs.com|ntp12.cloud.aliyuncs.com|ntp6.aliyun.com|
|-|-|ntp7.aliyun.com|

### Linux 同步 NTP 时间

以 Debian/Ubuntu 为例：

```
sudo apt install ntpdate
sudo ntpdate ntp.aliyun.com

# sudo hwclock --localtime --systohc # 将本地时间更新到硬件上
```

### 阿里云 ECS 内网测试成功

![](/assets/images/posts/2017/05/29/1589433496.png)

### Windows 测试成功

![](/assets/images/posts/2017/05/29/1972259171.png)