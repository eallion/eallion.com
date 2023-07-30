---
title: "Memos API 获取总条数"
images: ["https://api.eallion.com/og?title=Memos%20API%20%E8%8E%B7%E5%8F%96%E6%80%BB%E6%9D%A1%E6%95%B0"]
authors: ["eallion"]
categories: ["代码"]
tags:
    - 嘀咕
    - 哔哔
    - Memos
    - talk
slug: "memos-total-count"
draft: false
date: 2022-11-06T16:34:22+08:00
lastmod: 2022-11-06T16:34:22+08:00
---

### Memos 简介系列

- 《[Memos 简介](https://eallion.com/memos-deployment/)》
- 《[Memos 手动导入数据](https://eallion.com/memos-import/)》
- 《[Memos API 调用渲染页面](https://eallion.com/memos-api/)》
- 《[Memos API 公告样式滚动效果](https://eallion.com/memos-ticker/)》
- 《[Memos API 获取总条数](https://eallion.com/memos-total-count/)》
- 《[Memos 配置 Artalk 评论系统](https://eallion.com/artalk_for_memos/)》

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
