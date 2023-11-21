---
title: "Ubuntu 配置 Oh-My-Zsh"
images: ["/assets/images/og/ubuntuzsh.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","guake","onmyzsh","evervin","pcm"]
draft: false
slug: "ubuntuzsh"
date: "2019-11-27 01:08:00"
lastmod: "2019-11-27 01:08:00"
---

### 安装 Oh My Zsh

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
以下 3 种方式选择 1 种：

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

字体可以安装 Powerline ，但是推荐安装符号更全的 Ubuntu Nerd Font 或者 Knack Nerd Font Mono。在 Guake 里设置好。

> 下载：[Ubuntu Nerd Font](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/Ubuntu/Regular/complete/Ubuntu%20Nerd%20Font%20Complete.ttf)
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
plugins=( git extract fasd zsh-autosuggestions zsh-syntax-highlighting docker docker-compose )
    ******
```

让配置生效：

```
source ~/.zshrc
```
