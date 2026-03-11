# 🚀 SETU System Architecture: Multi-Tab Routing & Real-Time Previews (LATEST)

This document provides a tree-structured overview of how the **Multi-Tab Screenshot Engine** and the **Real-Time Preview System** work together to scale a large project with $N$ pages.

---

## 🌳 System Logic Tree

```text
📦 specificfrontend (Project Root)
 ┣ 📂 src
 ┃ ┣ 📂 data
 ┃ ┃ ┗ 📜 appData.js           📂 THE SINGLE SOURCE OF TRUTH
 ┃ ┃                            - Contains all 1,000+ course & workshop names.
 ┃ ┃                            - used by BOTH the React UI and the Prerender script.
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 CourseDetail.jsx     ⚛️ DYNAMIC PAGE: Uses :courseId to show different content.
 ┃ ┃ ┗ 📜 WorkshopDetail.jsx   ⚛️ DYNAMIC PAGE: Uses :workshopId to show different content.
 ┃ ┗ 📜 App.jsx                🗺️ MULTI-TAB NAVIGATION: Defines the dynamic /:id structure.
 ┃
 ┣ 📂 prerender                ⚙️ THE BUILD-TIME ENGINE (LATEST VERSION)
 ┃ ┗ 📜 index.js                - Performs "Dynamic Meta Injection".
 ┃                              - Scalable to infinite pages.
 ┃
 ┗ 📜 package.json             📜 "npm run deploy" -> Triggers the whole cycle.
```

---

## ⚙️ How "Multi-Tab Rendering" Works (React UI)

Your React app scales to any number of pages because it is built with **Dynamic Routing** and **Parameter Tracking**.

1.  **The Master List**: All course and workshop details are stored once in `appData.js`.
2.  **The Route Definition**: In `App.jsx`, we define generic paths like `/course/:courseId`. 
3.  **The component**: When a user clicks "PowerBI", the browser URL changes. The `CourseDetail.jsx` component "listens" to this change, looks up "PowerBI" in `appData.js`, and instantly swaps the text/images without reloading the page.
    - *Scalability:* This allows 1 component to act as a thousand different pages.

---

## 📸 How "Real-Time Previews" Work (Zero Storage)

Since the React UI is "client-side," social-media bots (WhatsApp/LinkedIn) cannot see it. We solve this by injecting a **Proxy Pattern** into your HTML during the build.

### 🔄 The Execution Cycle (LATEST):

1.  **Vite Build**: React app is compiled into the `dist/` folder.
2.  **Meta Injection (Zero Storage)**: 
    - `prerender/index.js` reads your 1,000+ courses from `appData.js`.
    - For every course, it creates a small `index.html` file in a sub-folder (e.g., `dist/course/aws/index.html`).
    - **Crucial Part:** It injects a "Real-Time Image Link" into the `<head>` of that HTML. 
    - **LATEST UPDATE:** This link points to a **Real-Time Proxy (Microlink API)**. 
3.  **Real-Time Generation**:
    - You paste a link into WhatsApp.
    - WhatsApp visits your page and sees: `<meta property="og:image" content="https://api.microlink.io/?url=...&screenshot=true">`.
    - Microlink *instantly* visits your live site, takes a photo, and sends it back to WhatsApp.
    - **No local storage is used.** Your GitHub repository stays 100% clean and lightweight.

---

## 🚀 Scalability Benefits Summary
- **Infinite Scale:** Adding a 1,001st course takes 2 seconds (just add to `appData.js`).
- **Zero Repo Bloat:** No screenshot image files are ever saved in your Git history.
- **Independence:** The system works purely via standard Open Graph tags, making it ready for migration to AWS or Azure in the future.
