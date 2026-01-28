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
        id: "courses",
        path: "/courses",
        label: "Courses",
        showInNav: true,
        title: "SETU | Courses | Browse our AI courses",
        description: "Browse our AI courses.",
        previewImage: "/previews/courses.png",
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
    },
    {
        id: "workshop-detail",
        path: "/workshop/:workshopId",
        label: "Workshop",
        showInNav: false, // Don't show in menu (it's a dynamic page)
        title: "SETU | Workshop",
        description: "Join our expert-led workshops.",
        previewImage: "/previews/workshop.png",
        protected: false
    }
];

// ============================================================================
// 📚 SECTION 2: SELF-PACED COURSES
// ============================================================================
// List of all self-paced courses offered by SETU
// Each course has:
// - id: Unique identifier (used in URL: /course/llm)
// - title: Course name
// - description: What the course teaches (optional, for SEO)
//
// 💡 To add a new course:
// 1. Add a new object to this array
// 2. Create the course page component in src/pages/
// 3. The URL will automatically be /course/your-id

export const selfPacedCourses = [
    {
        id: "llm",
        title: "Large Language Modeling (LLM)",
        description: "Master LLMs with hands-on projects and advanced techniques."
    },
    {
        id: "genbi",
        title: "Generative Business Intelligence (GenBI)",
        description: "Learn to build AI-powered business intelligence solutions."
    },
    {
        id: "mlops",
        title: "MLOps & LLMOps",
        description: "Master the operations and deployment of ML and LLM systems."
    },
    {
        id: "data-aws",
        title: "Data Engineering with AWS",
        description: "Build scalable data pipelines using AWS services."
    },
    {
        id: "data-azure",
        title: "Data Engineering with Azure",
        description: "Master data engineering on Microsoft Azure cloud platform."
    },
    {
        id: "snowflake",
        title: "Data Engineering with Snowflake",
        description: "Learn modern data warehousing with Snowflake."
    },
    {
        id: "powerbi",
        title: "PowerBI & Power Automate",
        description: "Create powerful business intelligence dashboards and automations."
    },
    {
        id: "nosql",
        title: "Managing Semi-structured Data with NoSQL",
        description: "Work with modern NoSQL databases for flexible data storage."
    }
];

// ============================================================================
// 🎓 SECTION 3: LIVE WORKSHOPS
// ============================================================================
// List of all live workshops offered by SETU
// Each workshop has:
// - id: Unique identifier (used in URL: /workshop/genai-app)
// - title: Workshop name
// - category: Type of workshop (GenAI, Basics, Management, etc.)
// - status: Current status (LIVE, UPCOMING, CLASS FULL)
// - description: What the workshop covers (optional, for SEO)
//
// 💡 To add a new workshop:
// 1. Add a new object to this array
// 2. The URL will automatically be /workshop/your-id
// 3. Update the status as needed (LIVE, UPCOMING, CLASS FULL)

export const workshopsData = [
    {
        id: "genai-app",
        title: "Vibe Coding a GenAI application(C3)",
        category: "GenAI",
        status: "CLASS FULL",
        description: "Join our intensive GenAI Vibe Coding workshop. Learn to build AI apps without writing boilerplate code."
    },
    {
        id: "python-basics",
        title: "Python for All",
        category: "Basics",
        status: "LIVE",
        description: "Learn Python programming from scratch with hands-on exercises."
    },
    {
        id: "ai-agile",
        title: "AI Meets Agile",
        category: "Management",
        status: "UPCOMING",
        description: "Integrate AI into your Agile workflow for better project management."
    },
    {
        id: "agentic-no-code",
        title: "Agentic AI for Non-Coders",
        category: "No-Code",
        status: "CLASS FULL",
        description: "Build autonomous AI agents without writing code."
    },
    {
        id: "agentic-adv",
        title: "Agentic AI - Build Autonomous Solutions (C1)",
        category: "Advanced",
        status: "UPCOMING",
        description: "Advanced workshop on building autonomous AI systems."
    },
    {
        id: "hr-genai",
        title: "GenAI Powered Transformative HR",
        category: "Business",
        status: "UPCOMING",
        description: "Transform HR processes with Generative AI tools and techniques."
    }
];

// ============================================================================
// 🎯 HELPER FUNCTIONS
// ============================================================================
// These functions help you work with the data above

/**
 * Get a course by its ID
 * @param {string} courseId - The course ID (e.g., "llm")
 * @returns {object|null} - The course object or null if not found
 */
export const getCourseById = (courseId) => {
    return selfPacedCourses.find(course => course.id === courseId) || null;
};

/**
 * Get a workshop by its ID
 * @param {string} workshopId - The workshop ID (e.g., "genai-app")
 * @returns {object|null} - The workshop object or null if not found
 */
export const getWorkshopById = (workshopId) => {
    return workshopsData.find(workshop => workshop.id === workshopId) || null;
};

/**
 * Get a route by its ID
 * @param {string} routeId - The route ID (e.g., "home")
 * @returns {object|null} - The route object or null if not found
 */
export const getRouteById = (routeId) => {
    return routesData.find(route => route.id === routeId) || null;
};

/**
 * Get all routes that should appear in navigation
 * @returns {array} - Array of routes with showInNav === true
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
