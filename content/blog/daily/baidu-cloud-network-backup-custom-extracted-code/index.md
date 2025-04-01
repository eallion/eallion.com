---
authors:
- eallion
categories:
- 日志
date: '2016-09-24 12:52:00'
draft: false
lastmod: '2016-09-24 12:52:00'
slug: baidu-cloud-network-backup-custom-extracted-code
summary: 在浏览器中打开百度云盘文件并点击分享按钮，按 F12 进入开发者工具的控制台粘贴指定代码，即可自定义私密链接的提取码。密码须为 4 字符组合，如
  LAOD 或 帅 B，操作需严格遵循步骤以避免出错！
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