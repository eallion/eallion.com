---
authors:
- eallion
categories:
- 代码
date: 2023-05-25 14:13:35
draft: false
series:
- Memos
seriesOpened: true
series_order: 6
slug: artalk_for_memos
summary: 在 Memos v0.14.0 中成功集成 Artalk 评论系统，通过自定义 CSS 和 JS 脚本实现暗黑模式适配与界面优化。核心步骤包括修改后台样式、动态加载
  Artalk 资源、独立页面评论功能嵌入，并需替换 CDN 链接和服务端配置。示例见 eallion.com/memos，完整方案参考相关技术文档！
tags:
- memos
- artalk
- 嘀咕
- 评论
title: Memos 配置 Artalk 评论系统
---
> 更新：2023.10.20 此脚本只适配到 Memos v0.14.0

> TODO：

- [x] 解决 Memos 后台界面错乱问题 (已解决)
- [x] Memos 应用上的暗黑模式适配 ([木木老师顺手就解决了](https://me.edui.fun/m/1628))

在木木老师《[Memos x Twikoo](https://immmmm.com/memos-with-twikoo/)》和拾月老师《[单页 Memos 添加 Artalk 评论，无限接近微博](https://www.skyue.com/23051422.html)》的启发之下。
给 [Memos 嘀咕页面](https://eallion.com/memos/)和 [Memos 应用](https://memos.eallion.com/m/5668)添加了 Artalk 评论系统。

### 自定义样式

![](/assets/images/posts/2023/05/memos-setting.png)

登录 Memos 应用后台，在 `设置` `系统` `自定义样式` 中添加 CSS 代码：

```css
a.time-text:after { content: ' 评论 💬 '; }
.atk-main-editor { margin-top: 20px; }
.dark .artalk{
  --at-color-font: #fff;
  --at-color-deep: #e7e7e7;
  --at-color-sub: #e7e7e7;
  --at-color-grey: #fff;
  --at-color-meta: #fff;
  --at-color-border: #2d3235;
  --at-color-light: #687a86;
  --at-color-bg: #1e2224;
  --at-color-bg-transl: rgba(30, 34, 36, .95);
  --at-color-bg-grey: #46494e;
  --at-color-bg-grey-transl: rgba(8, 8, 8, .95);
  --at-color-bg-light: rgba(29, 161, 242, .1);
  --at-color-main: #0083ff;
  --at-color-red: #ff5652;
  --at-color-pink: #fa5a57;
  --at-color-yellow: #ff7c37;
  --at-color-green: #4caf50;
  --at-color-gradient: linear-gradient(180deg, transparent, rgba(30, 34, 36, 1))
}
```

### 自定义脚本

登录 Memos 应用后台，在 `设置` `系统` `自定义脚本` 中添加 CSS 代码：

```js
// Artalk comments
// 用 JS 向页面中插入 JS
function addArtalkJS() { 
    var memosArtalk = document.createElement("script");
    memosArtalk.src = `https://cdn.staticfile.org/artalk/2.5.5/Artalk.min.js`;
    var artakPos = document.getElementsByTagName("script")[0];
    artakPos.parentNode.insertBefore(memosArtalk, artakPos);
};
// div
function startArtalk() {
    start = setInterval(function(){
        var artalkDom = document.getElementById('Comments') || '';
        var memoAt = document.querySelector('.memo-wrapper') || '';
        var memoLoading = document.querySelector('.action-button-container') || '';
        var memoLoadingA = document.querySelector('.action-button-container a') || '';
        if(window.location.href.replace(/^.*\/(m)\/.*$/,'$1') == "m" && memoLoadingA){
        memoLoading.innerHTML = "评论加载中……"
        }
        if(window.location.href.replace(/^.*\/(m)\/.*$/,'$1') == "m" && !artalkDom){
            addArtalkJS()
            if(memoAt){
                clearInterval(start)
                var cssLink = document.createElement("link");
                cssLink.rel = "stylesheet";
                cssLink.href = "https://cdn.staticfile.org/artalk/2.5.5/Artalk.min.css";
                document.head.appendChild(cssLink);
                memoAt.insertAdjacentHTML('afterend', '<div id="Comments"></div>');
                setTimeout(function() {
                    Artalk.init({
                        el: '#Comments',
                        pageKey: location.pathname,
                        pageTitle: document.title,
                        server: 'https://artalk.at.your.server.com/',
                        site: 'memos',
                        darkMode: 'auto'
                    });
                    Artalk.on('list-loaded', function() {
                        // console.log('评论加载完成');
                        memoLoading.innerHTML = ''
                        startArtalk();
                    });
                }, 1000);
            }
        }
        //console.log(window.location.href);
    }, 1000)
}
startArtalk();
```

需要修改的内容：

- [Artalk.min.css](https://artalk.js.org/guide/deploy.html#cdn-%E8%B5%84%E6%BA%90)
- [Artalk.min.js](https://artalk.js.org/guide/deploy.html#cdn-%E8%B5%84%E6%BA%90)
- server：[https://artalk.at.your.server.com](https://artalk.js.org/guide/frontend/config.html#server)
- site：~~memos~~

### Memos 独立页面配置 Artalk 评论系统

- DEMO:<https://eallion.com/memos>

部署方式请参考：《[Memos API 调用渲染页面](https://eallion.com/memos-api/)》一文。
在原来的基本上 <i class="fab fa-github fa-fw"></i>[assets/memos.js](https://github.com/eallion/eallion.com/blob/main/static/assets/memos.js)
添加 JS 代码：

```js
function loadArtalk(memo_id) {
    const commentDiv = document.getElementById('memo_' + memo_id);
    const commentBtn = document.getElementById('btn_memo_' + memo_id);
    if (commentDiv.classList.contains('hidden')) {
        commentDiv.classList.remove('hidden');
        commentBtn.innerHTML = '收起评论<i class="fas fa-level-up-alt"></i>';
        const artalk = new Artalk({
            el: '#memo_' + memo_id,
            pageKey: '/m/' + memo_id,
            pageTitle: '',
            server: 'https://artalk.at.your.server.com/',
            site: 'memos',
            darkMode: 'auto'
        });
        } else {
        commentDiv.classList.add('hidden');
        commentBtn.innerHTML = '评论';
        }
}
```

并且修改下面的内容：

```js
memoResult +=
        '<li id="' +
        data[i].id +
        '" class="timeline"><div class="talks__content"><div class="talks__text"><div class="talks__userinfo"><div>Charles Chin</div><div><svg viewBox="0 0 24 24" aria-label="认证账号" class="talks__verify"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg></div><div class="talks__id">@eallion · </div><small class="talks__date"><a href="https://memos.eallion.com/m/' +
        data[i].id +
        '" target="_blank">' +
        moment(data[i].createdTs * 1000).twitterLong() +
        "</a></small></div><p>" +
        memoContREG +
        "</p></div></div></li>";
```

修改为：

```js
memoResult +=
        '<li id="' +
        memo_id +
        '" class="timeline"><div class="talks__content"><div class="talks__text"><div class="talks__userinfo"><div>Charles Chin</div><div><svg viewBox="0 0 24 24" aria-label="认证账号" class="talks__verify"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg></div><div class="talks__id">@eallion · </div><small class="talks__date"><a href="https://memos.eallion.com/m/' +
        memo_id +
        '" target="_blank">' +
        moment(data[i].createdTs * 1000).twitterLong() +
        "</a></small></div><p>" +
        memoContREG +
        "</p><div class='talks_comments'><a onclick=\"loadArtalk(\'" +
        memo_id +
        "\')\"><i class='fas fa-comment-dots fa-fw'></i><span id='btn_memo_" +
        memo_id +
        "'>评论</span> (<span id='ArtalkCount' data-page-key='/m/" +
        memo_id +
        "'>0</span>)</a></div><div id='memo_" +
        memo_id +
        "' class='artalk hidden'></div></div></li>";
```

并且在 HTML 文件中合适的位置引入 Artalk 的 JS 和 CSS 资源文件

```html
<!-- CSS -->
<link href="http://artalk.at.your.server.com:8080/dist/Artalk.css" rel="stylesheet">

<!-- JS -->
<script src="http://artalk.at.your.server.com:8080/dist/Artalk.js"></script>

<!-- Artalk 评论数统计 -->
<script>
    window.onload = function() {
        Artalk.loadCountWidget({
            server: 'https://artalk.at.your.server.com/',
            site: 'memos',
            pvEl: '#ArtalkPV',
            countEl: '#ArtalkCount',
        });
    }
</script>
```

            document.querySelector("button.button-load").remove()
            return
        }
    })
}
// 插入 html
function updateHTMl(data) {
    var memoResult = "", resultAll = "";

    // 解析 TAG 标签，添加样式
    const TAG_REG = /#([^\s#]+?) /g;

    // 解析 BiliBili
    const BILIBILI_REG = /<a\shref="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?">.*<\/a>/g;
    // 解析网易云音乐
    const NETEASE_MUSIC_REG = /<a\shref="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
    // 解析 QQ 音乐
    const QQMUSIC_REG = /<a\shref="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
    // 解析腾讯视频
    const QQVIDEO_REG = /<a\shref="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
    // 解析 Spotify
    const SPOTIFY_REG = /<a\shref="https:\/\/open\.spotify\.com\/(track|album)\/([\s\S]+)".*?>.*<\/a>/g;
    // 解析优酷视频
    const YOUKU_REG = /<a\shref="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
    //解析 Youtube
    const YOUTUBE_REG = /<a\shref="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;

    // Marked Options
    marked.setOptions({
        breaks: true,
        smartypants: true,
        langPrefix: 'language-',
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
    });

    // Memos Content
    for (var i = 0; i < data.length; i++) {
        var memoContREG = data[i].content
            .replace(TAG_REG, "<span class='tag-span'><a rel='noopener noreferrer' href='#'>#$1</a></span> ")

        // For CJK language users
        // 用 PanguJS 自动处理中英文混合排版
        // 在 index.html 引入 JS：<script type="text/javascript" src="assets/js/pangu.min.js?v=4.0.7"></script>
        // 把下面的 memoContREG = marked.parse(memoContREG) 改为：memoContREG = marked.parse(pangu.spacing(memoContREG))

        memoContREG = marked.parse(memoContREG)
            .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//player.bilibili.com/player.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true' style='position:absolute;height:100%;width:100%;'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")
            .replace(NETEASE_MUSIC_REG, "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>")
            .replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
            .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
            .replace(SPOTIFY_REG, "<div class='spotify-wrapper'><iframe style='border-radius:12px' src='https://open.spotify.com/embed/$1/$2?utm_source=generator&theme=0' width='100%' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe></div>")
            .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

        // 解析内置资源文件 
        if (data[i].resourceList && data[i].resourceList.length > 0) {
            var resourceList = data[i].resourceList;
            var imgUrl = '', resUrl = '', resImgLength = 0;
            for (var j = 0; j < resourceList.length; j++) {
                var resType = resourceList[j].type.slice(0, 5);
                var resexlink = resourceList[j].externalLink;
                var resLink = ''
                if (resexlink) {
                    resLink = resexlink
                } else {
                    resLink = memos + 'o/r/' + resourceList[j].id + '/' + resourceList[j].filename
                }
                if (resType == 'image') {
                    imgUrl += '<img loading="lazy" src="    ' + resLink + '"/>'
                    resImgLength = resImgLength + 1
                }
                if (resType !== 'image') {
                    resUrl += '<a target="_blank" rel="noreferrer" href="' + resLink + '">' + resourceList[j].filename + '</a>'
                }
            }
            if (imgUrl) {
                var resImgGrid = ""
                if (resImgLength !== 1) { var resImgGrid = "grid grid-" + resImgLength }
                memoContREG += '<div class="resimg ' + resImgGrid + '">' + imgUrl + '</div>'
            }
            if (resUrl) {
                memoContREG += '<p class="datasource">' + resUrl + '</p>'
            }
        }
        memoResult += '<li class="timeline"><div class="memos__content"><div class="memos__text"><div class="memos__userinfo"><div>' + memo.name + '</div><div><svg viewBox="0 0 24 24" aria-label="认证账号" class="memos__verify"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg></div><div class="memos__id">@' + memo.username + '</div></div><p>' + memoContREG + '</p></div><div class="memos__meta"><small class="memos__date">' + moment(data[i].createdTs * 1000).twitter() + ' • 来自「<a href="' + memo.host + 'm/' + data[i].id + '" target="_blank">Memos</a>」</small></div></div></li>'
    }
    var memoBefore = '<ul class="">'
    var memoAfter = '</ul>'
    resultAll = memoBefore + memoResult + memoAfter
    memoDom.insertAdjacentHTML('beforeend', resultAll);
    //取消这行注释解析豆瓣电影和豆瓣阅读
    // fetchDB()
    document.querySelector('button.button-load').textContent = '加载更多';
}
// Memos End

// 解析豆瓣 Start
// 文章内显示豆瓣条目 https://immmmm.com/post-show-douban-item/
// 解析豆瓣必须要 API，请找朋友要权限，或自己按 https://github.com/eallion/douban-api-rs 这个架设 API，非常简单，资源消耗很少
// 已内置样式，修改 API 即可使用
function fetchDB() {
    var dbAPI = "https://api.example.com/";  // 修改为自己的 API
    var dbA = document.querySelectorAll(".timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])") || '';
    if (dbA) {
        for (var i = 0; i < dbA.length; i++) {
            _this = dbA[i]
            var dbHref =_this.href
            var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
            var db_type = dbHref.replace(db_reg, "$1");
            var db_id = dbHref.replace(db_reg, "$2").toString();
            if (db_type == 'movie') {
                var this_item = 'movie' + db_id;
                var url = dbAPI + "movies/" + db_id;
                if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
                    fetch(url).then(res => res.json()).then(data => {
                        let fetch_item = 'movies' + data.sid;
                        let fetch_href = "https://movie.douban.com/subject/" + data.sid + "/"
                        localStorage.setItem(fetch_item, JSON.stringify(data));
                        movieShow(fetch_href, fetch_item)
                    });
                } else {
                    movieShow(dbHref, this_item)
                }
            } else if (db_type == 'book') {
                var this_item = 'book' + db_id;
                var url = dbAPI + "v2/book/id/" + db_id;
                if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
                    fetch(url).then(res => res.json()).then(data => {
                        let fetch_item = 'book' + data.id;
                        let fetch_href = "https://book.douban.com/subject/" + data.id + "/"
                        localStorage.setItem(fetch_item, JSON.stringify(data));
                        bookShow(fetch_href, fetch_item)
                    });
                } else {
                    bookShow(dbHref, this_item)
                }
            }
        }// for end
    }
}

function movieShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>“" + data.name + "”</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section class='post-preview--excerpt'>" + data.intro.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>"
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']"
    var qs_dom = document.querySelector(qs_href)
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html
}

function bookShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating.average);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>“" + data.title + "”</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>"
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']"
    var qs_dom = document.querySelector(qs_href)
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html
}
// 解析豆瓣 End

// Images lightbox
window.ViewImage && ViewImage.init('.container img');

// Memos Total Start
// Get Memos total count
function getTotal() {
    var totalUrl = memos + "api/memo/stats?creatorId=" + memo.creatorId
    fetch(totalUrl).then(res => res.json()).then(resdata => {
        if (resdata.data) {
            var allnums = resdata.data.length
            var memosCount = document.getElementById('total');
            memosCount.innerHTML = allnums;
        }
    }).catch(err => {
        // Do something for an error here
    });
};
window.onload = getTotal();
// Memos Total End

```

源码在这里：<i class="fab fa-github fa-fw"></i>[memos.top](https://github.com/eallion/memos.top)，可能时常会更新变动。

整体样式是自己慢慢捏出来的，大多借鉴了 Twitter 的元素。

相对时间，用的是 [Moment.js](https://github.com/moment/moment/) Twitter 风格的插件：<i class="fab fa-github fa-fw"></i>[moment.twitter.js](https://github.com/eallion/memos.top/blob/main/assets/js/moment.twitter.js)

- 7 天内的发布时间显示为相对时间：`1 天前`
- 本年内的时间不显示年份：`5月20日，13:14 • 中午`
- 去年及之前的时间显示为完整时间：`2010年10月10日，10:10 • 上午`

全站图片灯箱效果用的是 [view-image.js](https://tokinx.github.io/ViewImage/) 插件：<i class="fab fa-github fa-fw"></i>[view-image.min.js](https://github.com/eallion/memos.top/blob/main/assets/js/view-image.min.js)

3. CSS 参考

> 参考：<i class="fab fa-github fa-fw"></i>[assets/css/style.css](https://github.com/eallion/memos.top/blob/main/assets/css/style.css)

    // 移除之前处于活动状态的 .dvtjjf 元素
    document.querySelector(`.dvtjjf.active[data-search="${e.target.dataset.search}"]`)?.classList.remove('active');

    if (e.target.dataset.value) {
        // 将当前点击的 .dvtjjf 元素设为活动状态
        e.target.classList.add('active');
    }

    // 构建属性选择器数组
    const searchItems = document.querySelectorAll('.dvtjjf.active');
    const attributes = Array.from(searchItems, searchItem => {
        const property = `data-${searchItem.dataset.search}`;
        const logic = searchItem.dataset.method === 'contain' ? '*' : '^';
        const value = searchItem.dataset.method === 'contain' ? `${searchItem.dataset.value}` : searchItem.dataset.value;
        return `[${property}${logic}='${value}']`;
    });

    // 构建选择器字符串
    const selector = `.sorting${attributes.join('')}`;

    // 显示匹配选择器的元素
    document.querySelectorAll(selector).forEach(item => item.classList.remove('hide'));
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sc-gtsrHT')) {
        e.preventDefault();
        search(e);
    }
});

function sort(e) {
    const sortBy = e.target.dataset.order;
    const style = document.createElement('style');
    style.classList.add('sort-order-style');

    // 移除之前的排序样式
    document.querySelector('style.sort-order-style')?.remove();

    // 移除之前处于活动状态的 .sort-by-item 元素
    document.querySelector('.sort-by-item.active')?.classList.remove('active');

    // 将当前点击的 .sort-by-item 元素设为活动状态
    e.target.classList.add('active');

    if (sortBy === 'rating') {
        const movies = Array.from(document.querySelectorAll('.sorting'));

        // 根据评分进行排序
        movies.sort((movieA, movieB) => {
            const ratingA = parseFloat(movieA.dataset.rating) || 0;
            const ratingB = parseFloat(movieB.dataset.rating) || 0;
            if (ratingA === ratingB) {
                return 0;
            }
            return ratingA > ratingB ? -1 : 1;
        });

        // 生成排序样式表
        const stylesheet = movies.map((movie, idx) => `.sorting[data-rating="${movie.dataset.rating}"] { order: ${idx}; }`).join('\r\n');
        style.innerHTML = stylesheet;
        document.body.appendChild(style);
    } else if (sortBy === 'count') {
        const movies = Array.from(document.querySelectorAll('.sorting'));

        // 根据评分人数进行排序
        movies.sort((movieA, movieB) => {
            const countA = parseInt(movieA.dataset.count) || 0;
            const countB = parseInt(movieB.dataset.count) || 0;
            if (countA === countB) {
                return 0;
            }
            return countA > countB ? -1 : 1;
        });

        // 生成排序样式表
        const stylesheet = movies.map((movie, idx) => `.sorting[data-count="${movie.dataset.count}"] { order: ${idx}; }`).join('\r\n');
        style.innerHTML = stylesheet;
        document.body.appendChild(style);
    }
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sort-by-item')) {
        e.preventDefault();
        sort(e);
    }
});

```

### 8. 附加 GitHub Actions

GitHub Actions 处理 Json 数据的好处是不用每次都手动下载更新，而且 Access Token 可以保存在 GitHub 仓库的 Secrets Setting 里。

![](/assets/images/posts/2023/07/secrets.png)

然后填入前面步骤得到的 Access Token

- `Name *`：`NEODB_ACCESS_TOKEN`
- `Secret *`：`QuhZZpr111111111111111110X2OPaSRKU`

![](/assets/images/posts/2023/07/secret.png)

下面是具体的 GitHub Actions <i class="fab fa-github fa-fw"></i>[neodb.yml](https://github.com/eallion/eallion.com/blob/9c7fdeb341056e8ae0f3822f3d5077a946711a3b/.github/workflows/neodb.yml) 代码。不需要用到的步骤直接删除即可。

```bash
# .github/workflows/douban.yml
name: Sync NeoDB Data
on:
  schedule:
  - cron: "0 17 * * *"
#  watch:
#    types: [started]

  workflow_dispatch:

jobs:
  douban:
    name: Sync NeoDB Data
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    # 检查是否安装了 JQ
    - name: Check JQ
      run: |
        if ! command -v jq &> /dev/null; then
          echo "jq is not installed. Installing..."
          sudo apt-get update
          sudo apt-get install -y jq
        else
          echo "jq is already installed."
        fi
        # 把当前目录保存到环境变量中
        echo "WORK_DIR=$(pwd)" >> $GITHUB_ENV

    # 获取本地现有文件的标记数
    - name: Get Current Count
      run: |
        CURRENT_COUNT() {
          jq '.count' data/neodb/movie.json
        }
        echo "CURRENT_COUNT=$(CURRENT_COUNT)" >> $GITHUB_ENV

    - name: Get NeoDB JSON and Count
      run: |
        curl -X 'GET' \
        'https://neodb.social/api/me/shelf/complete?category=movie&page=1' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > movie1.json

        # 获取 NeoDB 上电影的标记数
        MOVIE_COUNT() {
          jq '.count' movie1.json
        }
        echo "MOVIE_COUNT=$(MOVIE_COUNT)" >> $GITHUB_ENV

        curl -X 'GET' \
        'https://neodb.social/api/me/shelf/complete?category=tv&page=1' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > tv1.json

        # 获取 NeoDB 上电视剧的标记数
        TV_COUNT() {
          jq '.count' tv1.json
        }

        REMOTE_COUNT=$(($(MOVIE_COUNT) + $(TV_COUNT)))
        echo "REMOTE_COUNT=$REMOTE_COUNT" >> $GITHUB_ENV

    # 对比本地的标记数和远程标记数，相等就跳过，不相等就下载新数据
    - name: Count Compare
      run: |
        if [ "${{ env.REMOTE_COUNT }}" = "${{ env.CURRENT_COUNT }}" ]; then
          echo "Variables are equal. Skipping the next steps."
          exit 0
        else
          echo "Variables are not equal. Running the next steps."
        fi

    # 下载所有数据
    - name: Get All NeoDB Count
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      run: |
        #从 json 中提取 pages 字段的值
        pages=$(jq '.pages' movie1.json)
        tv_pages=$(jq '.pages' tv1.json)

        # 个人使用，新建 WorkDIR ，排除 vercel.json 和 package.json 等
        mkdir neodb
        cd neodb

        # 下载 Movie 分类
        for ((i=1; i<=$pages; i++)); do
          url="https://neodb.social/api/me/shelf/complete?category=movie&page=$i"
          filename="movie$i.json"

        # 下载文件并保存为对应的文件名
        curl -X 'GET' "$url" \
          -H 'accept: application/json' \
          -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > "$filename"
        done

        # 下载 TV 分类
        for ((i=1; i<=$tv_pages; i++)); do
          tv_url="https://neodb.social/api/me/shelf/complete?category=tv&page=$i"
          tv_filename="tv$i.json"

          curl -X 'GET' "$tv_url" \
            -H 'accept: application/json' \
            -H 'Authorization: Bearer ${{ secrets.NEODB_ACCESS_TOKEN }}' > "$tv_filename"
          done

        # 把所有数据合并成一个文件
        jq -c -s '{data: map(.data[]) | unique | sort_by(.created_time) | reverse, pages: map(.pages)[0], count: map(.count)[0]}' *.json > movie.json

        # 更新 NeoDB 数据
        cp -f movie.json ${{ env.WORK_DIR }}/data/neodb/

    - name: Download NeoDB Cover
      run: |
        # 检查 movie 目录是否存在，如果不存在则创建
        if [ ! -d "movie" ]; then
          mkdir movie
        fi

        # 读取本地的 movie.json 文件内容
        json=$(cat data/neodb/movie.json)

        # 提取图片 URL
        image_urls=$(echo "$json" | jq -r '.data[].item.cover_image_url')

        # 遍历图片 URL 并下载图片
        for url in $image_urls; do
          filename=$(basename "$url")
          filepath="data/neodb/cover/$filename"
          # 检查文件是否已存在
          if [ -f "$filepath" ]; then
            echo "Skipping $filename - File already exists"
          else
            # 使用 curl 命令下载图片
            curl -o "$filepath" "$url"
            echo "Downloaded $filename"
            echo "REMOTE_COUNT=''" >> $GITHUB_ENV
          fi
        done

    # 把修改后的数据提交到 GitHub 仓库
    - name: Git Add and Commit
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      uses: EndBug/add-and-commit@v9
      with:
        message: 'chore(data): update neodb data'
        add: './data/neodb'

    # 调用另外的 GitHub Actions 构建 Hugo
    - name: Build Hugo and Deploy
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      uses: peter-evans/repository-dispatch@v2
      with:
          event-type: "Build Hugo and Deploy"

    # 把海报上传到腾讯云
    - name: Upload Cover to Tencent COS
      if: ${{ env.REMOTE_COUNT != env.CURRENT_COUNT }}
      uses: zkqiang/tencent-cos-action@v0.1.0
      with:
        args: upload -rs ./data/neodb/cover/ /images/neodb/
        secret_id: ${{ secrets.SECRET_COS_ID }}
        secret_key: ${{ secrets.SECRET_COS_KEY }}
        bucket: ${{ secrets.COS_CDN_BUCKET }}
        region: ap-shanghai

```
