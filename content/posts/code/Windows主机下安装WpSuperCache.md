---
title: "Windows主机下安装WpSuperCache"
categories: ["日志","分享"]
tags: ["Window主机"]
draft: false
slug: "windows-wp-super-cache"
date: "2010-08-07 17:09:32"
---

如果只是简单的下载后启用该插件会发现其管理后台是一片空白。稍微做一些改动就好了。
1、首先下载Super Cache，解压到目录“/wp-content/plugins/wp-super-cache/”。
2、复制文件“/wp-content/plugins/wp-super-cache/wp-cache-phase1.php” 为 “/wp-content/advanced-cache.php”。
3、打开文件“/wp-content/plugins/wp-super-cache/wp-cache.php”查找如下代码：
<blockquote>
function wp_cache_check_link() {
global $wp_cache_link, $wp_cache_file;
</blockquote>
替换为：
<blockquote>
function wp_cache_check_link() {
global $wp_cache_link, $wp_cache_file;
if ( file_exists($wp_cache_link) )
return true;
else {
echo "advanced-cache.php does not exist";
echo "Create it by copying $wp_cache_file to $wp_cache_link on your server";
return false;
}
</blockquote>
4、到管理后台配置启用“Super Cache”插件。到插件的设置页会发现仍是空白。
5、打开“/wp-content/wp-cache-config.php”查找“WPCACHEHOME” ，将那一行改正确。例如：
<blockquote>
define( 'WPCACHEHOME', ABSPATH . C:/Apache/htdocs/ WordPress /wp-content/plugins/wp-super-cache/" );
</blockquote>
改成：
<blockquote>
define( 'WPCACHEHOME', "C:/Apache/htdocs/ WordPress /wp-content/plugins/wp-super-cache/" );
</blockquote>
6、在管理后台配置生成Rewrite的规则。如果是Apache直接用其生成的.htaccess即可；如果是IIS则需要使用第三方的ISAPI Rewrite插件例如ISAPI_Rewrite 3.0，然后把Rewrite规则copy到插件的配置项中。
7、可以不使用Super Cache的压缩功能，而用Apache和IIS自身的GZIP功能。
8、看Super Cache是否起作用。查看输出的页面的源文件末尾，第一次输出的时候有“Dynamic Page Served (once) in X.XXXXX seconds”字样，再刷新输出的时候如果有“Cached page served by WP-Super-Cache”字样就表明是WP-Cache起的作用，如果有“super cache”字样就表明是Super Cache起的作用。同时查看目录“wp-content/cache/supercache”会发现有生成的静态文件。
另：在Super Cache管理后台看到的“WP-Super-Cache”的“cached pages”不知为何并不准确，被除以2了。可以在“wp-cache.php”中将其改回，查找
<blockquote>
intval($sizes['cached']/2)
</blockquote>
改成
<blockquote>
intval($sizes['cached'])
</blockquote>

即可。对于“expired pages”也同样处理。
附：ISAPI_Rewrite所用的httpd.conf配置文件：
<blockquote>
# Helicon ISAPI_Rewrite configuration file
# Version 3.1.0.56
RewriteEngine On
RewriteBase /
RewriteCond %{HTTP_HOST} ^blog.bluesky.cn$
#RewriteCond %{REQUEST_URI} !^.*[^/]$
RewriteCond %{REQUEST_URI} !^.*//.*$
RewriteCond %{REQUEST_METHOD} !=POST
RewriteCond %{QUERY_STRING} !.*=.*
RewriteCond %{HTTP:Cookie} !^.*(comment_author_| WordPress |wp-postpass_).*$
RewriteCond %{DOCUMENT_ROOT}/wp-content/cache/supercache/%{HTTP_HOST}/$1/index.html -f
RewriteRule ^(.*) /wp-content/cache/supercache/%{HTTP_HOST}/$1/index.html [L]
RewriteCond %{HTTP_HOST} ^yourdomain.com$
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</blockquote>
由于用的是免费版，这里指定HTTP_HOST让它只作用于域名“yourdomain.com”的站点上。

