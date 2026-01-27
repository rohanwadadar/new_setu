import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu, X, Search, ChevronRight
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  const mainLinks = [
    { to: "/about", label: "About Us" },
    { to: "/enterprise", label: "For Enterprise" },
  ];

  return (
    <nav className="sticky top-0 z-[60] backdrop-blur-xl bg-[#020617]/90 border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center gap-4">

        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center flex-shrink-0 transition-transform active:scale-95">
          <img
            src="https://setuschool.com/static/media/setu-logo-web-footer.1955db586cc455c25e448cc8a4b75584.svg"
            alt="SETU Logo"
            className="h-8 sm:h-10 w-auto object-contain"
          // Note: If the logo appears invisible because it's dark, 
          // you can add "brightness-0 invert" to the className
          />
        </Link>

        {/* CENTER: SEARCH BAR (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-sm lg:max-w-md relative group"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all"
          />
        </form>

        {/* RIGHT AREA */}
        <div className="flex items-center gap-2 sm:gap-6">

          {/* Desktop Links (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-8 mr-4">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] font-black uppercase tracking-widest transition-all ${location.pathname === link.to ? "text-yellow-500" : "text-slate-400 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* MOBILE HAMBURGER MENU TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#020617] border-b border-white/10 p-5 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">

          {/* Mobile Search bar */}
          <form onSubmit={handleSearch} className="md:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none"
            />
          </form>

          {/* Nav Links moved to menu on small screens */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-2">Navigation</p>
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 text-slate-200 font-bold transition-colors"
              >
                {link.label}
                <ChevronRight size={16} className="text-slate-600" />
              </Link>
            ))}
          </div>

        </div>
      )}
    </nav>
  );
}