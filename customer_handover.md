# 📦 Customer Handover Guide: Universal SEO & Dynamic Preview Engine

This guide explains how to integrate the dynamic, API-driven SEO and course management system into your React project.

---

## 🛠️ System Overview
This system is designed to inject social media metadata and dynamic page titles into your built project files, making it **100% Driven by the SETU API**.
- **Dynamic Previews:** Social media images are pulled from the API for every course.
- **Dynamic Titles:** Browser tab names update automatically based on backend data.
- **Environment Driven:** Configuration is handled via `.env` files for security.

---

## 🚀 Step-by-Step Integration

### 1. Configuration & Env Setup
1. **Environment Variables:** Create or update your `.env` file with the following keys:
   ```env
   VITE_COURSE_API=https://your-api-url.com/get_all_courses
   VITE_DEFAULT_COURSE_IMAGE=https://path-to-your-confidential-fallback-image.png
   ```
2. **Script Setup:** Create a utility folder `prerender` and save the `index.js` script inside.
3. **Configuration:** The script automatically pulls from your `.env` file for API URLs and fallback images.

### 2. Dependencies
Ensure you have the following packages installed:
```bash
npm install axios dotenv react-router-dom
```

### 3. React Specific Configuration

#### A. Environment Variable Access
In a Vite + React project, always use `import.meta.env` to access variables.
```javascript
// Example: Accessing the hidden fallback image
const img = course.image || import.meta.env.VITE_DEFAULT_COURSE_IMAGE;
```

#### B. Dynamic Route Titles
To ensure the browser tab updates dynamically during navigation, use the `route_title.jsx` pattern:
1. Import the `RouteTitle` component in your `App.jsx`.
2. This component listens to route changes and updates `document.title` based on the API data.

#### C. Simplified Home UI
The home page is configured to show a **Title-Only** grid. 
- **Hidden Elements:** Images and descriptions are removed from course cards to focus on the text.
- **CSS Styling:** Cards use centered flexboxes with premium gradient borders.

### 4. Build Process Integration
Update your `package.json` to run the SEO generator automatically after the build:

```json
{
  "scripts": {
    "build": "vite build && node prerender/index.js",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---

## 🧪 Testing Results
1. Run `npm run build`.
2. Check the `dist/` folder. You will see individual folders for every course (e.g., `dist/course/Python/index.html`).
3. These files contain hardcoded Meta Tags, allowing WhatsApp, LinkedIn, and Twitter to show rich previews without running JavaScript.

**Note:** If you change your API structure, update the mapping logic in `prerender/index.js` to match the new JSON fields.


















---

## 🛠️ Option: Preview Link Setup Only (No Route Titles)

If you only want rich social media previews (WhatsApp/LinkedIn) and **do not** want to use the dynamic `RouteTitle` component in React, follow these steps:

1. **Delete/Remove `RouteTitle`:** You do not need the `route_title.jsx` file or any references to it in your `App.jsx`.
2. **Keep the `prerender` Folder:** The `prerender/index.js` script is the vital part. It generates the physical HTML files that social media crawlers read.
3. **Environment Setup:** Ensure your `.env` still has `VITE_COURSE_API` and `VITE_DEFAULT_COURSE_IMAGE`.
4. **Build Script:** Keep your `package.json` build command as follows:
   ```json
   "build": "vite build && node prerender/index.js"
   ```
5. **How it works:** When you build the project, the script still "pre-injects" the correct Meta Tags into `index.html` files inside each course folder. Social media will show the correct preview, but the browser tab title will remain static (controlled by your main `index.html` or local component state).














---

## 🛠️ Option: Dynamic Route Titles Only (No Preview Link Setup)

If you only want the browser tab titles to update dynamically while the user navigates your app, but **do not** care about rich social media previews (WhatsApp/LinkedIn), follow these steps:

1. **Delete/Remove `prerender` Folder:** You can delete the `prerender` folder and its scripts.
2. **Setup `RouteTitle`:** Ensure you have the `route_title.jsx` component and it is correctly implemented in your `App.jsx`.
3. **Simplify Build Script:** Revert your `package.json` build command to the default:
   ```json
   "build": "vite build"
   ```
4. **Environment Setup:** Ensure `VITE_COURSE_API` is still present in your `.env` so the component can fetch course names.
5. **How it works:** The `RouteTitle` component will continue to fetch data from the SETU API and update the `document.title` in real-time as users click around. However, since no static HTML files are generated, social media platforms will only see your main site's default title/image when a course link is shared.


