# 🚀 GitHub Pages 部署完整指南

## ✅ 已完成的配置

### 1. GitHub Actions 工作流
- ✅ 创建了 `.github/workflows/deploy.yml`
- ✅ 配置了自动构建和部署流程
- ✅ 支持 pnpm 包管理器
- ✅ 包含文档构建步骤

### 2. Vite 配置
- ✅ 添加了生产环境的 base 路径配置
- ✅ 配置为 `/RGtools-hub/` (适用于 GitHub Pages)

### 3. 单页应用路由支持
- ✅ 创建了 `public/404.html` 处理路由重定向
- ✅ 在 `index.html` 中添加了路由处理脚本

### 4. 项目文档
- ✅ 更新了 `README.md` 包含部署信息
- ✅ 创建了详细的部署文档
- ✅ 添加了部署检查脚本

## 🔧 下一步操作

### 1. 推送代码到 GitHub

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "feat: 配置 GitHub Pages 自动部署

- 添加 GitHub Actions 工作流
- 配置 Vite base 路径
- 添加 SPA 路由支持
- 更新项目文档"

# 推送到 main 分支
git push origin main
```

### 2. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 点击 **Save**

### 3. 等待部署完成

- 推送代码后，GitHub Actions 会自动开始构建
- 在 **Actions** 标签页可以查看构建进度
- 首次部署通常需要 3-5 分钟

### 4. 访问网站

部署完成后，网站将在以下地址可用：
```
https://你的GitHub用户名.github.io/RGtools-hub/
```

## 📝 日常维护流程

### 添加新文档
1. 在 `content/` 目录创建 `.md` 文件
2. 添加 frontmatter 元数据
3. 提交并推送到 `main` 分支
4. 自动部署完成

### 更新网站代码
1. 修改 `src/` 目录下的文件
2. 本地测试：`pnpm run dev`
3. 提交并推送更改
4. 自动部署完成

## 🛠️ 故障排除

### 检查部署状态
```bash
# 运行部署检查脚本
pnpm run check-deployment
```

### 常见问题

1. **部署失败**
   - 检查 GitHub Actions 日志
   - 确保所有依赖正确安装
   - 验证 markdown 文件格式

2. **页面 404**
   - 确认 GitHub Pages 已启用
   - 检查仓库名称和 base 配置
   - 等待部署完全完成

3. **路由不工作**
   - 确认 `404.html` 和路由脚本已正确配置
   - 检查浏览器控制台错误

## 📋 配置文件清单

- ✅ `.github/workflows/deploy.yml` - GitHub Actions 工作流
- ✅ `vite.config.ts` - Vite 配置（包含 base 路径）
- ✅ `public/404.html` - SPA 路由支持
- ✅ `index.html` - 路由处理脚本
- ✅ `package.json` - 构建脚本
- ✅ `scripts/check-deployment.js` - 部署检查工具

## 🎉 完成！

所有配置已完成，现在只需要：
1. 推送代码到 GitHub
2. 启用 GitHub Pages
3. 等待自动部署完成

之后每次推送到 `main` 分支都会自动触发重新部署！