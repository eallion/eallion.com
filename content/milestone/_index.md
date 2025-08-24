---
title: "里程碑"
layout: "single"
type: "milestone"
outputs: ["html"]
slug: "milestone"
date: "2006-04-14 00:00:00"
showDate: false
showAuthor: false
showEdit: false
showPagination: false
showReadingTime: false
showRelatedContent: false
showWordCount: false
showComments: false
sharingLinks: false
showZenMode: false
aliases:
    - /tl
    - /shijianxian
    - /timeline
    - /lichengbei
---

<style>
    .article-content {
        max-width: 100%;
    }
    .thumbnail {
        min-width: 180px;
    }
    @media (min-width: 640px) {
        .thumbnail {
            min-width: 300px;
        }
    }
    ol li section {
      margin-top: 0.5rem;
    }
</style>

{{< timeline >}}

{{< timelineItem icon="directus" header="Directus" badge="Aug 18, 2025" >}}
2025 年 8 月 18 日，博客文章用 Headless CMS Directus 管理。请求 API 的 <code><a href="https://github.com/eallion/eallion.com/blob/main/scripts/directus-fetch-all.js" target="_blank" rel="noopener noreferrer">node scripts/directus-fetch-articles.js</a></code>。
{{< /timelineItem >}}

{{< timelineItem icon="code" header="English" badge="Aug 7, 2025" >}}
2025 年 8 月 7 日，取消了多语言配置，只保留了中文版博客。
<br />
现在连中文博客都不写了，更不会学习写英文博客了。一年半的时间，只写一篇英文博客，还是一篇关于 Chrome 插件的更新通知。
{{< /timelineItem >}}

{{< timelineItem icon="aliyun" header="阿里云" badge="Oct 9, 2024" >}}
2024 年 10 月 9 日，Hugo 部署至阿里云 <a href="https://s.e5n.cc/esa" target="_blank" rel="noopener noreferrer">边缘安全加速 ESA</a> Edge Security Acceleration。
{{< /timelineItem >}}

{{< timelineItem icon="shiki" header="Shiki" badge="Aug 15, 2024" >}}
经过 2 个月测试后，把博客的代码语法高亮器切换到 <code><a href="https://github.com/shikijs/shiki" target="_blank" rel="noopener noreferrer">Shiki</a></code>。细节可参考文章：
{{< article link="/hugo-syntax-highlight-shiki/" showSummary=true compactSummary=true >}}
{{< /timelineItem >}}

{{< timelineItem icon="volcengine" header="火山引擎" badge="Jul 20, 2024" >}}
2024 年 7 月 20 日，博客 www 子域名解析到火山引擎实现分区解析，国内解析到阿里云 OSS 和 CDN，国外解析到 Cloudflare Pages。分担 CDN 流量压力。
{{< /timelineItem >}}

{{< timelineItem icon="chart-bar-solid" header="热力图" badge="May 1, 2024" >}}
2024 年 5 月 1 日，博客首页热力图，统计页热力图、统计图、饼图都去掉依赖库和插件。用 CSS 和 JS 实现。生成热力图的细节可参考文章：
{{< article link="/blog-heatmap/" showSummary=true compactSummary=true >}}
{{< /timelineItem >}}

{{< timelineItem icon="hugo" header="主题 Blowfish" badge="Apr 10, 2024" >}}
2024 年 4 月 10 日，Hugo 主题迁移到 <code><a href="https://github.com/nunocoracao/blowfish" target="_blank" rel="noopener noreferrer">blowfish</a></code> 。
{{< /timelineItem >}}

{{< timelineItem icon="code" header="外链跳转" badge="Feb 3, 2024" >}}
2024 年 2 月 3 日，为了防止炸弹人，为博客添加了外部链接跳转提示页面，细节可参考文章：
{{< article link="/hugo-redirect-landing-page/" showSummary=true compactSummary=true >}}
{{< /timelineItem >}}

{{< timelineItem icon="cloudflare" header="Cloudflare" badge="Jan 8, 2024" >}}
2024 年 1 月 8 日，域名转出至 Cloudflare，细节可参考文章：
{{< article link="/2024-blog-refactor/" showSummary=true compactSummary=true >}}
{{< /timelineItem >}}

