# 📚 SETU Project Structure Guide

## 🎯 Overview
This document explains the simplified SETU project structure. It's designed to be easy to understand for developers with basic React knowledge. The architecture focuses on having as few files as possible while maintaining scalability.

---

## 📁 Project Structure

```
specificforntend/
├── src/
│   ├── data/
│   │   └── appData.js            ← 📊 ALL DATA (routes, courses, workshops combined)
│   ├── components/
│   │   ├── Navbar.jsx            ← Navigation menu
│   │   └── Footer.jsx            ← Page footer
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx     ← Handles ALL course pages (dynamic)
│   │   ├── WorkshopDetail.jsx   ← Handles ALL workshop pages (dynamic)
│   │   ├── Roadmap.jsx
│   │   └── ForEnterprise.jsx
│   ├── utils/
│   │   └── route_title.jsx      ← 🏷️ DYNAMIC TITLES (updates browser tab & SEO)
│   ├── api/                      ← 🔌 API logic (auth, axios, profile)
│   ├── App.jsx                   ← 🎯 MASTER FILE (Routes + Layout + Backgrounds)
│   ├── main.jsx                  ← React initialization
│   └── index.css                 ← Global styles
├── prerender/
│   └── engine.js                 ← 🔧 Unified SEO & Prerender Engine
└── public/
    └── previews/                 ← Generated social media preview images
        ├── default.png
        ├── courses.png
        └── workshop.png
```

---

## 🎯 Key Files Explained

### 1. **`src/data/appData.js`** - The Data Center
**What it contains:**
- All navigation routes (labels, paths, icons)
- All course details (titles, descriptions, curriculum)
- All workshop details
- Helper functions to fetch data by ID

**Why it's important:**
- Single source of truth for all content.
- Easy to add new items without touching UI code.
- Centralized SEO metadata (titles, descriptions).

---

### 2. **`src/App.jsx`** - The Master Controller
**What it does:**
- **Routing:** Defines every URL path and connects it to a Page.
- **Layout:** Wraps the entire site in the `Navbar` and `Footer`.
- **Backgrounds:** Global styles like the technical grid and blur effects.
- **Title Manager:** Activates the dynamic page title updates.

**Structure:**
```javascript
<BrowserRouter>
    <PageTitleManager />  {/* Updates titles */}
    <div>
        <Navbar />        {/* Always visible */}
        <main>
            <Routes> ... </Routes> {/* Page content changes here */}
        </main>
        <Footer />        {/* Always visible */}
    </div>
</BrowserRouter>
```

---

### 3. **`src/utils/route_title.jsx`** - The SEO/Title Engine
**What it does:**
- Listens for URL changes.
- Automatically finds the correct title in `appData.js`.
- Updates the browser tab title (e.g., "SETU | Course Name").
- Updates meta descriptions for search engines.
- Scrolls the page to the top when you click a link.

---

## 🚀 How to Add New Content

### ✅ Add a New Static Page

**Step 1:** Create the component
```javascript
// src/pages/NewSupport.jsx
export default function NewSupport() {
    return <div>Support Content</div>;
}
```

**Step 2:** Register in `src/App.jsx`
1. Import the component.
2. Add to `componentMap`: `"support": <NewSupport />`.

**Step 3:** Add Route Data in `src/data/appData.js`
```javascript
{
    id: "support",
    path: "/support",
    label: "Support",
    showInNav: true,
    title: "SETU | Support Center",
    description: "Need help? Contact us.",
    previewImage: "/previews/default.png"
}
```

---

### ✅ Add a New Course or Workshop

**Step 1:** Add to `appData.js`
Simply add an object to the `selfPacedCourses` or `workshopsData` array.

**Step 2:** Done! 
The app automatically creates `/course/your-id` or `/workshop/your-id` based on the ID you provided. No extra components needed!

---

## 🎨 Design System

The application uses **Tailwind CSS** for styling, with a custom design language:
- **Primary Color:** Yellow (`#ffcc33`)
- **Background:** Deep Slate (`#020617`)
- **Effects:** Glassmorphism (`backdrop-blur`), technical grids, and large glowing blurs.

---

## � Development Workflow

### 1. Local Development
```bash
npm run dev
```

### 2. Prerendering (Crucial for SEO & Previews)
Before deploying, you must generate static HTML files so social media previews and browser refreshes work:
```bash
npm run build
npm run prerender
```
*Note: This single command handles SEO, sitemaps, and social media image resolution.*

---

## � Guidelines for Developers
- **Don't duplicate logic:** Routing is centralized in `App.jsx`.
- **Keep data separate:** Never hardcode course descriptions in a `.jsx` page; put them in `appData.js`.
- **Responsive design:** Always use Tailwind's `md:`, `lg:` prefixes to ensure the site works on mobile.

---

**Last Updated:** 2026-02-09
**Version:** 3.0 (One-File Architecture)
