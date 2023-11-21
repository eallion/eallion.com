---
title: "修改 Ubuntu 状态栏托盘图标顺序"
images: ["/assets/images/og/ubuntu-system-icon.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","图标","托盘","状态栏"]
draft: false
slug: "ubuntu-system-icon"
date: "2016-10-17 04:32:00"
lastmod: "2016-10-17 04:32:00"
---

状态栏托盘图标顺序，在 `/usr/share/indicator-application/ordering-override.keyfile` 修改：

直接修改这个文件会在所有用户中生效，如果只要在当前用户改变图标顺序，把这个文件复制到 `~/.local/share/indicators/application` 目录下就可以了：

```bash
mkdir -p ~/.local/share/indicators/application
cp /usr/share/indicator-application/ordering-override.keyfile 
~/.local/share/indicators/application/
```

我是直接修改：

```bash
sudo vim /usr/share/indicator-application/ordering-override.keyfile
```

文件的内容类似这样（顺序越大则显示在托盘越左侧）：

```bash
[Ordering Index Overrides]
nm-applet=1
gnome-power-manager=2
ibus=3
gst-keyboard-xkb=4
gsd-keyboard-xkb=5
```

可以按自己的需要添加或调整：

```bash
[Ordering Index Overrides]
nm-applet=1 #系统图标
gnome-power-manager=2 #电池图标
ibus=3 #ibus 输入法
gst-keyboard-xkb=4 
gsd-keyboard-xkb=5
netease-cloud-music=6 #网易云音乐
electronic-wechat1=7 #微信
Shadowsocks-Qt5=8 #SS
fcitx-qimpanel=9 #fcitx 输入法
Nylas N11=10 #N1 邮件客户端
chrome_app_indicator_3=11 #Chrome 图标
indicator-sysmonitor=20 #网速指示器
```

如果要查看自己的系统有哪些状态栏托盘图标，可以编辑一个脚本：

```bash
sudo vim icon.sh
```

添加：

```bash
#!/bin/sh
 
dbus-send --type=method_call --print-reply --dest=com.canonical.indicator.application/com/canonical/indicator/application/service com.canonical.indicator.application.service.GetApplications | grep "string" > /tmp/indicators.txt
 
c=$(wc -l < /tmp/indicators.txt)
i=$((c / 8))
s=6
 
while [ "$i" != "0" ]; do
    echo $(awk -v n=$s '/string/ && !--n {getline; print; exit}' /tmp/indicators.txt)
    s=$(( $s + 8 ))
    i=$(( $i - 1 ))
done
```

运行：

```bash
sudo ./icon.sh
```

比如我的，结果显示：

```bash
string "chrome_app_indicator_4"
string "Nylas N11"
string "indicator-sysmonitor"
string "Shadowsocks-Qt5"
string "fcitx-qimpanel"
string "electronic-wechat1"
string "netease-cloud-music"
string "nm-applet"
```

需要注意的是，想要将一个托盘图标设置在最左边，只修改该 indicator 的顺序值是不行的，要修改所有在它右边的 indicators 的顺序值。

修改完成后可以直接运行 `$restart unity-panel-service` 使改变生效，如果命令不可用，注销并重新登入即可。

感谢：[http://www.slblog.net/2014/05/change-the-order-of-indicators-in-ubuntu-indicators-applet](http://www.slblog.net/2014/05/change-the-order-of-indicators-in-ubuntu-indicators-applet)
