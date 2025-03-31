---
authors:
- eallion
categories:
- 代码
date: '2016-10-12 02:42:00'
draft: false
lastmod: '2016-10-12 02:42:00'
slug: ubuntu-1610-disabled-guest
summary: 修改Linux系统访客账户设置需编辑特定配置文件。新版系统路径为/usr/share/lightdm/lightdm.conf.d/50-guest-wrapper.conf，旧版/etc路径已不适用。
tags:
- Ubuntu
- '1610'
- guest
- session
- 访客
title: Ubuntu 16.10 禁用 Guest 访客
---

修改：

```
sudo vim /usr/share/lightdm/lightdm.conf.d/50-guest-wrapper.conf
```

```
[Seat:*] 
allow-guest=false
```

并非以前版本的 `/etc/lightdm/lightdm.conf.d` 位置，而是 `/usr/share/lightdm/lightdm.conf.d`