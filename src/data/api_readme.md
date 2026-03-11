# 🚀 Migrating from `appData.js` to a Live API

If you decide to move your course and workshop data to a **Live API** instead of using the local `appData.js` file, you need to update two parts of your system: the **Prerender Engine** and the **React Frontend**.

---

### 1. Update the Prerender Engine (`prerender/index.js`)

Since `prerender/index.js` runs during the build process, it needs to fetch the data from your API before generating the HTML files.

**What to change:**
1.  **Remove the import:** Remove `import { ... } from '../src/data/appData.js';`.
2.  **Add `node-fetch` or `axios`:** Install a fetching library (e.g., `npm install node-fetch`).
3.  **Update `collectPages`:** Make it an `async` function and fetch data from your endpoint.

```javascript
// Example modification in prerender/index.js
async function collectPages() {
    const response = await fetch('https://your-api.com/api/all-data');
    const data = await response.json();
    
    const pages = [];
    // ... map API data to the pages array format ...
    return pages;
}
```

---

### 2. Update the React Frontend (`src/route_title.jsx`)

Your React component currently uses `selfPacedCourses` and `workshopsData` directly. You will need to fetch this data when the app loads.

**What to change:**
1.  **Global State:** Use a state management tool (like `useContext` or `Redux`) or a fetching hook (like `React Query`) to store the API data.
2.  **Update logic:** Instead of importing data, read it from your global state.

```javascript
// Example in route_title.jsx
const { allCourses } = useGlobalData(); // Your custom hook
const courseData = allCourses.find(c => c.id === courseId);
```

---

### ⚠️ Critical Note: SEO Timing
- **The Problem:** Bots (WhatsApp/Google) don't wait for your React app to fetch data.
- **The Solution:** This is why the **Prerender Engine** is so important. By fetching the API data *during the build* and injecting it into the HTML, you ensure that bots see the correct title and `og:image` even before the React app starts fetching from the API on the user's device.

---

### 🏛️ Architecture with API

```text
[ Database ] -> [ Your API ] 
                    |
                    +--> [ Prerender Script ] (Build-time) -> Static HTML
                    |
                    +--> [ React App ] (Run-time) -> Dynamic UI
```
