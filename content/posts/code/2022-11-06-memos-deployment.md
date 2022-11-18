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

### TL;DR

本文介绍了 [Memos](https://github.com/usememos/memos) 的部署，数据导入，公告栏 API 调用，和 “ [嘀咕](https://eallion.com/memos/)” 页面通过 API 渲染 Memos。

-   官网：<https://github.com/usememos/memos>
-   部署实例：<https://memos.eallion.com>
-   嘀咕页面：<https://eallion.com/memos>

### 前言

> DEMO：<https://eallion.com/memos/>

我从接触独立博客开始，就一直在博客的子栏目中部署了一个类似 [嘀咕](https://eallion.com/memos/) 的微博客。  
最初的作用是备份 QQ 空间、Twitter 和微博等。  
最早用到的微博客程序是 PageCookery。甚至有点怀念……

现在在独立博客圈少部博主中流行的这种“B 言 B 语”，最早来源于少数派上的一篇文章——[《保卫表达：用后端 BaaS 快速搭建专属无点赞评论版微博——b 言 b 语》](https://sspai.com/post/60024)，“B 言 B 语”也叫“废话胶囊”。

由此也衍生出了：

-   [LeanCloud 版](https://github.com/daibor/nonsense.fun)（原版）
-   [Golang 版](https://github.com/songquanpeng/microblog)
-   [腾讯云 CloudBase 版](https://github.com/ibearye/talk)
-   [木木老师修改版](https://immmmm.com/bb-by-wechat-pro/) 《「哔哔点啥」微信公众号 2.0》
-   [BBTalk](https://github.com/BBtalkJS/BBtalk)Vercel 版
-   我个人短暂修改使用过的 [Algolia](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/algoliaTalk.html) 版。

目前以上版本均可使用，不过可能有些版本的使用成本有点高。

今天要介绍的是另一个能提供类似功能的应用——[Memos](https://github.com/usememos/memos)  
Memos 自己对标的竞品是 Flomo ，我们是不是把它用歪了？

### 部署 Memos

> 前置条件：
>
> 1. 一台 VPS 服务器或本地电脑（或 Docker SaaS 平台）
> 2. 一点点 WebStack 技能（Docker、Nginx）

安装`docker-compose-plugin`插件后，`docker compose`命令可以去掉中间的"`-`"，Docker Compose V1 版本已经结束生命周期。

暂时不建议把 Memos 部署到网站二级目录，如：https://example.com/memos
而应该部署到一个二级域名，如：https://memos.example.com

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
如果有公网 IP，那就打开`IP`+`端口`，如： `http://119.29.29.29:5230` 。
用域名反代 IP 见下文第 4 点。
常用的命令有：

```bash
docker compose up -d
docker compose down
docker compose pull
docker compose up -d --force-recreate
```

3. **升级 Memos**

> 参考：<https://memos.eallion.com/m/5454>

Memos 官方提供的升级命令

```bash
docker-compose down && docker image rm neosmemo/memos:latest && docker-compose up -d
```

会导致 Memos 在升级期间掉线，因为 `down` 了，特别是境内服务器网速不好的情况下，掉线时间会随着 `pull` 时间无限延长。

最新版 Docker 升级 Memos 的命令有改进空间：

```bash
docker compose pull && docker compose up -d --force-recreate
```

但是如果用了镜像加速服务，因为缓存的原因也可能有 `pull` 不到最新镜像的问题。

4. **Nginx 反代**

如果打算对互联网提供 Memos 访问服务，就需要反代 Memos，一般都是用 Nginx，反代`5230`端口即可。

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

![](https://images.eallion.com/picgo/202211171351152.png)

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
官方提供的示例中，数据卷为家目录`/home/username`下的`.memos`目录，是一个隐藏目录，注意对比。

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

导出的模板文件为`memos.csv`，用类似 Notepad++ 这类软件打开导入的 CSV 文件，把编码修改为`UTF-8-BOM`编码，不然重新导入到 Memos 后，中文会有乱码。

![](https://images.eallion.com/picgo/202211171157738.png)

按照它的格式转换以前的数据：

![](https://images.eallion.com/images/2022/11/csv.png)

保存后用命令导入到`memos_prod.db`这个 SQLite 数据库。
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

然后把新的`memos_prod.db`文件上传到服务器上的`memos`文件夹替换掉原来的文件，重启容器即可。
如果有权限问题，需要修改一下文件访问权限：

```bash
sudo chown www:www memos_prod.db
```

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

![](https://images.eallion.com/images/2022/11/csv.png)

然后在打开的数据库左侧点击右键导入就行了。

最后把新的`memos_prod.db`文件上传到服务器上的`memos`文件夹替换掉原来的文件，重启容器即可。
如果有权限问题，需要修改一下文件访问权限：

```bash
sudo chown www:www memos_prod.db
```

### CSS：自定义 Memos 样式

```css
/*隐藏每条可见状态标签*/
.user-banner-container > .username-container > .tag,
.memo-wrapper
    > .memo-top-wrapper
    > .status-text-container
    > .status-text.public,
.page-header .title-text {
    display: none !important;
}

/* 隐藏昵称后面的 MOD 字符 */
.user-banner-container > .username-container > .tag {
    display: none !important;
}

/*隐藏 大于10行的标签 By eallion*/
.tags-wrapper > .tags-container .tag-item-container:nth-child(1n + 11) {
    display: none !important;
}

/*隐藏发布权限设置*/
.memo-editor-container > .editor-header-container > .visibility-selector {
    display: none !important;
}

/*统一标签、链接颜色为绿色*/
.memo-content-wrapper > .memo-content-text .tag-span,
.memo-content-wrapper > .memo-content-text .link {
    color: rgb(22, 163, 74) !important;
}

/*修改 blockquote 为单引号*/
.memo-content-wrapper > .memo-content-text blockquote {
    font-family: KaiTi, STKaiti, STFangsong !important;
    margin: 0 0 0 1rem !important;
    padding: 0.25rem 2rem !important;
    position: relative !important;
    border-left: 0 none !important;
}

.memo-content-wrapper > .memo-content-text blockquote::before {
    line-height: 2rem !important;
    content: "“" !important;
    font-family: Georgia, serif !important;
    font-size: 28px !important;
    font-weight: bold !important;
    position: absolute !important;
    left: 10px !important;
    top: 5px !important;
}

/*开启暗黑模式*/
@media (prefers-color-scheme: dark) {
    body {
        filter: invert(90%) hue-rotate(180deg) !important;
    }

    img,
    .icon,
    .mr-1,
    video,
    div[class*="language-"] {
        filter: invert(110%) hue-rotate(180deg) !important;
        opacity: 0.8 !important;
    }

    .memo-editor-container
        > .common-tools-wrapper
        > .btns-container
        > .confirm-btn {
        color: #000 !important;
    }
}
```

### API：首页公告栏调用 Memos

> API: <https://memos.example.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=10>

以下代码示例，复制照搬的话不一定能用。
首先需要一个 CSS 选择器来展示 Memos，ID 命名为 `memos` 好了。

> 参考：<i class="iconfont icon-github"></i> [breadcrumb-talk.html#L26-L30](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/partials/breadcrumb-talk.html#L26-L30)

```
<div id="memos" class=""></div>
```

然后用 JS 把 API 获取到的数据处理成 Json，再展示到 CSS 选择器里：

> 参考：<i class="iconfont icon-github"></i> [footer-js.html#L63-L105](https://github.com/eallion/eallion.com/blob/a4de74d8568c184335ccfdc9dbc612289c2fbcb5/themes/hello-friend/layouts/partials/footer-js.html#L63-L105)

````html
<!--引入相对时间 Lately 插件-->
<script src="//tokinx.github.io/lately/lately.min.js"></script>

<!--JS 处理 Memos API-->
<script>
    let jsonUrl =
        "https://memos.eallion.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=1&offset=2" +
        "&t=" +
        Date.parse(new Date());

    fetch(jsonUrl)
        .then((res) => res.json())
        .then((resdata) => {
            var result = "",
                resultAll = "",
                data = resdata.data;
            for (var i = 0; i < data.length; i++) {
                var talkTime = new Date(
                    data[i].createdTs * 1000
                ).toLocaleString();
                var talkContent = data[i].content;
                var newtalkContent = talkContent
                    .replace(/```([\s\S]*?)```[\s]*/g, " <code>$1</code> ") //全局匹配代码块
                    .replace(/`([\s\S ]*?)`[\s]*/g, " <code>$1</code> ") //全局匹配内联代码块
                    .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g, "🌅") //全局匹配图片
                    .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g, "🔗") //全局匹配连接
                    .replace(
                        /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|jfif|gif))\S+/g,
                        "🔗"
                    ); //全局匹配纯文本连接
                result += `<li class="item"><span class="datetime">${talkTime}</span>： <a href="https://eallion.com/memos/">${newtalkContent}</a></li>`;
            }
            var talkDom = document.querySelector("#memos");
            var talkBefore = `<i class="iconfont icon-line-quote"></i><div class="talk-wrap"><ul class="talk-list">`;
            var talkAfter = `</ul></div>`;
            resultAll = talkBefore + result + talkAfter;
            talkDom.innerHTML = resultAll;

            // 相对时间
            window.Lately && Lately.init({ target: ".datetime" });
        });

    // 滚动效果
    setInterval(function () {
        var talkWrap = document.querySelector(".talk-list");
        var talkItem = talkWrap.querySelectorAll(".item");
        for (i = 0; i < talkItem.length; i++) {
            setTimeout(function () {
                talkWrap.appendChild(talkItem[0]);
            }, 2000);
        }
    }, 2000);
</script>
````

如果构建时，把 Memos 的 Json 数据保存到本地静态文件，性能还会更好。<i class="iconfont icon-github"></i> [workflows.yml#L34](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/.github/workflows/main.yml#L34)
相对时间，用的 [Lately.js](https://tokinx.github.io/lately/) 插件：<i class="iconfont icon-github"></i> [footer-js.html#L91](https://github.com/eallion/eallion.com/blob/a4de74d8568c184335ccfdc9dbc612289c2fbcb5/themes/hello-friend/layouts/partials/footer-js.html#L91)

### API：嘀咕独立页面展示 Memos

> DEMO： <https://eallion.com/memos/>

> API: https://memos.example.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=10

1. **放置 CSS 容器**

在合适的位置需要放置一个 CSS 选择器作为展示 Memos 的容器：

```
<div id="memos" class=""></div>
```

2. **JS 处理 API 数据**

源码在这里：<i class="iconfont icon-github"></i> [memos.html](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/memos.html)，因为时常有可能会更新变动，这里就不贴具体的 JS 代码了。

整体样式还真是自己捏出来的，不过大多也是借鉴了 Twitter 的元素。

相对时间，用的是 [Moment.js](https://github.com/moment/moment/) Twitter 风格的插件：<i class="iconfont icon-github"></i> [memos.html#L60-L165](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/memos.html#L60-L165)

-   7 天内的发布时间显示为相对时间：`1 天前`
-   本年内的时间不显示年份：`5月20日，13:14 • 中午`
-   去年及之前的时间显示为完整时间：`2010年10月10日，10:10 • 上午`

全站图片灯箱效果用的是 [baguetteBox.js](https://github.com/feimosi/baguetteBox.js)插件: <i class="iconfont icon-github"></i> [memos.html#L331-L341](https://github.com/eallion/eallion.com/blob/30ff6b67c3c072994f8be957c3996e546b38131c/themes/hello-friend/layouts/_default/memos.html#L331-L341)

### API：获取 Memos 总条数

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

### Memos Awesome

> [https://memos.top](https://www.memos.top/)

-   Discuss in [Telegram](https://t.me/+-_tNF1k70UU4ZTc9) 👾
-   Docker Hub：<https://hub.docker.com/r/neosmemo/memos>
-   Docker Hub Nightly：<https://hub.docker.com/r/eallion/memos>
-   Moe Memos 客户端：<https://memos.moe/>
-   Memos-bber Chrome 扩展：<https://github.com/lmm214/memos-bber>
-   Memos 微信小程序：<https://github.com/Rabithua/memos_wmp>
-   Telegram Bot：<https://github.com/qazxcdswe123/telegramMemoBot>
-   [哔哔广场](https://immmmm.com/bbs-by-memos/)：<https://immmmm.com/bbs/>
-   [「分享」Android 使用 HTTP Shortcuts 录入笔记](https://github.com/usememos/memos/discussions/315)
-   [「分享」使用 iOS 快捷指令录入笔记，支持多图上传，支持标签选择](https://github.com/usememos/memos/discussions/52)
-   [「分享」在 Fly.io 平台上搭建 memos 并自动备份到 B2/S3](https://github.com/usememos/memos/discussions/451)

### 一点点建议

1. 发图尽量把图片传到第三方图床，（至少近期版本）别上传到 Memos 资源库。
2. 附件也一样别传到 Memos 资源库，可以传到第三方网盘，贴上分享链接。
3. 备份`memos_prod.db`数据库遵循两地三中心原则，多处备份，且是单向的。
4. 如果你意识不到数据对你有多珍贵或重要，用 SaaS 服务即可，不用自建。
5. 没有那么多人来看你的 Memos，自娱自乐即可。
