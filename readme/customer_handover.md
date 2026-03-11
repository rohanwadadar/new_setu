# 📦 Customer Handover Guide: Universal SEO & Dynamic Preview Engine

This guide explains how to integrate the dynamic, API-driven SEO and course management system into **any** frontend project (Vite, Webpack, Create React App, etc.).

---

## 🛠️ System Overview
This system is designed to inject social media metadata and dynamic page titles into your built project files, making it **100% Driven by the SETU API**.
- **Works with any tool:** Whether you use Vite, Webpack, or custom scripts.
- **Dynamic Previews:** Social media images are pulled from the API for every course.
- **Dynamic Titles:** Browser tab names update automatically based on backend data.

---

## 🚀 Step-by-Step Integration

### 1. Configuration & Env Setup
1. **Environment Variables:** Create or update your `.env` file with the following keys:
   ```env
   VITE_COURSE_API=https://your-api-url.com/get_all_courses
   VITE_DEFAULT_COURSE_IMAGE=https://path-to-your-confidential-fallback-image.png
   ```
2. **Script Setup:** Create a utility folder (e.g., `prerender`).
3. Save the provided script (e.g., `index.js`) inside.
4. **Configuration:** The script automatically pulls from your `.env` file. Ensure `BASE_URL` and `DIST_DIR` are correctly mapped in the script logic.

### 2. Dependencies
The script runs in a Node.js environment and requires `axios` and `dotenv`:
```bash
npm install axios dotenv
```

### 3. Build Process Integration
To ensure your previews are always up-to-date, the script must run **immediately after** your main build command. Update your `package.json` scripts:

```json
{
  "scripts": {
    "build": "vite build && node prerender/index.js"
  }
}
```

### 4. UI & Front-End Integration
- **Simplified Course Grid:** The Home page displays a clean, title-only grid for courses. Images and descriptions are hidden on the landing page to provide a focused user experience.
- **Dynamic Routing:** Ensure your application uses `import.meta.env.VITE_DEFAULT_COURSE_IMAGE` as a fallback for any missing thumbnails.
- **Route Syncing:** Use the `route_title.jsx` pattern to fetch the latest course list. This ensures that even for client-side navigation, the browser tab titles remain perfectly synced with your backend.


---

## 🧪 Testing Results
1. Run your `npm run build`.
2. Check your output folder (`dist`, `build`, etc.). You should see physical folders created for **every course** found in the API.
3. Share a link (e.g., `yourdomain.com/course/Python`) on WhatsApp or LinkedIn.
4. The system will automatically serve the "pre-baked" HTML file with the correct **Title, Description, and Image** from your database.

**Customization:** If you rename the script or move it to a different directory, simply update the relative path in your `package.json` build command.

