---
title: "Ubuntu 16.10 禁用 Guest 访客"
images: ["/assets/images/og/ubuntu-1610-disabled-guest.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","1610","guest","session","访客"]
draft: false
slug: "ubuntu-1610-disabled-guest"
summary: "这篇文章介绍了如何禁用 Ubuntu 16.10 的 Guest 访客功能。作者指出，在以前的版本中，可以通过修改 /etc/lightdm/lightdm.conf.d 文件来实现禁用，但实际上，在 Ubuntu 16.10 中，需要修改的文件路径是 /usr/share/lightdm/lightdm.conf.d。文章没有提供进一步的解释或细节。"
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
