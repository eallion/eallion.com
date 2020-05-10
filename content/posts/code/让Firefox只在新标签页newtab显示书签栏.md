---
title: "让Firefox只在新标签页newtab显示书签栏"
categories: ["代码"]
tags: ["google","css","Firefox","书签","新标签页","newtab","bookmark"]
draft: false
slug: "only-show-bookmark-in-newtab-in-firefox"
date: "2019-05-19 00:45:00"
---

因工作原因，除了主浏览器Chrome会用到多浏览器，常用的第二、三选择是Firefox和Yandex。
但是Firefox的书签栏是继承全局设置的，关掉书签栏后新标签页也不会显示了。
Google一番后，发现可以通过自定义CSS来实现这一功能。

打开本地Firefox配置文件的目录：
```bash
%userprofile%\AppData\Roaming\Mozilla\Firefox\Profiles
```
这里面有一个或多个目录，找到自己账号对应的目录，
如：
```bash
imaniceman123.default
```
进入这个目录，新建一个目录：
```bash
chrome
```
在 `chrome` 这个新目录下新建一个文件 `userChrome.css` ，输入以下内容：

```css
#main-window #PersonalToolbar {
  visibility: collapse !important;
}

#main-window[title^="无标题页"] #PersonalToolbar,
#main-window[title^="about:home"] #PersonalToolbar,
#main-window[title^="about:blank"] #PersonalToolbar,
#main-window[title^="about:newtab"] #PersonalToolbar,
#main-window[title^="New Tab"] #PersonalToolbar,
#main-window[title^="Nightly"] #PersonalToolbar,
#main-window[title^="Mozilla Firefox"] #PersonalToolbar,
#main-window[title^="Firefox"] #PersonalToolbar,
#main-window[title^="新标签页"] #PersonalToolbar,
#main-window[title^="新标签页 - Nightly"] #PersonalToolbar,
#main-window[title^="Firefox Developer Edition"] #PersonalToolbar
#main-window[title^="Customize Firefox"] #PersonalToolbar {
  visibility: visible !important;
}
```
然后在Firefox浏览器的选项里打开显示书签栏。

> PS：
  
如果你能准确的找到你自己的新标签页的 `title` ，上面这段代码可以简化。  
比如我的新标签页叫“无标题页”：
```css
#main-window #PersonalToolbar {
  visibility: collapse !important;
}

#main-window[title^="无标题页"] #PersonalToolbar {
  visibility: visible !important;
}
```

> 解释：  

这段CSS样式的意思是：在选项里是全局打开书签栏的，然后用自定义CSS隐藏了书签栏，但在特定的 `title` 页（如：新标签页）显示书签栏。

*Firefox 65版本以上亲测有效，低版本应该也可以。
