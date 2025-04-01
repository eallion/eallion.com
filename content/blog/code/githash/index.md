---
authors:
- eallion
categories:
- 代码
date: 2021-08-06 14:05:05
draft: false
lastmod: 2021-08-06 14:05:05
slug: githash
summary: Hugo 的 .GitInfo 变量因设计限制无法正确显示 content 目录的 Commit hash，尤其在浅克隆时更易失效。通过自定义脚本动态替换模板中的占位字符串，可绕过该限制实时显示最新
  Git hash。该方法需在构建前执行脚本更新模板，虽非官方方案但能有效解决问题。
tags:
- hugo
- GitInfo
- Git
title: Hugo .GitInfo 的替代方案
---
### 前言

今天有人问我博客页脚 `footer` 里的 git hash 是怎么显示的，就是页面底部里的 `69d6ffe` 这一串数字。

![](/assets/images/posts/2021/08/footer.png)

他遇到了跟我一样的坑，`.GitInfo` 不能正确显示。

### 原因

虽然 Hugo 在很早的版本里就支持通过 `enableGitInfo` 开启 `.GitInfo` 变量，但是这个变量只对 Hugo 网站文件生效，不对 `content` 目录生效，具体可以参考这条 [Issue](https://github.com/gohugoio/hugo/issues/7310#issuecomment-633253085) 里 bep 的回复：

> > value will only change if the content changes, correct?
>
> Yes, the GitInfo is used to set dates to individual files (which then is used to determine .Site.LastChange). Only the content files (e.g. .md) is considered here.

在一些 CI/CD 中为了节省时间、空间等，会加上 `--depth=1` 只克隆最新的一个 Commit 历史进行构建，这样就会有可能丢失掉 `content` 目录里的一些 `.md` 文件的 `.GitInfo`。在模板中引用 `{{ .GitInfo.Hash }}`（[footer.html](https://github.com/eallion/eallion.com/blob/620b7b76804c864ac1f98bd997b482ac723ec112/themes/hello-friend/layouts/partials/footer.html#L58-L64)）这样的变量时就不会显示。

如果去掉 `--depth=1` 从而进行完整克隆时，构建的文章页面，虽然会显示 `{{ .GitInfo.Hash }}`，但显示的不是最新的 Commit hash。

### 变通方案

除了向官方反馈此问题（可能不一定被采纳），也有另外的方法可以实现。我用了一个笨方法。符合我的理念，先能干活，再谈优化。希望有更好方法的朋友可以教教我。

1. 在 Hugo 根目录新建一个脚本 [`githash.sh`](https://github.com/eallion/eallion.com/blob/fa9c9d0ed7a0db2e2c2967bb6e682debe48cac24/githash.sh)：

```bash
#!/bin/bash

hash=`git log --pretty=format:"%H" -n 1`
echo $hash
sed -i "s/69d6ffe319557706dcf4150e960e7b7e21a37d9f/$hash/g" themes/hello-friend/layouts/partials/githash.html
```

其中 `69d6ffe319557706dcf4150e960e7b7e21a37d9f` 是为了方便用脚本替换，随便写的一个字符串，与模板文件 `githash.html` 里的字符串对应即可。

2. 在 `theme/layouts/partials` 目录新建一个 [`githash.html`](https://github.com/eallion/eallion.com/blob/fa9c9d0ed7a0db2e2c2967bb6e682debe48cac24/themes/hello-friend/layouts/partials/githash.html) 模板文件：

```html
<a
    href="https://github.com/eallion/eallion.com/commit/69d6ffe319557706dcf4150e960e7b7e21a37d9f"
    target="_blank"
    rel="noopener noreferrer"
    >{{ substr "69d6ffe319557706dcf4150e960e7b7e21a37d9f" 0 7 }}</a
>
```

3. 在 [`footer.html`](https://github.com/eallion/eallion.com/blob/fa9c9d0ed7a0db2e2c2967bb6e682debe48cac24/themes/hello-friend/layouts/partials/footer.html#L49) 需要显示 GitHash 的位置引用这模板：

```
{{ partial "githash.html" . }}
```

4. 构建 Hugo 前（在本地或在 CI/CD 中），先运行一次这个脚本再构建 Hugo 。

```bash
bash githash.sh
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
```

GitHub Actions Workflows：

```diff
jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
    ......
      - name: Build Hugo
        run: |
+         bash githash.sh
          hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
    ......
```