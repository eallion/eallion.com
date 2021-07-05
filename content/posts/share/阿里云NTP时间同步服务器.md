---
title: "阿里云NTP时间同步服务器"
categories: ["代码"]
tags: ["时间","阿里云","ntp","时间同步"]
draft: false
slug: "aliyun-ntp"
date: "2017-05-29 23:35:00"
---

> 最新更新：2021.01.24

### 前言

昨天安装了一台国内的Windows VPS
安装好后发现时间不对，
自动同步时间死活同步不了。

搜索国家授时中心的服务器，
IP地址也已失效。

我也不知道是怎么想的，
随手就去搜索了“阿里云 NTP”，
结果还真有！

 - 公网 NTP 服务器：`ntp.aliyun.com`
 - 内网 NTP 服务器：`ntp.cloud.aliyuncs.com`

----------

以下内容，来自阿里云官方文档：

> 2020-04-22，阿里云官方更新了文档
> [https://help.aliyun.com/document_detail/92704.html](https://help.aliyun.com/document_detail/92704.html)


|经典网络内网|专有网络VPC内网|公网|
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

### 阿里云ECS 内网测试成功

![aliyunvpcntp](https://images.eallion.com/images/2017/05/29/1589433496.png!hugo.webp)

### Windows 测试成功

![Windows NTP](https://images.eallion.com/images/2017/05/29/1972259171.png!hugo.webp)



