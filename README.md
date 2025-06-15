# RGtools-hub

A Vue 3 + TypeScript + Element Plus project for managing and displaying tools and resources.

## 🚀 部署状态

本项目已配置自动部署到 GitHub Pages。每次推送到 `main` 分支时，GitHub Actions 会自动构建和部署网站。

**访问地址**: [https://Rising-Galaxy.github.io/RGtools-hub/](https://Rising-Galaxy.github.io/RGtools-hub/)

## 📖 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/Rising-Galaxy/RGtools-hub.git
cd RGtools-hub

# 安装依赖
pnpm install

# 构建文档
pnpm run build-docs

# 启动开发服务器
pnpm run dev
```

### 添加新文档

1. 在 `content/` 目录下创建 `.md` 文件
2. 添加 frontmatter 元数据
3. 提交并推送到 `main` 分支
4. 自动部署完成后即可在网站上查看

详细部署说明请查看 [部署指南](./docs/deployment.md)。
