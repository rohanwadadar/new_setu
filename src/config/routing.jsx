// ============================================================================
// 🚀 SETU ROUTING SYSTEM - Complete Routing Configuration
// ============================================================================
// This file handles ALL routing for the SETU application.
// It combines route configuration and the main router in one place.
//
// 💡 For beginners: Think of this as a map that tells React which page
// to show when someone visits a URL.
//
// Structure:
// 1. Import all page components
// 2. Map routes to components
// 3. Page Manager (handles browser titles and scrolling)
// 4. Main Router (renders the actual pages)
// ============================================================================

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";

// ============================================================================
// 📄 SECTION 1: IMPORT ALL PAGE COMPONENTS
// ============================================================================
// These are the actual React components that render each page

import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Roadmap from "../pages/Roadmap";
import ForEnterprise from "../pages/ForEnterprise";
import CourseDetail from "../pages/CourseDetail";
import WorkshopDetail from "../pages/WorkshopDetail";

// ============================================================================
// 📊 SECTION 2: IMPORT DATA
// ============================================================================
// Import all data from our unified data file

import {
    routesData,
    selfPacedCourses,
    workshopsData
} from "../data/appData";

// ============================================================================
// 🗺️ SECTION 3: ROUTE-TO-COMPONENT MAPPING
// ============================================================================
// This connects each route ID to its React component
// 
// 💡 How it works:
// - When user visits "/about", we look up "about" in this map
// - We find <About /> component and render it
//
// 💡 To add a new page:
// 1. Create the component in src/pages/
// 2. Import it above (Section 1)
// 3. Add it to this map with a unique ID

const componentMap = {
    "home": <Home />,
    "about": <About />,
    "courses": <Courses />,
    "roadmap": <Roadmap />,
    "enterprise": <ForEnterprise />,
    "course-detail": <CourseDetail />,
    "workshop-detail": <WorkshopDetail />
};

// ============================================================================
// 🔧 SECTION 4: GENERATE ROUTE CONFIGURATION
// ============================================================================
// This combines the route data with the components
// Result: Each route has all its data + the component to render

export const routeConfig = routesData.map(route => ({
    ...route, // Spread all route data (path, title, description, etc.)
    element: componentMap[route.id] || <Home /> // Add the React component
}));

// ============================================================================
// 📋 SECTION 5: PAGE MANAGER COMPONENT
// ============================================================================
// This invisible component runs on every page and handles:
// - Browser tab titles (SEO)
// - Meta descriptions (SEO)
// - Scroll to top when changing pages (UX)
//
// 💡 For beginners: This is like a helper that runs in the background
// to make sure each page has the right title and scrolls to the top

function PageManager() {
    const { pathname } = useLocation(); // Get current URL path

    useEffect(() => {
        // Helper function to normalize paths (remove trailing slashes)
        const normalize = (p) => p.toLowerCase().replace(/\/$/, "") || "/";
        const currentPath = normalize(pathname);

        // ========================================
        // CASE 1: Dynamic Course Pages
        // ========================================
        // Example: /course/llm
        if (currentPath.startsWith("/course/")) {
            const courseId = currentPath.split("/")[2]; // Extract "llm" from "/course/llm"
            const courseData = selfPacedCourses.find(c => c.id === courseId);

            if (courseData) {
                // Found the course, set custom title
                document.title = `SETU | ${courseData.title}`;
            } else {
                // Course not found, use generic title
                document.title = "SETU | Course Details";
            }
        }

        // ========================================
        // CASE 2: Dynamic Workshop Pages
        // ========================================
        // Example: /workshop/genai-app
        else if (currentPath.startsWith("/workshop/")) {
            const workshopId = currentPath.split("/")[2]; // Extract "genai-app"
            const workshopData = workshopsData.find(w => w.id === workshopId);

            if (workshopData) {
                // Found the workshop, set custom title
                document.title = `SETU | Workshop: ${workshopData.title}`;
            } else {
                // Workshop not found, use generic title
                document.title = "SETU | Workshop Details";
            }
        }

        // ========================================
        // CASE 3: Static Pages (Home, About, etc.)
        // ========================================
        else {
            const currentRoute = routeConfig.find(
                (route) => normalize(route.path) === currentPath
            );

            if (currentRoute) {
                // Found the route, use its title
                document.title = currentRoute.title;
            } else {
                // Route not found, use fallback title
                document.title = "SETU | Empowering Learners";
            }
        }

        // ========================================
        // Update Meta Description (for SEO)
        // ========================================
        const metaDescription = document.querySelector('meta[name="description"]');
        const currentRoute = routeConfig.find(
            (route) => normalize(route.path) === currentPath
        );

        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                currentRoute?.description || "SETU School of AI"
            );
        }

        // ========================================
        // Scroll to Top (better UX)
        // ========================================
        window.scrollTo(0, 0);

    }, [pathname]); // Run this effect whenever the URL changes

    return null; // This component doesn't render anything visible
}

