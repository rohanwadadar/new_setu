# 📚 SETU Project Structure Guide

## 🎯 Overview
This document explains the simplified SETU project structure. It's designed to be easy to understand for developers with basic React knowledge.

---

## 📁 Project Structure

```
specificforntend/
├── src/
│   ├── config/
│   │   └── routing.jsx          ← 🚀 ALL ROUTING LOGIC (MasterRoutes + routeConfig combined)
│   ├── data/
│   │   └── appData.js            ← 📊 ALL DATA (routes, courses, workshops combined)
│   ├── components/
│   │   ├── Layout.jsx            ← 🎨 Page wrapper (Navbar + Footer)
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx     ← Handles ALL course pages
│   │   ├── WorkshopDetail.jsx   ← Handles ALL workshop pages
│   │   ├── Roadmap.jsx
│   │   └── ForEnterprise.jsx
│   ├── App.jsx                   ← 🎯 Entry point (loads routing)
│   ├── main.jsx                  ← React initialization
│   └── index.css                 ← Global styles
├── prerender/
│   └── generatePreviewHtml.js    ← 🔧 Generates SEO-friendly HTML
└── public/
    └── previews/                 ← Social media preview images
        ├── default.png
        ├── courses.png
        └── workshop.png
```

---

## 🎯 Key Files Explained

### 1. **`src/data/appData.js`** - The Data Center
**What it contains:**
- All navigation routes
- All courses
- All workshops
- Helper functions to find data

**Why it's important:**
- Single source of truth for all data
- Easy to add new courses/workshops
- No need to edit multiple files

**How to use:**
```javascript
// Import what you need
import { selfPacedCourses, getCourseById } from './data/appData';

// Get all courses
console.log(selfPacedCourses);

// Get a specific course
const course = getCourseById('llm');
```

---

### 2. **`src/config/routing.jsx`** - The Routing System
**What it contains:**
- All route definitions
- Page Manager (handles browser titles)
- Main Router component

**Why it's important:**
- Single file for all routing logic
- Automatically generates routes from data
- Handles dynamic routes (courses, workshops)

**How it works:**
1. Imports all page components
2. Maps routes to components
3. Renders the correct page based on URL

---

### 3. **`src/App.jsx`** - The Entry Point
**What it does:**
- Loads the routing system
- That's it! Super simple.

**Code:**
```javascript
import MasterRoutes from "./config/routing";

function App() {
    return <MasterRoutes />;
}
```

---

### 4. **`src/components/Layout.jsx`** - The Page Wrapper
**What it does:**
- Wraps all pages with Navbar and Footer
- Adds background effects
- Provides consistent layout

**Structure:**
```
┌─────────────────────────┐
│       Navbar            │
├─────────────────────────┤
│                         │
│    Page Content         │
│    (changes per URL)    │
│                         │
├─────────────────────────┤
│       Footer            │
└─────────────────────────┘
```

---

## 🚀 How to Add New Content

### ✅ Add a New Static Page

**Step 1:** Create the component
```javascript
// src/pages/MyNewPage.jsx
export default function MyNewPage() {
    return (
        <div>
            <h1>My New Page</h1>
            <p>Content here</p>
        </div>
    );
}
```

**Step 2:** Import it in `routing.jsx`
```javascript
import MyNewPage from "./pages/MyNewPage";
```

**Step 3:** Add to componentMap in `routing.jsx`
```javascript
const componentMap = {
    // ... existing mappings
    "my-new-page": <MyNewPage />
};
```

**Step 4:** Add route data in `appData.js`
```javascript
export const routesData = [
    // ... existing routes
    {
        id: "my-new-page",
        path: "/my-new-page",
        label: "My New Page",
        showInNav: true,  // Shows in navigation menu
        title: "SETU | My New Page",
        description: "Description for SEO",
        previewImage: "/previews/default.png",
        protected: false
    }
];
```

**Done!** Your page is now accessible at `/my-new-page`

---

### ✅ Add a New Course

**Step 1:** Add to `appData.js`
```javascript
export const selfPacedCourses = [
    // ... existing courses
    {
        id: "my-course",
        title: "My Amazing Course",
        description: "Learn amazing things"
    }
];
```

**Done!** The course is now accessible at `/course/my-course`

*Note: No need to create a new component - `CourseDetail.jsx` handles all courses*

---

### ✅ Add a New Workshop

**Step 1:** Add to `appData.js`
```javascript
export const workshopsData = [
    // ... existing workshops
    {
        id: "my-workshop",
        title: "My Workshop",
        category: "Category",
        status: "UPCOMING",
        description: "Workshop description"
    }
];
```

**Done!** The workshop is now accessible at `/workshop/my-workshop`

*Note: No need to create a new component - `WorkshopDetail.jsx` handles all workshops*

---

## 🔄 How the Routing Works

### URL Flow:
```
User visits URL
    ↓
BrowserRouter detects URL
    ↓
PageManager updates browser title
    ↓
Router finds matching route
    ↓
Renders the component
    ↓
Layout wraps it with Navbar/Footer
    ↓
Page displays to user
```

