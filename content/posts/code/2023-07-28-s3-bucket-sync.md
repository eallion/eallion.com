---
title: "利用 GitHub Actions 同步对象存储"
authors: ["eallion"]
categories: ["代码"]
tags: 
  - cdn
  - bucket
  - cos
  - r2
slug: "s3-sync"
draft: false
Comments: true
date: 2023-07-28T17:06:50+08:00
---

### 前言

由于担心腾讯云删库跑路，我决定把存放在腾讯云 COS 上的某个存储桶通过 GitHub Actions 同步备份到 [GitHub](https://github.com/eallion/static)、[Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)、[Backblaze B2](https://www.backblaze.com/cloud-storage) 上。以及实现《[图床 CDN CNAME 接入 Cloudflare SaaS 实现分流](https://eallion.com/cdn-cname-cloudflare/)》。
这个 COS 中的静态文件和图片也是我的 CDN 源站和图床源站。
腾讯云 COS 还是用于生产环境的主力存储桶，不过万一出了什么幺蛾子，可以秒切。

![](https://images.eallion.com/images/2023/07/s3-sync-workflow.png)

我使用过 3 套方案，最近优化到了在 GitHub Actions 中通过 [Rclone](https://rclone.org/) 同步。
理论上这一方案支持任何 s3 兼容协议的存储桶，以及 Rclone 官方 [Cloud Storage Systems](https://rclone.org/overview/) 列表支持的云服务。s3 协议的存储桶兼容的平台太多了，如：阿里云、腾讯云、又拍云、Cloudflare R2、Backblaze B2 等。
可以把任何一个存储桶当作 Master Bucket。

### 准备

- [GitHub](https://github.com/) 账号
- [Rclone](https://rclone.org/) Config
- 各平台的 Token

### 安装配置 Rclone

1. 在自己的电脑上安装 Rclone，参考：<https://rclone.org/install/>
2. 生成 Rclone config

- https://developers.cloudflare.com/r2/examples/rclone/
- https://www.backblaze.com/docs/cloud-storage-integrate-rclone-with-backblaze-b2

Rclone 生成 Config 很简单，输入 `rclone config` 基本上就是一路选择或者保持默认就可以了。
以配置腾讯云 COS 为例，需要手动输入的是： `access_key_id` `secret_access_key` ：

![](https://images.eallion.com/images/2023/07/rclone_config.gif)

最终会得到一份这样的 Config 文件：

```config
[B2]
...
...

[R2]
...
...

[COS]
type = s3
provider = TencentCOS
access_key_id = idididid
secret_access_key = keykey
endpoint = cos.ap-nanjing.myqcloud.com
```

通过命令 `rclone config paths` 可以查看这个 Config 保存在什么位置。

然后把这个 Config 文件的内容用 Base64 `base64 -w 0 rclone.config` 编码一下待用：

![](https://images.eallion.com/images/2023/07/rclone_config_base64.png)

### 配置 GitHub

在 GitHub 上用于备份的 Repo 中，添加 Secrets `RCLONE_CONFIG` ，注意数据脱敏保护隐私。
如果配置 Rclone 的 Config 时加了密码，就需要再添加一个 Secrets `RCLONE_CONFIG_PASS` 。

![](https://images.eallion.com/images/2023/07/secret_rclone_config.png)

### GitHub Actions

这是我在用的示例：

用到的 Actions 是：<https://github.com/AnimMouse/setup-rclone>

```bash
name: s3 bucket Sync
on:
  schedule:
# 4 times everyday
  - cron: "0 */6 * * *"

  workflow_dispatch:

jobs:
  douban:
    name: s3 bucket Sync 
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    # Setup Rclone
    - name: Setup Rclone
      uses: AnimMouse/setup-rclone@v1
      with:
        rclone_config: ${{ secrets.RCLONE_CONFIG }}

    # # Sync from Tencent COS
    - name: Rclone Sync 
      run: |
          rclone copy TencentCOS:${{ secrets.COS_CDN_BUCKET }} ./ --transfers=8 --checkers=16
      env:
        RCLONE_CONFIG_PASS: ${{ secrets.RCLONE_CONFIG_PASS }}

    # Backup in GitHub
    - name: Git Commit
      uses: EndBug/add-and-commit@v9
      with:
        message: 'chore: sync from tencent cos'
        add: './'

    # Rclone Sync to B2 & R2
    - name: Rclone Sync 
      run: |
          rclone copy ./ Cloudflare:${{ secrets.CF_R2_BUCKET }} --transfers=8 --checkers=16 --exclude=.git/** --exclude=.github/** --exclude=README.md
          rclone copy ./ Backblaze:${{ secrets.B2_BUCKET }} --transfers=8 --checkers=16 --exclude=.git/** --exclude=.github/** --exclude=README.md
      env:
        RCLONE_CONFIG_PASS: ${{ secrets.RCLONE_CONFIG_PASS }}
```