// ============================================================================
// 🎯 SECTION 6: MAIN ROUTER COMPONENT
// ============================================================================
// This is the main component that renders all pages
//
// 💡 How it works:
// 1. BrowserRouter: Enables routing in the app
// 2. PageManager: Runs in background to handle titles/scrolling
// 3. Layout: Wraps all pages with Navbar, Sidebar, Footer
// 4. Routes: Contains all the actual page routes
//
// 💡 The flow:
// User visits URL → Router finds matching route → Renders component

export default function MasterRoutes() {
    return (
        <BrowserRouter basename="/new_setu">
            {/* ========================================
                INVISIBLE COMPONENTS (run in background)
                ======================================== */}
            <PageManager />

            {/* ========================================
                LAYOUT WRAPPER
                ======================================== 
                This wraps ALL pages with:
                - Navigation bar (top)
                - Sidebar (if any)
                - Footer (bottom)
            */}
            <Layout>
                {/* ========================================
                    ALL PAGE ROUTES
                    ======================================== */}
                <Routes>
                    {/* ========================================
                        DYNAMIC ROUTE GENERATION
                        ========================================
                        This loop creates a <Route> for each item
                        in routeConfig automatically.
                        
                        💡 For beginners: Instead of writing:
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/courses" element={<Courses />} />
                        ...
                        
                        We just loop through routeConfig and create
                        all routes automatically!
                    */}
                    {routeConfig.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}

                    {/* ========================================
                        404 PAGE (Page Not Found)
                        ========================================
                        This catches any URL that doesn't match
                        the routes above.
                        
                        Example: /random-page-that-doesnt-exist
                    */}
                    <Route
                        path="*"
                        element={
                            <div style={{
                                textAlign: 'center',
                                padding: '100px 20px',
                                minHeight: '60vh',
                                color: 'white'
                            }}>
                                <h1 className="text-6xl font-black mb-4 text-[#ffcc33]">
                                    404
                                </h1>
                                <p className="text-xl opacity-50">
                                    Oops! The page you are looking for doesn't exist.
                                </p>
                                <button
                                    onClick={() => window.location.href = "/"}
                                    className="mt-8 px-6 py-2 bg-[#ffcc33] text-black font-bold rounded-lg"
                                >
                                    Go Home
                                </button>
                            </div>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

// ============================================================================
// 📝 QUICK REFERENCE GUIDE
// ============================================================================
/*

🎯 HOW TO ADD A NEW PAGE:

1. Create the component:
   - Create file: src/pages/MyNewPage.jsx
   - Export default function MyNewPage() { return <div>Content</div> }

2. Import it (Section 1):
   import MyNewPage from "./pages/MyNewPage";

3. Add to componentMap (Section 3):
   "my-new-page": <MyNewPage />

4. Add route data in appData.js:
   {
       id: "my-new-page",
       path: "/my-new-page",
       label: "My New Page",
       showInNav: true,
       title: "SETU | My New Page",
       description: "Description here",
       previewImage: "/previews/default.png",
       protected: false
   }

5. Done! Your page is now accessible at /my-new-page

---

🎯 HOW TO ADD A NEW COURSE:

1. Add to selfPacedCourses in appData.js:
   {
       id: "my-course",
       title: "My Amazing Course",
       description: "Learn amazing things"
   }

2. Done! The course is now accessible at /course/my-course
   (No need to create a new component - CourseDetail handles all courses)

---

🎯 HOW TO ADD A NEW WORKSHOP:

1. Add to workshopsData in appData.js:
   {
       id: "my-workshop",
       title: "My Workshop",
       category: "Category",
       status: "UPCOMING",
       description: "Workshop description"
   }

2. Done! The workshop is now accessible at /workshop/my-workshop
   (No need to create a new component - WorkshopDetail handles all workshops)

*/
