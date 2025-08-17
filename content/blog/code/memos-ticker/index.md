---
authors:
- eallion
categories:
- 代码
date: 2022-11-06 08:33:22
draft: false
lastmod: 2022-11-06 08:33:22
series:
- Memos
seriesOpened: true
series_order: 4
slug: memos-ticker
summary: 在网页中展示 Memos 需创建 ID 为 memos 的容器，通过 JS 调用 API 获取数据并处理为 JSON 格式，使用正则替换代码块、图片和链接，最后用
  CSS 控制滚动效果和样式布局。Lately.js 插件可实现相对时间显示。
tags:
- 嘀咕
- 哔哔
- Memos
- talk
title: Memos API 公告样式滚动效果
---
> 效果参考首页

1. 首先需要在网页上合适的位置放置一个 CSS 选择器来展示 Memos，ID 命名为 `memos` 好了。

核心代码：

```html
<div id="memos" class="memos"></div>
```

> 参考：<i class="fab fa-github fa-fw"></i>[index.debug.html#L124](https://github.com/eallion/favorite/blob/main/index.debug.html#L124)

2. 然后用 JS 把 API 获取到的数据处理成 Json，再展示到 CSS 选择器里：

````html
<!--引入相对时间 Lately 插件-->
<script src="//tokinx.github.io/lately/lately.min.js"></script>

<!--JS 处理 Memos API-->
<script>
    let jsonUrl =
        "https://demo.usememos.com/api/memo?creatorId=101&rowStatus=NORMAL&limit=1&offset=2" +
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

> 参考：<i class="fab fa-github fa-fw"></i>[static/js/custom.js#L643-L703](https://github.com/eallion/favorite/blob/main/static/js/custom.js#L643-L703)

相对时间，用的 [Lately.js](https://tokinx.github.io/lately/) 插件：<i class="fab fa-github fa-fw"></i>[static/js/custom.js#L587-L640](https://github.com/eallion/favorite/blob/main/static/js/custom.js#L587-L640)

3. CSS 参考：

```css
#memos {
    padding-left: 8px;
}

.index-talk {
    display: flex;
    flex: 1 auto;
    width: 100%;
    text-align: left;
    position: relative;
}

.talk-list {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.talk-list li {
    list-style: none;
    margin-bottom: 10px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline;
    vertical-align: middle;
}

.talk-list li:not(:first-child) {
    display: none !important;
}

.talk-list li a:hover {
    text-decoration: none;
    color: #1890ff;
}
```

> 参考：<i class="fab fa-github fa-fw"></i>[static/css/style.css#L1203-L1240](https://github.com/eallion/favorite/blob/main/static/css/style.css#L1203-L1240)
