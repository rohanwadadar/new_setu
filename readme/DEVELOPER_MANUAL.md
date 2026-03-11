# 📘 Developer Manual: Multi-Route Title & Social Media Link Preview System

> **Who is this for?** Any developer who wants to implement dynamic browser tab titles and rich link previews (WhatsApp, LinkedIn, Twitter) for a React/Vite SPA hosted on GitHub Pages — with **Zero Storage** and **Real-Time images**.

---

## 🧠 Core Concept (Read First)

Your React app is an SPA (Single Page Application). It has only **one real HTML file** — `index.html`. This creates two problems:

| Problem | Affected Party |
| :--- | :--- |
| Every page shares the same browser tab title ("Vite App") | **Human Users** |
| WhatsApp/LinkedIn see the same blank preview for every link | **Social Media Bots** |

This system solves **both problems** independently — because humans and bots work completely differently.

---

## 🏗️ Architecture Overview

```text
Your Project
 ┣ src/
 ┃ ┣ data/appData.js         ← Single source of truth (all pages/courses/etc.)
 ┃ ┗ route_title.jsx         ← Fixes tab title for HUMANS (runs in browser)
 ┣ prerender/
 ┃ ┗ index.js                ← Fixes OG previews for BOTS (runs at build time)
 ┗ package.json              ← Wires everything together
```

---

## ✅ PART 1: Dynamic Browser Tab Titles (for Humans)

### Step 1 — Install Dependencies
```bash
npm install react-router-dom
```

### Step 2 — Create `src/route_title.jsx`

This component "listens" to the URL and updates `document.title` on every navigation event.

```jsx
// src/route_title.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesData, selfPacedCourses, workshopsData } from "./data/appData";

export default function PageTitleManager() {
    const { pathname } = useLocation();

    useEffect(() => {
        const normalize = (p) => p.toLowerCase().replace(/\/$/, "") || "/";
        const currentPath = normalize(pathname);

        // --- Dynamic Routes ---
        if (currentPath.startsWith("/course/")) {
            const id = currentPath.split("/")[2];
            const found = selfPacedCourses.find(c => c.id === id);
            document.title = found ? `MyApp | ${found.title}` : "MyApp | Course";
        }
        else if (currentPath.startsWith("/workshop/")) {
            const id = currentPath.split("/")[2];
            const found = workshopsData.find(w => w.id === id);
            document.title = found ? `MyApp | ${found.title}` : "MyApp | Workshop";
        }
        // --- Static Routes ---
        else {
            const route = routesData.find(r => normalize(r.path) === currentPath);
            document.title = route?.title || "MyApp";
        }

        window.scrollTo(0, 0); // Scroll to top on every navigation
    }, [pathname]);

    return null; // Renders nothing visible
}
```

### Step 3 — Register in `App.jsx`

Place `<PageTitleManager />` **inside** your `<BrowserRouter>` so it has access to the URL.

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTitleManager from "./route_title";

