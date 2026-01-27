import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
// import ProtectedRoute from "./auth/ProtectedRoute"; // REMOVED
import { routeConfig } from "./routeConfig.jsx";
import { selfPacedCourses, workshopsData } from "./data/courses";

/**
 * 🔹 PAGE MANAGER (SEO & UX)
 * This component automatically handles Tab Titles, Meta Descriptions, and Scrolling.
 */
function PageManager() {
    const { pathname } = useLocation();

    useEffect(() => {
        const normalize = (p) => p.toLowerCase().replace(/\/$/, "") || "/";
        const currentPath = normalize(pathname);

        // 2. Find the current route data from static config
        const currentRoute = routeConfig.find((route) => normalize(route.path) === currentPath);

        // 3. AUTOMATION LOGIC: Handle Dynamic Titles

        // CASE A: Self Paced Course Pages (/course/id)
        if (currentPath.startsWith("/course/")) {
            const courseId = currentPath.split("/")[2];
            const courseData = selfPacedCourses.find(c => c.id === courseId);

            if (courseData) {
                document.title = `SETU | ${courseData.title}`;
            } else {
                document.title = "SETU | Course Details";
            }
        }

        // CASE B: Live Workshop Pages (/workshop/id)
        else if (currentPath.startsWith("/workshop/")) {
            const workshopId = currentPath.split("/")[2];
            const workshopData = workshopsData.find(w => w.id === workshopId);

            if (workshopData) {
                document.title = `SETU | Workshop: ${workshopData.title}`;
            } else {
                document.title = "SETU | Workshop Details";
            }
        }

        // CASE C: Standard Static Pages (Home, About, etc.)
        else if (currentRoute) {
            document.title = currentRoute.title;
        }

        // FALLBACK
        else {
            document.title = "SETU | Empowering Learners";
        }

        // 4. Dynamic Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", currentRoute?.description || "SETU School of AI");
        }

        // 5. Scroll to Top on every route change
        window.scrollTo(0, 0);

    }, [pathname]);

    return null;
}

/**
 * 🔹 MAIN ROUTER COMPONENT
 */
export default function MasterRoutes() {
    return (
        <BrowserRouter>
            {/* PageManager runs invisibly to handle browser titles */}
            <PageManager />

            {/* Layout wraps all pages (Navbar, Sidebar, Footer) */}
            <Layout>
                <Routes>
                    {/* Map through routeConfig to generate all static and dynamic routes */}
                    {routeConfig.map((route) => {
                        let elementToRender = route.element;

                        // Protected routes logic removed for static version

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={elementToRender}
                            />
                        );
                    })}

                    {/* 404 - Page Not Found Catch-all */}
                    <Route
                        path="*"
                        element={
                            <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', color: 'white' }}>
                                <h1 className="text-6xl font-black mb-4 text-[#ffcc33]">404</h1>
                                <p className="text-xl opacity-50">Oops! The page you are looking for doesn't exist.</p>
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