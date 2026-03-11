# 📸 SETU Real-Time Preview System (Zero Storage)

This document explains the **Zero-Storage Real-Time Preview System** used in the SETU web application. 

The primary goal of this system is to provide rich social media previews (WhatsApp, LinkedIn, Twitter) for **infinite pages** without ever saving a single image file in this repository.

---

## 🌳 System Architecture Tree

```text
📦 specificfrontend
 ┣ 📂 prerender                 # BUILD-TIME: SEO Tag Injection
 ┃ ┗ 📜 index.js                # Script that injects Microlink Real-time tags into HTML
 ┃
 ┗ 📜 package.json              # 📜 "npm run build" triggers "vite build && node prerender/index.js"
```

---

## ⚙️ How "Real-Time" Previews Work

In a large project with thousands of pages, saving screenshots for every page is impossible. Instead, we use a **Dynamic Proxy Pattern**.

### 🔄 The Step-by-Step Pipeline:

1. **Vite Build**: 
   - `npm run deploy` compiles the React app into the `dist/` folder.

2. **The Meta Injection (Zero Storage)**:
   - `prerender/index.js` runs. It **does not** launch a browser and **does not** take screenshots.
   - It iterates through your pages and creates static HTML entry points in `dist/` (e.g., `dist/course/data-aws/index.html`).
   - It injects the following special Open Graph tag into every page:
     ```html
     <meta property="og:image" content="https://api.microlink.io/?url=...&screenshot=true">
     ```

3. **Real-Time Generation**:
   - When you paste a link into WhatsApp, WhatsApp's bot hits your page.
   - It sees the **Microlink API URL** in your `og:image` tag.
   - Microlink *instantly* visits your live website, takes a high-quality screenshot, and sends it back to WhatsApp in real-time.

### 🚀 Benefits:
- **Zero Storage**: Your repository stays small and clean. No `.png` files are ever saved.
- **Infinite Scalability**: Whether you have 10 pages or 10,000 pages, the system works exactly the same.
- **Always Up-to-Date**: If you change the color of your website, your WhatsApp previews will update automatically the next time they are generated, because they are taken in real-time.
- **No Puppeteer**: Removing Puppeteer from the build process makes your deployment faster and lighter.

---

## 🛠️ Internal Setup
The logic is contained in `prerender/index.js`. 
- **Provider**: Microlink (Free Tier).
- **Parameters**: `screenshot=true`, `embed=screenshot.url`, `waitFor=3000` (to ensure React animations finish).
