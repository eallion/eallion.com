---
authors:
- eallion
categories:
- 代码
date: '2016-05-28 18:32:00'
draft: false
lastmod: '2016-05-28 18:32:00'
slug: ubuntu-wps-cant-input-chinese
summary: 在 Linux 系统中，WPS 文字和表格无法输入中文的问题可通过修改 /usr/bin/wps 和 /usr/bin/et 文件解决，添加 XMODIFIERS
  和 QT_IM_MODULE 环境变量并设为 fcitx 即可！
tags:
- Ubuntu
- linux
- wps
- 中文
title: ubuntu wps 不能输入中文解决
---
wps 文字不能输入中文解决

```bash
vi /usr/bin/wps      # 添加内容，字体标注
```

```bash
#!/bin/bash
export XMODIFIERS="@im=fcitx"
export QT_IM_MODULE="fcitx"
gOpt=
#gOptExt=-multiply
gTemplateExt=("wpt" "dot" "dotx")
.......
```

wps 表格不能输入中文解决

```bash
vi /usr/bin/et      # 添加内容，字体标注
```

```bash
#!/bin/bash
export XMODIFIERS="@im=fcitx"
export QT_IM_MODULE="fcitx"
gOpt=
#gOptExt=-multiply
........
```

原因：环境变量未正确设置，以上可以直接针对 wps 设置。