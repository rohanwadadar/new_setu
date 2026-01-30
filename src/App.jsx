// ============================================================================
// 🎯 SETU APPLICATION - Main App Component
// ============================================================================
// This is the main App component that contains:
// - All routing logic
// - Layout structure (Navbar + Footer)
// - Page title management
//
// 💡 For beginners: This is the complete application in one file!
// Everything is organized here for simplicity.
// ============================================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTitleManager from "./utils/route_title";

// ============================================================================
// 📄 IMPORT ALL PAGE COMPONENTS
// ============================================================================
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Roadmap from "./pages/Roadmap";
import ForEnterprise from "./pages/ForEnterprise";
import CourseDetail from "./pages/CourseDetail";
import WorkshopDetail from "./pages/WorkshopDetail";

// ============================================================================
// 📊 IMPORT DATA
// ============================================================================
import { routesData } from "./data/appData";

// ============================================================================
// 🗺️ ROUTE-TO-COMPONENT MAPPING
// ============================================================================
// This connects each route ID to its React component

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
// 🔧 GENERATE ROUTE CONFIGURATION
// ============================================================================
// This combines the route data with the components

export const routeConfig = routesData.map(route => ({
  ...route,
  element: componentMap[route.id] || <Home />
}));

// ============================================================================
// 🎯 MAIN APP COMPONENT
// ============================================================================

function App() {
  return (
    <BrowserRouter basename="/new_setu">
      {/* Page Title Manager - Updates browser tab titles */}
      <PageTitleManager />

      {/* Main Layout Container */}
      <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30">

        {/* ========================================
                    GLOBAL BACKGROUND ELEMENTS
                    ======================================== */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full opacity-60"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-yellow-500/5 blur-[100px] rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/5 blur-[140px] rounded-full"></div>

          {/* Technical Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.2) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(234, 179, 8, 0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* ========================================
                    NAVIGATION BAR
                    ======================================== */}
        <Navbar />

        {/* ========================================
                    MAIN CONTENT AREA
                    ======================================== */}
        <main className="flex-grow relative z-10">
          <Routes>
            {/* Dynamic Route Generation */}
            {routeConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            {/* 404 Page - Page Not Found */}
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
        </main>

        {/* ========================================
                    FOOTER
                    ======================================== */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;

// ============================================================================
// 📝 QUICK REFERENCE GUIDE
// ============================================================================
/*

🎯 HOW TO ADD A NEW PAGE:

1. Create the component in src/pages/MyNewPage.jsx
2. Import it above: import MyNewPage from "./pages/MyNewPage";
3. Add to componentMap: "my-new-page": <MyNewPage />
4. Add route data in src/data/appData.js

🎯 HOW TO ADD A NEW COURSE:

1. Add to selfPacedCourses in src/data/appData.js
2. Done! Accessible at /course/my-course

🎯 HOW TO ADD A NEW WORKSHOP:

1. Add to workshopsData in src/data/appData.js
2. Done! Accessible at /workshop/my-workshop

*/
