---
title: "让 Firefox 只在新标签页 newtab 显示书签栏"
images: ["https://api.eallion.com/og?title=%E8%AE%A9%20Firefox%20%E5%8F%AA%E5%9C%A8%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5%20newtab%20%E6%98%BE%E7%A4%BA%E4%B9%A6%E7%AD%BE%E6%A0%8F"]
authors: ["eallion"]
categories: ["代码"]
tags: ["google","css","Firefox","书签","新标签页","newtab","bookmark"]
draft: false
slug: "only-show-bookmark-in-newtab-in-firefox"
date: "2019-05-19 00:45:00"
lastmod: "2019-05-19 00:45:00"
---

### 更新 3

> 更新时间：2020.12.25

Firefox Developer Edition（开发者版）默认支持在新标签页打开书签栏。

![](https://images.eallion.com/images/2020/12/firefox-dev.png)

---

### 更新 2

> 更新时间：2020.12.24

最新版的 Firefox（84.0.1 (64 位)）提供了一个配置，可以修改此功能。

`browser.toolbars.bookmarks.visibility`

此配置有 3 个值：`always`、`nerver`、`newtab`。

即：总是显示书签、永不显示书签、仅在新标签页显示书签。

**修改方法：**

在 Firefox 地址栏输入 `about:config`，搜索 `browser.toolbars.bookmarks.visibility`，修改为 `newtab` 即可。

![](https://images.eallion.com/images/2020/12/firefox-newtab.png)

---

### 更新 1

> 更新时间：2019.09.22  
> 来自评论区：

Firefox 69 需要在 `about:config` 里将 `toolkit.legacyUserProfileCustomizations.stylesheets` 设置为 `ture` 才有效。
因为 Firefox 69 默认已经不加载 `userChrome.css` 了。

---

### 原文

> Firefox 65 版本亲测有效，低版本应该也可以。

因工作原因，除了主浏览器 Chrome 会用到多浏览器，常用的第二、三选择是 Firefox 和 Yandex。
但是 Firefox 的书签栏是继承全局设置的，关掉书签栏后新标签页也不会显示了。
Google 一番后，发现可以通过自定义 CSS 来实现这一功能。

打开本地 Firefox 配置文件的目录：

```bash
% userprofile%\AppData\Roaming\Mozilla\Firefox\Profiles
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
#main-window [title^="New Tab"] #PersonalToolbar {
  visibility: visible !important;
}
```

然后在 Firefox 浏览器的选项里打开显示书签栏。

其中，双引号中的 `"New Tab"` 就是新标签的标签名字，比如中文版 Firefox 可能新标签页的名字叫做：``新标签页``，那引号里的内容就需要改为自己 Firefox 新标签页对应的名字。

**解释：**

这段 CSS 样式的意思是：在选项里是全局打开书签栏的，然后用自定义 CSS 隐藏了书签栏，但在特定的 `title` 页（如：新标签页）显示书签栏。
