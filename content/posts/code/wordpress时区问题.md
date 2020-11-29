---
title: "WordPress 时区问题"
categories: ["日志","分享"]
tags: ["WordPress 时区","时区"]
draft: false
slug: "WordPress_timezone"
date: "2010-05-01 06:21:11"
---

<p>解决方法一：<br />
 在php.ini里加入：<br />
 <blockquote>date.timezone = “Asia/Shanghai”</blockquote></p>

<p>解决方法二：<br />
 在 /wp/wp-includes/functions.php 里相对应函数里加入：<br />
 <blockquote>date_default_timezone_set(‘Asia/Shanghai’);</blockquote></p>

<p>解决方法三：<br />
 在 wp-config.php 里加入：<br />
 <blockquote>date_default_timezone_set(‘Asia/Shanghai’);</blockquote></p>

<p>友情提示：复制时请注意把符号改为英文状态下的符号。</p>
