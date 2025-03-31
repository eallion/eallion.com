---
authors:
- eallion
categories:
- 代码
date: '2016-09-29 19:25:00'
draft: false
lastmod: '2016-09-29 19:25:00'
slug: dokuwiki-nginx-rewrite
summary: 这段Nginx配置主要处理URL重写规则。将类似`_media/`开头的请求转到`fetch.php`处理，`_detail/`的转到`detail.php`，`_export/`的转为`doku.php`的导出操作。根路径下如果文件不存在，则把请求重定向到`doku.php`，
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