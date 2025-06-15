#!/usr/bin/env node

/**
 * 部署配置检查脚本
 * 用于验证 GitHub Pages 部署所需的配置是否正确
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function checkFile(filePath, description) {
  const fullPath = path.join(projectRoot, filePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${description}: ${filePath}`);
  return exists;
}

function checkPackageJson() {
  const packagePath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.log('❌ package.json 不存在');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const requiredScripts = ['build', 'build-docs'];
  
  console.log('\n📦 检查 package.json 脚本:');
  let allScriptsExist = true;
  
  requiredScripts.forEach(script => {
    const exists = packageJson.scripts && packageJson.scripts[script];
    console.log(`${exists ? '✅' : '❌'} ${script}: ${exists || '未定义'}`);
    if (!exists) allScriptsExist = false;
  });
  
  return allScriptsExist;
}

function checkViteConfig() {
  const configPath = path.join(projectRoot, 'vite.config.ts');
  if (!fs.existsSync(configPath)) {
    console.log('❌ vite.config.ts 不存在');
    return false;
  }
  
  const configContent = fs.readFileSync(configPath, 'utf8');
  const hasBaseConfig = configContent.includes('base:');
  
  console.log(`${hasBaseConfig ? '✅' : '❌'} Vite base 配置: ${hasBaseConfig ? '已配置' : '未配置'}`);
  
  if (hasBaseConfig) {
    const baseMatch = configContent.match(/base:\s*([^,}]+)/);
    if (baseMatch) {
      console.log(`   配置内容: ${baseMatch[1].trim()}`);
    }
  }
  
  return hasBaseConfig;
}

function main() {
  console.log('🔍 GitHub Pages 部署配置检查\n');
  
  console.log('📁 检查必需文件:');
  const files = [
    ['.github/workflows/deploy.yml', 'GitHub Actions 工作流'],
    ['public/404.html', '404 页面'],
    ['index.html', '主页面'],
    ['content', '文档目录'],
    ['src/generated', '生成文件目录']
  ];
  
  let allFilesExist = true;
  files.forEach(([file, desc]) => {
    if (!checkFile(file, desc)) {
      allFilesExist = false;
    }
  });
  
  console.log('\n⚙️ 检查配置文件:');
  const packageOk = checkPackageJson();
  const viteOk = checkViteConfig();
  
  console.log('\n📋 检查结果总结:');
  const allChecksPass = allFilesExist && packageOk && viteOk;
  
  if (allChecksPass) {
    console.log('✅ 所有检查通过！项目已准备好部署到 GitHub Pages。');
    console.log('\n🚀 下一步:');
    console.log('1. 提交所有更改到 Git');
    console.log('2. 推送到 GitHub 的 main 分支');
    console.log('3. 在 GitHub 仓库设置中启用 Pages (Source: GitHub Actions)');
    console.log('4. 等待 GitHub Actions 完成部署');
  } else {
    console.log('❌ 发现配置问题，请修复后重新检查。');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}