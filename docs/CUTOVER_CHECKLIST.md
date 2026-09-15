# Astro 正式切换检查清单

## 切换前

- [ ] `npm run scan` 通过。
- [ ] `npm run build:formal` 通过。
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

**状态（2026-09-15）：** workflow 已就绪并本地验证，唯一阻塞是当前 PAT 只有 `repo` scope，
无法推送 `.github/workflows/` 下的文件。

### Workflow 行为

一次构建产出单份 Pages 产物（`npm run build:actions`，脚本 `scripts/build-actions-artifact.mjs`）：

- 根目录 `/`：正式站（不含草稿），等同 build:formal。
- `/astro-preview/`：预览站（含草稿），URL 已加前缀（前缀逻辑抽至 `scripts/preview-prefix.mjs`，
  与本地 publish:preview 共用）。
- 自动写 `.nojekyll`。

### 启用步骤（需要带 workflow scope 的 token）

```bash
# 1. 换用带 workflow scope 的 PAT 后：
cd /root/workspace/xiaonige-astro-blog
mkdir -p .github/workflows
cp docs/deploy.github-actions.yml .github/workflows/deploy.yml
git add .github/workflows/deploy.yml
git commit -m "启用 GitHub Pages Actions 自动部署"
git push origin astro-preview
```

```text
2. GitHub 仓库 Settings → Pages → Build and deployment → Source 选 GitHub Actions。
3. 确认 Actions 首次运行成功后，旧的 master 分支 Pages 部署即停止。
4. 此后推 astro-preview 自动发布根站 + 预览；本地 publish:formal / publish:preview 作为备用。
```

## 回滚

若正式切换失败：

1. 将 Pages source 切回当前 master 静态站，或
2. 将 `xiaonige.github.io` master reset 到切换前备份提交，或
3. 恢复 `/root/workspace/xiaonige.github.io` 备份并 push。

