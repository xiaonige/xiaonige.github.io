# Xiaonige Astro Blog Publisher

这是 `xiaonige.github.io` 的 2026+ 新博客发布器试点，采用 Astro 静态站点生成。

## 当前目标

- 新建目录试点，不破坏现有 Hexo/Matery 线上站。
- 先落地发布器，再逐步迁移文章。
- 核心功能优先：
  - 首页卡片
  - 今日诗词
  - 文章详情页
  - 归档
  - 分类
  - 标签
  - search.xml
  - rss.xml
  - GitHub Pages workflow 草案
- 音乐模块暂缓，仅在页脚预留说明。

## 目录结构

```text
src/content/posts/       # 已发布文章 Markdown
src/content/drafts/      # 草稿文章 Markdown
src/pages/               # Astro 页面路由
src/components/          # 首页卡片、诗词等组件
src/layouts/             # 全局布局
src/lib/                 # 文章工具函数、站点配置
scripts/                 # 迁移、敏感词扫描脚本
.github/workflows/       # GitHub Pages Actions 草案
```

## 已迁移内容

已从 `/root/workspace/xiaonige-blog/source/_posts` 迁移 5 篇 2026 文章到 `src/content/posts`。

## 常用命令

```bash
npm run migrate:hexo   # 从旧 Hexo 源目录迁移 2026+ 文章
npm run scan           # 敏感词扫描
npm run build          # 扫描 + Astro 构建
npm run dev            # 本地开发预览
npm run preview        # 预览 dist
```

## 发布策略草案

短期：只在本目录构建验证，不推送覆盖现有 `xiaonige.github.io`。

中期：新建 GitHub 仓库或新分支，启用 GitHub Pages Actions，验证 Astro 站完整功能。

长期：确认旧链接、SEO、归档、标签、搜索都稳定后，再决定是否将 Astro 输出接管 `xiaonige.github.io`。

## 安全策略

`scripts/sensitive-scan.mjs` 会在构建前扫描文章内容，命中敏感词则拒绝构建。

