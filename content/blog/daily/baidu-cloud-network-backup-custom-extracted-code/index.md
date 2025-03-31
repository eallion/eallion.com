---
authors:
- eallion
categories:
- 日志
date: '2016-09-24 12:52:00'
draft: false
lastmod: '2016-09-24 12:52:00'
slug: baidu-cloud-network-backup-custom-extracted-code
summary: 百度云盘网页版可通过开发者工具自定义私密链接密码。操作步骤：选中文件点击分享，按F12打开控制台粘贴指定代码，创建私密链接时会弹出密码输入框。密码需严格限制为4个字符（1个汉字=3字符，可混合字母数字），例如"LAOD"或"帅B"。注意必须按顺序操作，否则可能失败。
tags:
- 百度
- 百度云网盘
- 网盘
- 提取码
title: 百度云网盘自定义提取码
---

在浏览器中打开百度云盘，选中需要分享的文件，然后点击分享按钮；

点击分享按钮后会弹出一个模态框，先不管它，按 F12 打开开发者工具，切换至控制台（Console），将以下代码复制粘贴到控制台，然后回车；

`javascript:require (["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword=function (){return prompt (" 老 D 的自定义百度网盘提取码 ","laod")}`

然后点击创建私密链接，会弹出输入框，这时输入你想自定义的密码即可！

在此黑科技使用过程中需要注意以下事项：

请按照教程一步一步的进行，否则可能会出现错误或失败！

自定义的密码字符和必须为 4（一个字母或数字的字符数是 1，一个汉字的字符数是 3，因此如果密码中有一个汉字则只能加一个字母或数字），如：LAOD、1111、帅 B、老 D 等。