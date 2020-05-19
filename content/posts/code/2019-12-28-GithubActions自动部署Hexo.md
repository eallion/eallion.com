---
title: "GitHub Actions 自动部署 Hexo 脚本"
categories: ["代码"]
tags: ["hexo","GitHub","actions","deploy"]
slug: "GitHub-actions-hexo-ci"
draft: false
date: "2019-12-28 22:53:43"
---

### 前言

网上虽然有很多通过 GitHub Actions 自动部署 Hexo 的教程，但都有各种各样的问题。
主要问题还是 Workflow 脚本没有写正确，比如插件部分。

### 步骤

#### 1、生成密钥对 （这个也不会的话，方法自行 Google）
```
ssh-keygen -t rsa -b 4096 -f ~/.ssh/GitHub-actions-deploy
```
然后会获得一个公钥和私钥。

#### 2、在 GitHub Pages 所在的仓库中添加“公钥”

找到仓库的 `Settings` - `Deploye keys` - `Add deploy key`
- `Title` 填入：`ACTION_DEPLOY_KEY`  
- `Key` 填入：`# 步骤1生成的密钥对中的公钥`  
勾上 `Allow write access`

#### 3、在存放 Hexo 源文件的仓库中添加“私钥”
> PS: 跟步骤2中的仓库可能是同一个，也可能不是同一个。根据自己的选型设置。

找到仓库的 `Settings` - `Secrets` - `Add a new secret`  
- `Name` 填入：`ACTION_DEPLOY_KEY`  
- `Value` 填入：`# 步骤1生成的密钥对中的私钥`

#### 4、修改一下 Actions 脚本
下文贴出的 Actions 的 Wordflows 脚本中，其中3个地方要改为自己的信息：
```
git config --global user.name "eallion"
git config --global user.email "eallion@eallion.com"
git clone https://github.com/eallion/eallion.GitHub.io .deploy_git
```
#### 5、其他注意事项
- 脚本中插件部分可按自己实际用的插件删改，`npm ls --depth 0`可查看自己安装了哪些插件
- 如果没有用到`hexo douban`插件，部署命令：  
`hexo g && hexo douban && hexo deploy`可改为`hexo g -d`

另外一个建议是，所使用的`theme`中的`主题目录`用`git subtree`添加为子项目去维护。
这样在多环境多终端发布文章时，不会`clone`或`pull`一个空`theme`。

#### 6、git push
文章写好后，不需要在本地构建，只需要 `git push` 到 GitHub 仓库即可自动部署。
其中部署方式在 Hexo 根目录的`_config.yml`中配置。

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

![](https://cdn.jsdelivr.net/gh/eallion/statics@public/images/2019/12/20191228232334.png)
