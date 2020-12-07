---
title: "Ubuntu 20.10 优化"
categories: ["代码"]
tags: ["Ubuntu","优化","美化","ZFS","gnome"]
draft: false
slug: "ubuntu2010"
date: "2020-10-23 10:25:00"
toc: true
---
**安装 Ubuntu 后的 20 件事**

![Ubuntu 20.10](https://images.eallion.com/images/2020/10/ubuntu2010.png!hugo.webp)
> 实机安装 桌面效果截图 [（查看大图）](https://images.eallion.com/images/2020/10/ubuntu2010.png!hugo.webp "（查看大图）")

最近搞挂了一块数据盘，刚好在 Ubuntu 20.10 的发行时间点，索性重装 Ubuntu。  
本文主要为备忘。切勿照搬命令。建议最小化安装。

------------

# 基础优化
### 1、换软件源
推荐清华大学的源
> <https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/>

个人的备份源
> <https://github.com/eallion/dotfiles/blob/master/Ubuntu/sources.list>
```
sudo mv /etc/apt/sources.list /etc/apt/sources.list.backup
wget -c https://raw.githubusercontent.com/eallion/dotfiles/master/Ubuntu/sources.list -O /etc/apt/sources.list
```

然后 update 一下：
```
sudo apt update
sudo apt upgrade
```

### 2、系统设置
在`系统设置`里按自己的习惯设置即可。

### 3、Sudo 免密码

常用的个人电脑，是可以运行`sudo`免输密码的，公用电脑不建议这样设置。  
```
su - 
```

```
nano /etc/sudoers
```
在`root    ALL=(ALL:ALL) ALL`下一行添加：
（`eallion`请替换成自己的用户名)
```
eallion ALL=(ALL:ALL) ALL
```

在`%sudo   ALL=(ALL:ALL) ALL`下一行添加：
（`eallion`请替换成自己的用户名)
```
eallion ALL=(ALL:ALL) NOPASSWD:ALL
```

### 4、安装基础软件
```
sudo apt install vim \
                 git \
                 curl \
                 gnome-tweak-tool \
                 gdebi \
                 preload \
                 google-chrome-stable \
                 gnome-shell-extensions \
                 ubuntu-restricted-extras
```

### 5、去鼠标加速
对于 FPS 玩家，尤其推荐去掉鼠标加速。  
5.1. 在 `GNOME Tweaks` 点击 `键盘和鼠标` 在 `鼠标`-`加速配置`里选择`Flat`。  
5.2. 在 `系统设置`里`设备`-`鼠标和触摸板`-`鼠标`-`鼠标速度`调节自己适应的鼠标速度。  

### 6、安装显卡驱动
如果是 Nvidia 独立显卡，在 Dash 里搜索`drive`，打开`附加驱动`，选择专有驱动。  

### 7、下载个人配置
基于 Linux 特性，备份配置文件即可。  
我的部分配置备份于 GitHub：
> <https://github.com/eallion/dotfiles>
```
git clone https://github.com/eallion/dotfiles.git ~/Documents/dotfiles
```
恢复 Git Vim Tmux Fcitx 等配置。

### 8、安装输入法
个人使用 Fcitx 五笔拼音
#### 8.1、Fcitx 五笔拼音
```
sudo apt install fcitx-table-wbpy
```
> 主题： <https://github.com/Yucklys/fcitx-nord-skin>  
> 主题： <https://github.com/Sakitami/fcitx-themes-package>

配置默认输入法：
```
im-config
```

自定义标点符号：
```
wget -c https://raw.githubusercontent.com/eallion/dotfiles/master/Ubuntu/.config/fcitx/data/punc.mb.zh_CN -O ~/.config/fcitx/data/punc.mb.zh_CN
```
按下面格式添加符号，如果不符合习惯请自行修改。
```
~ ～
` `
! ！
@ @
# #
$ ￥
% ␣
^ ……
& &
* *
( （
) ）
_ ——
- －
+ +
= =
| |
\ 、
[ 【
] 】
{ 〖 
} 〗
: ：
; ；
" “ ”
' ‘ ’
< 《
> 》
, ，
. 。
? ？
```

#### 8.2、Fcitx5 五笔拼音
安装：
```
sudo apt install fcitx5 fcitx5-chinese-addons fcitx5-frontend-gtk2 fcitx5-frontend-gtk3 fcitx5-frontend-qt5
````
切换输入法：
```
im-config
```
安装 Psionics-Remix 主题（可选）
> <https://github.com/xTpx/Psionics-Remix>
```
git clone https://github.com/xTpx/Psionics-Remix.git ~/.local/share/fcitx5/themes/Psionics-Remix
```
```
vim ~/.config/fcitx5/conf/classicui.conf
```
配置主题：
```
 ***
