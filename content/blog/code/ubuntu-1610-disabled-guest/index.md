---
authors:
- eallion
categories:
- 代码
date: '2016-10-12 02:42:00'
draft: false
lastmod: '2016-10-12 02:42:00'
slug: ubuntu-1610-disabled-guest
summary: 通过修改 `/usr/share/lightdm/lightdm.conf.d/50-guest-wrapper.conf` 文件中的 `allow-guest`
  参数为 `false`，可以禁用 Ubuntu 系统的访客账户功能。注意配置文件路径已从旧版的 `/etc/lightdm/lightdm.conf.d` 变更为新位置！
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