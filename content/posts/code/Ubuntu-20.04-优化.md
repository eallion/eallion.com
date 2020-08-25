---
title: "Ubuntu 20.04 优化"
categories: ["代码"]
tags: ["Ubuntu","优化","美化","ZFS","gnome"]
draft: false
slug: "ubuntu2004"
date: "2020-05-25 12:36:00"
---

![Ubuntu 20.04](https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@gh-pages/images/2020/05/ubuntu2004.png)
> 实机安装 桌面效果截图 [（查看大图）](https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@gh-pages/images/2020/05/ubuntu2004.png "（查看大图）")

硬件环境：
```bash
eallion@eallion:~$ screenfetch

eallion@eallion
OS: Ubuntu 20.04 focal
Kernel: x86_64 Linux 5.4.0-31-generic
Uptime: 10m
Packages: 2068
Shell: zsh 5.8
Resolution: 3840x1080
DE: GNOME 3.36.2
WM Theme: 
GTK Theme: Yaru [GTK2/3]
Icon Theme: Yaru
Font: Ubuntu 11
Disk: 1009G / 1.5T (67%)
CPU: Intel Core i5-7500 @ 4x 3.8GHz [39.0°C]
GPU: GeForce GTX 1050 Ti
RAM: 3125MiB / 15716MiB
```

