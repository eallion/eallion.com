---
title: "Rime 小狼毫 五笔输入法自定义短语"
categories: ["代码"]
tags: ["rime","小狼毫","五笔","自定义","短语"]
draft: false
slug: "rime-wubi"
date: "2019-04-19 15:45:00"
---

> 最新更新：2021.01.21  [eallion/dotfiles](https://github.com/eallion/dotfiles/tree/windows/Users/eallion/AppData/Roaming/Rime)

### 第一步： 
在文件资源管理器中打开 `%AppData%\Rime` 进入「用户文件夹」，或者通过右键点击任务栏图标进入「用户文件夹」。

### 第二步： 
在用户目录中新建 `Custom_phrase.txt` ，输入以下内容：
```yaml
# Rime table
# coding: utf-8
#@/db_name custom_phrase.txt
#@/db_type tabledb
#
# 用於【五笔拼音】系列輸入方案
#【小狼毫】0.9.21 以上
#
# 請將該文件以 UTF-8 編碼保存爲
# Rime 用戶文件夾/custom_phrase.txt
#
# 碼表各字段以製表符（Tab）分隔
# 順序爲：文字、編碼、權重（決定重碼的次序、可選）
#
# 雖然文本碼表編輯較爲方便，但不適合導入大量條目
#
# no comment
大大的小蜗牛    ddrr    1
```
说明：
- 格式为：`自定义短语` `短语编码` `排序`，如：`大大的小蜗牛    ddrr    1`
- 格式中的`Tab`不能用空格代替
- `# no comment` 之后的内容中`#`注释会失效
- 不宜添加过多的自定义短语，若有大量自定义短语请用用户词典


### 第三步： 
在「用户文件夹」中新建一个文件：`wubi_pinyin.custom.yaml`，一般新建一个跟正在使用的输入方案词典同名的`custom`文件。

### 第四步： 
在`wubi_pinyin.custom.yaml`里添加修改如下代码：
```yaml
patch:
  engine/translators:
    - punct_translator
    - reverse_lookup_translator
    - script_translator
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
说明：不能出现多个`patch`，一个文件中只能出现一次`patch`，多余的需要注释掉。

### 第五步： 
重新部署输入法。

> 附：部分自用设置
```yaml
# https://github.com/rime/home/wiki/CustomizationGuide # Rime 定制指南
# https://github.com/LEOYoon-Tsaw/Rime_collections/blob/master/Rime_description.md # Schema.yaml 详解

patch:
  punctuator/full_shape: # 自定义全角标点符号（覆盖默认设置）
      "/" : "/"
      "%" : "%"
      "*" : "*"
      "|" : "|"
      "<": ["《", "<", "〈", "«", "‹"]
      ">": ["》", ">", "〉", "»", "›"]

  punctuator/half_shape:
      "/" : "/"
      "%" : "%"
      "*" : "*"
      "|" : "|"
      "<": ["《", "<", "〈", "«", "‹"]
      ">": ["》", ">", "〉", "»", "›"]

  recognizer/patterns/reverse_lookup: # 关闭 ` 键的反查功能
    'punctuator/full_shape/`': "`"
    'punctuator/half_shape/`': "`"

  translator/enable_user_dict: false # 用户词典
  translator/enable_completion: false # 逐码提示
  translator/enable_sentence: false # 是否开启自动造句
  # menu/alternative_select_labels: [ ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧, ⑨ ]  # 修改候选標籤
  # menu/alternative_select_labels: [ ❶,❷,❷,❸,❹,❺,❻,❼,❽,❾,❿ ]  # 修改候选標籤
  menu/page_size: 5 # 每页候选词数量
  style/horizontal: false      # false 为候选横排显示
  style/display_tray_icon: false  # 是否显示托盘图标
  # style/font_face: "Noto Sans SC"  # 字体名称，从记事本等处的系统字体对话框里能看到
  # style/font_point: 14     # 字號，只认数字的，不认「五號」、「小五」这样的
  speller/auto_select: false # 取消四码自动上屏
  app_options/code.exe:  # VSCode 里默认用英文输入程序名字全用小写字母
    ascii_mode: true

  "switches/@0/reset": 1 # 1 默认英文状态，0 默认中文状态
  "key_binder/bindings":
    - { when: has_menu, accept: semicolon, send: 2 } # 分号选择第 2 候选词
    - { when: has_menu, accept: apostrophe, send: 3 } # 单引号选择第 2 候选词

  engine/filters:
    - simplifier
    - uniquifier # 过滤重复候选项，依赖 simplifier

  # 自定义短语 Custom_phrase.txt # Tab 不能用空格代替
  engine/translators:
    - punct_translator
    - reverse_lookup_translator
    - script_translator
    - table_translator@custom_phrase
    - table_translator
    
  custom_phrase:
    dictionary: wubi86
    user_dict: custom_phrase
    db_class: stabledb
    enable_completion: false # 提前显示尚未输入完整码的字
    enable_sentence: false # 是否开启自动造句
    initial_quality: 1000 # 优先级，如果想要自定义的词排在前面，这个值尽量设大一点
```
