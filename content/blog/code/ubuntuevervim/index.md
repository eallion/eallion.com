---
authors:
- eallion
categories:
- 代码
date: '2019-11-27 03:08:00'
draft: false
lastmod: '2019-11-27 03:08:00'
slug: ubuntuevervim
summary: 安装EverVim前需更新系统并安装vim、python3等依赖包。通过curl命令运行安装脚本自动部署。首次进入vim需执行插件安装命令。若提示ycmd服务关闭，需按官方指引补装YouCompleteMe组件，安装时需额外编译依赖并运行安装脚本。
tags:
- Ubuntu
- guake
- onmyzsh
- evervin
- pcm
title: Ubuntu 配置 EverVim
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