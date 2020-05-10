---
title: "fail2ban查看ip解BAN"
categories: ["嘀咕"]
tags: ["fail2ban查看ip解BAN"]
draft: false
slug: "fail2ban-view-ip"
date: "2017-03-22 19:38:00"
---

fail2ban查看ip：
`/usr/local/python/bin/fail2ban-client status ssh-iptables` 
解BAN：
`/usr/local/python/bin/fail2ban-client set ssh-iptables unbanip 1.2.3.4`
