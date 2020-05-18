---
title: "一言APP添加“今日诗词”官方源api"
categories: ["代码"]
tags: ["app","一言","诗词","hitokoto","今日诗词"]
draft: false
slug: "jinrishici-for-hitokoto"
date: "2019-05-27 22:08:00"
---

最近安装了一个在手机屏幕上随机显示一句的app，最终选择了[【一言app】](https://www.coolapk.com/apk/com.hitokoto)

本人比较喜欢律诗和绝句，勉强能接受宋词，但是对所谓的美句无感。  
也就是说超过14个字了，不光读起来别扭，排版控制也容易溢出。 
 
但是app默认的源，都没有提供纯古诗的源。所以就自己改一下。  

目前GitHub上有个诗词项目做的很大，但是我这边用的是“今日诗词”的api。  
修改开始：  
1.用你习惯的方式修改配置文件，位于：  

```bash
/storage/emulated/0/Android/data/com.hitokoto/files/apiConfig.json
```


2.按格式添加内容，注意括号、逗号这些  

```bash
{
"apiId":"7",
    "apiName":"今日诗词源",
    "apiAddress":"https:\/\/api.gushi.ci\/all",
    "apiHitokotoKey":"content",
    "apiSourceKey":"origin",
    "resultType":"json"
},
```


apiId的值可以按需修改，不要冲突即可。  
api地址可以在 [https://api.gushi.ci](https://api.gushi.ci) 选择自己喜欢的分类。
