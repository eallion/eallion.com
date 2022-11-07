---
title: "嘀咕（哔哔）Memos 简介"
categories: ["代码"]
tags: 
  - 嘀咕
  - 哔哔
  - Memos
  - talk
slug: "memos-deployment"
draft: false
Comments: true
date: 2022-11-06T16:30:22+08:00
toc: false
---

### 前言

> DEMO：<https://eallion.com/memos/>

我从接触独立博客开始，就一直在博客的子栏目中部署了一个类似 [嘀咕](https://eallion.com/memos/) 的微博客。  
最初的作用是备份 QQ空间、Twitter 和微博等。  
最早用到的微博客程序是 PageCookery。甚至有点怀念……  

现在在独立博客圈少部博主中流行的这种“B言B语”，最早来源于少数派上的一篇文章——[《保卫表达：用后端 BaaS 快速搭建专属无点赞评论版微博——b言b语》](https://sspai.com/post/60024)，“B言B语”也叫“废话胶囊”。  

由此也衍生出了：  
- [LeanCloud 版](https://github.com/daibor/nonsense.fun)（原版）  
- [Golang 版](https://github.com/songquanpeng/microblog)  
- [腾讯云 CloudBase 版](https://github.com/ibearye/talk)  
- [木木老师修改版](https://immmmm.com/bb-by-wechat-pro/)  《「哔哔点啥」微信公众号 2.0》
- [BBTalk](https://github.com/BBtalkJS/BBtalk)Vercel 版  
- 我个人短暂修改使用过的 [Algolia](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/algoliaTalk.html) 版。  

目前以上版本均可使用，不过可能有些版本的使用成本有点高。  

今天要介绍的是另一个能提供类似功能的应用——[Memos](https://github.com/usememos/memos)  
Memos 自己对标的竞品是 Flomo ，我们是不是把它用歪了。  

### 部署 Memos

> 前置条件：
> 1. 一台 VPS 服务器或本地电脑（或 Docker SaaS 平台）  
> 2. 一点点 WebStack 技能（Docker、Nginx）  

1. **新建 `docker-compose.yml`**  

一般在准备用于 Memos 的域名的目录下新建`docker-compose.yml`文件：

```
cd /www/wwwroot/memos.example.com
vim docker-compose.yml
```

输入以下内容：

```yml
version: "3.0"
services:
  memos:
    image: neosmemo/memos
    container_name: memos
    volumes:
      - ./memos/:/var/opt/memos
    ports:
      - 5230:5230
    restart: always
```

2. **启动 Memos**

启动 Memos

```bash
docker compose up -d
```

等待镜像拉取完成，Memos 就运行在服务器的`5230`端口了。  
此时，打开`http://127.0.0.1:5230`就能访问 Memos 了。  
常用的命令有：
```bash
docker compose up -d
docker compose down
docker compose pull
docker compose up -d --force-recreate
```

3. **升级 Memos**

> 参考：<https://memos.eallion.com/m/5454>

```bash
docker compose pull && docker compose up -d --force-recreate
```

4. **Nginx 反代**

如果打算对外提供 Memos 访问服务，就需要反代 Memos，一般都是用 Nginx，反代`5230`端口即可。

```nginx
location ^~ /
{
    proxy_pass http://127.0.0.1:5230;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    add_header X-Cache $upstream_cache_status;
    # cache
    add_header Cache-Control no-cache;
    expires 12h;
}
```

一些主机管理面板提供可视化反代设置，那更简单。

5. **备份数据**

在第 1 步中的`docker-compose.yml`文件中，
```
    volumes:
      - ./memos/:/var/opt/memos
```
这段就是数据持久化配置，如果不做数据持久化，Docker 容器重启后，所有 Memos 都会消失。
“`:`”冒号前面的内容是物理宿主机上的目录，例子中对应的目录为：

```
/www/wwwroot/memos.example.com/memos
```

需要备份的数据是此目录下的`memos_prod.db`文件，是一个 SQLite 数据库文件，Memos 的所有设置、用户信息、附件和 Memos 都保存在这个文件中。  

### 导入数据到 Memos

迁移平台后，原来其他平台的数据肯定希望能导入到新平台，但 Memos 官方还没有提供导入导出服务。
不过既然知道了 Memos 是用 SQLite 数据库保存的数据，那就转变思想，直接操作 SQLite db 文件即可。

1. **方法一：命令行**

先在 Memos 网页端随意发布一条 Memos，然后下载`memos_prod.db`文件，导出一个`.csv`文件作为模板。
打开数据库：
```
sqlite3 memos_prod.db
```
打开数据库后导出`.csv`：
```
sqlite> .headers on
sqlite> .mode csv
sqlite> .separator ','
sqlite> .output memos.csv
sqlite> select * from `memo`;
sqlite> .quit
```
导出的模板文件为`memos.csv`，按照它的格式转换以前的数据，保存。然后导入到`memos_prod.db`。
先打开数据库：
```
sqlite3 memos_prod.db
```
打开数据库后导入：
```
sqlite> .headers on
sqlite> .mode csv
sqlite> .separator ','
sqlite> .import memos.csv memo
sqlite> .quit
```
然后把新的`memos_prod.db`文件上传到服务器上的`memos`文件夹，重启容器即可。

2. **方法二：数据库管理工具**

SQLite 数据管理工具有免费的 SQLiteStudio，也有收费的 Navicat 。
Navicat 虽然收费，但是有 14 天的试用期，14 天足够用了？吧。

打开 Navicat 后，连接 `memos_prod.db` 

![](https://images.eallion.com/images/2022/11/link_sqlite.png)

依次点开`“memos”`-`main`-`表`-`memo`，在`memo`表上点击右键，选择`导出向导`，
选择一种熟悉的文件格式：

![](https://images.eallion.com/images/2022/11/format.png)

一路默认`下一步`到底，点`开始`导出就行了。

打开导出的文件，按照格式添加以前的数据。

然后在`表`上点右键导入就行了。

最后把`memos_prod.db`文件上传到服务器上的`memos`文件夹，重启容器即可。

### 首页公告栏 API 调用 Memos

> API: <https://memos.example.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=10>

以下代码示例，复制照搬的话不一定能用。
首先需要一个 CSS 选择器来展示 Memos，ID 命名为 `memos` 好了。

> 参考：<i class="iconfont icon-github"></i> [breadcrumb-talk.html#L26-L30](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/partials/breadcrumb-talk.html#L26-L30)

```
<div id="memos" class=""></div>
```

然后用 JS 把 API 获取到的数据处理成 Json，再展示到 CSS 选择器里：
> 参考：<i class="iconfont icon-github"></i> [footer-js.html#L72-L145](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/partials/footer-js.html#L72-L145)
```
let jsonUrl = "https://memos.example.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=10" + "&t=" + Date.parse(new Date())

let xhrTalks = new XMLHttpRequest();
xhrTalks.open('get', jsonUrl, true);
xhrTalks.onload = function(res) {
if (this.status >= 200 && this.status < 400) {
    let res = JSON.parse(this.response);
    let talksCount = res.count;
    let talksContainer = document.querySelector('#memos');
    let talksHtml = '';
    res.data.forEach(function(item, i) {
        let d = new Date(item.createdTs * 1000);
        let id = item.id
        let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        let dataTime = '<span class="datatime">' + date + '</span>';
        talksHtml += '<div class="item item-' + (i + 1) + '">' + dataTime + '： <a href="https://memos.example.com/m/' + id + '" target="_blank" rel="noopener noreferrer">' + urlToLink(item.content) + '</a></div>';
    });

    // Inject the string html into the container parent element.
    if(talksContainer) {
        talksContainer.innerHTML = talksHtml;
    }
}

xhrTalks.send();
```

PS: 上面的版本用的是 XMLHttpRequest ，用 Fetch 命令来获取数据性能会更好。
我比较懒，就没改（又不是不能用）。
如果构建时，把 Memos 的 Json 数据保存到本地静态文件，性能还会更好。<i class="iconfont icon-github"></i> [workflows.yml#L34](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/.github/workflows/main.yml#L34)
相对时间，用的 [Lately.js](https://tokinx.github.io/lately/) 插件：<i class="iconfont icon-github"></i> [footer-js.html#L98](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/partials/footer-js.html#L98)

### 嘀咕独立页面展示 Memos

> DEMO： <https://eallion.com/memos/>

> API: https://memos.example.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=10

1. **放置 CSS 容器**

在合适的位置需要放置一个 CSS 选择器作为展示 Memos 的容器：
```
<div id="memos" class=""></div>
```

2. **JS 处理 API 数据**

源码在这里：<i class="iconfont icon-github"></i> [memos.html](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/memos.html)，因为时常有可能会更新变动，这里就不贴具体的 JS 代码了。

整体样式还真是自己捏出来的，不过大多也是借鉴了 Twiiter 的元素。

相对时间，用的是 [Moment.js](https://github.com/moment/moment/) Twitter 风格的插件：<i class="iconfont icon-github"></i> [memos.html#L60-L165](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/memos.html#L60-L165)，7 天内的发布时间显示为相对时间，本年内的时间不显示年份，其余的显示为完整时间。

灯箱用的是 [baguetteBox.js](https://github.com/feimosi/baguetteBox.js)插件: <i class="iconfont icon-github"></i> [memos.html#L331-L341](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/memos.html#L331-L341)

3. **获取 Memos 总条数**

> API: https://memos.example.com/api/memo/amount?creatorId=101

```
<span id="memosCount">0</span>
```

```
<script>
    //获取 Memos 总条数
    function getTotal() {
        var totalUrl = "https://memos.example.com/api/memo/amount?creatorId=101";
        fetch(totalUrl).then(response => {
            return response.json();
        }).then(data => {
            // console.log(data.data);
            var memosCount = document.getElementById('memosCount');
            memosCount.innerHTML = data.data;
        }).catch(err => {
            // Do something for an error here
        });
    };
    window.onload = getTotal();
</script>
```
