---
title: "Memos API 获取总条数"
images: ["/assets/images/og/memos-total-count.png"]
authors: ["eallion"]
categories: ["代码"]
tags:
    - 嘀咕
    - 哔哔
    - Memos
    - talk
slug: "memos-total-count"
summary: "这篇文章介绍了使用Memos API获取总条数的方法。作者指出Memos官方amount API已不再使用，而是要利用Json返回的数据总条数计算Memos的总条数。"
series: ["Memos"]
series_weight: 5
seriesNavigation: true
draft: false
date: 2022-11-06T16:34:22+08:00
lastmod: 2022-11-06T16:34:22+08:00
---

***更新**：Memos 官方 `amount` API 已弃用。（[Issues #1214](https://github.com/usememos/memos/issues/1214)）

获取 Memos 条数的新方法是利用 Json 返回的数据总条数从而计算 Memos 总条数。

```html
<span id="memosCount">0</span>
```

```js
//获取 Memos 总条数
function getTotal() {
    var totalUrl = "https://memos.example.com/api/memo/stats?creatorId=101"
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
```
