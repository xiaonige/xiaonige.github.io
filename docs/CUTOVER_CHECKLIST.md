# Astro 正式切换检查清单

## 切换前

- [ ] `npm run scan` 通过。
- [ ] `npm run build` 通过。
- [ ] `npm run check:links` 通过。
- [ ] `dist/sitemap.xml` 存在。
- [ ] `dist/rss.xml` 存在。
- [ ] `dist/search.xml` 存在。
- [ ] `dist/robots.txt` 存在。
- [ ] 首页、归档、标签、分类、关于、文章页人工验收。
- [ ] 草稿页确认不进入 search/rss/sitemap。
- [ ] 敏感词扫描词库复核。
- [ ] 备份 `/root/workspace/xiaonige.github.io` 当前 master。
- [ ] 确认旧 2023 页面保留策略：要么继续保留静态目录，要么迁移旧文源文。

## URL 兼容

当前 Astro 已保持 2026 文章 URL 结构：

```text
/:year/:month/:day/:slug/
```

正式切换前必须比对：

```bash
find /root/workspace/xiaonige.github.io/2026 -path '*/index.html'
find /root/workspace/xiaonige-astro-blog/dist/2026 -path '*/index.html'
```

## GitHub Pages 切换方案

推荐使用 GitHub Actions 发布 `dist`，不要本地手动覆盖。

当前 token 无 workflow scope，所以 workflow 文件保存在：

```text
docs/deploy.github-actions.yml
```

正式启用时将它复制到：

```text
.github/workflows/deploy.yml
```

然后在 GitHub 仓库 Settings → Pages 中选择 GitHub Actions。

## 回滚

若正式切换失败：

1. 将 Pages source 切回当前 master 静态站，或
2. 将 `xiaonige.github.io` master reset 到切换前备份提交，或
3. 恢复 `/root/workspace/xiaonige.github.io` 备份并 push。

