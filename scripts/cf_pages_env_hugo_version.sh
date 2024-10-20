#!/bin/bash

# 获取 Hugo 版本
HUGO_VERSION=$(curl -s https://hugo.eallion.com/)

# 检查是否成功获取版本
if [ -z "$HUGO_VERSION" ]; then
	echo "Failed to fetch Hugo version from https://hugo.eallion.com/"
	exit 1
fi

# 替换 wrangler.toml 文件中的 HUGO_VERSION
sed -i.bak "s/HUGO_VERSION = \".*\"/HUGO_VERSION = \"$HUGO_VERSION\"/g" wrangler.toml

# 删除备份文件
rm -f wrangler.toml.bak

echo "Updated HUGO_VERSION to $HUGO_VERSION in wrangler.toml"
