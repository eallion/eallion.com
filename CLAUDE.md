# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Rule

**IMPORTANT**: Always respond in Chinese for all interactions in this repository. Use simplified Chinese (简体中文) for all responses, documentation, comments, and any communication while working with this codebase.

## Overview

This is a Hugo-based personal blog for Charles 'eallion' Chin, using the [Blowfish theme](https://github.com/nunocoracao/blowfish). The site features blog posts, Mastodon feed aggregation, media tracking (NeoDB), and various personal data sections. Content is managed through Directus (headless CMS) and deployed to both Aliyun OSS (China) and Cloudflare Pages (international).

## Repository Structure

```
├── archetypes/         # Hugo content templates
├── assets/            # CSS, images, JS, icons (static assets)
│   ├── css/          # Compiled TailwindCSS + custom styles
│   ├── data/         # Site data files
│   ├── icons/        # SVG icons
│   ├── images/       # Image assets
│   └── js/           # JavaScript files
├── config/_default/  # Hugo configuration (hugo.toml)
├── content/          # Hugo content (mostly empty, content from Directus)
├── data/             # Hugo data files (authors, etc.)
├── directus/         # Directus configuration
├── layouts/          # Hugo templates (custom pages)
├── scripts/          # Node.js scripts for data fetching and automation
├── static/           # Static files served as-is
└── themes/blowfish/  # Blowfish theme (git submodule)
```

## Key Technologies

- **Hugo** (v0.152.2) - Static site generator
- **Blowfish** theme - TailwindCSS-based Hugo theme
- **TailwindCSS** - CSS framework (compiled via Node scripts)
- **Directus** - Headless CMS for content management
- **Node.js** - Scripts for data fetching and automation
- **pnpm** - Package manager

## Common Commands

### Development Workflow

```bash
# Install dependencies
pnpm install

# Initialize theme submodules (after git clone)
pnpm run theme:init

# Start TailwindCSS in watch mode
pnpm run dev

# Fetch Directus data (articles, media, etc.)
pnpm run directus

# Start Hugo dev server with live reload
pnpm run server
```

### Building for Production

```bash
# Build TailwindCSS (production)
pnpm run build

# Build Hugo site
pnpm run hugo

# Or preview with production settings (recommended)
pnpm run preview
```

### Content Management (Directus)

Articles are managed in Directus CMS. To fetch content:

```bash
# Fetch all data from Directus
pnpm run directus

# Fetch specific sections
pnpm run directus:album       # Photo album (Mastodon with #ealbum tag)
pnpm run directus:anynow      # AnyNow feed
pnpm run directus:friendslinks # Friends links
pnpm run directus:goods       # Product recommendations
pnpm run directus:latest      # Latest 10 articles
pnpm run directus:mastodon    # Mastodon feed
pnpm run directus:neodb       # NeoDB media data
pnpm run directus:neodb-count # NeoDB counts
pnpm run directus:penta       # Penta stats
pnpm run directus:penta-count # Penta counts
```

### Theme Management

```bash
# Update theme to latest version
pnpm run theme:update

# Recursively initialize submodules
pnpm run theme:init
```

### Other Utilities

```bash
# Generate syntax highlighting
pnpm run shiki

# Create new post (legacy method - now uses Directus)
pnpm run new

# Prepare husky hooks
pnpm run prepare
```

## Environment Configuration

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DIRECTUS_API_URL` - Directus instance URL
- `DIRECTUS_ACCESS_TOKEN` - Directus authentication token
- `DIRECTUS_S3_URL` - Directus file storage URL
- `ACCESS_KEY_ID` / `ACCESS_KEY_SECRET` - Aliyun OSS credentials
- `ESA_SITE_ID` - Aliyun ESA cache purge ID
- `NEODB_ACCESS_TOKEN` - NeoDB API token

See `.env.example` for complete list.

## Content Architecture

### Primary Content Types

1. **Blog Posts** (`/blog/`) - Managed in Directus, fetched via `directus:articles`
2. **Mastodon Feed** (`/mastodon/`) - Aggregated from personal instance e5n.cc
3. **Media Tracking** (`/media/`) - Movies/books/music from NeoDB
4. **Photo Album** (`/album/`) - Mastodon posts tagged #ealbum
5. **Goods** (`/goods/`) - Product recommendations
6. **Friends Links** (`/links/`) - Friend websites
7. **Penta Stats** (`/penta/`) - Gaming statistics
8. **Now Page** (`/now/`) - Current activities

### Data Flow

1. **Content Creation**: Articles created in Directus CMS
2. **Data Fetching**: Scripts in `/scripts/directus-*.js` fetch data from Directus API
3. **Hugo Build**: Hugo processes templates and generates static files
4. **Deployment**: Deployed to Aliyun OSS (China) via GitHub Actions

### Hugo Configuration

Main config at `config/_default/hugo.toml`:
- Theme: Blowfish
- Base URL: https://www.eallion.com
- Default language: zh-cn
- Chinese language support enabled
- Output formats: HTML, RSS, JSON
- Taxonomies: tags, categories, authors, series

## Theme Customization

**Blowfish theme** is integrated as a git submodule at `themes/blowfish`. **Do not modify theme files directly.**

Customizations:
- **CSS**: Custom styles in `assets/css/custom.css`, compiled TailwindCSS in `assets/css/compiled/main.css`
- **Templates**: Custom layouts in `layouts/_default/` (e.g., `mastodon.html`)
- **Assets**: Icons in `assets/icons/`, images in `assets/images/`

To update theme:
```bash
pnpm run theme:update  # Updates to latest version
```

## Custom Pages and Data

### Custom Layouts

- `layouts/_default/mastodon.html` - Mastodon feed page
- `layouts/_default/section.mastodon.html` - Mastodon section layout
- `layouts/_default/taxonomy.mastodon.html` - Mastodon taxonomy

### Data Directories

- `assets/data/` - Generated data files (from Directus during build)
- `data/authors/` - Author information
- `content/` - Hugo content (mostly empty - content fetched from Directus)

## Git Workflow

**Pre-commit Hook**: `.husky/pre-commit` automatically:
1. Updates Hugo version in configuration files
2. Stages updated files to git

This runs automatically on `git commit`.

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/main.yml`) handles:
- Hugo build (v0.152.2)
- Directus data fetching
- Deployment to Aliyun OSS
- Cache purging for Aliyun ESA