Theme=Psionics-Remix
 ***
```
自定义快速输入:
```
sudo vim /usr/share/fcitx5/data/quickphrase.d/quick.mb
```
在文件中添加形如`input output`的代码，一行一条，即可实现添加快速输入辞典。  
示例：要在快速输入中输入`ddrr`，在候选中显示`大大的小蜗牛`，只需在上述mb文件中添加一行`ddrr 大大的小蜗牛`即可。（注意空格）  
> 友情提示：快速输入可以使用分号打开，Rime不支持快速输入。

### 9、双系统时间设置
解决切换到 Windows 时间不对的问题。将本地时间更新到硬件上。
```
sudo apt install ntpdate
sudo ntpdate ntp.aliyun.com # 阿里云的时间服务器，可用其他时间服务器替换
sudo hwclock --localtime --systohc
```

**前9个步骤执行完成后，建议重启一下!**

### 10、安装 Guake
通过软件仓库直接安装的 Guake 版本不够新，而且中文显示不全。  
推荐源码安装：
```
git clone https://github.com/Guake/guake.git ~/Documents/guake
cd ~/Documents/guake
./scripts/bootstrap-dev-debian.sh run make
make
sudo make install
```
Ubuntu 20.10 默认终端的背景色：`#300a24`

**Guake indicator**  
如果有需要可安装 Guake indicator：
```
sudo apt install guake-indicator
```

### 11、安装 Oh My Tmux
> <https://github.com/gpakosz/.tmux>
```
cd
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
cp .tmux/.tmux.conf.local .
```

