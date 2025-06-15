---
id: zen-browser
name: Zen Browser
description: 一个基于 Firefox 内核的浏览器
tags:
  - 浏览器
  - Firefox
category: 浏览器
rating: 4.5
website: 'https://zen-browser.app/'
repo: 'https://github.com/zen-browser/desktop'
updatedAt: '2025-06-15'
---

Zen Browser 是一个基于 Firefox 内核的浏览器，它的设计目标是提供一个简洁、快速、安全的浏览器体验。它具有以下特点：

## 特点

- 基于 Firefox 内核，性能出色
- 默认启用隐私模式，不收集任何个人信息
- 支持 HTTPS 加密，不加载不安全的网站
- 多标签页支持
- 扩展支持

## 奇技淫巧

### 修改窗口背景的边框

> 主要是美化使其完全没有背景边框，这种效果在开启简洁模式下特别舒服，因为一整个窗口完全就是一整个网页的覆盖，没有任何额外的内容

1. 先在地址栏打开 `about:config`
2. 然后搜索 `zen.theme.content-element-separation` 将值从默认的 8 改为 0，此时基本上效果就已经达成了
3. 此外还可以根据个人需求改 `zen.theme.border-radius` 的值，以此调整整个浏览器与圆角相关的显示比如悬浮侧边栏等
