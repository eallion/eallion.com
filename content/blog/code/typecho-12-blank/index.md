---
authors:
- eallion
categories:
- 代码
date: '2019-06-03 12:00:00'
draft: false
lastmod: '2019-06-03 12:00:00'
slug: typecho-12-blank
summary: 针对中文用户习惯新窗口打开链接的需求，提供了两种 Typecho 实现方案。方法一直接修改系统文件 var/HyperDown.php，但不利于升级。推荐方法二通过主题
  functions.php 添加正则替换代码，并调整 post.php 输出逻辑，无需修改核心文件且兼容性更好。
tags:
- typecho
- 代码
- php
- 新窗口
- blank
title: typecho1.2 (18.10.23) 新窗口打开链接
---
本博客主要是面向亚洲访客，简体中文访客。而中文用户是习惯于新窗口打开链接，所以我修改了一下代码。

> 推荐方法二

### 方法一

网上搜索出来的关于 typecho 新窗口打开链接的文章，都是 1.1 或者是 1.0 甚至是更老的版
对于 git 安装的最新版没效果
自己动手研究一下，发现可以修改 `var/HyperDown.php` 这个文件可以实现
大概是第 507 行，添加 `target=\"_blank\"rel=\"nofollow\"` 即可
效果如下：

```php
        //link
        $text = preg_replace_callback (
            "/\[((?:[^\]]|\\\\\]|\\\\\[)+?)\]\(((?:[^\)]|\\\\\)|\\\\\()+?)\)/",
            function ($matches) use ($self) {
                $escaped = $self->parseInline (
                    $self->escapeBracket ($matches [1]),  '',  false, false
                );
                $url = $self->escapeBracket ($matches [2]);
                $url = $self->cleanUrl ($url);
                return $self->makeHolder ("<a href=\"{$url}\"target=\"_blank\"rel=\"nofollow\">{$escaped}</a>");
            },
            $text
        );
```

### 方法二：（不修改系统文件，利于升级）

在主题 `functions.php` 里加入代码：

```php
// 新窗口打开链接
function parseContent ($obj){
    $options = Typecho_Widget::widget ('Widget_Options');
    if (!empty ($options->src_add) && !empty ($options->cdn_add)){
        $obj->content = str_ireplace ($options->src_add,$options->cdn_add,$obj->content);
    }
    $obj->content = preg_replace ("/<a href=\"([^\"]*)\">/i","<a href=\"\\1\" target=\"_blank\" rel=\"nofollow\">", $obj->content);
    echo trim ($obj->content);
}
```

再在主题 `post.php` 里把文章输出的代码改为自定义的，即：
`<?php $this->content (); ?>` 改成 `<?php parseContent ($this); ?>`