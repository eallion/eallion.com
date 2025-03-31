---
authors:
- eallion
categories:
- 代码
date: '2019-12-16 22:58:39'
draft: false
lastmod: '2019-12-16 22:58:39'
slug: deploy-to-github-and-coding
summary: GitHub Pages和Coding Pages双平台部署博客需要先创建两个仓库并申请对应token。Gridea用户需在APP内配置GitHub
  Pages，其他静态生成工具直接在博客根目录操作。通过git remote命令添加双推送地址，确保配置正确后检查远程仓库信息。
tags:
- hexo
title: Gridea Hexo Hugo 等 git push 同步到多个仓库
---

> 以 GitHub Pages + Coding Pages 为例

### 准备工作

- 创建 GitHub Pages 仓库
- 创建 Coding Pages 仓库
- 申请 [GitHub token](https://github.com/settings/tokens/new)
- 申请 Coding token 访问令牌
- 如果是 Gridea，在 Gridea APP 里配置好 GitHug Pages

### 配置 `git remote`

- 如果是 Gridea 需要在 `output` 设置

```
cd ~/Documents/Gridea/output
```

- 如果是 Hexo Hugo 等，在博客根目录即可。

然后输入以下命令：

```
git remote set-url --add --push origin https://github.com/eallion/gridea.git
git remote set-url --add --push origin https://e.coding.net/eallion/gridea.git
```

输入：`git remote -v`，如果有如下提示，即有 2 条 (push) 代码，则说明配置正确：

![](/assets/images/posts/2019/12/20191228231145.png)

### DNS 解析

解析 CNAME 的时候，国内的解析到 Coding Pages，国外的解析到 Git Pages.

![](/assets/images/posts/2019/12/20191228231204.png)

如下图所示：

![](/assets/images/posts/2019/12/20191228231217.png)

### 同步

配置好后，正常同步即可。

### 其他注意事项

如果开启了 https，但是 Let's Encrypt 证书只有 3 个月的有效时间，到时候关系到续期的问题，续期的时候需要暂停解析，如续期 Git Pages 的证书，就暂停 Coding Pages 的解析，反之一样。不过感觉上还是比较麻烦的。还有其他可选方案的。还有个原因是 Git Pages 的证书是 60 天更新一次，而 Coding 的证书是 80 天更新一次。