# xiaonige.github.io

个人博客静态站点，部署于 GitHub Pages。

## 本地预览

在仓库根目录启动静态文件服务器：

```bash
python -m http.server 4000
```

然后访问：

```text
http://localhost:4000/
```

## 项目结构

- `index.html`：站点首页
- `2023/`、`2026/`：按日期生成的文章页面
- `archives/`、`categories/`、`tags/`：归档、分类和标签页面
- `css/`、`js/`：站点样式和脚本
- `libs/`：前端依赖库
- `medias/`：图片和媒体资源
- `search.xml`：站内搜索索引
