// ============================================================================
// 📋 ROUTE TITLE MANAGER (Dynamic API Support)
// ============================================================================

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { routesData } from "./data/appData";

export default function PageTitleManager() {
    const { pathname } = useLocation();
    const [courses, setCourses] = useState([]);

    // Fetch live courses once on mount
    useEffect(() => {
        fetch(import.meta.env.VITE_COURSE_API)
            .then(res => res.json())
            .then(data => {
                if (data && data.courses) {
                    setCourses(data.courses);
                }
            })
            .catch(err => console.error("Failed to fetch courses for title manager:", err));
    }, []);


    useEffect(() => {
        const normalize = (p) => p.toLowerCase().replace(/\/$/, "") || "/";
        const currentPath = normalize(pathname);

        // ========================================
        // 1. Dynamic Course Pages (from API)
        // ========================================
        const routePrefix = import.meta.env.VITE_COURSE_ROUTE_PREFIX || "/dap-course";
        if (currentPath.startsWith(routePrefix + "/")) {
            const parts = currentPath.split("/"); // ["", "dap-course", uid, slug]
            const uid = parts[2] || "";
            const slug = parts[3] || "";

            // Find course by uid OR slug in the API data
            const courseData = courses.find(c => {
                const uidMatch =
                    c.course_uid?.toLowerCase() === uid.toLowerCase() ||
                    c.course_details?.course_uid?.toLowerCase() === uid.toLowerCase();
                const slugMatch =
                    c.course_details?.slug?.toLowerCase() === slug.toLowerCase() ||
                    c.course_details?.course_title?.replace(/\s+/g, '_').toLowerCase() === slug.toLowerCase();
                return uidMatch || slugMatch;
            });

            if (courseData) {
                document.title = `SETU | ${courseData.course_name || courseData.course_details?.course_title}`;
            } else {
                document.title = "SETU | Course Details";
            }
        }

        // ========================================
        // 2. Static Pages (Home, About, etc.)
        // ========================================
        else {
            const currentRoute = routesData.find(
                (route) => normalize(route.path) === currentPath
            );

            if (currentRoute) {
                document.title = currentRoute.title;
            } else {
                document.title = "SETU | Empowering Learners";
            }
        }

        window.scrollTo(0, 0);

    }, [pathname, courses]); // Re-run when path OR course data changes

    return null;
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

