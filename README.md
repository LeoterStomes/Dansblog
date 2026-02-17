# Dan's Blog

A static Astro + Tailwind personal blog for research notes, engineering workflows, and reproducible long-form writing.

English is the primary README language. A Simplified Chinese brand-style summary is included at the end.

[![Visit Live Site](https://img.shields.io/badge/Visit-Live%20Site-0f766e?style=for-the-badge&logo=cloudflare&logoColor=white)](https://dansblog.pages.dev/)
[![View GitHub Repository](https://img.shields.io/badge/GitHub-Repository-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dancncn/DansBlog)
[![Blog](https://img.shields.io/badge/Open-Blog-1d4ed8?style=for-the-badge)](https://dansblog.pages.dev/blog/)
[![Tags](https://img.shields.io/badge/Open-Tags-6d28d9?style=for-the-badge)](https://dansblog.pages.dev/tags/)

## Main Site

Primary access is **Cloudflare Pages**: `https://dansblog.pages.dev/`.

GitHub Pages (`https://dancncn.github.io/DansBlog/`) is kept as a mirror deployment for redundancy and compatibility testing.

## Features 🚀

A practical stack for writing, documenting, and maintaining a technical blog over time: 📚 structured content, 🛠️ reusable UI primitives, and stable behavior under real navigation and rendering conditions.

- Static-first blog with Astro Content Collections (`.md` + `.mdx`)
- Structured long-form pages: Home, Blog, Tags, Important, Links, About
- Reusable list UI (`PostCard`, `TagBadges`, `Pagination`)
- Article TOC system: desktop sticky sidebar + mobile drawer
- Language switch support for paired CN/EN posts
- Repo-page and root-path deployment support (GitHub Pages + Cloudflare Pages)

## System Architecture 🧱

### Content Pipeline

- Source: `src/content/blog/`
- Schema: `src/content.config.ts`
- Post route: `src/pages/blog/[...slug].astro`
- Rendering: `render(post)` returns both `Content` and `headings`
- Layout composition: `src/layouts/BlogPost.astro`

### UI Composition

- Global shell: `BaseHead` + `Header` + `Footer`
- Navigation and drawers: `Header`, `MobileDrawer`, `TocDrawer`
- Post list primitives: `PostCard`, `TagBadges`, `Pagination`
- TOC stack: `Toc`, `TocSidebar`, `TocDrawer`

### Routing Map

- `/`
- `/blog/`
- `/blog/page/n/`
- `/blog/<slug>/`
- `/tags/` and `/tags/<tag>/`
- `/important/`
- `/links/`
- `/about/`

## Project Structure 📁

```text
.
├─ public/
│  ├─ image/                    # Static images (hero, avatars, article images)
│  └─ pdfs/                     # PDF files
├─ src/
│  ├─ components/
│  │  ├─ BaseHead.astro         # Metadata, fonts, ViewTransitions entry
│  │  ├─ Header.astro           # Global nav, social actions, theme toggle, TOC trigger
│  │  ├─ MobileDrawer.astro     # Mobile navigation drawer
│  │  ├─ PostCard.astro         # Reusable post list card
│  │  ├─ TagBadges.astro        # Responsive tag rendering rules
│  │  ├─ Pagination.astro       # Paged navigation with ellipsis logic
│  │  ├─ Toc*.astro             # TOC list/sidebar/drawer
│  │  └─ ...
│  ├─ content/
│  │  └─ blog/                  # Markdown/MDX posts
│  ├─ data/
│  │  ├─ links.ts               # Links dataset
│  │  ├─ navLinks.ts            # Navigation source
│  │  └─ quotes.json            # Terminal quote data
│  ├─ layouts/
│  │  └─ BlogPost.astro         # Article layout + TOC + runtime behavior
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ blog/
│  │  ├─ tags/
│  │  ├─ important/
│  │  ├─ links/
│  │  └─ about.astro
│  ├─ styles/
│  │  └─ global.css             # Typography, motion, stability and prose rules
│  ├─ consts.ts
│  └─ content.config.ts
├─ astro.config.mjs
├─ tailwind.config.mjs
└─ README.md
```

## Engineering Decisions 🛠️

### 1) Base-Path Safe Deployments

The same codebase runs in two environments:

- Cloudflare Pages root path (`/`)
- GitHub Pages repo subpath (`/DansBlog/`)

`astro.config.mjs` resolves `base`/`site` from environment flags (`CF_PAGES`, `NODE_ENV`), and markdown image URLs are base-adjusted in the pipeline for cross-host consistency.

### 2) Post Entry Stability Over Fancy Morphing

Code-heavy pages are sensitive to timing between transitions and late style/font arrival. For list → post navigation, the project intentionally prefers deterministic entry:

- `reloadOnNavigate={true}` adds `data-astro-reload` on post cards
- CSS `page-fade-in` keeps visual continuity
- View Transitions remain enabled for general route changes

### 3) Code Block and Font Reflow Control

`global.css` and `BaseHead.astro` apply a stability-first strategy:

- no `max-content` sizing in code block flow
- stable code metrics (`line-height: 1.6`, ligatures disabled)
- container-level horizontal overflow
- font policy split by role:
  - Inter + Noto Serif SC: `display=swap`
  - JetBrains Mono: `display=optional`

### 4) TOC Geometry and Rebinding

Desktop TOC stays in a dedicated sticky column; a placeholder keeps geometry stable when headings are absent. TOC scripts rebind on `astro:page-load` and `astro:after-swap` to stay reliable under client-side route swaps.

## Deployment 🌐

### Recommended Primary Environment: Cloudflare Pages

- Primary URL: `https://dansblog.pages.dev/`
- This is the recommended public access point for latest behavior and performance profile.

### Mirror / Backup Environment: GitHub Pages

- Mirror URL: `https://dancncn.github.io/DansBlog/`
- Used as a backup channel and for repo-subpath compatibility checks.

### Pre-release Checklist

- Run build + preview
- Validate `/blog/`, `/blog/page/2/`, `/tags/`, `/important/`, and at least one code-heavy post
- Check Network panel for asset/image 404s

## Development 💻

Install and run:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Writing Guide ✍️

### Create a Post

Place `.md` / `.mdx` under `src/content/blog/`.

Recommended frontmatter:

```yaml
---
title: "Your Title"
description: "Short summary"
pubDate: 2026-02-17
updatedDate: 2026-02-18
tags: ["tag-a", "tag-b"]
important: false
importantOrder: 0
---
```

### Language Pairing (CN/EN)

Use `-cn` / `-en` naming conventions for paired articles, and keep grouping conventions consistent with current content strategy.

### Images

- Store static images in `public/image/...`
- Use `/image/...` in markdown
- Base path prefixing is handled during build

## FAQ / Notes 📌

### Why not use shared-element transitions for article entry?

Code-heavy pages still showed residual visual instability in real network/font timing scenarios. Hard navigation is used on that critical path to keep entry deterministic.

### Why keep View Transitions if post entry bypasses them?

They still improve overall route feel across the rest of the site. The stricter strategy is intentionally scoped, not global.

### Why keep markdown-first image references?

It keeps writing workflow simple and editor-friendly while remaining deployment-safe through base-path rewriting.

---

## 简体中文摘要

### 项目定位

这是一个长期维护的工程型个人博客，核心目标是把研究记录、工程流程和可复现实践持续沉淀为结构化内容。

### 品牌与工程策略

- **主环境优先**：Cloudflare Pages（`https://dansblog.pages.dev/`）作为当前主要访问入口
- **双部署策略**：GitHub Pages 作为镜像/备用，保证子路径部署兼容性
- **稳定性优先**：文章入口对高风险路径使用硬导航，减少代码大页的残余视觉抖动
- **代码块治理**：围绕“防重排”原则处理宽度、行高、字形与滚动容器
- **字体分工加载**：正文可读性优先，等宽字体尽量降低后到达替换引发的布局波动
- **TOC 可用性**：桌面 sticky + 移动抽屉，并配合占位与重绑定机制保证一致行为

### 开发与写作

```bash
npm install
npm run dev
npm run build
npm run preview
```

- 文章目录：`src/content/blog/`
- 图片引用：`/image/...`（对应 `public/image/...`）
- frontmatter 与 `content.config.ts` schema 保持一致
