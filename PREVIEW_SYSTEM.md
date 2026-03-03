# 📸 SETU Preview & Screenshot System

This document explains the two distinct screenshot and preview systems used in the SETU web application. 

The system is divided into two parts:
1. **Build-Time Open Graph (OG) Previews**: Automates screenshots for link sharing (WhatsApp, LinkedIn, Slack, Twitter).
2. **Client-Side Screenshot Sharing**: Allows users to capture their exact view of the screen while browsing.

---

## 🌳 System Architecture Tree

```text
📦 specificfrontend
 ┣ 📂 prerender                 # BUILD-TIME: Automated OG Previews
 ┃ ┗ 📜 index.js                # Master script that starts local server, takes screenshots, & injects meta tags
 ┃
 ┣ 📂 public
 ┃ ┗ 📂 previews                # BUILD-TIME: Output folder where Puppeteer saves the automated screenshots (.png)
 ┃
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┗ 📜 ScreenshotShare.jsx   # RUNTIME: The floating UI button logic powered by html2canvas
 ┃ ┃
 ┃ ┗ 📜 App.jsx                 # Integrates the <ScreenshotShare /> component globally across all pages
 ┃
 ┗ 📜 package.json              # 📜 "npm run build" triggers "vite build && node prerender/index.js"
```

---

## 1️⃣ Build-Time: Open Graph (OG) Previews

When you share a link on social media or messaging platforms, they look for `og:image` and `og:title` metadata tags to generate a rich preview card. Because React is a Single Page Application (SPA), search engine bots often don't execute JavaScript. 

To solve this we use a **Prerender Script** (`prerender/index.js`) that runs exactly when you deploy.

### ⚙️ How it works:
1. **Vite Build**: The standard React app is built into the `dist/` folder.
2. **Local Server**: `prerender/index.js` spins up a temporary HTTP server on port 3000 to host the `dist/` files locally.
3. **Puppeteer (Headless Browser)**: The script launches an invisible Google Chrome browser (`puppeteer`).
4. **Screenshot Generation**: 
   - It iterates through every specified route in `src/data/appData.js`.
   - Before taking the screenshot, it executes a script inside the headless browser to temporarily **hide** the floating `ScreenshotShare` button so it doesn't pollute the image.
   - It captures a `1200x630` (standard OG size) screenshot of each page.
   - It saves these images to `public/previews/`.
5. **Static HTML Generation**:
   - For every route string (`/about`, `/course/llm`, etc.), a physical folder and `index.html` file are created inside `dist/`.
   - The appropriate Open Graph meta tags (`<meta property="og:image" content="...">`, title, description) are injected into the `<head>` of these physical HTML files pointing to the exact screenshot just generated.
6. **Deploy**: The enriched `dist/` folder is pushed to `gh-pages`.

### 🚀 Why Localhost Server?
Before, it was trying to take screenshots of the *live website* (`rohanwadadar.github.io/new_setu`). But if you added a new course, that route wouldn't exist on the live site yet, resulting in the bot taking a screenshot of a 404 page. Running it on a temporary local server ensures it captures the brand new code you are about to deploy.

---

## 2️⃣ Runtime: Client-Side View Capture

When a user is viewing a course or workshop, they might want to share the exact portion of the page they are reading. This is handled dynamically in the browser by the `<ScreenshotShare />` component.

### ⚙️ How it works:
1. **Trigger**: When the user clicks the floating purple "Share" button.
2. **Hide UI**: The button temporarily sets `display: none` on itself.
3. **Capture Canvas**:
   - It uses `html2canvas` to draw an exact replica of the Document Object Model (DOM).
   - `y: window.scrollY`: Importantly, it captures exactly the coordinates the user is currently looking at, instead of scrolling to the top.
   - It ignores heavy elements like iframes (e.g., YouTube embeds) to prevent Cross-Origin errors.
4. **Share / Download**:
   - **Mobile (Web Share API)**: If the user is on a mobile device, it attempts to use the native mobile share sheet (`navigator.share`), passing both the page URL and the newly generated Blob (image file) at the same time.
   - **Desktop Fallback**: Web Share API with files is rarely supported on desktops. Instead, it triggers an automatic download of the screenshot (`setu-page-view.png`) and instantly copies the page URL to the user's clipboard.
5. **Restore UI**: The button reappears indicating success.
