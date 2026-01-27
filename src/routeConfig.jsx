// Page Components
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import ForEnterprise from "./pages/ForEnterprise";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Courses from "./pages/Courses";
import WorkshopDetail from "./pages/WorkshopDetail";

import { routesData } from "./routesData";

/**
 * 🔹 COMPONENT MAPPING
 * Maps route IDs to actual React components.
 */
const componentMap = {
    "home": <Home />,
    "roadmap": <Roadmap />,
    "enterprise": <ForEnterprise />,
    "course-detail": <CourseDetail />,
    "about": <About />,
    "courses": <Courses />,
    "workshop-detail": <WorkshopDetail />
};

/**
 * 🔹 CENTRAL ROUTE CONFIGURATION
 * Merges static metadata with React components.
 */
export const routeConfig = routesData.map(route => ({
    ...route,
    element: componentMap[route.id] || <Home /> // Fallback should be handled carefully, but 404 handles unknown paths
}));
