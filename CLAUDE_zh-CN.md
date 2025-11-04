# Claude Code 使用指南

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 语言规则

**重要提示**：在此代码库中进行的所有交互都必须使用中文。使用简体中文进行所有响应、文档、注释和任何沟通工作。

## 项目概述

这是 Charles 'eallion' Chin 的基于 Hugo 的个人博客，使用 [Blowfish 主题](https://github.com/nunocoracao/blowfish)。网站包含博客文章、Mastodon 动态聚合、媒体追踪（NeoDB）以及各种个人数据版块。内容通过 Directus（无头 CMS）管理，并部署到阿里云 OSS（中国）和 Cloudflare Pages（国际）。

## 仓库结构

```
├── archetypes/         # Hugo 内容模板
├── assets/            # CSS、图片、JS、图标（静态资源）
│   ├── css/          # 编译后的 TailwindCSS + 自定义样式
│   ├── data/         # 站点数据文件
│   ├── icons/        # SVG 图标
│   ├── images/       # 图片资源
│   └── js/           # JavaScript 文件
├── config/_default/  # Hugo 配置文件（hugo.toml）
├── content/          # Hugo 内容（大部分为空，内容来自 Directus）
├── data/             # Hugo 数据文件（作者等）
├── directus/         # Directus 配置
├── layouts/          # Hugo 模板（自定义页面）
├── scripts/          # Node.js 脚本用于数据获取和自动化
├── static/           # 静态文件，原样提供
└── themes/blowfish/  # Blowfish 主题（git 子模块）
```

## 核心技术栈

- **Hugo** (v0.152.2) - 静态站点生成器
- **Blowfish** 主题 - 基于 TailwindCSS 的 Hugo 主题
- **TailwindCSS** - CSS 框架（通过 Node 脚本编译）
- **Directus** - 内容管理的无头 CMS
- **Node.js** - 数据获取和自动化脚本
- **pnpm** - 包管理器

## 常用命令

### 开发工作流

```bash
# 安装依赖
pnpm install

# 初始化主题子模块（git clone 后）
pnpm run theme:init

# 启动 TailwindCSS 监听模式
pnpm run dev

# 获取 Directus 数据（文章、媒体等）
pnpm run directus

# 启动 Hugo 开发服务器（热重载）
pnpm run server
```

### 生产构建

```bash
# 构建 TailwindCSS（生产环境）
pnpm run build

# 构建 Hugo 站点
pnpm run hugo

# 或预览模式（推荐，类似生产环境）
pnpm run preview
```

### 内容管理（Directus）

文章在 Directus CMS 中管理。获取内容：

```bash
# 从 Directus 获取所有数据
pnpm run directus

# 获取特定版块
pnpm run directus:album       # 照片相册（带 #ealbum 标签的 Mastodon）
pnpm run directus:anynow      # AnyNow 动态
pnpm run directus:friendslinks # 友情链接
pnpm run directus:goods       # 好物推荐
pnpm run directus:latest      # 最新 10 篇文章
pnpm run directus:mastodon    # Mastodon 动态
pnpm run directus:neodb       # NeoDB 媒体数据
pnpm run directus:neodb-count # NeoDB 统计数据
pnpm run directus:penta       # 五杀数据
pnpm run directus:penta-count # 五杀统计数据
```

### 主题管理

```bash
# 更新主题到最新版本
pnpm run theme:update

# 递归初始化子模块
pnpm run theme:init
```

### 其他工具

```bash
# 生成语法高亮
pnpm run shiki

# 创建新文章（旧方法 - 现在使用 Directus）
pnpm run new

# 准备 husky 钩子
pnpm run prepare
```

## 环境配置

从 `.env.example` 创建 `.env.local`：

```bash
cp .env.example .env.local
```

必需的环境变量：
- `DIRECTUS_API_URL` - Directus 实例 URL
- `DIRECTUS_ACCESS_TOKEN` - Directus 认证令牌
- `DIRECTUS_S3_URL` - Directus 文件存储 URL
- `ACCESS_KEY_ID` / `ACCESS_KEY_SECRET` - 阿里云 OSS 凭证
- `ESA_SITE_ID` - 阿里云 ESA 缓存清除 ID
- `NEODB_ACCESS_TOKEN` - NeoDB API 令牌

完整的变量列表请查看 `.env.example`。

## 内容架构

### 主要内容类型

1. **博客文章** (`/blog/`) - 在 Directus 中管理，通过 `directus:articles` 获取
2. **Mastodon 动态** (`/mastodon/`) - 来自个人实例 e5n.cc 的聚合
3. **媒体追踪** (`/media/`) - 来自 NeoDB 的电影/书籍/音乐
4. **照片相册** (`/album/`) - 带有 #ealbum 标签的 Mastodon 帖子
5. **好物推荐** (`/goods/`) - 产品推荐
6. **友情链接** (`/links/`) - 好友网站
7. **五杀数据** (`/penta/`) - 游戏统计
8. **现在页面** (`/now/`) - 当前活动

### 数据流

1. **内容创建**：在 Directus CMS 中创建文章
2. **数据获取**：`/scripts/directus-*.js` 中的脚本从 Directus API 获取数据
3. **Hugo 构建**：Hugo 处理模板并生成静态文件
4. **部署**：通过 GitHub Actions 部署到阿里云 OSS

### Hugo 配置

主配置文件位于 `config/_default/hugo.toml`：
- 主题：Blowfish
- 基础 URL：https://www.eallion.com
- 默认语言：zh-cn
- 启用中文语言支持
- 输出格式：HTML、RSS、JSON
- 分类法：标签、分类、作者、系列

## 主题自定义

**Blowfish 主题**作为 git 子模块集成在 `themes/blowfish`。**请勿直接修改主题文件。**

自定义方式：
- **CSS**：`assets/css/custom.css` 中的自定义样式，`assets/css/compiled/main.css` 中的编译后 TailwindCSS
- **模板**：`layouts/_default/` 中的自定义布局（如 `mastodon.html`）
- **资源**：`assets/icons/` 中的图标，`assets/images/` 中的图片

更新主题：
```bash
pnpm run theme:update  # 更新到最新版本
```

## 自定义页面和数据

### 自定义布局

- `layouts/_default/mastodon.html` - Mastodon 动态页面
- `layouts/_default/section.mastodon.html` - Mastodon 章节布局
- `layouts/_default/taxonomy.mastodon.html` - Mastodon 分类法

### 数据目录

- `assets/data/` - 生成的数据文件（构建时从 Directus 获取）
- `data/authors/` - 作者信息
- `content/` - Hugo 内容（大部分为空 - 内容从 Directus 获取）

## Git 工作流

**预提交钩子**：`.husky/pre-commit` 自动执行：
1. 更新配置文件中的 Hugo 版本
2. 将更新的文件添加到 git

这在 `git commit` 时自动运行。

## CI/CD 流水线

GitHub Actions 工作流（`.github/workflows/main.yml`）处理：
- Hugo 构建（v0.152.2）
- Directus 数据获取
- 部署到阿里云 OSS
- 阿里云 ESA 缓存清除

构建触发器：
- 推送到 `main` 分支（全量构建）
- 手动触发（选择性构建）
- 定时月度构建

## 部署架构

- **国内（中国）**：阿里云 OSS + ESA 缓存
- **国际**：Cloudflare Pages
- **备份仓库**：GitLab、Codeberg、私有 Git

完整的部署文档和远程 URL 配置请查看 README.md。

## 脚本概述

所有脚本位于 `/scripts/` 目录：

- **directus-*.js**：从 Directus API 获取数据
- **husky_hugo_version.js**：更新配置中的 Hugo 版本（提交时运行）
- **new_post.js**：创建新文章（旧方法）
- **shikify.ts**：生成语法高亮
- **update_hugo.sh**：更新 Hugo 版本
- **update_featured_images.py**：更新特色图片

## 开发提示

1. **构建前务必获取数据**：在 `pnpm run hugo` 前运行 `pnpm run directus`
2. **使用预览模式**：`pnpm run preview` 进行类似生产环境的构建
3. **CSS 监听模式**：`pnpm run dev` 监听 TailwindCSS 变化
4. **选择性构建**：使用特定的 `directus:*` 命令针对特定版块
5. **环境变量**：Directus 集成和部署需要
6. **主题更新**：使用 `pnpm run theme:update` 保持 Blowfish 主题最新

## 许可证

- 项目：GLWTPL（祝你好运公共许可证）
- Hugo：Apache License 2.0
- Blowfish 主题：MIT
