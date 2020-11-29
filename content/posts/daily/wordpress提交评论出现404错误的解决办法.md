---
title: "WordPress 提交评论出现404错误的解决办法"
categories: ["日志"]
tags: ["提交评论"]
draft: false
slug: "WordPress-comment-404"
date: "2010-07-21 15:40:25"
---

<p>本博客的评论重新启动<br />
<br />
坦白的说<br />
中间这一段时间并不是我有意关闭了评论<br />
我也是很无奈啊<br />
莫名其妙的就不能提交评论了<br />
从来没遇到过这样的情况<br />
又没有时间去排查情况<br />
既然不能提交评论索性我就把它给关了<br />
<br />
今天无意在本地测试了一下 WordPress 的一个功能<br />
配置好localhost环境<br />
新建Mysql之后在各个数据表间大概浏览了一下<br />
也没注意里面的情况就退出来了<br />
（包括出问题的wp_comments也没仔细查看）<br />
然后我就下载了服务器上的数据库导入到localhost<br />
发现导入到一半的时候出现1054错误<br />
<blockquote>#1054 – Unknown column ‘comment_favicon_url’ in ‘field list’<br />
</blockquote>
然后我再到我服务器上的phpmyadmin里面检查了一下wp_commnets表<br />
这里面居然比健康的数据表多出comment_favicon_url这个字段<br />
备份数据库之后毫不犹豫的删除它<br />
然后……<br />
博客评论功能完好如初了<br />
<br />
分析原因之后<br />
可能导致wp_commnets里多出comment_favicon_url是因为装了某个插件<br />
插件卸载之后数据库却不会自动清理<br />
所以好长一段时间里面的我博客都不能评论<br />
我还因此沮丧过好长时间<br />
明明很多的点击率却没人留言<br />
原来是不能提交留言啊<br />
很杯具<br />
这教育我们不要随便装卸插件是对的<br /></p>
