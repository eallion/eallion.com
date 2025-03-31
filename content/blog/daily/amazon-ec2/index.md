---
authors:
- eallion
categories:
- 日志
date: '2012-03-27 09:15:00'
draft: false
lastmod: '2012-03-27 09:15:00'
slug: amazon-ec2
summary: 亚马逊EC2提供一年免费VPS体验，注册需外币信用卡，扣款后会返还。可用淘宝虚拟信用卡注册。免费套餐需选micro类型。创建实例时可选用优化好的AMI或自选系统如Ubuntu
  11.10。用LNMP一键包搭建了环境，未来可能用来建站。附EC2教程链接供参考。
tags:
- amazon
- ec2
- vps
- vpn
- 免费
title: Amazon EC2
---

最近注册了一个亚马逊 EC2 VPS
可以免费体验一年

注册地址：[http://aws.amazon.com/](http://aws.amazon.com/)
需要有一张可以付款的外币信用卡
先扣钱，钱会再还给你，国外很多这种免费机制
也可以去淘宝买一张虚拟信用卡
天啦，虚拟信用卡都有。。。

这里有关于 EC2 比较全面的教程
[http://www.bityun.com/archives/tag/ec2](http://www.bityun.com/archives/tag/ec2)
教程比较老了，将就着看一下
我相信经常折腾网站的人
操作这个 EC2 不是什么难事
注意一点就是要选择里面的 micro
这个套餐才是免费一年的

建立 Instance 实例的时候
可以选择别人优化好的 AMI
但我选择的系统是 Ubuntu 11.10 64bit quike start
所以里面都是我自己配置的

用了 [LNMP 一键安装包](http://lnmp.org) 搭建了个 LNMP 环境
将来哪天说不定可以在上面建个站