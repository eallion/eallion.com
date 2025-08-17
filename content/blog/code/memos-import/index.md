---
authors:
- eallion
categories:
- 代码
date: 2022-11-06 08:31:22
draft: false
lastmod: 2022-11-06 08:31:22
series:
- Memos
seriesOpened: true
series_order: 2
slug: memos-import
summary: Memos 官方未提供数据导入导出功能，但可通过直接操作 SQLite 数据库实现迁移。方法一使用命令行导出 CSV 模板并修改编码为 UTF-8-BOM
  避免中文乱码，再导入到数据库文件后替换服务器原文件并调整权限。方法二借助 SQLiteStudio 或 Navicat 等工具可视化操作，导出修改后重新导入并替换文件。两种方式均需重启容器生效！
tags:
- 嘀咕
- 哔哔
- Memos
- talk
title: Memos 手动导入数据
---
### 如何手动导入类似数据到 Memos

迁移平台后，原来其他平台的数据肯定希望能导入到新平台，但 Memos 官方还没有提供导入导出服务。
不过既然知道了 Memos 是用 SQLite 数据库保存的数据，那就转变思想，直接操作 SQLite db 文件即可。

1. **方法一：命令行**

先在 Memos 网页端随意发布一条 Memos，然后下载`memos_prod.db`文件，导出一个`.csv`文件作为模板。
打开数据库：

```bash
sqlite3 memos_prod.db
```

打开数据库后导出`.csv`：

```bash
sqlite> .headers on
sqlite> .mode csv
sqlite> .separator ','
sqlite> .output memos.csv
sqlite> select * from `memo`;
sqlite> .quit
```

导出的模板文件为`memos.csv`，用类似 Notepad++ 这类软件打开导入的 CSV 文件，把编码修改为`UTF-8-BOM`编码，不然重新导入到 Memos 后，中文会有乱码。

![](/assets/images/posts/2022/11/memos_sqlite_utf8.png)

按照它的格式转换以前的数据：

![](/assets/images/posts/2022/11/csv.png)

保存后用命令导入到`memos_prod.db`这个 SQLite 数据库。
先打开数据库：

```bash
sqlite3 memos_prod.db
```

打开数据库后导入：

```bash
sqlite> .headers on
sqlite> .mode csv
sqlite> .separator ','
sqlite> .import memos.csv memo
sqlite> .quit
```

然后把新的`memos_prod.db`文件上传到服务器上的`memos`文件夹替换掉原来的文件，重启容器即可。
如果有权限问题，需要修改一下文件访问权限：

```bash
sudo chown www:www memos_prod.db
```

1. **方法二：数据库管理工具**

SQLite 数据管理工具有免费的 SQLiteStudio，也有收费的 Navicat 。
Navicat 虽然收费，但是有 14 天的试用期，14 天足够用了？吧。

打开 Navicat 后，连接 `memos_prod.db`

![](/assets/images/posts/2022/11/link_sqlite.png)

依次点开`“memos”`-`main`-`表`-`memo`，在`memo`表上点击右键，选择`导出向导`，
选择一种熟悉的文件格式：

![](/assets/images/posts/2022/11/format.png)

一路默认`下一步`到底，点`开始`导出就行了。

打开导出的文件，按照格式添加以前的数据。

![](/assets/images/posts/2022/11/csv.png)

然后在打开的数据库左侧点击右键导入就行了。

最后把新的`memos_prod.db`文件上传到服务器上的`memos`文件夹替换掉原来的文件，重启容器即可。
如果有权限问题，需要修改一下文件访问权限：

```bash
sudo chown www:www memos_prod.db
```
