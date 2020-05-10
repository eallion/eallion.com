---
title: "Rime 小狼毫 五笔输入法自定义短语"
categories: ["代码"]
tags: ["rime","小狼毫","五笔","自定义","短语"]
draft: false
slug: "rime-wubi"
date: "2019-04-19 15:45:00"
---

1.在文件资源管理器中打开 `%AppData%\Rime` 进入[用户文件夹]  
2.在目录中新建 `Custom_phrase.txt` ，输入以下内容：
```
# Rime table
# coding: utf-8
#@/db_name custom_phrase.txt
#@/db_type tabledb
#
# 用於【五笔拼音】系列輸入方案
# 【小狼毫】0.9.21 以上
#
# 請將該文件以UTF-8編碼保存爲
# Rime用戶文件夾/custom_phrase.txt
#
# 碼表各字段以製表符（Tab）分隔
# 順序爲：文字、編碼、權重（決定重碼的次序、可選）
#
# 雖然文本碼表編輯較爲方便，但不適合導入大量條目
#
# no comment
大大的小蜗牛	ddrr	1
```

3.在 `build` 文件夹下打开 `wubi_pinyin.schema.yaml`  
4.在 `translators` 里添加修改如下代码（多增少补）：
```bash
translators:
    - punct_translator
    - reverse_lookup_translator
    - table_translator@custom_phrase
    - table_translator
custom_phrase: 
    dictionary: ""
    user_dict: custom_phrase
    db_class: stabledb
    enable_completion: false
    enable_sentence: false
    initial_quality: 1
```
5.开始菜单-小狼毫输入法-重新部署
