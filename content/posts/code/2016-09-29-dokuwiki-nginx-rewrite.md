---
title: "Dokuwiki Nginx 伪静态"
images: ["/assets/images/og/dokuwiki-nginx-rewrite.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["nginx","doku","dokuwiki","rewrite"]
draft: false
slug: "dokuwiki-nginx-rewrite"
summary: "这篇文章介绍了关于DokuWiki使用Nginx实现伪静态的方法。作者分享了如何配置Nginx服务器以支持DokuWiki，并将其设置为使用伪静态URL，以提高网站的性能和搜索引擎优化。文章讨论了Nginx的配置文件中需要进行的更改，并提供了具体的代码示例和步骤。通过使用这种伪静态设置，读者可以加速他们的DokuWiki网站，提高用户体验和网站的可见性。"
date: "2016-09-29 19:25:00"
lastmod: "2016-09-29 19:25:00"
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
