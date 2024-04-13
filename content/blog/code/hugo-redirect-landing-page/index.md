---
title: "Hugo 外部链接跳转提示页面"
authors: ["eallion"]
categories: ["代码"]
tags: 
  - hugo
  - 博客
  - 跳转
  - 折腾
slug: "hugo-redirect-landing-page"
summary: "文章介绍了作者为了合规和自我审查，在博客中迁移评论系统并清理链接，通过跳转页面实现外部链接的跳转。作者使用 Hugo 内置模板_render-link.html_进行 base64 编码，并提供了代码示例。同时，作者还介绍了如何创建一个中转页面模板_go.html_以及相关样式和脚本的设置。最后，文章指出这种方法只适用于渲染 Markdown 内容文档，并对自定义 HTML 链接做了说明。"
draft: false
date: 2024-02-03T08:48:24+08:00
---

### 前言

这两天看到「秦大叔」的博客文章《[网站重启](https://qfsyj.com/20240101-start.html)》提到，因为博客评论中别人留下的域名过期被黄网注册链接到了黄网，从而导致因涉黄问题而喝茶。可见在大陆目前的网络环境下，这种可大可小的口袋罪收得越来越紧。

为了合规和自我审查，我对博客做了 2 件事，一是把评论系统迁移到了 [Giscus](https://giscus.app/)，这提高了一定的评论门槛，让评论处于半关闭状态；二是清理了一些博客中的链接，让剩下的链接通过跳转页面跳转。刚好看到「空白」大佬更新了博客《[HUGO 外链跳转到中间页](https://koobai.com/zhongjiantiaozhuan/)》，直接把样式抄过来，算是完成了一件 Todo list。

PS：我觉得正经的个人网站可以备案。但如果你想做不正经的，那你要做的是完全的身份隔离，而不是仅仅不备案却暴露很多关联的交叉实名信息。没有爹味，爱听不听。

### 定义

外链：全称为外部链接，又称导入链接。就是指从互联网上别的网站导入到自己网站的链接。以下简称「外链」。

### 3 个文件创建跳转页面

我的设计思路与「空白」的第一版 JS 的方式不太一样，我利用 Hugo 内置模板 `_markup` 的 [render-link.html](https://gohugo.io/templates/render-hooks/#link-with-title-markdown-example) ，在 Hugo 构建时就把外链用 Hugo 内置的 [`base64Encode`](https://gohugo.io/functions/encoding/base64encode/) 命令进行 base64 编码，充分利用了 SSG 的特性。

##### 1. 新建或者修改 render-link.html

`_markup/render-link.html` 是 Hugo 渲染链接的内置模板。
如果博客选用的主题没有自定义 render-link.html，那需要自己新建一个此文件，如果主题已经自定义过链接渲染的，那就可以直接修改此文件。
文件位于 Hugo 项目根目录的 `layouts` 目录 ：

```bash
layouts/
└── _default/
    └── _markup/
        ├── render-codeblock-bash.html
        ├── render-codeblock.html
        ├── render-heading.html
        ├── render-image.html
        ├── render-image.rss.xml
        └── render-link.html    # < --- 此文件
```

我用的文件内容：

`$domainList` 相当于一个白名单。

```html
{{ $url := urls.Parse .Destination }}
{{ $host := lower $url.Host }}
{{- if or (hasSuffix $host "eallion.com") (hasSuffix $host "e5n.cc") (hasSuffix $host "gov.cn") }}
    <a href="{{ .Destination }}" target="_blank" {{ with .Title }}title="{{ . }}"{{ end }}>{{ .Text | safeHTML }}</a>
{{- else if or (hasSuffix $host "www.eallion.com") (hasPrefix .Destination "#") -}}
    <a href="{{ .Destination }}" {{ with .Title }}title="{{ . }}"{{ end }}>{{ .Text | safeHTML }}</a>
{{- else -}}
    <a href="/go/?target={{ .Destination | base64Encode }}" target="_blank" {{ with .Title }}title="{{ . }}"{{ end }}>{{ .Text | safeHTML }}</a>
{{- end -}}
```

> PS：DoIt 主题只需要修改 <i class="fab fa-github"></i>[layouts/partials/plugin/link.html](https://github.com/HEIGE-PCloud/DoIt/blob/main/layouts/partials/plugin/link.html) 文件。

> Tips：利用 `render-link.html` 可以让博客实现新窗口打开，即 `taget="_blank"` 。很多亚洲用户都在搜索这个技巧呢。

##### 2. 新建 layout 模板 go.html

新建一个页面模板，如：`go.html`，位于Hugo 项目根目录的 `layouts/_default/go.html`。
一个最简单的办法是复制 `single.html` 并重命名为 `go.html`

```bash
layouts/
└── _default/
    └── go.html    # < --- 此文件
```

下面是我的内容，把 HTML CSS 和 JS 放置到了同一个页面中，方便维护。除了需要注意 `<div class="redirect-all">` 元素位于自己的模板的位置，基本上是开箱即用。

```html
{{ define "main" }}
{{ .Scratch.Set "scope" "single" }}

{{ $redirectLight := "images/redirect/redirect-light.webp"}}
{{ $redirectDark := "images/redirect/redirect-dark.webp"}}

<style>
    .redirect-all {
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 10px;
        color: #666;
        word-break: break-all;
        max-width: 800px;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 0.85rem;
        margin: 5rem auto;
        background: #fff url({{ with resources.Get $redirectLight }}{{ with .Resize "800x webp" }}{{ .RelPermalink }}{{ end }}{{ end }}) no-repeat center center / cover;
        aspect-ratio: 2 / 1;
    }


    .redirect-nrong {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem 1rem
    }

    .redirect-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: #222;
        margin-bottom: 0.5rem;
    }

    .redirect-info {
        margin-top: 6px;
    }

    .redirect-tis {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 1rem;
        margin-bottom: 2px;
        flex-wrap: wrap;
    }

    .redirect-button {
        display: flex;
        align-items: center;
        border-radius: 3px;
        border: none;
        background: #006bee;
        height: 32px;
        padding: 0 14px;
        cursor: pointer;
        outline: 0;
    }

    .redirect-button a {
        color: #fff !important;
    }

    .dark .redirect-all {
            background: #fff url({{ with resources.Get $redirectDark }}{{ with .Resize "800x webp" }}{{ .RelPermalink }}{{ end }}{{ end }}) no-repeat center center / cover;
            color: #999;
        }

    .dark .redirect-title {
            color: #ddd;
        }
</style>

<article>

  <section class="flex flex-col max-w-full mt-0 prose dark:prose-invert">

      <div class="min-w-0 min-h-0">

        <div class="article-content max-w-full">

            {{ .Content | emojify }}

            <div class="redirect-all">
                <div class="redirect-nrong">
                    <div class="redirect-title">{{ T `redirect_pre` | safeHTML }}{{ .Site.Title }}{{ T `redirect_post` | safeHTML }}</div>
                    <a href="" target="_self" rel="noopener noreferrer" aria-label="redirect-link"><span id="redirect-link">{{ T `redirect_link` | safeHTML }}</span></a>
                    <div class="redirect-info">{{ T `redirect_info` | safeHTML }}</div>
                    <div class="redirect-tis">
                        <div class="redirect-button"><a href='' target="_self" id='direct-link' rel="noopener noreferrer">{{ T `direct_link` | safeHTML }}</a></div>
                    </div>
                </div>
            </div>

        </div>

      </div>

    </section>

</article>

<script>
    const params = new URLSearchParams(window.location.search);
    const encodedTarget = params.get('target');
    const target = atob(encodedTarget); // 使用 atob 进行 Base64 解码

    if (target) {

        const decodedTarget = decodeURIComponent(target);

        document.getElementById('direct-link').href = decodedTarget;
        document.getElementById('redirect-link').textContent = '' + decodedTarget; // 在新增的元素中显示原地址
        document.getElementById('redirect-link').href = decodedTarget;

    } else {
        const redirectMessageElement = document.getElementById('redirect-link');
        redirectMessageElement.textContent = '{{ T `redirect_message` | safeHTML }}';
    }
</script>

{{ end }}

```

##### 3. 新建 go.md 调用模板

在 Hugo 项目的 `content` 目录新建一个文件，名为 `go.md`，`go` 就会是中转页面的链接 path。
`go.md` 文件的 Front matter 要选择刚才新建的对应模板，如果模板名称是`go.html` 那 layout 或者 type 都要选择 `go`。

```markdown
---
title: "Redirect"
layout: "go"
type: "go"
... ...
---
```

##### 4. 背景图

背景图放在 static 的目录下：
或者自己能正确引用的位置，如 CDN，并修改 `<style>` 中的 `background` url。
另外需要适配自己主题的 Dark mode。

- `static/assets/images/redirect/redirect-light.webp`
- `static/assets/images/redirect/redirect-dark.webp`

### 其他注意事项

这个方法，只能渲染本博客所有 Markdown 内容文档，即 `content` 目录下在的 `.md` 文件。
如果习惯用 `{{ Shortcodes }}` 发文，或者页面有自定义的 html 链接，需要自己做链接 path 的 base64 兼容，这个模板能解析 `href="/go/?target={{ base64Encode }}"` 博客内这一类链接，白名单除外。