### 12、安装 Oh My Zsh
> 参考：[https://eallion.com/ubuntuzsh](https://eallion.com/ubuntuzsh "https://eallion.com/ubuntuzsh")

安装 Zsh：
```
sudo apt update
sudo apt install zsh autojump fasd
```

安装 Oh My Zsh：
> 官方文档 <https://github.com/ohmyzsh/ohmyzsh#basic-installation>
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

下载、安装、配置字体：

> 下载：[Ubuntu Nerd Font](https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/Ubuntu/Regular/complete/Ubuntu%20Nerd%20Font%20Complete.ttf)  
> 下载：[Knack Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/raw/v1.2.0/patched-fonts/Hack/Regular/complete/Knack%20Regular%20Nerd%20Font%20Complete%20Mono.ttf) （推荐）

安装主题 Powerlevel9k ：
```
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

安装历史命令建议插件：
```
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
安装命令行语法高亮插件：
```
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
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(context dir dir_writable disk_usage vcs newline)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status root_indicator background_jobs history time)
    ******
ENABLE_CORRECTION="true"
    ******
COMPLETION_WAITING_DOTS="true"
    ******
plugins=( git extract fasd zsh-autosuggestions zsh-syntax-highlighting docker docker-compose)
    ******
```
我个人的配置：
```
rm ~/.zshrc
wget -c https://raw.githubusercontent.com/eallion/dotfiles/master/Ubuntu/.zshrc -O ~/.zshrc
```

让配置生效：
```
source ~/.zshrc
```

如果安装时没有选择将 Zsh 作为默认 Shell，可以用下面的命令设置：
```
chsh -s /bin/zsh
```
查看当前所用的 Shell ： `echo $SHELL`。

### 13、配置 Vim

#### 13.1 spf13-vim
> <https://github.com/spf13/spf13-vim>
#### 13.2 EverVim （推荐）
> <https://github.com/LER0ever/EverVim>  
> Ubuntu 配置 EverVim <https://eallion.com/ubuntuevervim/>

安装 EverVim 步骤  
安装依赖：
```
sudo apt install -y git curl python3-pip python3-dev exuberant-ctags cmake gcc g++ build-essential
```
安装 EverVim ：
```
curl -sLf https://raw.githubusercontent.com/LER0ever/EverVim/master/Boot-EverVim.sh | bash
```
进 Vim 安装插件：
```
vim
:PlugInstall
```
如果进 Vim 提示 Your ycmd is shut down ，需要安装 You Compute Me ：
```
cd ~/.vim/bundle/YouCompleteMe
python3 install.py --clang-completer
```

### 14、配置 Grub 引导

Etx4 文件系统用 Grub-customizer 即可，Btrfs、ZFS等文件系统此软件无效。
```
sudo apt install grub-customizer
```
Theme:   
> <https://github.com/sandesh236/sleek--themes>  
> <https://github.com/gustawho/grub2-theme-breeze>

如果 Nvidia 独立显卡在引导界面开机黑屏：将`nomodeset`加到`/etc/default/grub`即可。
```
GRUB_CMDLINE_LINUX_DEFAULT="nomodeset quiet splash"
```

### 15、自动挂载硬盘
查看硬盘的 UUID 和 Type ：
```
sudo blkid
```
记录下`UUID`和`Type`。  
创建挂载目录：
```
mkdir -p ~/Files ~/Media
```
查看自己的 uid gid：
```
id eallion
```
编辑配置文件：
```
sudo vim /etc/fstab
```
按格式添加：
```
UUID=xxxx	/mount-folder	type	defaults	0	0
```
如：
```
UUID=xxxx	/home/eallion/Files	ntfs	defaults,uid=1000,gid=1000,umask=022	0	0
UUID=xxxx	/home/eallion/Media	ntfs	defaults,uid=1000,gid=1000,umask=022	0	0
```
如果不加 uid gid ，自动挂载后可能是 root 权限，无法读写。

### 16、安装 PulseAudio Volume Control
```
sudo apt install pavucontrol
```

### 17、安装 Docker
> <https://docs.docker.com/engine/install/ubuntu/>
Ubuntu 20.10 暂时还没有官方源，使用 Ubuntu 20.04 的源替代。
即：替换` $(lsb_release -cs) `为`focal`。

```
sudo apt remove docker docker-engine docker.io containerd runc
sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install -y docker-ce docker-ce-cli containerd.io
```
检查是否安装成功：
```
docker version
sudo docker run hello-world
````
安装 Docker Compose：
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
Docker 属于高频操作，运行 Docker 时，免去 `sudo`
> <https://docs.docker.com/engine/install/linux-postinstall/>

```
sudo groupadd docker
sudo usermod -aG docker $USER
reboot
newgrp docker
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
```
### 18、安装 Gnome Shell Extensions
#### 18.1. 安装浏览器插件 
可以使用 Chrome 插件，如果登录了 Google 账号，有自动同步功能。
- Chrome :  [GNOME Shell integration](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep "GNOME Shell integration")
- Firefox: [https://extensions.gnome.org](https://extensions.gnome.org/ "https://extensions.gnome.org/")  

#### 18.2. 安装 Gnome Shell Extensions
```
sudo apt install gnome-shell-extensions
```

#### 18.3. 安装扩展
> 以下扩展插件按需启用  
> 安装完成后，按`Alt`+`F2`，输入`r`重启
- [Applications Menu](https://extensions.gnome.org/extension/6/applications-menu/)
- [Applications Overview Tooltip](https://extensions.gnome.org/extension/1071/applications-overview-tooltip/)
- [Auto Move Windows](https://extensions.gnome.org/extension/16/auto-move-windows/)
- [Clipboard Indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/)
- [Coverflow Alt-Tab](https://extensions.gnome.org/extension/97/coverflow-alt-tab/)
- [Dash to Dock](https://extensions.gnome.org/extension/307/dash-to-dock/)
    - `sudo gnome-extensions disable ubuntu-dock@ubuntu.com`
- [Desktop Icons](https://extensions.gnome.org/extension/1465/desktop-icons/)
- [GSConnect](https://extensions.gnome.org/extension/1319/gsconnect/)
- [Hide Top Bar](https://extensions.gnome.org/extension/545/hide-top-bar/)
- [Horizontal workspaces](https://extensions.gnome.org/extension/2141/horizontal-workspaces/)
- [Launch new instance](https://extensions.gnome.org/extension/600/launch-new-instance/)
- [Lunar Calendar 农历](https://extensions.gnome.org/extension/675/lunar-calendar/)
    - `sudo apt install gir1.2-lunar-date-2.0`
- [Native Window Placement](https://extensions.gnome.org/extension/18/native-window-placement/)
- [OpenWeather](https://extensions.gnome.org/extension/750/openweather/)
- [Places Status Indicator](https://extensions.gnome.org/extension/8/places-status-indicator/)
- [Removable Drive Menu](https://extensions.gnome.org/extension/7/removable-drive-menu/)
- [Remove Alt+Tab Delay v2](https://extensions.gnome.org/extension/2741/remove-alttab-delay-v2/)
- [Remove Dropdown Arrows](https://extensions.gnome.org/extension/800/remove-dropdown-arrows/)
    - [Unite](https://extensions.gnome.org/extension/1287/unite/) 里有此功能。
- [Screenshot Window Sizer](https://extensions.gnome.org/extension/881/screenshot-window-sizer/)
- [Sound Input & Output Device Chooser](https://extensions.gnome.org/extension/906/sound-output-device-chooser/)
- [Status Area Horizontal Spacing](https://extensions.gnome.org/extension/355/status-area-horizontal-spacing/)
- [TopIcons Plus](https://extensions.gnome.org/extension/1031/topicons/)
- [Tray Icons](https://extensions.gnome.org/extension/1503/tray-icons/)
- [Ubuntu AppIndicators](https://extensions.gnome.org/extension/1301/ubuntu-appindicators/)
- [Ubuntu Dock](https://extensions.gnome.org/extension/1300/ubuntu-dock/)
- [Unite](https://extensions.gnome.org/extension/1287/unite/)
- [User Themes](https://extensions.gnome.org/extension/19/user-themes/)
- [Vitals](https://extensions.gnome.org/extension/1460/vitals/)
- [Window List](https://extensions.gnome.org/extension/602/window-list/)
- [windowNavigator](https://extensions.gnome.org/extension/10/windownavigator/)
- [Workspace Indicator](https://extensions.gnome.org/extension/21/workspace-indicator/)


### 19、火焰截图 Flameshot
需要设置快捷键，所以把火焰截图单独拿出来说。
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

### 20、体验 macOS Big Sur 动态壁纸
实际上没什么卵用，个人也不太喜欢。  
Gnome 桌面环境原生支持按时间自动切换壁纸的功能。  
无论什么 Linux 发行版，只要使用 Gnome 桌面环境都可以使用此壁纸。  
此套壁纸支持5K分辨率。
Windows 可以使用 [WinDynamicDesktop](https://github.com/t1m0thyj/WinDynamicDesktop)。
> <https://github.com/eallion/Big-Sur-Ubuntu>

#### 20.1、下载 Big Sur
```
git clone https://github.com/eallion/Big-Sur-Ubuntu.git ~/Pictures/Big-Sur-Ubuntu
```
#### 20.2、设置  
打开`Gnome Tweaks`  
找到`外观`-`背景`  
选择`groovy.xml`（文件在`/home/username/Pictures/Big-Sur-Ubuntu/groovy.xml`路径）  
选择`Zoom`调整方式  

------------

# 安装软件

### 安装常用软件
推荐一些常用的软件：

- Authy (Snap)
```
sudo snap install authy --beta
```

- Filezilla
```
sudo apt install filezilla
```

- PhotoGIMP （GIMP）（Snap）
```
sudo snap install photogimp
```

- Steam
```
sudo apt install steam
```

- Telegram
```
sudo apt install telegram-desktop
```

- Thunderbird
```
sudo apt install thunderbird thunderbird-locale-zh-cn
```

- Virtualbox
```
sudo apt install virtualbox
```

- VLC
```
sudo apt install vlc
```

- AppImage Launcher
> <https://github.com/TheAssassin/AppImageLauncher/>

- Docker
> <https://docs.docker.com/engine/install/ubuntu/>

- Dropbox
> <https://www.dropbox.com/install>

- Go
> <https://golang.org/doc/install>

- Hugo
> <https://github.com/gohugoio/hugo/releases>

- Keybase
> <https://keybase.io/docs/the_app/install_linux>

- MouseWheel
> <https://github.com/muharemovic/MouseWheel>

- Neteasy 网易云音乐
> <https://music.163.com/#/download>

- Nginx Mysql PHP
> <https://eallion.com/ubuntu2004lnmp/>

- NVM
> <https://github.com/nvm-sh/nvm>

- OBS
> <https://obsproject.com/wiki/install-instructions#linux>

- PicGo (snap install with `--danderous`)
> <https://github.com/Molunerfinn/PicGo>

- qBittorrent Enhanced
> <https://github.com/c0re100/qBittorrent-Enhanced-Edition>  
> <https://github.com/poplite/qBEE-Ubuntu-Packaging>

- QQ
> <https://im.qq.com/linuxqq/index.html>

- Slack 
> <https://slack.com/downloads/linux>

- Spofity
> <https://www.spotify.com/us/download/linux/>

- Termius
> <https://termius.com/linux>

- Typora
> <https://typora.io/#linux>

- Visual Studio Code
> 通过 Snap 仓库安装有中文输入 Bug 。  
> <https://code.visualstudio.com/Download> 