---
title: "Ubuntu 19.10 优化"
categories: ["代码"]
tags: ["Ubuntu","优化","美化","ZFS","gnome"]
draft: false
slug: "ubuntu1910"
date: "2019-11-29 12:36:00"
---

![Ubuntu 19.10](https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@gh-pages/images/2019/11/2252212556.png)
> 实机安装 桌面效果截图 [（查看大图）](https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@gh-pages/images/2019/11/2252212556.png "（查看大图）")

硬件环境：
```bash
eallion@eallion:~$ screenfetch

OS: Ubuntu 19.10 eoan
Kernel: x86_64 Linux 5.3.0-23-generic
Uptime: 2h 26m
Packages: 2176
Shell: zsh 5.7.1
Resolution: 3840x1080
DE: GNOME 
WM: GNOME Shell
WM Theme: Adwaita
GTK Theme: Yaru [GTK2/3]
Icon Theme: Yaru
Font: Ubuntu 11
CPU: Intel Core i5-7500 @ 4x 3.8GHz [27.8°C]
GPU: GeForce GTX 1050 Ti
RAM: 9011MiB / 15717MiB
```

作为一个一直使用长期支持版本 LTS 的人，这次也升级到了 Ubuntu 19.10 。
因为这次新版本对性能的提升还是比较大的。
最重要的是安装的时候可以选择 ZFS 文件系统。
而且原生支持 Nvidia 显卡驱动了，安装时勾上即可。
安装时可选择最小化安装，这样安装好后，系统里就没有那些 [#犀利而无用](https://twitter.com/search?q=%23%E7%8A%80%E5%88%A9%E8%80%8C%E6%97%A0%E7%94%A8)  的软件。
Live CD 的启动项也有 safe graphics 选项了，即不用手动添加 nomodeset 避免黑屏。

> 这篇文章吹爆了 Ubuntu 19.10 
> [Ubuntu 19.10: It’s fast, like “make old hardware feel new” fast](https://arstechnica.com/gadgets/2019/11/ubuntu-19-10-quite-simply-the-best-ubuntu-canonical-has-ever-released/ )

------------

### 基础优化
#### 1、换软件源
在 Dash 里搜索 `软件和更新` ，依次点击 `Ubuntu软件` - `下载自` - `其他站点` - `中国`：  
然后选择一个源服务器，推荐阿里云和清华：
- mirrors.aliyun.com
- mirrors.tuna.tsinghua.edu.cn

然后 update 一下：
```
sudo apt update
sudo apt upgrade
```

#### 2、系统设置
在`系统设置`里按自己的习惯设置即可。

####  3、安装 GNOME Tweaks
```
sudo apt install gnome-tweak-tool 
```

#### 4、去鼠标加速
对于 FPS 玩家，尤其推荐去掉鼠标加速。
4.1. 在 `GNOME Tweaks` 点击 `键盘和鼠标` 在 `鼠标`-`加速配置`里选择`Flat`。  
4.2. 在 `系统设置`里`设备`-`鼠标和触摸板`-`鼠标`-`鼠标速度`调节自己适应的鼠标速度。  

#### 5、安装 Gdebi
```
sudo apt install gdebi
```
安装 deb 软件包时，可以用 GDebi 替换 Ubuntu 软件中心。

#### 6、安装 Chrome
> 下载地址：[https://www.google.com/chrome/](https://www.google.com/chrome/ "https://www.google.com/chrome/")

#### 7、Dash to Dock
7.1 浏览器安装插件 
- Chrome :  [GNOME Shell integration](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep "GNOME Shell integration")
- Firefox: [https://extensions.gnome.org](https://extensions.gnome.org/ "https://extensions.gnome.org/")  

7.2 安装 Gnome Shell Extensions
```
sudo apt install gnome-shell-extensions
```

7.3 安装 Dash to Dock
> [https://extensions.gnome.org/extension/307/dash-to-dock/](https://extensions.gnome.org/extension/307/dash-to-dock/ "https://extensions.gnome.org/extension/307/dash-to-dock/") 

#### 8、Hide Top Bar
8.1 参考 7.1 ，如果已安装插件，略过此步。  
8.2 参考 7.2 ，如果已安装，略过此步。  
8.3 安装 Hide Top Bar
> [https://extensions.gnome.org/extension/545/hide-top-bar/](https://extensions.gnome.org/extension/545/hide-top-bar/ "https://extensions.gnome.org/extension/545/hide-top-bar/")

#### 9、安装五笔拼音
```
sudo apt install fcitx-table-wbpy
```

#### 10、Preload
Preload 是一个后台运行的守护进程，它分析用户行为和频繁运行的应用，让你更快打开常用的软件。
```
sudo apt install preload
```
#### 11、安装 TLP 和 CPUFREQ（若有需要）
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

#### 12、提高 Apt 下载速度 Apt-fast
apt-fast 是 apt 的一个 shell 脚本包装器，通过从多连接同时下载包来提升更新及包下载速度。 如果你经常使用终端以及 apt 来安装和更新包，你也许会想要试一试 apt-fast 。
安装 apt-fast：
```
sudo add-apt-repository ppa:apt-fast/stable
sudo apt update
sudo apt install apt-fast
```
#### 13、双系统时间设置
解决切换到 Windows 发现时间不对的问题。
```
sudo apt install ntpdate
sudo ntpdate ntp.aliyun.com #阿里云的时间服务器
sudo hwclock --localtime --systohc #将时间更新到硬件上
```
#### 14、 配置终端
> 参考：[https://eallion.com/ubuntuzsh](https://eallion.com/ubuntuzsh "https://eallion.com/ubuntuzsh")

终端推荐安装 Guake ，又好看又方便：

##### 14.1. 安装 Guake ：
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
如果需要直接安装：
```
sudo apt install guake
```

##### 14.2. 安装 Oh My Zsh ：

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
vi ~/.zshrc
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

##### 14.3. 安装 EverVim ：

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

#### 15、安装 Grub-customizer
Grub-customizer 可以美化优化 Grub 引导界面。 
```
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt update
sudo apt install grub-customizer
```

#### 16、自动挂载硬盘
16.1. 查看硬盘的 UUID 和 Type ：
```
sudo blkid
```
记录下UUID和Type。

16.2. 创建挂载目录
```
cd ~
sudo mkdir Files
sudo chown -R eallion:eallion Files
```
16.3. 查看自己的 uid gid
```
id eallion
```
16.4. 编辑配置文件：
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
```
如果不加 uid gid ，自动挂载后是 root 权限，可能无法读写。

#### 17、安装 Openssh-Server
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
#### 18、火焰截图 Flameshot
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
#### 19、禁用HDMI默认音频输出
当主机接有音响、耳机、HDMI设备的话，Ubuntu默认是采用HDMI输出音频。Ubuntu自带的声音设置修改后不能保存，下次又还原成默认的。  
安装PulseAudio ：
```
sudo apt install pavucontrol
```
然后按`Super`键在`Dash`中打开`PulseAudio`，在`设备`选项卡中关闭HDMI即可。


------------

### 安装常用软件
推荐一些常用的软件：

- Telegram
```
sudo snap install telegram-desktop
```

- Spofity
```
sudo snap install spotify
```

- qBittorrent
```
sudo apt install qbittorrent
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

- Nextcloud
```
https://nextcloud.com/install/#install-clients
```

- VLC
```
sudo snap install vlc
```

- Virtualbox
```
sudo apt install virtualbox
```

- Visual Studio Code
```
sudo snap install code --classic
```

- Slack 
```
sudo snap install slack --classic
```

- ReText
```
sudo apt install retext
```

- QQ （ 2.0版的 Linux QQ 可用性还是很差，真的不想推荐 ）
```
https://im.qq.com/linuxqq/index.html 
```