{{< timelineItem icon="tencent-cloud" header="EdgeOne" badge="Jan 6, 2024" >}}
2024 年 1 月 6 日，Hugo 部署至腾讯云 <code><a href="https://s.e5n.cc/teo" target="_blank" rel="noopener noreferrer">EdgeOne</a></code> ，支持 Anycast。
{{< /timelineItem >}}

{{< timelineItem icon="openai" header="AI 摘要" badge="Jul 18, 2023" >}}
2023 年 7 月 18 日，引入 TianliGPT AI 摘要，因技术和性能问题，后改为用 OpenAI 官方的 ChatGPT 预生成。细节可参考文章：
{{< article link="/ai-summary/" showSummary=true compactSummary=true >}}
{{< /timelineItem >}}

{{< timelineItem icon="code" header="观影页面" badge="Jul 11, 2023" >}}
2023 年 7 月 11 日，因为豆瓣的封闭和不稳定，转为利用 NeoDB API 创建观影页面，细节可参考文章：
{{< article link="/neodb/" showSummary=true compactSummary=true >}}
{{< /timelineItem >}}

{{< timelineItem icon="hugo" header="主题 DoIt" badge="Dec 12, 2022" >}}
2022 年 12 月 12 日，Hugo 主题迁移到 <code><a href="https://github.com/HEIGE-PCloud/DoIt" target="_blank" rel="noopener noreferrer">DoIt</a></code>。
{{< /timelineItem >}}

{{< timelineItem icon="hugo" header="更换 Hugo" badge="Mar 11, 2020" >}}
2020 年 3 月 11 日，博客程序迁移到 Hugo。主题 <code><a href="https://github.com/panr/hugo-theme-hello-friend" target="_blank" rel="noopener noreferrer">theme-hello-friend</a></code>。
{{< /timelineItem >}}

{{< timelineItem icon="star" header="断舍离" badge="Jun 9, 2019" >}}
2019 年 6 月 9 日，注销微博、QQ 空间、知乎、豆瓣及其他国内社交平台账号。部分无法注销的平台则清空内容停止活跃。后因标记观影记录找回豆瓣。
{{< /timelineItem >}}

{{< timelineItem icon="mastodon" header="Mastodon" badge="Apr 22, 2017" >}}
2017 年 4 月初，自建 Mastodon 并加入 <a href="https://mastodon.social/@eallion/3726552" target="_blank" rel="noopener noreferrer">Mastodon.social</a> 官方实例。
{{< /timelineItem >}}

{{< timelineItem icon="github" header="GitHub" badge="May 2, 2012" >}}
2012 年 5 月 2 日，加入 <a href="https://github.com/eallion?tab=overview&from=2012-05-01&to=2012-05-31" target="_blank" rel="noopener noreferrer">GitHub</a> 。
{{< /timelineItem >}}

{{< timelineItem icon="code" header="更换 Typecho" badge="Mar 8, 2011" >}}
2011 年 3 月 8 日，博客程序迁移到 Typecho。
{{< /timelineItem >}}

{{< timelineItem icon="star" header="更换域名" badge="Mar 26, 2010" >}}
2010 年 3 月 26 日，主域名从 <code>eallion.cn</code> 更换为 <code>eallion.com</code>，开始使用 Wordpress。
{{< /timelineItem >}}

{{< timelineItem icon="twitter" header="Twitter" badge="Nov 11, 2009" >}}
2009 年 11 月 11 日，加入 <a href="https://x.com/eallion" target="_blank" rel="noopener noreferrer">Twitter</a> 。目前停止活跃。
{{< /timelineItem >}}

{{< timelineItem icon="steam" header="Steam" badge="Apr 5, 2007" >}}
2007 年 4 月 5 日，加入 <a href="https://steamcommunity.com/id/eallion/badges/1" target="_blank" rel="noopener noreferrer">Steam</a> 。支持正版 CS。
{{< /timelineItem >}}

{{< timelineItem icon="heart-empty" header="生如夏花" badge="Apr 14, 2006" >}}
2006 年，在微软 w.cn 注册 <code>eallion.cn</code> 从 QZone 迁移，开始做个人主页。
在此之前的域名，跟此 ID 无强关联。略过不表。
{{< /timelineItem >}}

{{< /timeline >}}
