---
authors:
- eallion
categories:
- 代码
date: 2022-11-06 08:34:22
draft: false
lastmod: 2022-11-06 08:34:22
series:
- Memos
seriesNavigation: true
series_weight: 5
slug: memos-total-count
summary: Memos 官方废弃了 amount API，建议通过解析 Json 返回数据的长度属性来统计总条数。示例代码通过 fetch 请求 stats
  接口获取数据，计算数组长度后更新页面元素显示总数，并在页面加载时自动执行。错误处理保留了扩展空间。
tags:
- 嘀咕
- 哔哔
- Memos
- talk
title: Memos API 获取总条数
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