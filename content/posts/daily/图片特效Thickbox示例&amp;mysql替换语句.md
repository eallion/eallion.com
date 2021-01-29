---
title: "图片特效Thickbox示例&amp;mysql替换语句"
categories: ["日志"]
tags: ['备忘']
draft: false
slug: "thickbox"
date: "2010-05-04 09:21:42"
---

特效Thickbox示例

```
<a class="thickbox" href="https://images.eallion.com/images/before201012/.jpg">
    <img src="https://images.eallion.com/images/before201012/.jpg" >
</a>
```
图片无法点击的效果

```
UPDATE 表 SET 字段 = replace( 字段 , '被替换的内容', '替换后的内容' );
```
