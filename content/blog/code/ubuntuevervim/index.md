---
authors:
- eallion
categories:
- 代码
date: '2019-11-27 03:08:00'
draft: false
lastmod: '2019-11-27 03:08:00'
slug: ubuntuevervim
summary: 该代码片段展示了在 Linux 系统上安装 EverVim 的完整流程，包括更新系统、安装依赖、执行安装脚本、进入 Vim 安装插件，以及解决 YouCompleteMe
  插件报错的后续步骤。
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