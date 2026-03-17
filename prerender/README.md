# 🖼️ SEO Prerender Guide (Standalone)

This guide explains how to integrate the dynamic SEO prerendering script into any **Vite + React** project. 

> **Goal:** Generate physical `index.html` files for every course/page so that platforms like WhatsApp, LinkedIn, and Twitter can show rich previews (title, image, description) even for a Single Page App (SPA).

---

## 📋 Prerequisites

1.  **Vite + React** project.
2.  **Shared API**: The same backend API that returns a JSON list of courses.
3.  **Static Hosting**: Deployed to GitHub Pages, Netlify, Vercel, or similar.

---

## ⚙️ Step 1: Environment Variables

Create (or update) a `.env` file in your project root. The script reads these to know where your site is and where to fetch data from.

```env
# 🏠 YOUR HOME URL (The actual address users visit)
VITE_BASE_URL=https://your-new-home-url.com

# 📡 SHARED BACKEND API
VITE_COURSE_API=https://your-shared-api-endpoint.com/get_all_courses

# 🛠️ ROUTE PREFIX (Optional: defaults to /dap-course)
# Change this if your course paths look different (e.g., /programs or /courses)
VITE_COURSE_ROUTE_PREFIX=/dap-course

# 🖼️ FALLBACK IMAGE
VITE_DEFAULT_COURSE_IMAGE=https://your-cdn.com/fallback.png
```

---

## 📦 Step 2: Install Dependencies

The script runs in Node.js environment during the build process. You need these two packages:

```bash
npm install axios dotenv
```

---

## 📂 Step 3: Copy the Script

Ensure the `prerender/index.js` file is placed in a folder named `prerender/` at the root of your project.

---

## 🔧 Step 4: Configure Build Hooks (`package.json`)

Update your `package.json` to ensure the prerender script runs **after** the Vite build completes. This is critical because the script needs to modify the files generated in the `dist/` folder.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && node prerender/index.js",
    "deploy": "vite build && node prerender/index.js && gh-pages -d dist"
  }
}
```

> [!IMPORTANT]
> Make sure your `package.json` has `"type": "module"` set, as the script uses ES Modules (`import` syntax).

---

## 🛠️ Step 5: Customisation

Inside `prerender/index.js`, you can customise the branding:

1.  **Brand Name**: Search for `title: \`SETU | ${title}\`` and replace `SETU` with your branding.
2.  **Schema/Metadata**: Update the `homepageInfo` object inside `collectAllPages()` to set your default homepage SEO.

---

## 🧪 Testing Locally

Run the following command:
```bash
npm run build
```

After checking the logs for `✅` icons, inspect your `dist/` folder. You should see a folder structure matching your course paths, each containing its own `index.html`.

**Verification:** Open any generated `index.html` (e.g., `dist/dap-course/xyz/index.html`) and check if the `<head>` contains your course-specific meta tags.

---

## ✅ Deployment Checklist

- [ ] `.env` has the correct `VITE_BASE_URL`.
- [ ] `VITE_COURSE_API` is reachable.
- [ ] `VITE_COURSE_ROUTE_PREFIX` matches your React Router paths.
- [ ] `dist/404.html` is generated (the script does this automatically for SPA support).

### Verification Table

| Platform | How to verify |
|---|---|
| **Google Chat** | Share a link in a room — should show title + image |
| **WhatsApp** | Share a link — image should appear in 1-2 seconds |
| **LinkedIn** | Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) |
| **Facebook** | Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| **Direct Load** | paste the full internal URL into browser — page should load |
