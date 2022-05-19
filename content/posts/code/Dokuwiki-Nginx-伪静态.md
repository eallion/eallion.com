---
title: "Dokuwiki Nginx 伪静态"
categories: ["代码"]
tags: ["nginx","doku","dokuwiki","rewrite"]
draft: false
Comments: true
slug: "dokuwiki-nginx-rewrite"
date: "2016-09-29 19:25:00"
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

