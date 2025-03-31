---
authors:
- eallion
categories:
- 代码
date: 2021-07-22 21:23:55+08:00
draft: false
lastmod: 2021-07-22 21:23:55+08:00
slug: twikoo-slimbox
summary: Twikoo评论系统可通过`onCommentLoaded`API实现图片灯箱效果。开发者参考iMaeGoo的集成方案，将Slimbox2插件应用于博客评论图片。核心代码在评论加载完成后自动为图片包裹链接，并调用灯箱插件。具体实现是为`.
tags:
- blog
- code
- slimbox
- twikoo
- 备忘
title: Twikoo 集成 Slimbox2 灯箱插件
---

浏览 Twikoo 的开发者『[iMaeGoo](https://www.imaegoo.com/)』个人博客的时候，里面有一篇文章 [《集成 Twikoo 与 lightGallery 插件，实现评论图片的点击放大》](https://www.imaegoo.com/2021/twikoo-lightgallery/) 提到了 Twikoo 集成 lightGallery 灯箱插件。  

本博客使用的是 Slimbox2 灯箱插件，按照 iMaeGoo 的思路，利用 Twikoo 的 [API](https://twikoo.js.org/api.html#on-comment-loaded) `onCommentLoaded`，很方便的开启的评论的图片灯箱效果。  

主要代码是：  
@[eallion/eallion.com](https://github.com/eallion/eallion.com/blob/main/themes/hello-friend/layouts/partials/comments.html#L210-L216)

```html
<script>
    twikoo.init ({
        //envId: "eallion-###",
        //el: "#tcomment",
        //......
        onCommentLoaded: function () {
            $(".tk-content img:not (.tk-avatar-img)").each (function () {
                var _b = $("<a></a>").attr ("href", this.src);
                $(this).wrap (_b);
            })
            $(".tk-content a [rel!=link]:has (img)").slimbox ();
        }
    });
</script>
```

当 Twikoo 评论加载完成后，查找 Selector `.tk-content` 里面是否有图片，如果有图片，就为图片添加一个图片地址 `src` 本身的 `<a>` 标签超链接，同时排除 `.tk-avatar-img` 头像元素。  

此方法适合使用 [`Hello Friend`](https://github.com/panr/hugo-theme-hello-friend) 主题的站点使用，使用 Slimbox2 作为灯箱插件的站点也可参考。  

特此记录，备忘。  

> 本博客主要是在『[木木老师](https://immmmm.com/)』的二次开发的基础上再二次开发。因本人时间、精力、能力有限，没有完整的 ChangeLog ，修改过程并没有记录多少笔记，我都忘记改了些什么，现在就是让我自己复现我也做不到。起初我以为随便改改就能开始用了，没想到越改越多，越改越多，重构了很多破坏性的代码，代码越来越不友好。如果对本博客的代码或功能有需求的可以直接参考本博客完整的源码：[eallion/eallion.com](https://github.com/eallion/eallion.com)，当然直接问我我也会很乐意回答。