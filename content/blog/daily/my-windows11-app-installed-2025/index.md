---
authors:
- eallion
categories:
- 日志
date: 2025-01-26 17:45:44+08:00
draft: false
slug: win11-apps
summary: 在重装 Windows 11 系统的过程中，备份和记录当前使用的软件是一个重要步骤。通过 Scoop 和 Microsoft Store 安装的软件列表可以帮助了解日常使用的工具及其版本更新情况。这不仅有助于系统迁移，还能反映出软件使用习惯的变化。此外，Chrome 插件管理也同样重要，通过导出插件列表，可以确保在新系统中快速恢复浏览器环境。保持对这些工具和插件的定期检查与更新，有助于提高工作效率并保障数据安全。
tags:
- Windows
- Windows 11
- APP
- 软件
title: Windows 11 安装软件
---

最近打算重装系统，顺便备份一下现在系统上在用哪些软件，也方便年底看看日常使用的软件有哪些变化。以前有维护过 2 篇博文记录 Chrome 插件和手机应用的文章，找了下没找到，可能是从 Typecho 转到 Hugo 时搞丢了。

### WinFetch

```bash
C:\Users\eallion>winfetch

 eallion@EALLION
 ---------------
 OS: Windows 11 专业工作站版 [64 位]
 Host: Gigabyte Technology Co., Ltd. B760M POWER
 Kernel: 10.0.22631.0
 Motherboard: Gigabyte Technology Co., Ltd. B760M POWER
 Uptime: 3 days 19 hours 37 minutes
 Packages: 95 (scoop)
 Shell: PowerShell v5.1.22621.4391
 Resolution: 1920x1080, 3840x2160
 Terminal: Windows Terminal
 CPU: 13th Gen Intel(R) Core(TM) i5-13490F @ 2.496GHz
 GPU: NVIDIA GeForce GTX 1050 Ti
 Memory: 10.81 GiB / 31.84 GiB (33%)
 Disk (C:): 274 GiB / 931 GiB (29%)
```

### Scoop list

