---
title: "Mastodon 同步到 Memos"
authors: ["eallion"]
categories: ["代码"]
tags: 
  - Mastodon
  - Memos
  - Webhook
  - 脚本
slug: "mastodon-sync-to-memos"
summary: "文章介绍了如何使用 Shell 脚本将 Mastodon 上的内容同步到 Memos。作者使用 Shell 脚本实现了这一功能，并提供了详细的配置和操作步骤。脚本会检查最新的 Mastodon 内容，并将其发布到 Memos 上，同时记录 Mastodon ID 和 Memos ID 的绑定关系。同时，作者还分享了自己在使用过程中遇到的问题和解决方案,并给出了具体示例和代码。"
draft: false
Comments: true
date: 2024-03-09T16:57:49+08:00
images: ["/assets/images/og/mastodon-sync-to-memos.png"]
---

> 最新脚本：[https://gist.github.com/eallion/bf8861eb3292c2351c1067fba3198c26](https://gist.github.com/eallion/bf8861eb3292c2351c1067fba3198c26)

> Update：添加宝塔面板的示例。

### TL;DR

直接跳转到本页 [脚本内容](#%E8%84%9A%E6%9C%AC%E5%86%85%E5%AE%B9) 查看脚本代码。

### 前言

不知道是我运气好还是不好，在我准备把 Memos 当成主力工具加入到我的工作流中的时候，遇上了 `v0.19.0` 的版本更新，这次版本更新带来了一系列大坑。除了 Memos 新版本的鲁棒性备受质疑，甚至连搭载它的服务器本身也被影响，我在 64G 内存的物理机上都跑不动它。就像网友所说，Memos 只像是一个练手的项目。果断弃之。Google Keep、Obsidian 这些工具哪里不好了吗？不把所有事务约束在一个工具里确实是麻烦了一点，但是 All in one 基本上也等于是 All in boom。
现在我对 [Memos](https://memos.eallion.com/) 的定位是用来备份我的 [Mastodon](https://e5n.cc/@eallion)（方式之一）。

我一直喜欢 Webhook 这种主动式 Push 的方案，比 RSS、Cron 计划任务这些被动式 Pull 的方案简洁低碳环保，更具有即时性。主要是掌握主动的感觉让人觉得很爽。

下面开始介绍一下 Mastodon 利用 Webhook 同步嘟文到 Memos 的方法。我用的是 Shell Script 脚本，是一个很简单的脚本，只作了一些常识性的逻辑判断，可能不完美。用 Node.js、Python 等都可以实现。

### 已测试版本

- Memos: [`v0.18.2`](https://github.com/usememos/memos/pkgs/container/memos/168812645?tag=0.18.2)
- Mastodon: [`v4.2.8`](https://github.com/mastodon/mastodon/pkgs/container/mastodon/182724379?tag=v4.2.8)

Mastodon 需要自己的实例，或者具有管理员权限能创建 Webhook 的账号才能使用此方法。

### 安装工具

请在服务器上安装工具，若有报错，请根据错误日志安装其他对应工具

- `sudo apt install jq`
- `sudo apt install lynx`

### Webhook 工具

- https://github.com/jkjoy/docker-webhook
- https://github.com/adnanh/webhook
- 宝塔面板 - 软件商店 - 搜索 Webhook 安装
- 1Panel - 未知

Mastodon 前往 `https://{INSTANCE}/admin/webhooks` 创建一个 Webhook。
事件可以只选 `status:created`，回复和转嘟也都算此事件喔。
目的地 URL 就填自己部署的 Webhook 的链接，如：`https://webhook.example.com/hooks/mastodon-sync-to-memos`
宝塔的是：`https://webhook.mybtserver.com:8888/hook?access_key=ACCESSKEY`
Mastodon 的 Webhook 目的地 URL 建议绑定域名，不然 Sidekiq 可能处理不了。

![](/assets/images/posts/2024/03/mastodon-webhook.png)

### 脚本内容

把下方的脚本内容保存到服务器上的一个 `.sh` 文件中，如当前用户的 Home 目录（`~`）的 [`~/mastodon_sync_to_memos.sh`](https://gist.github.com/eallion/bf8861eb3292c2351c1067fba3198c26#file-mastodon_sync_to_memos-sh) 文件中，并配置以下内容，请注意替换：

- `MEMOS_HOST=""`
- `MEMOS_ACCESS_TOKEN=""`
- `MEMOS_VISIBILITY=""`
- `MASTODON_INSTANCE=""`
- `MASTODON_ID=""`
- `SKIP_MASTODON_REPLY=`
- `SKIP_MASTODON_REBLOG=`
- `HOME_DIR=~`
- `FILE_PATH=$HOME_DIR/.mastodon_memos_id.json`

> 查找 Mastodon ID： https://`INSTANCE`/api/v1/accounts/lookup?acct=`USERNAME`

```bash
#!/bin/bash

# 已测试版本: 
# Memos: v0.18.2 
# Mastodon: v4.2.8

# ======================================================
# 配置开始

# Memos Host
MEMOS_HOST=""

# Memos Access Token
MEMOS_ACCESS_TOKEN=""

# 发布 Memos 的可见性 ('PUBLIC', 'PROTECTED', 'PRIVATE') 三选一
MEMOS_VISIBILITY=PUBLIC

# Mastodon Instance
MASTODON_INSTANCE=""

# Mastodon ID, Find ID: https://INSTANCE/api/v1/accounts/lookup?acct=USERNAME
MASTODON_ID=""

# 跳过回复和转嘟
SKIP_MASTODON_REPLY=true
SKIP_MASTODON_REBLOG=true

# 获取当前用户的 Home 目录路径及保存 ID 的文件，保持默认，不用更改
HOME_DIR=~
FILE_PATH=$HOME_DIR/.mastodon_memos_id.json

# 配置结束
# ======================================================

# 以下内容不用更改

# 检查 ID 文件是否存在
if [ ! -f "$FILE_PATH" ]; then
  # 如果文件不存在，则创建文件并写入 JSON 数据
  echo '
{
  "latest_memos_id": "0",
  "latest_mastodon_id": "0",
  "bind": []
}
' > "$FILE_PATH"
  echo "Data file created: $FILE_PATH"
else
  # 如果文件存在，则跳过并进行后续步骤
  echo "Local data exist, skipping..."
fi

# 拼接 API 和 Token
if [[ "$MEMOS_HOST" != */ ]]; then
  MEMOS_HOST="$MEMOS_HOST/"
fi
MEMOS_API_HOST="${MEMOS_HOST}api/v1/memo"
AUTHORIZATION="Bearer ${MEMOS_ACCESS_TOKEN}"

# Memos 获取最新的 Memos ID
MEMOS_URL="${MEMOS_API_HOST}?creatorId=101&rowStatus=NORMAL&limit=1"
LATEST_MEMOS_ID=$(curl --connect-timeout 60 -s $MEMOS_URL | jq -r '.[0].id')

# Mastodon 的 API
if [[ "$MASTODON_INSTANCE" != */ ]]; then
  MASTODON_INSTANCE="$MASTODON_INSTANCE/"
fi
CONTENT_URL="${MASTODON_INSTANCE}api/v1/accounts/${MASTODON_ID}/statuses?limit=1&exclude_replies=${SKIP_MASTODON_REPLY}&exclude_reblogs=${SKIP_MASTODON_REBLOG}"

# Mastodon 最新 Status 的 ID
LATEST_MASTODON_ID=$(curl --connect-timeout 60 -s $CONTENT_URL | jq -r '.[0].id')

# 定义 LOCAL_MEMOS_ID 变量
LOCAL_MEMOS_ID=$(cat "$FILE_PATH" | jq -r '.latest_memos_id')
LOCAL_MASTODON_ID=$(cat "$FILE_PATH" | jq -r '.latest_mastodon_id')

# Webhook 触发时，判断 Mastodon 最新 ID 是否为暂存 ID，防止重复同步
if [ "$LATEST_MASTODON_ID" == "$LOCAL_MASTODON_ID" ]; then
  echo "Mastodon no updated, skipping..."
  echo "Skipped: $(TZ=UTC-8 date +"%Y-%m-%d"" ""%T")"
  echo "============================="
  exit 0
fi

CONTENT=$(curl --connect-timeout 60 -s $CONTENT_URL | jq -r '.[0]')

MEDIA=$(echo $CONTENT | jq -r '.media_attachments')
# 判断 Media 的内容
if [ "$MEDIA" != "null" ]; then
  MEDIAS=$(echo $CONTENT | jq -r '.media_attachments[] | select(.type=="image") | .url')
  # 拼接图片 
  images=""
  for url in $MEDIAS; do 
    images="$images![image]($url)\n"
  done
  TEXT=$(echo "$CONTENT" | jq -r '.content' | lynx -dump -stdin -nonumbers -nolist | tr -d '\n' | sed '/^$/N;s/\n\n/\n/g' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed -E 's/ {2,}/ /g')
  TEXT="$TEXT\n$images"
else
  # 普通内容
  TEXT=$(echo "$CONTENT" | jq -r '.content' | lynx -dump -stdin -nonumbers -nolist | tr -d '\n' | sed '/^$/N;s/\n\n/\n/g' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed -E 's/ {2,}/ /g')
fi

# 判断内容是否为空
if [ -z "$TEXT" ] || [ "$TEXT" == "\\n" ]; then
  echo "Content is empty, skipping..."
  echo "Skipped: $(TZ=UTC-8 date +"%Y-%m-%d"" ""%T")"
  echo "============================="
  exit 0
fi

# 双引号转义
TEXT=$(echo "$TEXT" | sed 's/"/\\"/g')

# Webhook 触发时，判断 Memos 最新 ID 是否为暂存 ID
# 当 Memos 单方面有更新后，验证 Mastodon 和 Memos 的 ID 绑定关系（Todo）
#if [ "$LATEST_MEMOS_ID" == "$LOCAL_MEMOS_ID" ]; then
#  echo "Memos no updated, skipping..."
#  echo "Skipped: $(TZ=UTC-8 date +"%Y-%m-%d"" ""%T")"
#  echo "============================="
# exit 0
#fi

# 对比 Matodon 和 Memos 的 Content 内容的 MD5 值（不一定精确）
# 后期尝试引入 GPT 对比内容
CONTENT_MEMOS=$(curl --connect-timeout 60 -s $MEMOS_URL | jq '.[0].content')
CONTENT_MASTODON=$TEXT

# 获取最新 Memos 的 MD5
LATEST_MEMOS_MD5=$(echo $CONTENT_MEMOS | tr -d '"' | md5sum | cut -d' ' -f1)
# 获取最新 Mastodon 的 MD5
LATEST_TEXT_MD5=$(echo $TEXT | tr -d '"' | md5sum | cut -d' ' -f1)

# 通过 MD5 判断内容是否重复
if [ "$LATEST_TEXT_MD5" == "$LATEST_MEMOS_MD5" ]; then
  echo "Content is duplicate, skipping..."
  echo "Skipped: $(TZ=UTC-8 date +"%Y-%m-%d"" ""%T")"
  echo "============================="
  exit 0
fi

# 替换 NeoDB 的评分 Emoji
TEXT=$(echo "$TEXT" | sed "s/:star_empty:/🌑/g; s/:star_half:/🌗/g; s/:star_solid:/🌕/g")

# 去掉最末尾的空行
TEXT=$(echo "$TEXT" | sed 's/\\n$//')

# 发布 Memos 并获取返回的 JSON 数据
RESPONSE=$(curl -s -X POST \
  -H "Accept: application/json" \
  -H "Authorization: $AUTHORIZATION" \
  -d "{ \"content\": \"$TEXT\", \"visibility\": \"$MEMOS_VISIBILITY\"}" \
  $MEMOS_API_HOST)

# 从返回的 JSON 数据中提取 Memos 的 id 值
NEW_MEMOS_ID=$(echo "$RESPONSE" | jq -r '.id')

# 更新 JSON 文件中的 latest_memos_id 的值
jq ".latest_memos_id = \"$NEW_MEMOS_ID\"" "$FILE_PATH" > "${FILE_PATH}.tmp" && mv "${FILE_PATH}.tmp" "$FILE_PATH"

# 更新 JSON 文件中的 latest_mastodon_id 的值
jq ".latest_mastodon_id = \"$LATEST_MASTODON_ID\"" "$FILE_PATH" > "${FILE_PATH}.tmp" && mv "${FILE_PATH}.tmp" "$FILE_PATH"

# 更新 Mastodon 和 Memos 的 ID 的绑定关系，并确保 "bind" 中的数组保留唯一键，键也只有唯一值
jq ".bind += [{\"$LATEST_MASTODON_ID\": \"$NEW_MEMOS_ID\"}] | .bind = (.bind | unique)" "$FILE_PATH" > "${FILE_PATH}.tmp" && mv "${FILE_PATH}.tmp" "$FILE_PATH"

echo "Sync Mastodon to Memos Successful!"
echo "Done: $(TZ=UTC-8 date +"%Y-%m-%d"" ""%T")"
echo "============================="
```

#### 宝塔面板

宝塔面板如果用 Webhook 插件，可以直接把上面的脚本内容复制到 Webhook 插件的脚本中。不用另外在服务器中手动创建 `.sh` 文件。

![](/assets/images/posts/2024/03/bt-webhook.png)

### JSON 数据文件内容

初次运行脚本，它会在当前用户的 Home 目录 `~` 新建一个文件 `~/.mastodon_memos_id.json` 并初始化，后续此文件会记录 Mastodon ID 和 Memos ID 的绑定关系。如果不想在 Home 目录创建，就需要修改 `HOME_DIR=` 和 `FILE_PATH=` 这两个参数。

```json
{
  "latest_memos_id": "",
  "latest_mastodon_id": "",
  "bind": []
}
```

生产环境产生数据后，示例：

```json
{
  "latest_memos_id": "6231",
  "latest_mastodon_id": "112061852482921394",
  "bind": [
    {
      "112059053750743781": "6230"
    },
    {
      "112061852482921394": "6231"
    }
  ]
}
```
