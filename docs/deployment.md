# GitHub Pages 部署指南

本项目已配置为自动部署到 GitHub Pages。以下是设置和维护说明：

## 初始设置

### 1. 启用 GitHub Pages

1. 进入 GitHub 仓库设置页面
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "GitHub Actions"
4. 保存设置

### 2. 确保仓库名称正确

确保你的 GitHub 仓库名称为 `RGtools-hub`，或者修改 `vite.config.ts` 中的 `base` 配置：

```typescript
base: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : '/'
```

## 自动部署流程

### 触发条件
- 推送到 `main` 分支
- 创建针对 `main` 分支的 Pull Request

### 部署步骤
1. **代码检出**: 获取最新代码
2. **环境设置**: 安装 Node.js 18 和 pnpm
3. **依赖安装**: 运行 `pnpm install`
4. **文档构建**: 运行 `pnpm run build-docs` 生成文档
5. **项目构建**: 运行 `pnpm run build` 构建生产版本
6. **部署**: 自动部署到 GitHub Pages

## 日常维护

### 添加新文档
1. 在 `content/` 目录下创建新的 `.md` 文件
2. 确保文件包含正确的 frontmatter：
   ```yaml
   ---
   title: "文档标题"
   description: "文档描述"
   category: "分类"
   tags: ["标签1", "标签2"]
   ---
   ```
3. 提交并推送到 `main` 分支
4. GitHub Actions 将自动重新构建和部署

### 更新现有文档
1. 直接编辑 `content/` 目录下的 `.md` 文件
2. 提交并推送更改
3. 自动部署将在几分钟内完成

### 修改网站代码
1. 修改 `src/` 目录下的 Vue 组件或其他代码
2. 本地测试：`pnpm run dev`
3. 提交并推送到 `main` 分支
4. 自动部署将重新构建整个网站

## 本地开发

```bash
# 安装依赖
pnpm install

# 构建文档
pnpm run build-docs

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产版本
pnpm run preview
```

## 故障排除

### 部署失败
1. 检查 GitHub Actions 日志
2. 确保所有依赖都在 `package.json` 中正确声明
3. 验证 `content/` 目录下的 markdown 文件格式正确

### 页面无法访问
1. 确认 GitHub Pages 已启用
2. 检查仓库名称和 `base` 配置是否匹配
3. 等待几分钟让部署完成

### 文档未更新
1. 检查 markdown 文件的 frontmatter 格式
2. 确认文件已正确提交到仓库
3. 查看 GitHub Actions 构建日志

## 访问地址

部署成功后，网站将在以下地址可用：
`https://你的用户名.github.io/RGtools-hub/`

## 注意事项

- 只有推送到 `main` 分支的更改才会触发部署
- 部署过程通常需要 2-5 分钟
- 生成的文件（`src/generated/`）会被自动创建，无需手动提交
- 确保 `.gitignore` 正确配置以避免提交不必要的文件