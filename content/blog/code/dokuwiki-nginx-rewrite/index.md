---
authors:
- eallion
categories:
- 代码
date: '2016-09-29 19:25:00'
draft: false
lastmod: '2016-09-29 19:25:00'
slug: dokuwiki-nginx-rewrite
summary: 这段 Nginx 配置实现了 URL 重写功能，将媒体文件请求重定向到 fetch.php，详情页请求转向 detail.php，导出请求映射到
  export 处理器，并确保所有不存在的文件请求都交由 doku.php 处理，同时处理根路径的默认访问！
tags:
- nginx
- doku
- dokuwiki
- rewrite
title: Dokuwiki Nginx 伪静态
---
```nginx
rewrite ^(/)_media/(.*) $1lib/exe/fetch.php?media=$2 last;
rewrite ^(/)_detail/(.*) $1lib/exe/detail.php?media=$2 last;
rewrite ^(/)_export/([^/]+)/(.*) $1doku.php?do=export_$2&id=$3 last;
location /
    {
        if (!-f $request_filename)
        {
            rewrite ^(/)(.*)?(.*)  $1doku.php?id=$2&$3 last;
            rewrite ^(/)$ $1doku.php last;
        }
    }
```