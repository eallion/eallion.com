# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site blog (eallion.com) that uses a custom theme called "pehtheme" and integrates with multiple external services including Directus CMS, Mastodon, NeoDB, and various APIs. The site is deployed to both Cloudflare Pages and Alibaba Cloud OSS.

## Key Technologies

- **Hugo**: Static site generator (v0.116.0+)
- **TailwindCSS v4**: CSS framework with custom build process
- **Directus**: Headless CMS for content management
- **Node.js**: Build scripts and API integrations
- **pnpm**: Package manager

## Development Commands

### Core Development

```bash
# Start development server with live reload
pnpm run dev

# Build for production
pnpm run build

# Clean all generated files
pnpm run clean
```

### Content Management

```bash
# Fetch all content from Directus CMS
pnpm run directus

# Fetch specific data types
pnpm run directus:article      # Blog articles
pnpm run directus:mastodon     # Mastodon posts
pnpm run directus:neodb        # NeoDB book/movie data
pnpm run directus:friendslinks # Friends links
pnpm run directus:album        # Photo albums
```

### Theme Management

```bash
# Initialize git submodules for theme
pnpm run theme:init

# Update theme to latest version
pnpm run theme:update
```

### Utility Scripts

```bash
# Create new blog post
pnpm run new

# Generate LLMs.txt file
pnpm run llms
```

## Architecture

### Content Flow

1. **Primary CMS**: Directus manages all blog content, articles are fetched via API
2. **Static Generation**: Hugo builds static site from fetched content
3. **CSS Pipeline**: TailwindCSS v4 compiles from `assets/css/input.css` to `assets/css/main.css`
4. **Deployment**: GitHub Actions deploy to multiple platforms

### Directory Structure

- `content/`: Hugo content files (blog posts in markdown)
- `assets/css/`: TailwindCSS source and compiled styles
- `assets/data/`: JSON data fetched from APIs (generated during build)
- `scripts/`: Node.js build scripts and API integrations
- `layouts/`: Hugo template overrides
- `static/`: Static assets served as-is

### External Integrations

- **Directus CMS**: Primary content management via REST API
- **Mastodon (e5n.cc)**: Social media posts for "嘀咕" page
- **NeoDB**: Book and movie tracking data
- **Cloudflare Pages**: Primary hosting
- **Alibaba Cloud OSS**: Secondary hosting for China

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure required API tokens and endpoints:
   - `DIRECTUS_API_URL`: Directus CMS endpoint
   - `DIRECTUS_ACCESS_TOKEN`: API authentication token
   - `NEODB_ACCESS_TOKEN`: NeoDB API access
   - Additional tokens for various integrations

## Build Process

1. **CSS Compilation**: TailwindCSS v4 processes `assets/css/input.css`
2. **Content Fetching**: Scripts pull data from Directus and other APIs
3. **Hugo Build**: Static site generation with minification
4. **Deployment**: Automated via GitHub Actions

## Key Files to Understand

- `hugo.toml`: Main Hugo configuration with site settings, menus, and build options
- `package.json`: Scripts and dependencies for the build process
- `scripts/directus-fetch-*.js`: API integration scripts for different data sources
- `assets/css/input.css`: TailwindCSS entry point with custom configurations

## Theme Customization

The project uses a git submodule for the "pehtheme" Hugo theme. Customizations should be made in:

- `layouts/`: Template overrides
- `assets/css/custom.css`: Custom styles
- `static/`: Custom static assets

## Important Notes

- Content is primarily managed through Directus CMS, not local markdown files
- The build process automatically fetches fresh data from all APIs
- TailwindCSS v4 has a different build process than previous versions
- Site supports Chinese content with CJK language configuration
