---
authors:
- eallion
categories:
- 代码
date: '2019-05-27 22:08:00'
draft: false
lastmod: '2019-05-27 22:08:00'
slug: jinrishici-for-hitokoto
summary: 最近在手机上安装了一言 app 用于随机显示句子，但默认源缺少纯古诗选项。通过修改 apiConfig.json 配置文件，添加今日诗词 API
  并指定古诗分类，成功实现仅展示律诗和绝句的需求。具体操作包括调整 apiId 和 apiAddress 等参数，确保数据格式匹配且不冲突。
tags:
- app
- 一言
- 诗词
- hitokoto
- 今日诗词
title: 一言 APP 添加 “今日诗词” 官方源 api
---
最近安装了一个在手机屏幕上随机显示一句的 app，最终选择了 [【一言 app】](https://www.coolapk.com/apk/com.hitokoto)

本人比较喜欢律诗和绝句，勉强能接受宋词，但是对所谓的美句无感。  
也就是说超过 14 个字了，不光读起来别扭，排版控制也容易溢出。

但是 app 默认的源，都没有提供纯古诗的源。所以就自己改一下。  

目前 GitHub 上有个诗词项目做的很大，但是我这边用的是 “今日诗词” 的 api。  
修改开始：  

1. 用你习惯的方式修改配置文件，位于：  

```bash
/storage/emulated/0/Android/data/com.hitokoto/files/apiConfig.json
```

2. 按格式添加内容，注意括号、逗号这些  

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

apiId 的值可以按需修改，不要冲突即可。  
api 地址可以在 [https://api.gushi.ci](https://api.gushi.ci) 选择自己喜欢的分类。