原来在用 [Ubuntu 19.10](https://eallion.com/ubuntu1910)，通过 `do-release-upgrade` 升级到 Ubuntu 20.04 后，因为一些配置出现了些奇怪的问题，索性重新安装了一次。记录一下安装优化过程。

------------

### 基础优化
#### 1、换软件源
在 Dash 里搜索 `软件和更新` ，依次点击 `Ubuntu软件` - `下载自` - `其他站点` - `中国`：  
然后选择一个源服务器，推荐阿里云和清华：
- mirrors.aliyun.com
- mirrors.tuna.tsinghua.edu.cn

```
sudo sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
```

然后 update 一下：
```
sudo apt update
sudo apt upgrade
```

#### 2、系统设置
在`系统设置`里按自己的习惯设置即可。

#### 3、安装 GNOME Tweaks
```
sudo apt install gnome-tweak-tool 
```

#### 4、去鼠标加速
对于 FPS 玩家，尤其推荐去掉鼠标加速。  
4.1. 在 `GNOME Tweaks` 点击 `键盘和鼠标` 在 `鼠标`-`加速配置`里选择`Flat`。  
4.2. 在 `系统设置`里`设备`-`鼠标和触摸板`-`鼠标`-`鼠标速度`调节自己适应的鼠标速度。  

#### 5、鼠标滚轮速度
下载安装 `MouseWheel`

- https://github.com/muharemovic/MouseWheel

或者
```
sudo apt install imwheel
```

#### 6、安装 Gdebi
```
sudo apt install gdebi
```
安装 deb 软件包时，可以用 GDebi 替换 Ubuntu 软件中心。

#### 7、安装 Chrome
> 下载地址：[https://www.google.com/chrome/](https://www.google.com/chrome/ "https://www.google.com/chrome/")

#### 8、Dash to Dock
7.1 浏览器安装插件 
- Chrome :  [GNOME Shell integration](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep "GNOME Shell integration")
- Firefox: [https://extensions.gnome.org](https://extensions.gnome.org/ "https://extensions.gnome.org/")  

7.2 安装 Gnome Shell Extensions
```
sudo apt install gnome-shell-extensions
```

7.3 安装 Dash to Dock
> [https://extensions.gnome.org/extension/307/dash-to-dock/](https://extensions.gnome.org/extension/307/dash-to-dock/ "https://extensions.gnome.org/extension/307/dash-to-dock/") 

#### 9、Hide Top Bar
8.1 参考 7.1 ，如果已安装插件，略过此步。  
8.2 参考 7.2 ，如果已安装，略过此步。  
8.3 安装 Hide Top Bar  
> [https://extensions.gnome.org/extension/545/hide-top-bar/](https://extensions.gnome.org/extension/545/hide-top-bar/ "https://extensions.gnome.org/extension/545/hide-top-bar/")

#### 10、安装五笔拼音
```
sudo apt install fcitx-table-wbpy
```

#### 11、Preload
Preload 是一个后台运行的守护进程，它分析用户行为和频繁运行的应用，让你更快打开常用的软件。
```
sudo apt install preload
```
#### 12、安装 TLP 和 CPUFREQ（若有需要）
减少过热和使用节能模式。
```
sudo add-apt-repository ppa:linrunner/tlp
sudo apt update
sudo apt install tlp tlp-rdw
sudo tlp start
```
安装 CPUFREQ 指示器：
```
sudo apt install indicator-cpufreq
```
重启你的电脑即可在指示器上选择 Powersave 模式。

#### 13、提高 Apt 下载速度 Apt-fast
apt-fast 是 apt 的一个 shell 脚本包装器，通过从多连接同时下载包来提升更新及包下载速度。 如果你经常使用终端以及 apt 来安装和更新包，你也许会想要试一试 apt-fast 。
安装 apt-fast：
```
sudo add-apt-repository ppa:apt-fast/stable
sudo apt update
sudo apt install apt-fast
```
#### 14、双系统时间设置
解决切换到 Windows 发现时间不对的问题。
```
sudo apt install ntpdate
sudo ntpdate ntp.aliyun.com #阿里云的时间服务器
sudo hwclock --localtime --systohc #将时间更新到硬件上
```
#### 15、配置终端
> 参考：[https://eallion.com/ubuntuzsh](https://eallion.com/ubuntuzsh "https://eallion.com/ubuntuzsh")

终端推荐安装 Guake ，又好看又方便：

##### 15.1. 安装 Guake ：
直接安装的 Guake 版本不够新，而且中文显示不全。  
推荐源码安装：
```
sudo apt update
sudo apt -y install git curl wget
cd ~
git clone https://github.com/Guake/guake.git
cd guake
./scripts/bootstrap-dev-debian.sh run make
make
sudo make install
```
如果需要直接安装（版本比较旧）：
```
sudo apt install guake
```

##### 15.2. 安装 Guake indicator
```
sudo add-apt-repository ppa:gun101/ppa
sudo apt update
sudo apt install guake-indicator
```

##### 15.3. 安装 Oh My Zsh ：

安装 Zsh：
```
sudo apt update
sudo apt install zsh
```

将 Zsh 设置为默认 Shell ：
```
chsh -s /bin/zsh
```
查看当前所用的 Shell ： `echo $SHELL`。

安装 Oh My Zsh ：

以下3种方式选择1种：
- via wget

```
sh -c "$(wget -O- https://raw.GitHubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
- via curl

```
sh -c "$(curl -fsSL https://raw.GitHubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
- Manual

```
curl -Lo install.sh https://raw.GitHubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
sh install.sh
```

字体可以安装 Powerline ，但是推荐安装符号更全的 Ubuntu Nerd Font   或者 Knack Nerd Font Mono。在 Guake 里设置好。

>下载：[Ubuntu Nerd Font](https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/Ubuntu/Regular/complete/Ubuntu%20Nerd%20Font%20Complete.ttf)
> 下载：[Knack Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/raw/v1.2.0/patched-fonts/Hack/Regular/complete/Knack%20Regular%20Nerd%20Font%20Complete%20Mono.ttf)

下载后直接安装字体即可。

安装主题 Powerlevel9k ：
```
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

安装插件：
```
# autojump 切换目录
sudo apt install autojump
    
# fasd 快速访问文件或目录
sudo apt install fasd
    
# zsh-autosuggestions 历史命令建议
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    
# zsh-syntax-highlighting 命令行语法高亮
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

设置 Oh My Zsh ：
```
vim ~/.zshrc
```

需要修改如下几个地方：
```
    ******
POWERLEVEL9K_MODE='nerdfont-complete'
ZSH_THEME="powerlevel9k/powerlevel9k"
    ******
ENABLE_CORRECTION="true"
    ******
COMPLETION_WAITING_DOTS="true"
    ******
plugins=( git extract fasd zsh-autosuggestions zsh-syntax-highlighting )
    ******
```

让配置生效：
```
source ~/.zshrc
```

##### 15.4. 安装 EverVim ：

先安装依赖：
```
sudo apt update
sudo apt install vim python3-pip python3-dev exuberant-ctags cmake gcc g++
```
安装 EverVim ：
```
curl -sLf https://raw.GitHubusercontent.com/LER0ever/EverVim/master/Boot-EverVim.sh | bash
```

进 Vim 安装插件：
```
vim
:PlugInstall
```
如果进 Vim 提示 Your ycmd is shut down ，需要安装 You Compute Me ：

> 官方教程： [https://github.com/ycm-core/YouCompleteMe#linux-64-bit](https://github.com/ycm-core/YouCompleteMe#linux-64-bit)
```
sudo apt install build-essential cmake python3-dev
cd ~/.vim/bundle/YouCompleteMe
python3 install.py --clang-completer
```

#### 16、安装 Grub-customizer
```
sudo apt install grub-customizer
```

#### 17、自动挂载硬盘
17.1. 查看硬盘的 UUID 和 Type ：
```
sudo blkid
```
记录下UUID和Type。  
17.2. 创建挂载目录
```
cd ~
sudo mkdir Files
sudo chown -R eallion:eallion Files
```
17.3. 查看自己的 uid gid
```
id eallion
```
17.4. 编辑配置文件：
```
sudo vim /etc/fstab
```
按格式添加：
```
UUID=xxxx	/mount-folder	type	defaults	0	0
```
如：
```
UUID=0002AC	/home/eallion/Files	ntfs	defaults,uid=1000,gid=1000,umask=022	0	0
UUID=0002AD	/home/eallion/Media	ntfs	defaults,uid=1000,gid=1000,umask=022	0	0
```
如果不加 uid gid ，自动挂载后是 root 权限，可能无法读写。

#### 18、安装 Openssh-Server
```
sudo apt install openssh-server
```
配置Google Authenticator：（非必须，可选）
```
sudo apt install libpam-google-authenticator
```
生成二维码：
```
google-authenticator
```
修改配置以加载 Google-authenticator：
```
sudo vim /etc/pam.d/sshd
```
添加：
```
auth required pam_google_authenticator.so
```
修改 SSH 配置：
```
sudo vim /etc/ssh/sshd_config
```
把
```
ChallengeResponseAuthentication no
```
改为：
```
ChallengeResponseAuthentication yes
```
修改 SSH 端口：
```
Port 65537
```
#### 19、火焰截图 Flameshot
```
sudo apt install flameshot 
```
设置截图快捷键：
`系统设置` - `设备` - `键盘快捷键` - `自定义快捷键` 点加号添加一个：
```
名称：flameshot
命令：flameshot gui
设置快捷键：（按键盘设置）
```
#### 20、禁用HDMI默认音频输出
当主机接有音响、耳机、HDMI设备的话，Ubuntu默认是采用HDMI输出音频。Ubuntu自带的声音设置修改后不能保存，下次又还原成默认的。  
安装PulseAudio ：
```
sudo apt install pavucontrol
```
然后按`Super`键在`Dash`中打开`PulseAudio`，在`设备`选项卡中关闭HDMI即可。

#### 21、安装附加软件包
```
sudo apt install ubuntu-restricted-extras
```

#### 22、Sudo 免密码

常用私人电脑，是可以运行`sudo`免输密码的，公用电脑不建议这样设置。  
```
su - #进入超级用户模式
```

```
vim /etc/sudoers
```
在`root    ALL=(ALL:ALL) ALL`下一行添加：
```
eallion ALL=(ALL:ALL) ALL
```

在`%sudo   ALL=(ALL:ALL) ALL`下一行添加：
```
eallion ALL=(ALL:ALL) NOPASSWD:ALL
```
其中`eallion`替换成你自己的用户名。  

------------

### 安装常用软件
推荐一些常用的软件：

- Telegram
```
sudo snap install telegram-desktop
```

- Authy
```
sudo snap install authy --beta
```

- Spofity
```
sudo snap install spotify
```

- Termius
```
sudo snap install termius-app
```

- Gimp
```
sudo snap install gimp
```

- Steam
```
sudo apt install steam
```

- Filezilla
```
sudo apt install filezilla
```

- VLC
```
sudo snap install vlc
```

- Virtualbox
```
sudo apt install virtualbox
```

- Slack 
```
sudo snap install slack --classic
```

- Visual Studio Code
```
https://code.visualstudio.com/Download
```

- Typora
```
https://typora.io/#linux
```

- Dropbox
```
https://www.dropbox.com/install
```

- Keybase
```
https://keybase.io/docs/the_app/install_linux
```

- qBittorrent Enhanced
```
https://github.com/c0re100/qBittorrent-Enhanced-Edition
https://github.com/poplite/qBEE-Ubuntu-Packaging
```
```
sudo add-apt-repository ppa:poplite/qbittorrent-enhanced
sudo apt update
sudo apt install qbittorrent-enhanced qbittorrent-enhanced-nox
```

- QQ （ 2.0版的 Linux QQ 可用性还是很差，真的不想推荐 ）
```
https://im.qq.com/linuxqq/index.html 
```

- 网易云音乐
```
https://music.163.com/#/download
```

- MouseWheel
```
https://github.com/muharemovic/MouseWheel
```

------------

### 安装常用 Gnome Shell Extensions
推荐一些常用的：
```
sudo apt install gnome-shell-extensions
```

- Dash to Dock
```
git clone https://github.com/micheleg/dash-to-dock.git
cd dash-to-dock
make
make install
sudo gnome-extensions disable ubuntu-dock@ubuntu.com
```

- Applications Menu
```
https://extensions.gnome.org/extension/6/applications-menu/
```

- Hide Top Bar
```
https://extensions.gnome.org/extension/545/hide-top-bar/
```

- Places Status Indicator
```
https://extensions.gnome.org/extension/8/places-status-indicator/
```

- OpenWeather
```
https://extensions.gnome.org/extension/750/openweather/
```

- Remove Dropdown Arrows
```
https://extensions.gnome.org/extension/800/remove-dropdown-arrows/
```

- Lunar Calendar 农历
```
sudo apt install gir1.2-lunar-date-2.0
```
```
https://extensions.gnome.org/extension/675/lunar-calendar/
```

- Simple net speed
```
https://extensions.gnome.org/extension/1085/simple-net-speed/
```