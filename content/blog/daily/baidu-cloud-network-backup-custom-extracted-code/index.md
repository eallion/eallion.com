---
title: "百度云网盘自定义提取码"
# images: ["/assets/images/og/baidu-cloud-network-backup-custom-extracted-code.png"]
authors: ["eallion"]
categories: ["日志"]
tags: ["百度","百度云网盘","网盘","提取码"]
draft: false
slug: "baidu-cloud-network-backup-custom-extracted-code"
summary: "这篇文章介绍了如何在百度云网盘中使用自定义提取码。在浏览器打开百度云盘后，选中需要分享的文件并点击分享按钮。现在打开开发者工具的控制台，将提供的代码粘贴到控制台中并按回车。然后点击创建私密链接，并在弹出的输入框中输入自定义的密码即可。需要注意的是，自定义密码只能由4个字符组成，可以是字母、数字或一个汉字加上一个字母或数字。"
date: "2016-09-24 12:52:00"
lastmod: "2016-09-24 12:52:00"
---

在浏览器中打开百度云盘，选中需要分享的文件，然后点击分享按钮；

点击分享按钮后会弹出一个模态框，先不管它，按 F12 打开开发者工具，切换至控制台（Console），将以下代码复制粘贴到控制台，然后回车；

`javascript:require (["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword=function (){return prompt (" 老 D 的自定义百度网盘提取码 ","laod")}`

然后点击创建私密链接，会弹出输入框，这时输入你想自定义的密码即可！

在此黑科技使用过程中需要注意以下事项：

请按照教程一步一步的进行，否则可能会出现错误或失败！

自定义的密码字符和必须为 4（一个字母或数字的字符数是 1，一个汉字的字符数是 3，因此如果密码中有一个汉字则只能加一个字母或数字），如：LAOD、1111、帅 B、老 D 等。
