---
title: "多说 CSS 分享"
images: ["/assets/images/og/share-duoshuo-css.png"]
authors: ["eallion"]
categories: ["代码"]
tags: ["多说","css","样式"]
draft: false
slug: "share-duoshuo-css"
date: "2015-01-12 10:07:00"
lastmod: "2015-01-12 10:07:00"
---

出色的自定义效果展示：

设计达人：[http://www.shejidaren.com/use-css3-to-create-a-beautiful-comment-ui.html](http://www.shejidaren.com/use-css3-to-create-a-beautiful-comment-ui.html)
罗磊的独立博客：[http://luolei.org/2012/08/duoshuo-css](http://luolei.org/2012/08/duoshuo-css)
V 说：[http://www.vsay.cn/one-more-custom-css-lets-you-say-comments-city.html](http://www.vsay.cn/one-more-custom-css-lets-you-say-comments-city.html)
沈超飞的 IT 博客：[http://shenchaofei.cn/duoshuo-comment-box-css-custom/328.html](http://shenchaofei.cn/duoshuo-comment-box-css-custom/328.html)

```css
#ds-thread .ds-powered-by {font-size: 0px !important; padding: 0; }
#ds-thread #ds-reset ul.ds-comments-tabs li.ds-tab a.ds-current {border:0px;color:#fff;text-shadow:none;background:#6cbfee}
#ds-thread #ds-reset .ds-highlight {font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:bold;color:#fff !important;}
#ds-thread #ds-reset li.ds-tab a.ds-current {background:none;border:none;}
#ds-thread #ds-reset .ds-sort {display:none;}

#ds-thread {padding-left:30px;}
#ds-thread #ds-reset li.ds-post,#ds-thread #ds-reset #ds-hot-posts {overflow:visible}
#ds-thread #ds-reset .ds-post-self {padding:10px 0 10px 10px;}
#ds-thread #ds-reset li.ds-post,#ds-thread #ds-reset .ds-post-self {border:0 !important;}
#ds-reset .ds-avatar, #ds-thread #ds-reset ul.ds-children .ds-avatar {position:absolute;top:26px;left:-14px;padding:5px;width:36px;height:36px;box-shadow:-1px 0 1px rgba (0,0,0,.15) inset;border-radius:46px; background:#AFDCF8;}
#ds-thread #ds-reset ul.ds-children .ds-avatar {left:-23px;}
#ds-thread .ds-avatar a {display:inline-block;padding:1px; width:32px;height:32px;border:1px solid #6cbfee;border-radius:50%; background-color:#fff !important}
#ds-thread .ds-avatar a:hover {border-color:#fff}
#ds-thread .ds-avatar &gt; img {margin:2px 0 0 2px}
#ds-thread #ds-reset .ds-replybox {box-shadow:none;}
#ds-thread #ds-reset ul.ds-children .ds-replybox.ds-inline-replybox a.ds-avatar,
#ds-reset .ds-replybox.ds-inline-replybox a.ds-avatar {left: 0;top: 0; padding: 0;width: 32px !important;height: 32px !important; background: none;box-shadow: none; } 
#ds-reset .ds-replybox.ds-inline-replybox a.ds-avatar img {width: 32px !important;height: 32px !important; border-radius:50%;} 
#ds-reset .ds-replybox a.ds-avatar,
#ds-reset .ds-replybox .ds-avatar img { padding:0;width:50px !important;height:50px !important; border-radius:5px; }
#ds-reset .ds-avatar img {width:32px !important;height:32px !important;border-radius:32px;box-shadow:0 1px 3px rgba (0, 0, 0, 0.22);
                            -webkit-transition:.4s all ease-in-out;-moz-transition:.4s all ease-in-out;-o-transition:.4s all ease-in-out;-ms-transition:.4s all ease-in-out;transition:.4s all ease-in-out;
                            }
.ds-post-self:hover .ds-avatar img {-webkit-transform:rotate (360deg);-moz-transform:rotate (360deg);-o-transform:rotate (360deg);-ms-transform:rotate (360deg);transform:rotate (360deg);}

#ds-thread #ds-reset .ds-comment-body {background:#6cbfee;padding:15px 15px 12px 32px;border-radius:5px; box-shadow:0 1px 2px rgba (0,0,0,.15), 0 1px 0 rgba (255,255,255,.75) inset;}

#ds-thread #ds-reset .ds-comment-body p {color:#fff;}
#ds-thread #ds-reset .ds-comment-body a {color:#fff;}
#ds-thread #ds-reset .ds-comment-body a:hover {color:#fff;}
#ds-thread #ds-reset    .ds-time {color:#fff;}
#ds-thread #ds-reset .ds-comments a.ds-user-name {font-weight:bold;color:#fff !important;}
#ds-thread #ds-reset .ds-comments a.ds-user-name:hover {color:#fff !important;}
#ds-thread #ds-reset .ds-sync {display:none !important;}
#ds-thread#ds-reset    { border-radius: 5px;}

#ds-thread #ds-reset #ds-hot-posts {border:0}
#ds-reset #ds-hot-posts .ds-gradient-bg {background:none;}
#ds-reset #ds-bubble {display:none;}

#ds-recent-comments .ds-avatar {font-size:16px;color: #fff !important;}
#ds-recent-comments .ds-meta {font-size:16px;color: #fff !important;}
#ds-recent-comments .ds-thread-title  {color: #fff !important;}
#ds-recent-comments .ds-time {color: #fff !important;}
#ds-recent-comments .ds-excerpt {font-size:16px;color: #fff !important;}
```
