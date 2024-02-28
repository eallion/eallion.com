---
title: "Memos 配置 Artalk 评论系统"
images: ["/assets/images/og/artalk_for_memos.png"]
authors: ["eallion"]
categories: ["代码"]
tags: 
  - memos
  - artalk
  - 嘀咕
  - 评论
slug: "artalk_for_memos"
summary: "这篇文章介绍了如何配置Artalk评论系统在Memos应用和Memos嘀咕页面中。作者提供了登录Memos应用后台，在系统设置中添加自定义样式和脚本的方法，并给出了需要修改的内容。另外，作者还介绍了在assets/memos.js文件中添加和修改代码的步骤，并在HTML文件中引入Artalk的JS和CSS资源文件。"
draft: false
Comments: true
date: 2023-05-25T22:13:35+08:00
---

### Memos 简介系列

- 《[Memos 简介](https://eallion.com/memos-deployment/)》
- 《[Memos 手动导入数据](https://eallion.com/memos-import/)》
- 《[Memos API 调用渲染页面](https://eallion.com/memos-api/)》
- 《[Memos API 公告样式滚动效果](https://eallion.com/memos-ticker/)》
- 《[Memos API 获取总条数](https://eallion.com/memos-total-count/)》
- 《[Memos 配置 Artalk 评论系统](https://eallion.com/artalk_for_memos/)》

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

- DEMO：<https://eallion.com/memos>

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
