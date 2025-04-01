---
authors:
- eallion
categories:
- 日志
date: '2015-01-19 15:46:00'
draft: false
lastmod: '2015-01-19 15:46:00'
slug: taoquan-for-wireless
summary: 淘宝天猫优惠券链接无法直接在无线端后台使用，系统会提示非淘内链接。目前解决方案是复制 PC 端链接中的 sellerId 和 activityId
  参数，替换到移动端专用链接格式即可。该方法于 2015 年 1 月 19 日验证有效！
tags:
- 链接
- 淘宝
- 天猫
- 运营小记
- 优惠券
title: 运营小记 - 无线端优惠券链接
---
淘宝 / 天猫生成的优惠券链接，不能在无线端后台装修的时候使用，会提示链接不是淘内链接。
暂时可用的方法：

1、复制 PC 端优惠券链接：[http://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=xxxxxxxxxx&activityId=xxxxxxxxx](http://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=xxxxxxxxxx&activityId=xxxxxxxxx)
2、保留 sellerID 和 activityID，替换掉前面的网址：[http://shop.m.taobao.com/shop/coupon.htm?activity_id=xxxxxxxxx&seller_id=xxxxxxxxxx](http://shop.m.taobao.com/shop/coupon.htm?activity_id=xxxxxxxxx&seller_id=xxxxxxxxxx)

2015 年 1 月 19 日测试可用