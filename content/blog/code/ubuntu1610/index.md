---
authors:
- eallion
categories:
- 代码
date: '2016-10-13 22:30:00'
draft: false
lastmod: '2016-10-13 22:30:00'
slug: ubuntu1610
summary: 本文介绍了 Ubuntu 系统优化与软件配置的完整指南，包括更换阿里云软件源、安装常用工具如 vim 和 Guake 终端、设置输入法、禁用不必要的服务如
  LibreOffice 和 Amazon、调整 Unity 界面、优化鼠标加速度、自动挂载硬盘、配置 SSH 和 Shadowsocks、安装状态栏指示器、配置
  Oh-My-Zsh、安装 VirtualBox 和 Chrome 浏览器、调整托盘图标...
tags:
- Ubuntu
- 优化
- ipv6
- 访客
- ubuntu 微信
title: Ubuntu 16.10 优化
---
1、换阿里云软件源
---------

阿里云：[http://mirrors.aliyun.com](http://mirrors.aliyun.com/)
在 `系统设置 - 软件和更新 - 下载自 - 选择下载服务器 - 中国 - mirrors.aliyun.com` 选择
或者直接编辑：

```bash
sudo mv /etc/apt/sources.list/etc/apt/sources.list.bak #备份系统默认的软件源
sudo vim /etc/apt/sources.list
```

添加：

```bash
deb http://mirrors.aliyun.com/ubuntu/yakkety main restricted
deb http://mirrors.aliyun.com/ubuntu/yakkety-updates main restricted
deb http://mirrors.aliyun.com/ubuntu/yakkety universe
deb http://mirrors.aliyun.com/ubuntu/yakkety-updates universe
deb http://mirrors.aliyun.com/ubuntu/yakkety multiverse
deb http://mirrors.aliyun.com/ubuntu/yakkety-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/yakkety-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/yakkety-security main restricted
deb http://mirrors.aliyun.com/ubuntu/yakkety-security universe
deb http://mirrors.aliyun.com/ubuntu/yakkety-security multiverse
```

2、Update
--------

```bash
sudo apt update
sudo apt upgrade
```

3、安装 vim
-------

```bash
sudo apt install vim
```

4、安装 Guake
---------

Guake 是一个比较酷的终端，除了可以用来装 B，其实也挺实用的。

```bash
sudo apt install guake
```

5、系统设置
------

在 `系统设置` 里进行一些必要的设置，如：壁纸、电源、显示、亮度、隐私

6、安装输入法
-------

我用的是 fcitx 的五笔拼音

```bash
sudo apt install fcitx-table-wbpy
```

如果需要搜狗拼音：

```bash
sudo vim /etc/apt/sources.list.d/ubuntukylin.list
```

加入 ubuntu kylin 的 apt 源：

```bash
deb http://archive.ubuntukylin.com:10006/ubuntukylin trusty main  
```

安装搜狗拼音：

```bash
sudo apt update  
sudo apt install sogoupinyin 
```

直接下载 deb 安装包：[http://pinyin.sogou.com/linux/](http://pinyin.sogou.com/linux/)

7、删除 Libreoffice
---------------

如果有需求，可以安装 WPS，从官网下载 deb 包即可

```bash
sudo apt remove libreoffice-common  
```

8、删除 Amazon
----------

```bash
sudo apt remove unity-webapps-common  
```

9、解决 “月月” 显示错误
------------

在 `时间和日期` 设置里，选择年份和星期同时显示，月份则会出现 “月月” 两个月字。
解决方法：
  1）、不要选择显示星期或者年份
  2）、手动设置显示格式：

```bash
gsettings set com.canonical.indicator.datetime time-format 'custom'
gsettings set com.canonical.indicator.datetime custom-time-format '% Y 年 % m 月 % d 日 % A% H:% M:% S'
```

10、Unity 显示的位置
----------------

下方显示：

```bash
gsettings set com.canonical.Unity.Launcher launcher-position Bottom
```

左方显示：

```bash
gsettings set com.canonical.Unity.Launcher launcher-position Left
```

11、点击图标最小化
---------

```bash
gsettings set org.compiz.unityshell:/org/compiz/profiles/unity/plugins/unityshell/launcher-minimize-window true
```

12、安装 Tweak tool 优化工具
-------------------

Tweak tool 有两个，一个是 unity-tweak-tool，一个是 gnome-tweak-tool
安装 unity-tweak-tool 后，Amazon 图标会回来，我选择的是安装 gnome-tweak-tool

```bash
sudo apt install gnome-tweak-tool
```

13、禁用房客 Guest
------------

编辑：

```bash
sudo vim /usr/share/lightdm/lightdm.conf.d/50-guest-wrapper.conf
```

把里面的内容修改为：

```bash
[Seat:*]
#guest-wrapper=/usr/lib/lightdm/lightdm-guest-session
allow-guest=false
```

14、禁用 ipv6
---------

1）、先查看你的网卡信息，并非所有网卡都叫 `eth0`

```bash
ifconfig
```

记录下网卡名字，比如我的，有 `enp4s0f2`、`lo`、`wlp9s0b1` 三个
2）、编辑文件：

```bash
sudo vim /etc/sysctl.conf
```

在末尾添加：

```bash
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.`lo`.disable_ipv6 = 1 #需跟网卡信息对应
net.ipv6.conf.`enp4s0f2`.disable_ipv6 = 1 #需跟网卡信息对应
net.ipv6.conf.`wlp9s0b1`.disable_ipv6 = 1 #需跟网卡信息对应
```

3）、重启生效：

```bash
sudo sysctl -p
```

15、设置鼠标加速度
----------

注：`鼠标加速度` 和 `鼠标速度` 是两个不同的概念
1）、命令：

```bash
xset m 0 0
```

或者把它写入开机启动。
2）、我现在用的是另外一个方法，在 Ubuntu 软件 里搜索 `Mouse`，结果中选择 `Keyboard and Mouse` 安装，用这个 GUI 设置。这个方法更简便，重启或休眠后也不会失效。

16、自动挂载硬盘
---------

我一共有 3 块硬盘，除了系统盘，还有 2 块数据盘，因工作娱乐原因，需要自动挂载。
1）、查看硬盘的 UUID 和 Type

```bash
sudo blkid
```

结果会显示：

```bash
/dev/sda2: ...
/dev/sdb5: LABEL="files" UUID="a1eaf999-b7dc-41e2-9314-5f4dec421db5" TYPE="ext4"
```

记录下 UUID 和 Type。
2）、我会选择挂载到 Home 的 Files 文件夹下
新建一个 Files 文件夹

```bash
cd ~
sudo mkdir Files
sudo chown -R eallion:eallion Files
```

3）、编辑文件：

```bash
sudo vim /etc/fstab
```

按格式添加：

```bash
UUID=a1eaf999-b7dc-41e2-9314-5f4dec421db5    /home/eallion/Files    ext4    defaults    0    0
```

17、安装 openssh-server
-------------------

```bash
sudo apt install openssh-server
```

配置 Google Authenticator：（非必须，可选）

```bash
sudo apt install libpam-google-authenticator
```

启动：

```bash
google-authenticator
```

修改配置：

```bash
sudo vim /etc/pam.d/sshd
```

添加：

```bash
auth required pam_google_authenticator.so
```

修改：

```bash
sudo vim /etc/ssh/sshd_config
```

no 改为 yes

```bash
ChallengeResponseAuthentication yes
Port 22222 #修改 SSH 端口
```

18、安装 Shadownsocks Qt5
---------------------

```bash
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt update
sudo apt install shadowsocks-qt5
```

启动 Shadowsocks Qt5 的命令：

```bash
ss-qt5
```

19、安装状态栏指示器（显示网速、内存、硬盘）
-----------------------

我用的是：[indicator-sysmonitor](https://github.com/fossfreedom/indicator-sysmonitor)，Ubuntu 16.04 / 16.10 确认可用。

```bash
sudo add-apt-repository ppa:fossfreedom/indicator-sysmonitor
sudo apt update
sudo apt install indicator-sysmonitor
```

20、配置 Oh-My-Zsh
--------------

```bash
cd ~
sudo apt install git curl zsh
```

```bash
sh -c "$(curl -fsSL https://raw.GitHubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

修改一下配置：

```bash
sudo vim .zshrc
```

```bash
...
ZSH_THEME="ys" #主题
...
plugins=(git sudo cp fasd ...) #插件
...
```

21、安装 VirtualBox
---------------

```bash
sudo apt install virtualbox
```

也可以从官网下载最新版

22、安装 Google Chrome 浏览器
---------------------

如果喜欢 Chromium，可以从软件中心安装
但是我更喜欢 Chrome，到 [https://chrome.google.com](https://dl.google.com/Linux/direct/google-chrome-stable_current_amd64.deb) 可以下载最新版。

23、安装 GDebi
----------

安装 deb 软件包时，可以用 GDebi 替换 Ubuntu 软件中心。

```bash
sudo apt install gdebi
```

24、安装微信
-------

可以直接在 Chrome app 里安装微信应用；

也可以安装 geeeeeeeeek 提供的微信，这实质上跟 Chrome 应用是一回事。
[https://github.com/geeeeeeeeek/electronic-wechat](https://github.com/geeeeeeeeek/electronic-wechat)
前提是已经安装 `git`、`Node.js`、`npm`

```bash
git clone https://github.com/geeeeeeeeek/electronic-wechat.git
cd electronic-wechat
npm install && npm start
```

也可直接下载一个 release 版本：[electronic-wechat](https://github.com/geeeeeeeeek/electronic-wechat/releases)

25、调整状态栏托盘图标顺序
--------------

```bash
sudo vim /usr/share/indicator-application/ordering-override.keyfile
```

修改：

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

具体参考：[https://eallion.com/ubuntu-system-icon](https://eallion.com/ubuntu-system-icon)

26、安装 tlp
--------

提高电池的寿命并且减少过热

```bash
sudo add-apt-repository ppa:linrunner/tlp
sudo apt update
sudo apt install tlp tlp-rdw
sudo tlp start
```

27、主题图标推荐
---------

Numix：[https://numixproject.org](https://numixproject.org/)
通过 PPA 安装：

```bash
sudo add-apt-repository ppa:numix/ppa
sudo apt update
sudo apt install numix-gtk-theme
sudo apt install numix-icon-theme-circle
```

安装好之后，通过 Tweak tool 设置。