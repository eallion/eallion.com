---
title: "Ubuntu 配置 EverVim"
images: ["/assets/images/og/ubuntuevervim.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","guake","onmyzsh","evervin","pcm"]
draft: false
slug: "ubuntuevervim"
summary: "这篇文章介绍了如何在Ubuntu上配置EverVim。首先要安装所需的依赖，然后安装EverVim。接下来，在Vim中安装插件。如果出现提示需要安装You Compute Me, 则可以参考官方教程进行安装。"
date: "2019-11-27 03:08:00"
lastmod: "2019-11-27 03:08:00"
---

### 安装 EverVim

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