### Example:
```
User visits: /course/llm
    ↓
Router matches: /course/:courseId
    ↓
Extracts: courseId = "llm"
    ↓
PageManager finds course data
    ↓
Sets title: "SETU | Large Language Modeling (LLM)"
    ↓
Renders: <CourseDetail /> component
    ↓
CourseDetail uses courseId to show correct content
```

---

## 🎨 How the Layout Works

### Layout Component Structure:
```javascript
<Layout>
    {/* Background effects */}
    <div className="background-effects">...</div>
    
    {/* Navigation */}
    <Navbar />
    
    {/* Page content (changes per URL) */}
    <main>
        {children} ← Your page component goes here
    </main>
    
    {/* Footer */}
    <Footer />
</Layout>
```

### What Layout Provides:
- ✅ Consistent Navbar on all pages
- ✅ Consistent Footer on all pages
- ✅ Background effects (gradients, grid)
- ✅ Proper spacing and structure

---

## 📊 Data Flow

### How Data Moves Through the App:

```
appData.js
    ↓
routing.jsx (imports data)
    ↓
PageManager (uses data for titles)
    ↓
Page Components (use data for content)
```

### Example:
```javascript
// 1. Data defined in appData.js
export const selfPacedCourses = [
    { id: "llm", title: "LLM Course", ... }
];

// 2. Imported in routing.jsx
import { selfPacedCourses } from './data/appData';

// 3. Used in PageManager
const course = selfPacedCourses.find(c => c.id === courseId);
document.title = `SETU | ${course.title}`;

// 4. Used in CourseDetail.jsx
import { getCourseById } from '../data/appData';
const course = getCourseById(courseId);
// Display course.title, course.description, etc.
```

---

## 🔧 Common Tasks

### Change a Course Title
**File:** `src/data/appData.js`
```javascript
{
    id: "llm",
    title: "New Title Here", // ← Change this
    description: "..."
}
```

### Add a Page to Navigation
**File:** `src/data/appData.js`
```javascript
{
    id: "my-page",
    path: "/my-page",
    showInNav: true, // ← Set to true
    label: "My Page", // ← This appears in menu
    ...
}
```

### Change Browser Tab Title
**File:** `src/data/appData.js`
```javascript
{
    id: "home",
    title: "New Tab Title", // ← Change this
    ...
}
```

### Update Social Media Preview
**Files:**
1. Replace image in `public/previews/`
2. Update path in `appData.js`:
```javascript
{
    id: "home",
    previewImage: "/previews/my-new-image.png", // ← Change this
    ...
}
```

---

## 🚨 Important Notes

### ⚠️ Don't Edit These Files (unless you know what you're doing):
- `src/main.jsx` - React initialization
- `src/index.css` - Global styles
- `prerender/generatePreviewHtml.js` - SEO generation

### ✅ Safe to Edit:
- `src/data/appData.js` - Add/edit data
- `src/pages/*.jsx` - Edit page content
- `src/components/Layout.jsx` - Change layout
- `src/config/routing.jsx` - Add new pages

### 🔄 After Making Changes:
1. Save your files
2. The dev server will auto-reload
3. Check your browser

### 🚀 Before Deploying:
1. Run `npm run build`
2. Run `node prerender/generatePreviewHtml.js`
3. Test the build locally
4. Deploy to GitHub Pages

---

## 📝 File Naming Conventions

### Components:
- **PascalCase**: `MyComponent.jsx`
- **Location**: `src/components/` or `src/pages/`

### Data Files:
- **camelCase**: `appData.js`
- **Location**: `src/data/`

### Config Files:
- **camelCase**: `routing.jsx`
- **Location**: `src/config/`

---

## 🎓 For Beginners

### What is a Component?
A component is a reusable piece of UI. Think of it like a LEGO block.

```javascript
function MyComponent() {
    return <div>Hello!</div>;
}
```

### What is a Route?
A route connects a URL to a component.

```
URL: /about  →  Component: <About />
```

### What is State?
State is data that can change. Not used much in this app since it's mostly static.

### What is a Hook?
Hooks are special functions that let you use React features. Examples:
- `useState` - Store changing data
- `useEffect` - Run code when something changes
- `useLocation` - Get current URL

---

## 🆘 Troubleshooting

### Page Not Showing?
1. Check if route is in `appData.js`
2. Check if component is imported in `routing.jsx`
3. Check if component is in `componentMap`

### Title Not Updating?
1. Check `title` field in `appData.js`
2. Check PageManager in `routing.jsx`

### Navigation Link Missing?
1. Check `showInNav: true` in `appData.js`
2. Check Navbar component

### Build Failing?
1. Check for syntax errors
2. Run `npm install`
3. Check console for error messages

---

## 📚 Learn More

### React Basics:
- [React Official Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)

### JavaScript:
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Project-Specific:
- Read comments in `appData.js`
- Read comments in `routing.jsx`
- Check usage examples in files

---

**Last Updated:** 2026-01-28
**Version:** 2.0 (Simplified Structure)
