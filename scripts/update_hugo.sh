#!/bin/bash

# --------------------------------------------------------------------------
# Hugo 自动更新脚本 V3 (新增版本对比逻辑)
# --------------------------------------------------------------------------

# 1. 配置变量
HUGO_VERSION_URL="https://raw.githubusercontent.com/nunocoracao/blowfish/refs/heads/main/release-versions/hugo-latest.txt"
HUGO_RELEASE_BASE="https://github.com/gohugoio/hugo/releases/download"

# 2. 获取目标版本号
echo "=> 正在获取最新的 Hugo Extended 版本号..."
TARGET_VERSION=$(curl -sSL $HUGO_VERSION_URL | tr -d '\r\n')

if [ -z "$TARGET_VERSION" ]; then
    echo "❌ 错误：未能从 URL 获取到版本号。请检查 URL 或网络连接。"
    exit 1
fi

echo "✅ 目标版本: $TARGET_VERSION"

# 3. 检查当前已安装版本并进行对比

CURRENT_VERSION=""

# 尝试获取当前安装的 Hugo 版本
if command -v hugo &> /dev/null; then
    # 提取 hugo version 输出中的版本号，例如 "v0.152.2"
    CURRENT_VERSION=$(hugo version | awk '{print $2}' | cut -d- -f1)
fi

echo "ℹ️ 当前版本: ${CURRENT_VERSION:-未安装}"

# 比较版本号
if [ -n "$CURRENT_VERSION" ] && [ "$CURRENT_VERSION" == "$TARGET_VERSION" ]; then
    echo "👍 当前已安装的 Hugo 版本 ($CURRENT_VERSION) 与目标版本一致。无需更新。"
    exit 0
fi

# 如果 CURRENT_VERSION 是空字符串（未安装）或者版本不一致，则继续安装/更新流程

# 4. 确定当前系统和执行更新

# --- macOS (使用 Homebrew) ---
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "=> 操作系统检测为: macOS"
    if command -v brew &> /dev/null; then
        echo "=> 正在使用 Homebrew 升级 Hugo..."
        # Homebrew upgrade 也可以处理未安装的情况
        if brew upgrade hugo; then
            echo "✅ Homebrew 升级操作已成功执行。"
        else
            echo "❌ 错误: Homebrew 升级失败。"
        fi
    else
        echo "❌ 错误: macOS 系统中未检测到 Homebrew。无法自动更新。"
    fi

# --- Ubuntu/Debian Linux (使用 dpkg 安装 .deb 文件) ---
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if grep -qE 'Debian|Ubuntu' /etc/os-release 2>/dev/null; then
        echo "=> 操作系统检测为: Linux (Ubuntu/Debian)"

        HUGO_FILENAME="hugo_extended_${TARGET_VERSION//v/}_linux-amd64.deb"
        DOWNLOAD_URL="$HUGO_RELEASE_BASE/$TARGET_VERSION/$HUGO_FILENAME"
        TEMP_DIR=$(mktemp -d)
        DOWNLOAD_PATH="$TEMP_DIR/$HUGO_FILENAME"

        echo "=> 正在下载: $DOWNLOAD_URL"
        
        # 使用 wget 或 curl 下载
        if command -v wget &> /dev/null; then
            sudo wget -q --show-progress -O "$DOWNLOAD_PATH" "$DOWNLOAD_URL"
        elif command -v curl &> /dev/null; then
            sudo curl -sSL -o "$DOWNLOAD_PATH" "$DOWNLOAD_URL"
        else
            echo "❌ 错误: 缺少 wget 或 curl 命令。无法下载文件。"
            rm -rf "$TEMP_DIR"
            exit 1
        fi

        if [ $? -ne 0 ]; then
            echo "❌ 错误：下载失败，请检查版本号或链接是否正确。"
            rm -rf "$TEMP_DIR"
            exit 1
        fi

        echo "=> 正在安装/更新 Hugo Extended..."
        sudo dpkg -i "$DOWNLOAD_PATH"
        sudo apt-get install -f -y # 解决依赖问题

        rm -rf "$TEMP_DIR"
        echo "✅ Hugo Extended 更新/安装完成。"

    else
        echo "⚠️ 警告: 检测到非 Ubuntu/Debian Linux 发行版。请手动添加兼容代码。"
    fi

# --- Windows (使用 Scoop 或 Winget) ---
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "win32" ]]; then
    echo "=> 操作系统检测为: Windows (Shell 环境)"

    if command -v scoop &> /dev/null; then
        echo "=> 正在使用 Scoop 更新 Hugo Extended..."
        scoop update hugo-extended # scoop upgrade 也会处理版本对比
        echo "✅ Scoop 更新操作已执行，请检查输出确认是否成功。"
    elif command -v winget &> /dev/null; then
        echo "=> 正在使用 Winget 更新 Hugo Extended..."
        winget upgrade --id Hugo.Hugo.Extended -e # winget upgrade 也会处理版本对比
        echo "✅ Winget 更新操作已执行，请检查输出确认是否成功。"
    else
        echo "❌ 错误: Windows 系统中未检测到 Scoop 或 Winget 包管理器。无法自动更新。"
    fi

# --- 其他系统预留 ---
else
    echo "⚠️ 警告: 检测到未兼容的操作系统 ($OSTYPE)。请手动添加兼容代码。"
fi

# 5. 验证安装
echo ""
echo "=> 正在验证安装版本..."
hugo version
