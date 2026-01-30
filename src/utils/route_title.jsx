// ============================================================================
// 📋 ROUTE TITLE MANAGER
// ============================================================================
// This component handles dynamic browser title updates and meta descriptions
// based on the current route.
//
// 💡 For beginners: This runs in the background and updates the browser tab
// title when you navigate to different pages.
// ============================================================================

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesData, selfPacedCourses, workshopsData } from "../data/appData";

/**
 * PageTitleManager Component
 * 
 * Automatically updates:
 * - Browser tab title (document.title)
 * - Meta description tag (for SEO)
 * - Scrolls to top on route change (better UX)
 * 
 * This component doesn't render anything visible - it just runs effects.
 */
export default function PageTitleManager() {
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
//7425 +5500    for 12lakh  + 9lk              , 15l    9250 +  3 lakh        // ========================================
        // CASE 3: Static Pages (Home, About, etc.)
        // ========================================
        else {
            const currentRoute = routesData.find(
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
        const currentRoute = routesData.find(
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
// 📝 USAGE EXAMPLE
// ============================================================================
/*

In your App.jsx or main router:

import PageTitleManager from "./utils/route_title";

function App() {
    return (
        <BrowserRouter>
            <PageTitleManager />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

*/

