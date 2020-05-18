---
title: "Typecho 迁移到 Hugo"
categories: ["代码"]
tags: ["hugo","blog","Typecho","博客"]
slug: "typecho-to-hugo"
draft: false
date: 2020-05-13T03:32:44+08:00
---

记录一下从 Typecho 迁移到 Hugo 的过程。  
主要是折腾的URL，也就是 slug 和导入评论到 Disqus 的过程。

因为迁移文章时**必须**保留以前文章的 URL，不然会对自己产生很多不良的影响。

### 一、Typecho 导出文章

我 Fork 了一份 PHP 脚本，进行了一些修改，适合于像我这种链接形式为： `https://example.com + slug` 的博客进行导出。这样导出的 Markdown 博文，会在 Front matter 里添加 `slug` 值，以利于后续设置。

脚本地址：
> [https://github.com/eallion/typecho-to-hugo](https://github.com/eallion/typecho-to-hugo)

**注意：** 这并不是一个 Typecho 插件！

用法：
1. clone 或 下载 [master.zip](https://github.com/eallion/typecho-to-hugo/archive/master.zip)
2. 修改 convert.php 中的 mysql 账号密码（第3行）
```
$db->connect('localhost','root','password','typecho');
```
3. 将 convert.php 上传到网站目录下
4. 通过浏览器访问 `htttps://www.example.com/convert.php` 即可导出 Hugo 所需要的格式了。
5. 所有文章会在网站根目录，批量复制到 Hugo 即可。

### 二、Hugo 配置

Hugo 根目录的 `config.toml` 需要修改一下链接形式。（每个主题可能有所区别）
```
[permalinks]
  posts = "/:slug/" #修改这行为自己需要的形式
```
然后文章的 Front matter 里需定义 slug ，如：
![](https://cdn.jsdelivr.net/gh/eallion/eallion.github.io@master/images/2020/05/typechotohugo.png)

### 三、导入评论

目前有很多套博客评论解决方案，如：Valine、Disqus、Gitalk 等，
我的选择是 Disqus， 并用了 [DisqusJS](https://github.com/SukkaW/DisqusJS) 这个 API。

> **思路**：利用 WordPress 中转是踩坑之后的最佳解决方案。


#### 3.1 从 Typecho 导出 WordPress 格式的数据

[TypExport](https://www.bilibili.com/video/BV1xC4y1W7qd) 已年久失修。我找到了 [ByeTyp](https://github.com/sunxiyuan/ByeTyp) 并 Fork 了一份。

链接地址：[https://github.com/eallion/ByeTyp](https://github.com/eallion/ByeTyp)

用法：
下载插件 [master.zip](https://github.com/eallion/ByeTyp/archive/master.zip) 解压，把目录名字改为 `ByeTyp` 然后上传至 Typecho 的插件目录，到 Typecho 后台启用插件，依次点击：控制台->数据导出->导出XML文件，下载并保存此文件。

#### 3.2 导入数据到 WordPress 

在 WordPress 上运行 WordPress 导入工具，导入前面下载的 XML 文件。
依次点击：`控制台` -> `工具` -> `导入` -> `WordPress` -> `运行导入器`（若没有则安装导入器）
然后选择前面下载的 XML 文件导入即可。文章比较多的话，需要多试几次。

#### 3.3 安装 Disqus 插件

在 WordPress 里安装 [Disqus 官方插件](https://WordPress.org/plugins/disqus-comment-system/)，可直接在 WordPress 插件市场搜索安装。

#### 3.4 同步评论到 Disqus

在 WordPress 里激活 Disqus 插件后，按提示配置 Disqus ，如果是在线服务器的话，可以直接配置，如果是本地测试环境的话，需要手动配置。  
配置成功后，点击 `Syncing` 标签，点击 `Import` 下面的 `Import Comments`，然后会出现 `Sending to Disqus...` 等待完成即可。

#### 3.5 其他

如果导出导入数据的时候用了其他的临时子域名之类的，到 Disqus 后台的 `Community` -> `Migration Tools` -> `Domian Migration Tool` -> `Start domain migration tool` 中修改域名。  
如果修改 URL 则是用 URL map 功能映射。具体细节可以看官方文档 [URL Mapper](https://help.disqus.com/en/articles/1717129-url-mapper)。

感谢：
- [linx](https://llinx.me/post/typecho%E8%BF%81%E7%A7%BB%E5%88%B0hugo/)
- [qianlongzt](https://github.com/qianlongzt/typecho-to-hugo)
- [panxianhai](https://github.com/panxianhai/TypExport)
- [sunxiyuan](https://github.com/sunxiyuan/ByeTyp)