// ============================================================================
// 📊 SETU DATA CENTER - All Application Data in One Place
// ============================================================================
// This file contains ALL data for the SETU application:
// - Navigation routes
// - Course information
// - Workshop information
// - SEO metadata (titles, descriptions, preview images)
//
// 💡 For beginners: This is like a database, but in JavaScript!
// ============================================================================

// ============================================================================
// 🗺️ SECTION 1: NAVIGATION ROUTES
// ============================================================================
// These define all the pages in your website
// Each route has:
// - id: Unique identifier
// - path: URL path (e.g., "/about" shows at yoursite.com/about)
// - label: Text shown in navigation menu
// - showInNav: true = appears in menu, false = hidden page
// - title: Browser tab title (important for SEO)
// - description: Page description (important for Google/social media)
// - previewImage: Image shown when sharing on social media
// - protected: false = anyone can view, true = login required

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
        id: "about",
        path: "/about",
        label: "About Us",
        showInNav: true,
        title: "SETU | About Our Mission",
        description: "Learn more about our mission.",
        previewImage: "/previews/default.png",
        protected: false
    },
    {
        id: "roadmap",
        path: "/roadmap",
        label: "Roadmap",
        showInNav: true,
        title: "SETU | Your AI | Follow our step-by-step roadmap to master AI",
        description: "Follow our step-by-step roadmap to master AI.",
        previewImage: "/previews/default.png",
        protected: false
    },

    {
        id: "enterprise",
        path: "/enterprise",
        label: "Enterprise",
        showInNav: true,
        title: "SETU | For Enterprise | SETU solutions for enterprise and businesses",
        description: "SETU solutions for enterprise and businesses.",
        previewImage: "/previews/default.png",
        protected: false
    },
    // Dynamic routes (these use :parameter in the path)
    {
        id: "course-detail",
        path: "/course/:courseId",
        label: "Course",
        showInNav: false, // Don't show in menu (it's a dynamic page)
        title: "SETU | Course",
        description: "Explore our specialized AI and Data courses.",
        previewImage: "/previews/courses.png",
        protected: false
    }
];

// 📚 SECTION 2: SELF-PACED COURSES (Fallback data, now mostly API driven)
export const selfPacedCourses = [
    {
        id: "llm",
        title: "Large Language Modeling (LLM)",
        description: "Master LLMs with hands-on projects and advanced techniques.",
        image: "/previews/courses.png"
    }
];

/**
 * Get a course by its ID
 */
export const getCourseById = (courseId) => {
    return selfPacedCourses.find(course => course.id === courseId) || null;
};

/**
 * Get a route by its ID
 */
export const getRouteById = (routeId) => {
    return routesData.find(route => route.id === routeId) || null;
};

/**
 * Get all routes that should appear in navigation
 */
export const getNavigationRoutes = () => {
    return routesData.filter(route => route.showInNav === true);
};


// ============================================================================
// 📝 USAGE EXAMPLES (for beginners)
// ============================================================================
/*

// Example 1: Get all courses
import { selfPacedCourses } from './data/appData';
console.log(selfPacedCourses); // Shows all courses

// Example 2: Get a specific course
import { getCourseById } from './data/appData';
const llmCourse = getCourseById('llm');
console.log(llmCourse.title); // "Large Language Modeling (LLM)"

// Example 3: Get navigation menu items
import { getNavigationRoutes } from './data/appData';
const navItems = getNavigationRoutes();
// Use this to build your navigation menu

// Example 4: Add a new course
// Just add a new object to selfPacedCourses array above:
{
    id: "new-course",
    title: "My New Course",
    description: "Description here"
}

*/
