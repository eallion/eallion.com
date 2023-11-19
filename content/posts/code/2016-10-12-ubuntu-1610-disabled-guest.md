---
title: "Ubuntu 16.10 禁用 Guest 访客"
images: ["https://og.eallion.com/api/og?title=Ubuntu%2016.10%20%E7%A6%81%E7%94%A8%20Guest%20%E8%AE%BF%E5%AE%A2"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","1610","guest","session","访客"]
draft: false
slug: "ubuntu-1610-disabled-guest"
date: "2016-10-12 02:42:00"
lastmod: "2016-10-12 02:42:00"
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
