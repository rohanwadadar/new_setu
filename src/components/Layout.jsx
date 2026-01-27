import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30">

            {/* GLOBAL BACKGROUND ELEMENTS */}
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

            <Navbar />

            {/* MAIN CONTENT - flex-grow pushes footer down */}
            <main className="flex-grow relative z-10">
                {children}
            </main>

            <Footer />

        </div>
    );
}
