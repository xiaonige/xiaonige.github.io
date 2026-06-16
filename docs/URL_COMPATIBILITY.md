# URL 兼容报告

## 已迁移 2026 文章

Astro 迁移脚本会去掉 Hexo 文件名前缀日期，保持 URL 与 Hexo permalink 一致：

```text
2026-05-20-ai-tools-comparison.md      -> /2026/05/20/ai-tools-comparison/
2026-05-20-github-copilot-guide.md     -> /2026/05/20/github-copilot-guide/
2026-05-20-openclaw-tutorial.md        -> /2026/05/20/openclaw-tutorial/
hermes-agent-tutorial.md               -> /2026/05/24/hermes-agent-tutorial/
ai-llm-terms-for-beginners.md          -> /2026/05/25/ai-llm-terms-for-beginners/
```

## 草稿

```text
design-patterns.md -> /drafts/design-patterns/
```

草稿页带 `noindex,nofollow`，且不进入首页、归档、标签、分类、RSS、search.xml、sitemap.xml。

## 旧内容

正式切换前必须决定 2023 老内容：

- 方案 A：保留旧静态目录并复制到 Astro dist。
- 方案 B：迁移旧文章 Markdown 到 Astro。
- 方案 C：保留旧站作为归档子目录。

当前建议：先采用方案 A，避免破坏历史链接。
