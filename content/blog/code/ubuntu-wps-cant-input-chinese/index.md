---
authors:
- eallion
categories:
- 代码
date: '2016-05-28 18:32:00'
draft: false
lastmod: '2016-05-28 18:32:00'
slug: ubuntu-wps-cant-input-chinese
summary: WPS文字和表格无法输入中文是因环境变量未正确设置。解决方法是在/usr/bin/wps和/usr/bin/et文件中添加两行导出命令，分别设置XMODIFIERS和QT_IM_MODULE变量为fcitx输入法。修改后直接针对WPS生效。
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