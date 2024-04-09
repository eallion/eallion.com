---
title: "对博客的小改动"
# images: ["/assets/images/og/changlogs.png"]
authors: ["eallion"]
categories: ["日志"]
tags: ["博客","小记","改动","优化","代码"]
draft: false
slug: "changlogs"
summary: "这篇文章介绍了作者对博客的一些小改动。作者考虑将博客的评论系统换成“多说”或者“友言”，但由于原有评论显示的问题，作者最终决定使用“多说”。作者还对代码进行了简单优化，并在IE6、7、8浏览器中对“多说”和“友言”的CSS进行了本地化处理。此外，作者还提到了博客主页的图片轮播、文章关联插件“友荐”以及博客的“每日一句”等功能。"
date: "2012-04-22 00:36:11"
lastmod: "2012-04-22 00:36:11"
---

一直在犹豫
是不是要把博客的评论
换成 “多说” 或者 “友言”
一旦换掉
原来的已有评论可就不好显示了
所以左右为难

不过经过好多天的考虑
最终我决定用 “多说” 评论的通用代码

 WordPress 可以直接用 “多说” 插件
其他的程序可要自己调用通过代码了
[http://blog.duoshuo.com/2012/03/custom-release-candidate/](http://blog.duoshuo.com/2012/03/custom-release-candidate/)
然后再对代码做一些简单的优化
我还把 js 下载下来本地化了

多说和友言的 CSS 在 IE6、7、8 下
均有兼容性问题
对我这样有洁癖的人来说
肯定不可忍受
先换回原来的
再研究一下 CSS 了再换上

另一个就是主页在去年就已经改成图片轮播了
当初的想法是自己拍一些好的照片
定期换上来
不过现在折腾博客比较少了
到现在博客的主页上还是插件自带的几张图
而且这个轮播插件不对 IE6 兼容
我倒是用了一个很笨拙的方法
用代码检测浏览器
如果是 IE6 访问
就不显示插件而只显示一张图片
[羽中](http://www.jzwalk.com) 同学说这个插件在 firefox3 下显示为一片空白
这个我就没办法了
插件地址：[http://slidesjs.com/](http://slidesjs.com/)

博客还添加了一个文章关联插件 “友荐”
就是打开文章页
拖到最下面
会自动弹出 4 篇相关文章
只对文章页有效
过滤了首页和页面页
[http://www.ujian.cc/](http://www.ujian.cc/)

博客的 “每日一句”
是在模板里新建的一个 `function.php` 文件
以 PHP 的形式实现的
有兴趣的朋友可以模仿 verycd 的 title saying

博客用的图片特效是 Slimbox2
[冰剑](http://www.binjoo.net/) 同学发布有一个插件
我在插件的基础上改动了一些
还很好用的
[http://www.binjoo.net/2011/02/slimbox2-for-typecho/](http://www.binjoo.net/2011/02/slimbox2-for-typecho/)

音乐播放器集成的 [亦歌](http://www.1g1g.com)

其他一些基本信息：
<ul>
    <li>
        主机：[ 华域迅通 ](http://www.vosent.com/)
    </li>
    <li>
        程序：[Typecho](http://typecho.org)
    </li>
    <li>
        主题：[NeoWin](http://www.taiku.net/archives/neowin-for-typecho.html)
    </li>
    <li>
        导航：[ 蜗牛个人导航 ](http://s.eallion.com/)
    </li>
    <li>
        微博：[ 蜗牛的卢浮宫 ](http://t.eallion.com/)
    </li>
    <li>
        相册：[Qc eallion Gallery](http://tu.eallion.com/)
    </li>
    <li>
        小说：[ 指间的信仰 ](http://book.eallion.com/)
    </li>
</ul>
