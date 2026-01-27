# SETU Static Site - Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Routing System](#routing-system)
4. [Social Media Preview Implementation](#social-media-preview-implementation)
5. [Build & Deployment Process](#build--deployment-process)
6. [Future Backend Integration](#future-backend-integration)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This is a **static, frontend-only** version of the SETU application, deployed on **GitHub Pages**. All authentication, admin, and profile-related features have been removed to create a lightweight, shareable version focused on content presentation.

### Key Features
- ✅ Static site generation with pre-rendered HTML for SEO
- ✅ Social media preview support (Open Graph & Twitter Cards)
- ✅ Client-side routing with React Router
- ✅ Automated deployment to GitHub Pages
- ✅ Dynamic route handling for courses and workshops

### Tech Stack
- **Framework**: React 19.2.4
- **Routing**: React Router DOM 7.12.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: Framer Motion 12.26.2
- **Deployment**: GitHub Pages (via gh-pages)

---

## Architecture

### Directory Structure
```
specificforntend/
├── public/
│   ├── previews/              # Social media preview images
│   │   ├── default.png        # Default preview image (used for all routes)
│   │   ├── courses.png        # (Optional) Course-specific preview
│   │   └── workshop.png       # (Optional) Workshop-specific preview
│   └── ...
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Layout.jsx         # Main layout wrapper (Navbar, Footer)
│   │   ├── Navbar.jsx         # Navigation bar
│   │   └── Footer.jsx         # Footer component
│   ├── pages/                 # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx   # Dynamic course pages
│   │   ├── WorkshopDetail.jsx # Dynamic workshop pages
│   │   ├── Roadmap.jsx
│   │   └── ForEnterprise.jsx
│   ├── data/
│   │   └── courses.js         # Course and workshop data
│   ├── routesData.js          # Route metadata (titles, descriptions, images)
│   ├── routeConfig.jsx        # Route-to-component mapping
│   ├── MasterRoutes.jsx       # Main routing configuration
│   └── App.jsx                # Root application component
├── prerender/
│   └── generatePreviewHtml.js # Pre-render script for social previews
├── dist/                      # Build output (generated)
├── package.json
├── vite.config.js
└── GUIDE.md                   # This file
```

---

## Routing System

### How It Works

The routing system is **centralized** and **data-driven**, making it easy to add or modify routes without touching multiple files.

#### 1. **Route Data Definition** (`src/routesData.js`)

This file contains **all route metadata**:

```javascript
export const routesData = [
    {
        id: "home",
        path: "/",
        label: "Home",
        showInNav: true,
        title: "SETU | Welcome to SETU - Your gateway to Data Science and AI.",
        description: "Welcome to SETU - Your gateway to Data Science and AI.",
        previewImage: "/previews/default.png",
        protected: false
    },
    {
        id: "course-detail",
        path: "/course/:courseId",
        label: "Course",
        showInNav: false,
        title: "SETU | Course",
        description: "Explore our specialized AI and Data courses.",
        previewImage: "/previews/default.png",
        protected: false
    },
    // ... more routes
];
```

**Fields Explained:**
- `id`: Unique identifier for the route
- `path`: URL path (supports dynamic segments like `:courseId`)
- `label`: Display name for navigation
- `showInNav`: Whether to show in the navbar
- `title`: Browser tab title and Open Graph title
- `description`: Meta description for SEO and social previews
- `previewImage`: Image for social media previews
- `protected`: (Legacy) Authentication flag (not used in static version)

#### 2. **Component Mapping** (`src/routeConfig.jsx`)

Maps route IDs to React components:

```javascript
const componentMap = {
    "home": <Home />,
    "roadmap": <Roadmap />,
    "course-detail": <CourseDetail />,
    "workshop-detail": <WorkshopDetail />,
    // ... more mappings
};

export const routeConfig = routesData.map(route => ({
    ...route,
    element: componentMap[route.id]
}));
```

#### 3. **Route Rendering** (`src/MasterRoutes.jsx`)

Renders all routes with the correct basename for GitHub Pages:

```javascript
export default function MasterRoutes() {
    return (
        <BrowserRouter basename="/new_setu">
            <Layout>
                <Routes>
                    {routeConfig.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
```

**Important:** The `basename="/new_setu"` is required because the app is hosted at `https://rohanwadadar.github.io/new_setu/` (not the root domain).

### Adding a New Route

To add a new route, follow these steps:

1. **Create the page component** in `src/pages/`:
   ```javascript
   // src/pages/NewPage.jsx
   export default function NewPage() {
       return <div>New Page Content</div>;
   }
   ```

2. **Add route data** to `src/routesData.js`:
   ```javascript
   {
       id: "new-page",
       path: "/new-page",
       label: "New Page",
       showInNav: true,
       title: "SETU | New Page",
       description: "Description for the new page.",
       previewImage: "/previews/default.png",
       protected: false
   }
   ```

3. **Map the component** in `src/routeConfig.jsx`:
   ```javascript
   import NewPage from "./pages/NewPage";
   
   const componentMap = {
       // ... existing mappings
       "new-page": <NewPage />,
   };
   ```

4. **Rebuild and deploy**:
   ```bash
   npm run build:all
   npm run deploy
   ```

---

## Social Media Preview Implementation

### The Problem

Single Page Applications (SPAs) like React apps cannot dynamically set Open Graph meta tags for social media crawlers because:
1. Social media bots don't execute JavaScript
2. They only read the initial HTML sent by the server
3. React renders content client-side, after the HTML is loaded

### The Solution: Pre-rendering

We use a **pre-render script** (`prerender/generatePreviewHtml.js`) that runs after the Vite build to generate **static HTML files** for each route with proper meta tags.

### How It Works

#### Step 1: Build the React App
```bash
vite build
```
This creates the `dist/` folder with the compiled React app.

#### Step 2: Run the Pre-render Script
```bash
node prerender/generatePreviewHtml.js
```

The script:
1. Reads the `dist/index.html` template
2. Loops through all routes in `routesData.js`
3. For each route, creates a folder structure (e.g., `dist/course/llm/`)
4. Generates an `index.html` file with injected meta tags
5. Handles dynamic routes (courses, workshops) by reading data from `courses.js`

#### Step 3: Meta Tag Injection

For each route, the script injects:

```html
<!-- Browser Title -->
<title>SETU | Course Title</title>

<!-- SEO Meta -->
<meta name="description" content="Course description here." />

<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="SETU | Course Title" />
<meta property="og:description" content="Course description here." />
<meta property="og:image" content="https://rohanwadadar.github.io/new_setu/previews/default.png" />
<meta property="og:url" content="https://rohanwadadar.github.io/new_setu/course/llm" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SETU | Course Title" />
<meta name="twitter:description" content="Course description here." />
<meta name="twitter:image" content="https://rohanwadadar.github.io/new_setu/previews/default.png" />
```

### Current Configuration

**All routes use the same preview image**: `/previews/default.png`

This is hardcoded in the script:
```javascript
// Static routes
writeHtml(
    route.path,
    route.title,
    route.description || "SETU School of AI",
    "/previews/default.png" // FORCED
);

// Dynamic course routes
const image = "/previews/default.png"; // FORCED

// Dynamic workshop routes
const image = "/previews/default.png"; // FORCED
```

### Customizing Preview Images

To use different images for different routes:

1. **Add images** to `public/previews/`:
   ```
   public/previews/
   ├── default.png
   ├── course-llm.png
   └── workshop-genai.png
   ```

2. **Update `routesData.js`**:
   ```javascript
   {
       id: "course-detail",
       path: "/course/:courseId",
       previewImage: "/previews/course-llm.png", // Custom image
   }
   ```

3. **Modify the pre-render script** to use `route.previewImage`:
   ```javascript
   writeHtml(
       route.path,
       route.title,
       route.description || "SETU School of AI",
       route.previewImage || "/previews/default.png" // Use custom or fallback
   );
   ```

4. **Rebuild and deploy**:
   ```bash
   npm run build:all
   npm run deploy
   ```

---

## Build & Deployment Process

### Scripts Overview

```json
{
  "scripts": {
    "dev": "vite",                                    // Local development server
    "build": "vite build",                            // Build React app
    "preview": "vite preview",                        // Preview production build locally
    "prerender": "node prerender/generatePreviewHtml.js", // Generate static HTML
    "build:all": "vite build && node prerender/generatePreviewHtml.js", // Build + Pre-render
    "deploy": "npm run build:all && gh-pages -d dist" // Build + Deploy to GitHub Pages
  }
}
```

### Deployment Workflow

#### Automated Deployment (Recommended)
```bash
npm run deploy
```

This single command:
1. Builds the React app (`vite build`)
2. Generates static HTML files with meta tags (`node prerender/generatePreviewHtml.js`)
3. Deploys the `dist/` folder to the `gh-pages` branch (`gh-pages -d dist`)
4. GitHub Pages automatically serves the updated site

#### Manual Deployment
```bash
# Step 1: Build
npm run build:all

# Step 2: Commit changes
git add .
git commit -m "Update site"
git push

# Step 3: Deploy to GitHub Pages
npx gh-pages -d dist
```

### GitHub Pages Configuration

**Repository**: `https://github.com/rohanwadadar/new_setu`  
**Live URL**: `https://rohanwadadar.github.io/new_setu`

**Important Settings:**
1. **`package.json`**:
   ```json
   {
     "homepage": "https://rohanwadadar.github.io/new_setu"
   }
   ```

2. **`vite.config.js`**:
   ```javascript
   export default defineConfig({
     base: "/new_setu/", // Must match repo name
     plugins: [react()],
   });
   ```

3. **`MasterRoutes.jsx`**:
   ```javascript
   <BrowserRouter basename="/new_setu">
   ```

4. **`prerender/generatePreviewHtml.js`**:
   ```javascript
   const BASE_URL = "https://rohanwadadar.github.io/new_setu";
   const BASE_PATH = "/new_setu";
   ```

**All four must match** for routing and previews to work correctly.

---

## Future Backend Integration

### Current State: Static Frontend

The current implementation is **100% static** with:
- No authentication
- No user profiles
- No admin panel
- No database connections
- Hardcoded course/workshop data in `src/data/courses.js`

### Migration Path to Full-Stack Application

When you're ready to integrate with a backend, here's the recommended approach:

#### 1. **API Integration Layer**

Create an API service to fetch data from the backend:

```javascript
// src/api/coursesApi.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const coursesApi = {
    // Fetch all courses
    getAllCourses: async () => {
        const response = await axios.get(`${API_BASE_URL}/courses`);
        return response.data;
    },
    
    // Fetch single course by ID
    getCourseById: async (courseId) => {
        const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
        return response.data;
    },
    
    // Fetch all workshops
    getAllWorkshops: async () => {
        const response = await axios.get(`${API_BASE_URL}/workshops`);
        return response.data;
    },
};
```

#### 2. **Update Components to Use API**

**Before (Static):**
```javascript
// src/pages/Courses.jsx
import { selfPacedCourses } from '../data/courses.js';

export default function Courses() {
    const courses = selfPacedCourses;
    // ... render courses
}
```

**After (Dynamic):**
```javascript
// src/pages/Courses.jsx
import { useState, useEffect } from 'react';
import { coursesApi } from '../api/coursesApi';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await coursesApi.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCourses();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    
    // ... render courses
}
```

#### 3. **Re-enable Authentication**

To restore authentication features:

1. **Uncomment/restore authentication files**:
   - `src/context/AuthContext.jsx`
   - `src/components/ProtectedRoute.jsx`
   - `src/pages/Login.jsx`
   - `src/pages/Register.jsx`
   - `src/pages/Profile.jsx`
   - `src/pages/Admin.jsx`

2. **Add routes back** to `routesData.js`:
   ```javascript
   {
       id: "login",
       path: "/login",
       label: "Login",
       showInNav: false,
       title: "SETU | Login",
       description: "Login to your SETU account",
       previewImage: "/previews/default.png",
       protected: false
   },
   {
       id: "profile",
       path: "/profile",
       label: "Profile",
       showInNav: false,
       title: "SETU | My Profile",
       description: "Manage your SETU profile",
       previewImage: "/previews/default.png",
       protected: true // Requires authentication
   }
   ```

3. **Wrap app with AuthProvider** in `App.jsx`:
   ```javascript
   import { AuthProvider } from './context/AuthContext';
   
   function App() {
       return (
           <AuthProvider>
               <MasterRoutes />
           </AuthProvider>
       );
   }
   ```

4. **Protect routes** in `MasterRoutes.jsx`:
   ```javascript
   import ProtectedRoute from './components/ProtectedRoute';
   
   {routeConfig.map((route) => {
       let element = route.element;
       
       if (route.protected) {
           element = <ProtectedRoute>{element}</ProtectedRoute>;
       }
       
       return (
           <Route key={route.path} path={route.path} element={element} />
       );
   })}
   ```

#### 4. **Backend API Structure**

Your backend should provide these endpoints:

```
Authentication:
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
POST   /api/auth/refresh        - Refresh access token
POST   /api/auth/logout         - Logout user

Courses:
GET    /api/courses             - Get all courses
GET    /api/courses/:id         - Get course by ID
POST   /api/courses             - Create course (admin only)
PUT    /api/courses/:id         - Update course (admin only)
DELETE /api/courses/:id         - Delete course (admin only)

Workshops:
GET    /api/workshops           - Get all workshops
GET    /api/workshops/:id       - Get workshop by ID
POST   /api/workshops           - Create workshop (admin only)
PUT    /api/workshops/:id       - Update workshop (admin only)
DELETE /api/workshops/:id       - Delete workshop (admin only)

Users:
GET    /api/users/profile       - Get current user profile
PUT    /api/users/profile       - Update user profile
GET    /api/users               - Get all users (admin only)
```

#### 5. **Environment Variables**

Create `.env` files for different environments:

```bash
# .env.development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development

# .env.production
REACT_APP_API_URL=https://api.setu.com/api
REACT_APP_ENV=production
```

#### 6. **Hybrid Approach: Static + Dynamic**

You can keep the static version for public pages and add backend for user-specific features:

```javascript
// src/pages/Courses.jsx
import { useState, useEffect } from 'react';
import { selfPacedCourses } from '../data/courses.js'; // Fallback
import { coursesApi } from '../api/coursesApi';

export default function Courses() {
    const [courses, setCourses] = useState(selfPacedCourses); // Start with static data
    
    useEffect(() => {
        // Try to fetch from backend, fallback to static if unavailable
        const fetchCourses = async () => {
            try {
                const data = await coursesApi.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.warn('Using static course data:', error);
                // Already using static data as initial state
            }
        };
        
        fetchCourses();
    }, []);
    
    // ... render courses
}
```

This approach provides:
- ✅ Fast initial load with static data
- ✅ Progressive enhancement with backend data
- ✅ Graceful degradation if backend is unavailable

#### 7. **Pre-rendering with Dynamic Data**

If you integrate a backend but still want social media previews, you'll need **Server-Side Rendering (SSR)** or **Static Site Generation (SSG)**:

**Option A: Next.js (Recommended)**
- Migrate to Next.js for built-in SSR/SSG
- Use `getStaticProps` to fetch data at build time
- Automatically generates static HTML with meta tags

**Option B: Custom SSR**
- Set up an Express server to render React on the server
- More complex but gives full control

**Option C: Keep Current Approach**
- Continue using the pre-render script
- Manually update `courses.js` when backend data changes
- Run `npm run build:all` to regenerate static files

---

## Troubleshooting

### Social Media Previews Not Updating

**Problem**: Shared links show old or incorrect preview images.

**Causes**:
1. Social media platforms cache previews for 24-48 hours
2. The pre-render script didn't run after changes
3. Incorrect image paths

**Solutions**:
1. **Force cache refresh** using platform-specific tools:
   - Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/)
   - Twitter: [Card Validator](https://cards-dev.twitter.com/validator)

2. **Verify build process**:
   ```bash
   npm run build:all  # Ensure pre-render runs
   npm run deploy     # Deploy to GitHub Pages
   ```

3. **Check deployed files**:
   - Visit `https://rohanwadadar.github.io/new_setu/course/llm/` directly
   - View page source (Ctrl+U)
   - Verify `og:image` meta tag has correct URL

### Routing Issues (404 Errors)

**Problem**: Direct navigation to routes like `/course/llm` shows 404.

**Causes**:
1. GitHub Pages doesn't know about client-side routes
2. Missing `404.html` fallback

**Solutions**:
1. **Verify `404.html` exists** in `dist/`:
   ```bash
   # The pre-render script should create this automatically
   ls dist/404.html
   ```

2. **Manually create if missing**:
   ```bash
   cp dist/index.html dist/404.html
   ```

3. **Check `.nojekyll` file** exists in `dist/`:
   ```bash
   ls dist/.nojekyll
   ```

### Build Failures

**Problem**: `npm run build:all` fails.

**Common Errors**:

1. **"dist/index.html not found"**
   - The Vite build failed
   - Run `npm run build` separately to see the error
   - Check for syntax errors in React components

2. **"Cannot find module 'courses.js'"**
   - File extension mismatch (`.js` vs `.jsx`)
   - Ensure `src/data/courses.js` exists (not `.jsx`)
   - Check import paths in `generatePreviewHtml.js`

3. **"SyntaxError: Unexpected token"**
   - Node.js can't parse JSX in `.jsx` files
   - Rename data files to `.js`
   - Use plain JavaScript exports (not JSX)

### Deployment Issues

**Problem**: `npm run deploy` succeeds but site doesn't update.

**Solutions**:
1. **Wait 2-3 minutes** for GitHub Pages to rebuild
2. **Hard refresh** browser (Ctrl+Shift+R)
3. **Check GitHub Pages settings**:
   - Go to repository → Settings → Pages
   - Verify "Source" is set to `gh-pages` branch
4. **Verify deployment**:
   ```bash
   git checkout gh-pages
   git pull
   ls  # Should show dist contents
   git checkout main
   ```

### Image Not Loading

**Problem**: Preview images show broken/missing.

**Solutions**:
1. **Check file path**:
   - Images must be in `public/previews/`
   - Paths in code should be `/previews/image.png` (not `public/previews/`)

2. **Verify image exists in deployed site**:
   - Visit `https://rohanwadadar.github.io/new_setu/previews/default.png`
   - Should display the image

3. **Check image size**:
   - Recommended: 1200x630px (Open Graph standard)
   - Max file size: ~1MB for fast loading

---

## Best Practices

### 1. **Keep Data Centralized**
- All route metadata in `routesData.js`
- All course/workshop data in `data/courses.js`
- Avoid hardcoding titles, descriptions, or paths in components

### 2. **Use Descriptive Meta Tags**
- Write unique, compelling descriptions for each route
- Include relevant keywords for SEO
- Keep titles under 60 characters
- Keep descriptions under 160 characters

### 3. **Optimize Preview Images**
- Use 1200x630px for best compatibility
- Compress images (use tools like TinyPNG)
- Include text overlays for clarity
- Test on multiple platforms before deploying

### 4. **Test Before Deploying**
```bash
# 1. Build locally
npm run build:all

# 2. Preview locally
npm run preview

# 3. Test all routes manually
# 4. Check browser console for errors
# 5. Deploy only if everything works
npm run deploy
```

### 5. **Version Control**
- Commit changes before deploying
- Use meaningful commit messages
- Tag releases for easy rollback
- Don't commit `dist/` or `node_modules/`

---

## Summary

This static site implementation provides:
- ✅ **SEO-friendly** static HTML for all routes
- ✅ **Social media previews** with Open Graph tags
- ✅ **Automated deployment** to GitHub Pages
- ✅ **Scalable architecture** for future backend integration
- ✅ **Centralized routing** for easy maintenance

For questions or issues, refer to:
- **Vite Docs**: https://vitejs.dev/
- **React Router Docs**: https://reactrouter.com/
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Open Graph Protocol**: https://ogp.me/

---

**Last Updated**: January 27, 2026  
**Version**: 1.0.0  
**Maintainer**: SETU Development Team
