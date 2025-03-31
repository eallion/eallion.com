---
authors:
- eallion
categories:
- 代码
date: 2023-07-04 02:54:27+08:00
draft: false
slug: artalk-no-comment-text
summary: Artalk评论系统无评论时可随机显示诗词。通过管理后台前端配置中的"无评论显示文字"插入HTML代码实现，无需额外JS。具体操作为添加今日诗词API提供的图片链接，并调整颜色参数确保在不同背景色下清晰显示。推荐使用LightSlateGray颜色，
tags:
- hugo
- blog
- Artalk
- 评论
title: Artalk 无评论随机显示诗词
---

### 前言

Artalk 无评论时随机显示诗词（今日诗词或一言等）的效果，如本博客截图所示：

![](/assets/images/posts/2023/07/artalk_no_comment_screenshot.png)

在本博客现阶段如果没有换主题或评论系统，随便找一篇没有评论的文章都可以看到实际效果。

要实现这个效果非常简单。
我无意中发现，在 Artalk 的管理后台的 `前端配置` 中 `无评论显示文字` 可以插入 HTML 代码。
不知道这是开发者的有意或无意，让这一个需要 JS 侵入性实现的功能变得简单。
感谢我的灵机一动。

### 方法

打开 Artalk 管理后台，找到 `前端配置` 再找到 `无评论显示文字`：
输入：

```html
<img alt="今日诗词" src="https://v2.jinrishici.com/one.svg?font-size=22&color=LightSlateGray">
```

如图所示：

![](/assets/images/posts/2023/07/no_comment_text.png)

API 来自 [今日诗词](https://www.jinrishici.com/)：

>9. 图片形式调用

- <https://www.jinrishici.com/doc/#image>

需要注意的是，颜色目前只接收英文单词， [查看所有颜色英文单词](https://www.w3school.com.cn/cssref/css_colors.asp)。目前有 140 种颜色被浏览器支持。

### 技巧

为什么选中 `LightSlateGray` 作为文字的颜色呢？
我发现在其他博客引用了我的 Memos 时，他们的博客有 `明` 、`暗` 等多种配色。
API 默认的颜色，在他们的网页上要么太突兀，要么看不清。
我自己试了好几个颜色，显示结果都不太满意，然后我就问了一下 ChatGPT。

> 什么颜色的文字能同时在 #22272e 和 #FFFFFF 这两种背景色下都能优雅的显示，要求这种颜色必须具备浏览能识别的英文名称

![](/assets/images/posts/2023/07/chatgpt_for_artalk_no_comment_color.png)

为什么要以 `#22272e` 作为暗黑模式的代表色呢？它是 GitHub Dimmed 的背景色。

现在的结果虽然不完美，但是能用了。
低代码实现了这一功能。没有 JS 侵入网页。不用单独写 CSS 兼容。

### 其他

我在很多很多我能参与到的网页或应用中都嵌入了今日诗词的 API。是不是会有装逼的嫌疑，我反省了一下，我觉得不是，因为我每刷新的一句诗，我都会默读一下。