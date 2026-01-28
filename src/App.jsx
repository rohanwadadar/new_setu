// ============================================================================
// 🎯 SETU APPLICATION ENTRY POINT
// ============================================================================
// This is the main App component that starts the entire application.
//
// 💡 For beginners: This is like the "main()" function in other languages.
// Everything starts here!
//
// The App component simply loads the routing system, which then handles
// showing the correct page based on the URL.
// ============================================================================

import MasterRoutes from "./config/routing";

function App() {
  return <MasterRoutes />;
}

export default App;
