# Directus

[Directus](https://directus.io/) 是一个开源的 Headless CMS，用于构建 API 和内容管理系统。

### Docker 部署

```bash
wget https://raw.githubusercontent.com/eallion/eallion.com/refs/heads/main/directus/compose.yml

vim compose.yml

docker compose up -d
```

获取文章的脚本在目录 `scripts/directus-fetch-articles.js`。需要 Access Token。
