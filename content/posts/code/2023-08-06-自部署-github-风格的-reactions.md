---
title: "自部署 GitHub 风格的 Reactions 点赞功能"
images: ["/assets/images/og/self-hosted-github-flavored-reactions.png"]
authors: ["eallion"]
categories: ["代码"]
tags: 
  - hugo
  - blog
  - reactions
slug: "self-hosted-github-flavored-reactions"
summary: "文章介绍了如何自部署 GitHub 风格的点赞功能。作者提到了各种实现方式，包括博客系统、评论系统、API 和第三方服务等。然后介绍了一个名为 emaction 的项目，提供了前端和后端代码，并给出了部署步骤。首先需要在 Cloudflare 上创建数据库，然后克隆代码并安装依赖包。接着修改配置文件中的数据库 ID，并登录 Wrangle 授权访问数据库并创建数据表。最后将项目部署到 Cloudflare Worker，并在前端使用时引入 JS 模块即可实现点赞功能。"
draft: false
comment: true
date: 2023-08-06T15:25:40+08:00
---

### 前言

各路大佬用了各种方式实现了文章的点赞功能。
有的是博客系统自带的；
有的是评论系统集成的；
有的通过统计代码的 API 实现的；
有的通过第三方 SaaS 服务实现的。

直到最近 [空白大佬](https://memos.koobai.com/m/161) 的 Memos 中得知了 <i class="fab fa-github fa-fw"></i>[emaction/emaction.frontend](https://github.com/emaction/emaction.frontend) 。
这个项目还提供了后端代码，<i class="fab fa-github fa-fw"></i>[emaction/emaction.backend](https://github.com/emaction/emaction.backend) 。

虽然这个后端代码暂时没有提供初始化数据库的代码，不过通过源代码逆向出了初始化 Cloudflare D1 的命令。

### Why this?

为什么选择了这个点赞功能呢。
这是模仿的 GitHub 的点赞功能的，基本上 1:1 还原了。
GitHub 即正义！

### 步骤

##### 1. 部署后端（可选）

> 部署后端不是必需的，用官方提供的 API 就可以使用了。

前提：

- 需要有 Cloudflare 账号
- 电脑中需要有 Node.js 环境

首先去 [Cloudflare](https://dash.cloudflare.com/workers/d1) 创建一个名为：`emaction` 的 D1 数据库
复制此数据库的 id，如：`acf6da62-7777-4459-a579-123456789012`

然后在本地电脑中克隆代码：

```bash
git clone https://github.com/emaction/emaction.backend.git
```

安装依赖包：

```bash
cd emaction.backend

# 安装 packages
npm install

# 全局安装 Wrangler
npm install -g wrangler
```

PS：这里有同学反应需要全局 `-g` 安装 Wrangler，我不明白为什么。

修改克隆代码 `wrangler.toml` 文件中的 `database_id` 为自己的：

```toml
name = "api-emaction"
main = "src/worker.js"
compatibility_date = "2023-07-25"
usage_model = "bundled"
env = { }

[[d1_databases]]
binding = "d1" # i.e. available in your Worker on env.DB
database_name = "emaction"
database_id = "acf6da62-7777-4459-a579-123456789012" # 修改成自己的

[triggers]
crons = [ ]
```

登录 Wrangler：

```bash
wrangler login
```

在弹出的浏览器页面中，点 `Allow` 授权就可以了。

在自己电脑上的终端的当前项目中（不是 Cloudflare 网页上）给数据库（假设名为：`emaction`）创建数据表：

```bash
wrangler d1 execute emaction \
  '--command=CREATE TABLE reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    target_id TEXT NOT NULL,
    reaction_name TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0, 
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )'
```

部署项目到 Cloudflare Worker：

```bash
wrangler deploy
```

然后登录 Cloudflare Worker ，就能找到一个名为 `api-emaction` 的 Worker了。
这个名称与克隆代码中的 `package.json` 文件中的名字对应，可自行选择是否修改。
记住此 Worker 的域名：`https://api-emaction.xxxxxxx.workers.dev`。
如果用户大多数为国内的，可能需要绑定一个自定义域名才能友好访问。

##### 2. 前端使用

前端使用时，跟 <i class="fab fa-github fa-fw"></i>[emaction/emaction.frontend](https://github.com/emaction/emaction.frontend) 的说明文档一样即可。
只是需要把自定义的 `endpoint` 传参给 JS 代码。

在 HTML 中引入 JS Module。
这个 JS 是可以下载下来自行修改和部署的：

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/emaction/frontend.dist@1.0.7/bundle.js"></script>
```

在 HTML 使用这个 Module：

```html
<emoji-reaction endpoint="https://api-emaction.xxxxxx.workers.dev"></emoji-reaction>
```

这个 `endpoint` 没有防呆设计，不要输入末尾的 “`/` ” 斜杠。
自定义 ID `reacttargetid` 可选修改，在同一页面内有多个 Reactions 的时候，尽量使用。
