---
title: "Github Actions 自动部署 Hexo 脚本"
categories: ["代码"]
tags: ["hexo","github","actions","deploy"]
slug: "github-actions-hexo-ci"
draft: false
date: "2019-12-28 22:53:43"
---

### 前言

网上虽然有很多通过 Github Actions 自动部署 Hexo 的教程，但都有各种各样的问题。
主要问题还是 Workflow 脚本没有写正确，比如插件部分。
其他过程省略，这里只贴部署脚本：

- 请确保添加的 `Secrets` 名字为 `ACTION_DEPLOY_KEY`
- 这3个地方要改为自己的信息：
```
git config --global user.name "eallion"
git config --global user.email "eallion@eallion.com"
git clone https://github.com/eallion/eallion.github.io .deploy_git
```
- 插件部分可按自己实际用的插件删改，`npm ls --depth 0`可查看自己安装了哪些插件
- 如果没有用到`hexo douban`插件，部署命令`hexo g && hexo douban && hexo deploy`可改为`hexo g -d`

另外一个建议是，所使用的`theme`中的`主题目录`用`git subtree`添加为子项目去维护。
这样在多环境多终端发布文章时，不会`clone`或`pull`一个空`theme`。

### 脚本配置：
注意修改其中提到的几个地方
```bash
name: 自动部署 Hexo

#on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [10.x]

    steps:
      - name: 开始运行
        uses: actions/checkout@v1

      - name: 设置 Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: 配置 Git 环境
        env:
          ACTION_DEPLOY_KEY: ${{secrets.ACTION_DEPLOY_KEY}}
        run: |
          mkdir -p ~/.ssh/
          echo "$ACTION_DEPLOY_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          git config --global user.name "eallion"
          git config --global user.email "eallion@eallion.com"

      - name: 安装 Hexo CI
        run: |
          export TZ='Asia/Shanghai'
          npm i -g hexo-cli
          npm i

      - name: 安装插件
        run: |
          npm install hexo-renderer-pug --save
          npm install hexo-renderer-stylus --save
          npm install hexo-deployer-git --save
          npm install hexo-generator-search --save
          npm install hexo-douban --save
          npm install hexo-generator-feed --save
          npm install hexo-abbrlink --save
          npm install hexo-wordcount --save

      - name: 部署博客
        run: |
          rm -rf .deploy_git
          hexo g && hexo douban && hexo deploy
          rm ~/.ssh/id_rsa
```
### 部署截图

![](https://cdn.jsdelivr.net/gh/eallion/statics@blog/images/2019/12/20191228232334.png)
