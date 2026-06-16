# Xiaonige 博客 Astro 迁移计划

## Phase 0：试点目录

状态：已完成 MVP。

- [x] 创建 `/root/workspace/xiaonige-astro-blog`
- [x] 建立 Astro 基础项目
- [x] 建立内容集合 `posts/drafts`
- [x] 首页卡片
- [x] 今日诗词
- [x] 文章页
- [x] 归档页
- [x] 分类页
- [x] 标签页
- [x] search.xml
- [x] rss.xml
- [x] 敏感词扫描
- [x] Hexo 文章迁移脚本
- [x] GitHub Pages workflow 草案

## Phase 1：设计打磨

- [ ] 首页视觉继续个性化
- [ ] 深色/浅色切换
- [ ] 文章目录 TOC
- [ ] 代码块复制按钮
- [ ] PlantUML/Mermaid 渲染策略
- [ ] 图片资源迁移策略
- [ ] 诗词模块改为本地诗词池或 API + 构建缓存

## Phase 2：内容迁移

- [ ] 审核 2026+ 所有文章 front matter
- [ ] 迁移封面图
- [ ] 迁移设计模式草稿
- [ ] 生成 slug 对照表
- [ ] 旧 Hexo URL 与 Astro URL 对齐

## Phase 3：发布验证

- [ ] 建临时 Pages 环境
- [ ] 验证首页/归档/标签/分类/search/rss
- [ ] Lighthouse/SEO 检查
- [ ] 404 与旧链接检查
- [ ] 发布回滚策略

## Phase 4：正式切换

- [ ] 冻结 Hexo 新发布
- [ ] Astro 全量构建
- [ ] 备份当前 `xiaonige.github.io`
- [ ] 切换 GitHub Pages source 到 Actions
- [ ] 监控缓存刷新和搜索索引

