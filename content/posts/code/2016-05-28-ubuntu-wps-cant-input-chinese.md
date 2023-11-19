---
title: "ubuntu wps 不能输入中文解决"
images: ["https://og.eallion.com/api/og?title=ubuntu%20wps%20%E4%B8%8D%E8%83%BD%E8%BE%93%E5%85%A5%E4%B8%AD%E6%96%87%E8%A7%A3%E5%86%B3"]
authors: ["eallion"]
categories: ["代码"]
tags: ["Ubuntu","linux","wps","中文"]
draft: false
slug: "ubuntu-wps-cant-input-chinese"
date: "2016-05-28 18:32:00"
lastmod: "2016-05-28 18:32:00"
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