通过 [Scoop](https://scoop.sh/) 安装的软件。

`$ scoop list > scoop-list.txt`

| Name                  | Version         | Source     | Updated             |
| --------------------- | --------------- | ---------- | ------------------- |
| 7zip                  | 24.09           | main       | 2024-12-01 00:23:57 |
| 7zip19.00-helper      | 19.00           | main       | 2024-07-31 00:02:27 |
| adb                   | 35.0.2          | main       | 2024-10-22 20:53:51 |
| air                   | 1.61.7          | main       | 2025-01-20 08:26:14 |
| autocorrect           | 2.13.0          | main       | 2024-10-16 19:52:21 |
| base64                | 1.2.0           | main       | 2024-07-23 16:07:22 |
| bind                  | 9.16.50         | main       | 2024-07-29 16:29:20 |
| bun                   | 1.2.0           | main       | 2025-01-23 18:51:20 |
| cacert                | 2024-12-31      | main       | 2025-01-01 04:38:13 |
| Cascadia-Code         | 2407.24         | nerd-fonts | 2024-11-28 01:30:20 |
| chrlauncher           | 2.6             | extras     | 2024-09-07 12:01:57 |
| clink                 | 1.7.7           | main       | 2025-01-15 01:22:54 |
| cosbrowser            | 2.11.23         | dorado     | 2024-08-30 05:43:51 |
| curl                  | 8.11.1_3        | main       | 2025-01-01 20:46:32 |
| dark                  | 3.14            | main       | 2024-05-18 00:02:44 |
| dbeaver               | 24.3.3          | extras     | 2025-01-20 08:27:32 |
| discord               | 1.0.9156-20     | extras     | 2024-08-31 20:14:01 |
| diskgenius            | 5.6.1.1580      | extras     | 2024-08-15 21:43:03 |
| ditto                 | 3.24.246.0      | extras     | 2024-05-18 00:12:52 |
| dog                   | 0.1.0           | main       | 2024-07-29 15:56:05 |
| element               | 1.11.90         | extras     | 2025-01-15 01:27:32 |
| everything            | 1.4.1.1026      | extras     | 2024-08-01 21:42:57 |
| exifcleaner           | 3.6.0           | extras     | 2024-06-12 04:27:35 |
| ffmpeg                | 7.1             | main       | 2024-10-01 11:31:53 |
| filezilla             | 3.68.1          | extras     | 2024-12-03 22:36:02 |
| firefox               | 134.0.2         | extras     | 2025-01-23 18:56:37 |
| foobar2000            | 2.24.1          | extras     | 2024-12-18 01:59:27 |
| foobar2000-encoders   | 2024-04-23      | extras     | 2024-05-18 00:21:05 |
| gh                    | 2.65.0          | main       | 2025-01-07 16:35:08 |
| git                   | 2.47.1.2        | main       | 2025-01-15 16:12:07 |
| github                | 3.4.15          | extras     | 2025-01-23 19:15:20 |
| globalping            | 1.4.4           | main       | 2024-12-19 23:34:31 |
| go                    | 1.23.5          | main       | 2025-01-18 01:34:24 |
| gpg                   | 2.4.7           | main       | 2025-01-19 08:38:33 |
| grep                  | 3.11            | main       | 2024-05-18 00:22:39 |
| gzip                  | 1.3.12          | main       | 2024-05-18 00:22:45 |
| honeyview             | 5.53            | extras     | 2024-06-21 13:33:10 |
| hugo-extended         | 0.142.0         | main       | 2025-01-23 19:15:40 |
| innounp               | 2.64            | main       | 2025-01-23 19:15:47 |
| innounp-unicode       | 2.64            | versions   | 2025-01-23 19:15:51 |
| iperf3                | 3.18            | main       | 2024-12-15 00:19:44 |
| jellyfin-media-player | 1.11.1          | extras     | 2024-11-15 17:28:58 |
| JetBrainsMono-NF-Mono | 3.3.0           | nerd-fonts | 2024-11-20 22:26:24 |
| jid                   | 0.7.6           | main       | 2024-05-18 00:24:06 |
| jq                    | 1.7.1           | main       | 2024-05-18 00:24:08 |
| keyviz                | 1.0.6           | extras     | 2024-08-09 04:24:30 |
| lessmsi               | 2.5.0           | main       | 2025-01-23 19:15:54 |
| listen1desktop        | 2.32.0          | extras     | 2024-06-10 20:54:19 |
| localsend             | 1.16.1          | extras     | 2024-11-05 18:26:07 |
| lux                   | 0.24.1          | main       | 2024-08-03 02:17:44 |
| MKVToolNix            | 89.0            | extras     | 2024-12-28 11:20:49 |
| mpv.net               | 7.1.1.0         | extras     | 2024-07-06 16:49:30 |
| nali                  | 0.8.1           | main       | 2024-10-06 15:59:36 |
| nmap                  | 7.95            | main       | 2024-09-04 08:58:27 |
| nodejs-lts            | 22.13.1         | main       | 2025-01-23 19:16:27 |
| Noto-NF               | 3.3.0           | nerd-fonts | 2024-11-20 22:29:52 |
| obs-studio            | 31.0.1          | extras     | 2025-01-19 11:50:43 |
| obsidian              | 1.7.7           | extras     | 2024-11-20 22:31:23 |
| oss-browser           | 1.19.0          | extras     | 2024-08-31 20:14:07 |
| pandoc                | 3.6.2           | main       | 2025-01-13 23:29:37 |
| privacy.sexy          | 0.13.7          | extras     | 2025-01-08 21:45:11 |
| putty                 | 0.82            | extras     | 2025-01-02 22:02:27 |
| python                | 3.13.1          | main       | 2024-12-04 23:14:01 |
| qbittorrent-enhanced  | 5.0.3.10        | extras     | 2024-12-22 02:47:31 |
| rclone                | 1.69.0          | main       | 2025-01-13 06:32:04 |
| scoop-completion      | 0.3.0           | extras     | 2024-05-18 00:33:47 |
| scrcpy                | 3.1             | main       | 2024-12-10 16:17:36 |
| screentogif           | 2.41.1          | extras     | 2024-09-09 14:20:29 |
| slack                 | 4.42.115        | extras     | 2025-01-23 19:34:12 |
| smiley-sans           | 2.0.1           | nerd-fonts | 2024-06-07 12:43:19 |
| Source-Han-Sans-SC    | 2.004           | nerd-fonts | 2024-07-26 00:41:08 |
| Source-Han-Serif-SC   | 2.003           | nerd-fonts | 2024-07-31 22:01:39 |
| spacesniffer          | 1.3.0.2         | extras     | 2024-05-18 00:35:33 |
| spotube               | 3.9.0           | extras     | 2024-12-09 19:36:44 |
| sqlite                | 3.48.0          | main       | 2025-01-15 01:28:24 |
| sudo                  | 0.2020.01.26    | main       | 2024-05-18 00:35:59 |
| switchhosts           | 4.2.0.6119      | extras     | 2024-08-08 11:06:02 |
| tabby                 | 1.0.221         | extras     | 2025-01-23 19:48:43 |
| tar                   | 1.23            | main       | 2024-05-18 00:36:45 |
| telegram              | 5.10.5          | extras     | 2025-01-25 11:17:28 |
| thunderbird           | 133.0           | extras     | 2024-11-27 12:39:24 |
| tor                   | 0.4.8.13-14.0.4 | main       | 2025-01-09 23:35:21 |
| trafficmonitor        | 1.85            | extras     | 2025-01-23 19:55:12 |
| twinkle-tray          | 1.16.6          | extras     | 2025-01-10 14:17:38 |
| typora                | 1.9.5           | extras     | 2024-07-01 19:38:03 |
| vcredist2022          | 14.42.34433.0   | extras     | 2024-11-13 23:02:11 |
| ventoy                | 1.1.00          | extras     | 2025-01-23 19:55:54 |
| vim                   | 9.1.0           | main       | 2024-05-18 00:38:09 |
| vivetool              | 0.3.3           | main       | 2024-05-18 00:38:11 |
| vlc                   | 3.0.21          | extras     | 2024-06-21 13:46:54 |
| wget                  | 1.21.4          | main       | 2024-05-18 00:38:16 |
| windterm              | 2.6.1           | extras     | 2024-05-18 00:38:36 |
| winfetch              | 2.5.1           | main       | 2025-01-26 18:17:53 |
| winscp                | 6.3.6           | extras     | 2025-01-07 03:45:02 |
| yt-dlp                | 2025.01.15      | main       | 2025-01-16 21:49:48 |

### Uninstall Tool

通过 Microsoft Store 或手动下载安装的程序。

> 由 Uninstall Tool 3.7.4 于 2025 年 1 月 26 日 17:43:26 生成

| 程序名称                                                     | 大小    | 安装时间         |
| ------------------------------------------------------------ | ------- | ---------------- |
| NVIDIA HD 音频驱动程序 1.3.38.60                             | 295 MB  | 22.01.2025 11:11 |
| NVIDIA 图形驱动程序 466.77                                   | 297 MB  | 22.01.2025 11:11 |
| Display Driver Uninstaller (32 位)                            | 5.78 MB | 22.01.2025 10:54 |
| Microsoft OneDrive                                           | 331 MB  | 21.01.2025 04:52 |
| 古怪加速器 (32 位)                                            | 272 MB  | 20.01.2025 08:29 |
| Readest                                                      | 68.8 MB | 20.01.2025 08:28 |
| Microsoft Edge (32 位)                                        | 730 MB  | 20.01.2025 08:18 |
| Microsoft Visual Studio Code (User) (当前用户)               | 376 MB  | 17.01.2025 05:55 |
| 小狼毫输入法 (32 位)                                          |         | 12.01.2025 00:19 |
| 天翼云盘 7.1.5.0 (32 位)                                      | 381 MB  | 11.01.2025 05:06 |
| Cloud189OfficeAddinSetup (32 位)                              | 348 KB  | 11.01.2025 05:06 |
| 阿里云盘                                                     | 359 MB  | 11.01.2025 02:30 |
| Google Chrome (32 位)                                         | 5.05 GB | 10.01.2025 12:12 |
| 夸克网盘 (当前用户，32 位)                                    | 929 MB  | 04.01.2025 00:34 |
| 剪映专业版                                                   |         | 04.01.2025 00:07 |
| Follow                                                       | 767 MB  | 03.01.2025 18:11 |
| 雷神加速器                                                   | 537 MB  | 28.12.2024 00:47 |
| Internet Download Manager (32 位)                             | 24.2 MB | 15.12.2024 17:35 |
| RapooGameDev 1.6.17 (32 位)                                   | 252 MB  | 05.12.2024 01:57 |
| UU 加速器 (32 位)                                              | 162 MB  | 19.11.2024 17:53 |
| Local 9.1.0                                                  | 3.46 GB | 16.11.2024 18:02 |
| ima.copilot                                                  | 1.69 GB | 15.11.2024 18:20 |
| NextChat                                                     | 23.1 MB | 11.11.2024 14:27 |
| PowerToys (Preview) x64                                      | 969 MB  | 05.11.2024 21:49 |
| Aimlabs                                                      | 15.7 GB | 03.11.2024 22:08 |
| LittleBigMouse (32 位)                                        | 65.2 MB | 30.10.2024 22:25 |
| 微信 (32 位)                                                  | 399 MB  | 23.10.2024 21:05 |
| LAV Filters 0.79.2 (32 位)                                    | 88.4 MB | 09.10.2024 05:30 |
| Cloudflare WARP                                              | 295 MB  | 23.09.2024 00:19 |
| PixPin 版本 1.8.22.0 (当前用户，32 位)                        | 132 MB  | 20.09.2024 13:53 |
| Counter-Strike                                               | 895 MB  | 13.09.2024 20:53 |
| Turmoil                                                      | 1.72 GB | 13.09.2024 20:49 |
| QQ (32 位)                                                    | 876 MB  | 08.09.2024 12:20 |
| Everything 1.4.1.1026 (x64)                                  | 68.5 MB | 08.09.2024 11:22 |
| 土豆兄弟 (Brotato)                                            | 165 MB  | 04.09.2024 11:29 |
| TinyEraser                                                   | 474 MB  | 04.09.2024 09:16 |
| cosbrowser 2.11.23                                           | 398 MB  | 30.08.2024 05:38 |
| WeiyunApp 5.2.1485                                           | 575 MB  | 22.08.2024 12:54 |
| MusicFree 版本 0.0.5 (32 位)                                  | 326 MB  | 18.08.2024 22:05 |
| X-Spider                                                     | 109 MB  | 13.08.2024 23:17 |
| QPrompt                                                      | 541 MB  | 02.08.2024 12:44 |
| PUBG: BATTLEGROUNDS                                          | 40.8 GB | 25.07.2024 02:15 |
| NVIDIA PhysX 系统软件 9.23.1019                              | 492 MB  | 22.07.2024 15:28 |
| ChatGPT-On-CS                                                | 747 MB  | 11.07.2024 00:08 |
| Ollama version 0.1.48                                        | 1.76 GB | 08.07.2024 14:06 |
| 双人成行                                                     | 44.7 GB | 05.07.2024 18:53 |
| 飞书                                                         | 1.20 GB | 01.07.2024 16:34 |
| 微云同步助手 (32 位)                                          | 173 MB  | 01.07.2024 15:16 |
| Microsoft Office LTSC 专业增强版 2024 - zh-cn                | 4.68 GB | 27.06.2024 11:10 |
| UsbDk Runtime Libraries                                      | 3.96 MB | 26.06.2024 11:33 |
| Bandizip                                                     | 23.1 MB | 25.06.2024 17:47 |
| TTime                                                        | 419 MB  | 22.06.2024 09:04 |
| ahsProtector (32 位)                                          | 23.6 MB | 15.06.2024 18:36 |
| Adobe After Effects 2020                                     | 2.99 GB | 07.06.2024 04:39 |
| Adobe Photoshop CC 2018                                      | 2.16 GB | 07.06.2024 04:38 |
| Adobe Premiere Pro 2020                                      | 3.61 GB | 07.06.2024 04:36 |
| Keybase                                                      | 500 MB  | 02.06.2024 09:22 |
| VMware Workstation                                           | 951 MB  | 29.05.2024 22:36 |
| Notepad++ (64-bit x64)                                       | 16.4 MB | 25.05.2024 19:41 |
| Microsoft Update Health Tools                                | 1.86 MB | 20.05.2024 01:24 |
| iSlide Tools (32 位)                                          | 399 MB  | 18.05.2024 13:01 |
| HP Google Drive Plugin (32 位)                                | 3.38 MB | 18.05.2024 12:42 |
| HP Dropbox Plugin (32 位)                                     | 3.37 MB | 18.05.2024 12:42 |
| HP DeskJet 2130 series 基本设备软件                          | 165 MB  | 18.05.2024 12:42 |
| Steam (32 位)                                                 | 133 GB  | 18.05.2024 03:20 |
| Google Keep                                                  |         | 18.05.2024 02:12 |
| PicList 2.8.5                                                | 348 MB  | 18.05.2024 01:59 |
| PyBingWallpaper (32 位)                                       | 17.0 MB | 18.05.2024 01:53 |
| PotPlayer-64 bit                                             | 100 MB  | 18.05.2024 01:43 |
| Uninstall Tool                                               | 13.4 MB | 17.05.2024 23:17 |

### Chrome 插件

常驻插件：

![](/assets/images/posts/2024/01/26/chrome-extensions-2025.png)

由 [Extension List](https://chromewebstore.google.com/detail/cboicfdginkkdfppcjighdkchdlebdjp) 导出，Chrome 插件也由此插件管理。

| Name                                         | Version       | Status                           | Install Type |
| -------------------------------------------- | ------------- | -------------------------------- | ------------ |
| AutoHideDownloadsBar                         | 2.12.2        | on                               | normal       |
| Bitwarden 密码管理器                         | 2025.1.0      | on                               | normal       |
| ChatGPT 总结助手                             | 1.4.9         | on                               | normal       |
| Checker Plus for Gmail™                      | 30.1.1        | off                              | normal       |
| Country Flag Fixer                           | 2.0.2         | on                               | normal       |
| Deep Fake Detector                           | 1.10.1        | off                              | normal       |
| Enhancer for YouTube™                        | 3.0.5         | off                              | normal       |
| Extension List                               | 1.1.0         | on                               | normal       |
| Get Favicon                                  | 2.0           | off                              | normal       |
| GNOME Shell 集成                             | 12            | off                              | normal       |
| Google Keep Chrome 扩展程序                  | 4.25032.600.1 | off                              | normal       |
| Google 翻译                                  | 2.0.16        | off                              | normal       |
| Google 文档、表格及幻灯片的 Office 编辑扩展程序 | 152.160.178   | off                              | normal       |
| HTML to Markdown                             | 2.0           | off                              | normal       |
| I don't care about cookies                   | 3.5.1         | on                               | normal       |
| IDM Integration Module                       | 6.42.22       | on                               | normal       |
| MarkDownload - Markdown Web Clipper          | 3.4.0         | on                               | normal       |
| Mastodonify                                  | 1.0           | on                               | normal       |
| MetaMask                                     | 12.9.3        | off                              | normal       |
| OneNav                                       | 1.1.0         | on                               | normal       |
| Open in Firefox™ Browser                     | 0.4.5         | on                               | normal       |
| Open in Private Mode                         | 0.1.2         | on                               | normal       |
| Proxy SwitchyOmega                           | 2.5.21        | off                              | normal       |
| Search by Image                              | 8.1.0         | off                              | normal       |
| SimpleExtManager                             | 1.4.11        | on                               | normal       |
| SteamDB                                      | 4.12          | off                              | normal       |
| Stylus                                       | 2.3.9         | off                              | normal       |
| uBlacklist                                   | 8.9.2         | on                               | normal       |
| uBlock Origin Lite                           | 2025.1.14.952 | on                               | normal       |
| Vimium                                       | 2.1.2         | on                               | normal       |
| WebRTC Leak Shield                           | 1.0.10        | on                               | normal       |
| WhatFont                                     | 3.2.0         | off                              | normal       |
| WhatRuns                                     | 1.8.2         | off                              | normal       |
| 哔哩哔哩 Downloader                          | 1.2.3         | off                              | normal       |
| 批量图片下载器 - Imageye                     | 5.0.3         | off                              | normal       |
| 捕捉网页截图 - FireShot 的                    | 2.0.2.2       | off                              | normal       |
| 文章摘要 ChatGPT 生成 - 快速笔记 (中文版)        | 1.0.5         | off                              | normal       |
| 查看 Chrome 历史记录                           | 3.0.1         | off                              | normal       |
| 沉浸式翻译 - 网页翻译插件                     | 1.13.5       | off                               | normal       |
| 沙拉查词 - 聚合词典划词翻译                    | 7.20.0        | on                               | normal       |
| 浮图秀                                       | 4.59.0        | on                               | normal       |
| 猫抓                                         | 2.5.9         | off                               | normal       |
| 简悦 - SimpRead                              | 2.2.0.520     | off                              | normal       |
| 篡改猴                                       | 5.3.3         | on                               | normal       |
| 网址净化器                                   | 2.0.1         | on                               | normal       |
| 腾讯翻译                                     | 0.6.2         | off                              | normal       |
| 谁在用 cookie                                 | 0.0.1         | off                              | development  |
