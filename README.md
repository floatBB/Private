# Astro 极简站点

一个轻量的个人发布站点骨架：写 Markdown 就能发内容，需要交互演示时嵌入 React 组件。页面默认接近零 JS，只有放了演示的地方才按需加载。

## 技术

- Astro 5 + MDX
- React（仅作「岛屿」按需加载）
- 纯 CSS，无 UI 框架

## 本地运行

需要 Node 18+（推荐 20+）。

```bash
npm install
npm run dev
```

打开 http://localhost:4321 。

## 发布内容

在 `src/content/posts/` 下新建一个 `.mdx` 文件：

```mdx
---
title: "标题"
description: "一句话描述，会显示在首页列表"
date: 2026-11-21
---

正文用 Markdown 写。
```

`description` 就是首页列表里的那行小字。`draft: true` 可以暂时隐藏一篇。

## 嵌入交互演示

在文章顶部 import 一个 React 组件，然后在正文里放：

```mdx
import Demo from '../../components/demo/Demo.tsx';

<Demo client:visible />
```

- `client:visible` = 组件滚到屏幕上时才加载，页面其余部分仍是纯 HTML。
- 组件放在 `src/components/` 下，示例见 `src/components/demo/`（一个视频导出设置的小工具，含数字滚动和进度条，可以照着改）。

## 改标题和简介

编辑 `src/site.ts`。

## 改颜色和字体

编辑 `src/styles/global.css` 顶部的 `:root` 变量。当前用了一组「编辑台」风格：近白底、墨色正文、宋体排印，唯一的强调色是录制指示灯的红。

## 首页的时间码

首页列表左侧的 `00:00:00:00` 是装饰性序号（视频时间码风格）。不想要的话，在 `src/site.ts` 里把 `timecode` 改成 `false`，会退回显示日期。

## 部署

构建产物在 `dist/`，任何静态托管都行：

- **Netlify / Vercel**：连 Git 仓库，构建命令 `npm run build`，输出目录 `dist`
- **GitHub Pages**：参考 Astro 官方部署指南

部署前记得把 `astro.config.mjs` 里的 `site` 改成你自己的域名。

## 目录结构

```
src/
  content/posts/     文章（.mdx）
  components/        React 演示组件
  layouts/           页面布局
  pages/             路由（首页、文章页）
  styles/global.css  全部样式
  lib/timecode.ts    时间码与日期格式化
  site.ts            站点信息
```
