---
authors:
- eallion
categories:
- 日志
date: '2011-01-14 11:11:26'
draft: false
lastmod: '2011-01-14 11:11:26'
slug: type-final-echo
summary: 博客在经历主机故障后完成重建，核心功能已部署完毕，包括评论邮件提醒、自动备份、代码高亮等 14 个插件，并保留验证码等 3 个未激活插件。模板基于九尾博客的
  9ve-05 进行深度改造，CSS 过半重写。相册页面采用两种外部图片方案以减轻主机负载，同时集成了朋友的山贼专栏和个人导航页。全站放弃 IE6 兼容但保持基础显示，整体风格简洁实用！
tags:
- 博客
- 插件
- typecho
title: 博客趋于稳定
---
因为前几天主机空间老是出故障
到今天才把博客弄好
差不多没有什么再要弄的了
就这样子吧
该弄的都弄了
再去模仿几个 wp 上的小品插件就可以了
比如显示评论者的浏览器操作系统什么的

博客启用了下列插件：
AjaxComments - Typecho 内置嵌套评论專用
AutoBackup - Typecho 自动备份插件
CommentFilter - 评论过滤器
CommentToMail - 评论回复邮件提醒插件
Dewplayer - 小巧的 mp3 播放器，在编辑器代码模式下使用
Google Code Prettify - Google 高亮代码
HighSlide - 使用最新 HighSlide 全功能内核自动替换图片链接
JustArchives - 日志归档插件
Magike Editor - 简易编辑器，从 Magike 移植过来的
MiniPlay1g1g-1g1g 迷你播放器，集搜索 & 输出 & 歌词显示功能
RandomArticleList- 随机显示文章列表
Sitemap- 为博客生成 sitemap 文件。
Smilies- 评论表情及贴图
Stat - 页面浏览次数统计插件

上传但未激活的插件：
Typecho Captcha- 验证码插件
Links - 友情链接插件
tinyMCE Editor - 集成 tinyMCE 编辑器

<strong > 模板 </strong > 是用的 [九尾博客](http://justs.me/) 的 9ve-05
但是原模板已经比较老了
里面被我换掉了好多东西
有几个板块甚至完全是我自己重新写的
而且 CSS 里面自己也改了一半以上的吧
暂时就定下来用这个吧
基调是原模板的样子
感谢原模板作者 [九尾博客](http://justs.me/)

博客启用了 < strong > 相册 </strong > 页面
这真是一个可有可无的页面
相册用到了两种实现方式
一种是 [木木木木木](http://immmmm.com/latest-flickr-pictures-show.html) 这里提到的
一种是用了 [羽中](http://www.jzwalk.com/archives/net/highslide-for-typecho) 的 HighSlide 插件集成的相册功能
两种方法切换着在用
在看哪种方法更好一些
不过两种相册都不会用到本地图片
这大大的减小了主机的负担

导航页面还有一个 [山寨版山贼 </strong>](http://eallion.com/category/sz/)
这是我一个朋友的页面
是一个文艺小青年
又帅又多金又靠谱反正各种好
他会偶尔来更新几篇博客的
欢迎大家随时来喷他

[个人导航 </strong>](http://t.eallion.com/) 页面完全是做的站外链接
其中微博是我的个人微博
这个微博用的是 [PageCookery](http://www.pagecookery.com/) 程序
它几乎记录了我从开启那个微博以来所有 post 到网上各处的文字……
鬼知道我当初是怎么想的
也许是想记录给我的子子孙孙看吧

<strong > 个人导航 </strong > 用到了我另外一个闲置的空间
索性就用来放一些自己用的外链图片，mp3，文件什么的
那个主页上收集的都是我自己经常会去逛的网站
我比较懒，不爱输网址，我喜欢点点鼠标的便捷

另外还有就是到各个博客里面去偷了一些东西
在此就一并向你们表示感谢

PS：本博客已经完全没考虑要兼容 IE6。
但是本博客也没有一些很炫的特效，所以 IE6 下的显示效果也不是太烂。