Build triggers:
- Push to `main` branch (full build)
- Manual dispatch (selective builds)
- Scheduled monthly builds

## Deployment Architecture

- **Domestic (China)**: Aliyun OSS + ESA cache
- **International**: Cloudflare Pages
- Backup repositories: GitLab, Codeberg, private Git

See README.md for complete deployment documentation and remote URL configuration.

## Scripts Overview

All scripts are in `/scripts/` directory:

- **directus-*.js**: Fetch data from Directus API
- **husky_hugo_version.js**: Updates Hugo version in config (runs on commit)
- **new_post.js**: Create new post (legacy method)
- **shikify.ts**: Generate syntax highlighting
- **update_hugo.sh**: Update Hugo version
- **update_featured_images.py**: Update featured images

## Development Tips

1. **Always fetch data before building**: Run `pnpm run directus` before `pnpm run hugo`
2. **Use preview mode**: `pnpm run preview` for production-like builds
3. **Watch mode for CSS**: `pnpm run dev` watches for TailwindCSS changes
4. **Selective builds**: Use specific `directus:*` commands for targeted sections
5. **Environment variables**: Required for Directus integration and deployment
6. **Theme updates**: Keep Blowfish theme updated with `pnpm run theme:update`

## License

- Project: GLWTPL (祝你好运公共许可证)
- Hugo: Apache License 2.0
- Blowfish Theme: MIT