export default function App() {
    return (
        <BrowserRouter>
            <PageTitleManager />  {/* ← Add this line */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course/:courseId" element={<CourseDetail />} />
                <Route path="/workshop/:workshopId" element={<WorkshopDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### Step 4 — Define your data in `appData.js`

Each entry needs at minimum a `path`, `title`, and `description`.

```js
// src/data/appData.js
export const routesData = [
    { path: "/",       title: "MyApp | Home",  description: "..." },
    { path: "/about",  title: "MyApp | About", description: "..." },
];

export const selfPacedCourses = [
    { id: "python", title: "Python for All", description: "Learn Python..." },
];

export const workshopsData = [
    { id: "genai",  title: "GenAI Bootcamp", description: "Build with AI..." },
];
```

---

## ✅ PART 2: Real-Time Social Media Link Previews (for Bots)

> **Key Insight:** Bots (WhatsApp, LinkedIn) **cannot** run JavaScript. They read the raw HTML file. We must pre-inject the correct metadata into the HTML **before** deploying.

### Step 1 — Create `prerender/index.js`

This Node.js script runs after your Vite build and injects OG metadata into every page's HTML file.

```js
// prerender/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routesData, selfPacedCourses, workshopsData } from '../src/data/appData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const BASE_URL = 'https://YOUR-USERNAME.github.io/YOUR-REPO-NAME'; // ← Change this
const DIST_DIR  = path.resolve(__dirname, '../dist');
const TEMPLATE  = path.join(DIST_DIR, 'index.html');
const OG_W = 1200, OG_H = 630;

// Phase 1: Collect all pages from your data source
function collectPages() {
    const pages = [];
    pages.push({ path: '/', title: 'MyApp | Home', desc: 'My homepage.', type: 'WebSite' });

    routesData.filter(r => !r.path.includes(':') && r.path !== '/').forEach(r => {
        pages.push({ path: r.path, title: r.title, desc: r.description, type: 'WebPage' });
    });
    selfPacedCourses.forEach(c => {
        pages.push({ path: `/course/${c.id}`, title: `MyApp | ${c.title}`, desc: c.description, type: 'Course' });
    });
    workshopsData.forEach(w => {
        pages.push({ path: `/workshop/${w.id}`, title: `MyApp | ${w.title}`, desc: w.description, type: 'Event' });
    });
    return pages;
}

// Phase 2: Build the OG meta tag block for each page
function buildMetaTags(title, desc, pageUrl, type) {
    const safeDesc = (desc || 'My App').replace(/"/g, '&quot;').substring(0, 160);
    // This URL calls Microlink to take a real-time screenshot — Zero Storage!
    const ogImage = `https://api.microlink.io/?url=${encodeURIComponent(pageUrl)}&screenshot=true&embed=screenshot.url&waitFor=3000&meta=false`;

    return `
    <title>${title}</title>
    <meta name="description" content="${safeDesc}">
    <meta property="og:title"       content="${title}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image"       content="${ogImage}">
    <meta property="og:url"         content="${pageUrl}">
    <meta property="og:image:width"  content="${OG_W}">
    <meta property="og:image:height" content="${OG_H}">
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:image"       content="${ogImage}">
    `;
}

// Phase 3: Clone the built HTML and inject the tags into each page folder
async function prerenderHTML(pages) {
    if (!fs.existsSync(TEMPLATE)) {
        throw new Error('dist/index.html not found — run vite build first.');
    }
    const template = fs.readFileSync(TEMPLATE, 'utf-8');

    for (const p of pages) {
        const pageUrl  = `${BASE_URL}${p.path === '/' ? '' : p.path}`;
        const metaTags = buildMetaTags(p.title, p.desc, pageUrl, p.type);
        const html     = template
            .replace(/<title>.*?<\/title>/, '')
            .replace(/<meta name="description".*?>/gi, '')
            .replace('</head>', `${metaTags}\n</head>`);

        const cleanPath = p.path === '/' ? '' : p.path.replace(/^\//, '');
        const outDir    = path.join(DIST_DIR, cleanPath);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
    }
    // Required for GitHub Pages
    fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
    fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
}

async function run() {
    const pages = collectPages();
    await prerenderHTML(pages);
}

run().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
```

### Step 2 — Wire into `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev":    "vite",
    "build":  "vite build && node prerender/index.js",
    "deploy": "vite build && node prerender/index.js && gh-pages -d dist"
  }
}
```

> ⚠️ **Important:** `"type": "module"` is required so Node.js understands the `import` syntax in `prerender/index.js`.

### Step 3 — Install `gh-pages` (for GitHub Pages hosting)
```bash
npm install --save-dev gh-pages
```

### Step 4 — Set homepage in `package.json`
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
}
```

---

## 🚀 Deployment Workflow

```bash
# 1. Develop locally
npm run dev

# 2. Deploy everything (build + prerender + push to gh-pages)
npm run deploy
```

That's it! After `npm run deploy`:
- Your site goes live with all static HTML files.
- Every page has its own `og:image` tag pointing to Microlink.
- When a user shares a link on WhatsApp, Microlink takes a real-time screenshot of that exact page and returns it to WhatsApp.
- **Zero images are stored in your repository.**

---

## 🧪 How to Test Your Previews

1.  **Tab Title Test:** Run `npm run dev`, open your app, click to different pages. The browser tab title should change.

2.  **OG Preview Test:** Run `npm run deploy`, then paste your live URL into:
    - 🔗 [https://opengraph.xyz](https://opengraph.xyz) — shows exactly what WhatsApp will see.
    - 🔗 [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) — for Twitter/X.

---

## ❓ Troubleshooting

| Problem | Solution |
| :--- | :--- |
| Tab title not changing | Make sure `<PageTitleManager />` is inside `<BrowserRouter>`. |
| WhatsApp shows wrong preview | The bot caches previews. Test in [opengraph.xyz](https://opengraph.xyz) instead. |
| `dist/index.html not found` error | Run `npm run build` before `node prerender/index.js`. |
| Preview image is blank/grey | Your page may not be live yet, or `waitFor` needs to be higher (try `waitFor=5000`). |
| `import` not recognized in `index.js` | Add `"type": "module"` to your `package.json`. |
