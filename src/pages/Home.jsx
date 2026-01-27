import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { selfPacedCourses, workshopsData } from "../data/courses";
import {
  Terminal, Compass, BookOpen, ArrowRight,
  Lock, Radio, ChevronRight, Play, Users,
  PlayCircle, ExternalLink
} from "lucide-react";

/**
 * 🔹 REUSABLE SUB-COMPONENTS
 */

function DottedArrow() {
  return (
    <div className="flex items-center opacity-40">
      <svg width="48" height="8" viewBox="0 0 48 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4H43" stroke="#ffcc33" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
        <path d="M41 1L47 4L41 7" stroke="#ffcc33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionHeader({ title, subtitle, badgeIcon }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter px-8 py-4 border border-[#ffcc33]/40 rounded-2xl bg-[#ffcc33]/5 flex items-center gap-4 shadow-[0_0_15px_rgba(255,204,51,0.05)]">
          {badgeIcon} {title}
        </h2>
        {subtitle && (
          <span className="hidden md:block px-4 py-1.5 bg-blue-600/10 text-blue-400 text-[10px] font-black rounded-lg uppercase border border-blue-500/20 tracking-widest">
            {subtitle}
          </span>
        )}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-[#ffcc33]/30 to-transparent"></div>
    </div>
  );
}

// FIXED: WorkshopCard now accepts and uses the onClick prop
function WorkshopCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-[#0b1120] border border-slate-800 p-10 rounded-3xl hover:border-[#ffcc33] transition-all cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(255,204,51,0.1)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffcc33]/5 rounded-bl-[4rem] group-hover:bg-[#ffcc33]/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#ffcc33] transition-colors">{item.category}</span>
        <div className={`flex items-center gap-2 text-[10px] font-black px-3 py-2 rounded-xl border border-white/5 ${item.status === 'LIVE' ? 'text-red-500 bg-red-500/10' : 'text-slate-400 bg-black/40'}`}>
          {item.status !== 'LIVE' && <Lock size={12} className="text-[#ffcc33]" />}
          {item.status}
        </div>
      </div>
      <h3 className="text-xl font-bold group-hover:text-[#ffcc33] transition-colors mb-4 leading-tight relative z-10">{item.title}</h3>
      <div className="mt-10 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#ffcc33]">View Details</span>
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

/**
 * 🔹 MAIN HOME COMPONENT
 */
export default function Home() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Terminal className="text-[#ffcc33]" size={42} strokeWidth={1.5} />,
      title: "Tell Shifu your goal",
      desc: "'Want to be a Data Analyst' or 'learn Agentic AI in Finance'?"
    },
    {
      icon: <Compass className="text-[#ffcc33]" size={42} strokeWidth={1.5} />,
      title: "Get your personalized roadmap",
      desc: "Shifu analyzes millions of paths to build the one just for you."
    },
    {
      icon: <BookOpen className="text-[#ffcc33]" size={42} strokeWidth={1.5} />,
      title: "Access Curated Contents",
      desc: "The best articles, videos, and courses, all in one place"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-[#ffcc33]/30 font-sans">

      {/* --- HERO SECTION --- */}
      <div className="relative pt-10 pb-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ffcc33] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-80 text-center lg:text-left animate-pulse">
            योग: कर्मसु कौशलम्
          </p>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 relative z-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                  Shifu - <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">your personal AI learning coach</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium max-w-lg">
                  Stop searching. Start Learning with a clear path in <span className="text-[#ffcc33] underline decoration-[#ffcc33]/30 underline-offset-4">3 simple steps</span>.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/roadmap")}
                  className="group relative flex items-center gap-4 bg-[#ffcc33] text-black font-black px-10 py-4 rounded-xl transition-all shadow-[0_0_40px_rgba(255,204,51,0.3)] hover:shadow-[0_0_60px_rgba(255,204,51,0.5)] active:scale-95 uppercase text-xs tracking-widest overflow-hidden"
                >
                  <span className="relative">Create My Roadmap</span>
                  <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffcc33] to-[#ffa500] rounded-[2.2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative aspect-video w-full bg-[#020617] border border-[#ffcc33]/50 rounded-[2rem] overflow-hidden shadow-2xl">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                  <source src="https://setucontainer.blob.core.windows.net/setu/Shifu%20Video%20Part%202.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-20">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center w-full group">
                <div className="flex-1 bg-[#0f172a]/40 border border-[#ffcc33]/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#ffcc33]/60 transition-all duration-500 backdrop-blur-sm group-hover:-translate-y-1">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
                  <h3 className="text-sm font-bold mb-2 uppercase tracking-wider text-white group-hover:text-[#ffcc33] transition-colors">{step.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed italic">{step.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="hidden md:block px-2"><DottedArrow /></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- WORKSHOPS SECTION --- */}
      <section className="py-24 px-6 border-t border-[#ffcc33]/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="DAP Live Workshops"
            badgeIcon={<Radio className="text-red-500 animate-pulse" size={18} />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopsData.map((item) => (
              <WorkshopCard
                key={item.id}
                item={item}
                onClick={() => navigate(`/workshop/${item.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- SELF PACED COURSES SECTION --- */}
      <section className="py-24 px-6 bg-[#0f172a]/30 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ffcc33]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="DAP Self Paced Courses" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selfPacedCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="text-left p-6 bg-slate-900/60 border border-white/5 rounded-2xl font-bold text-sm hover:border-[#ffcc33] hover:bg-slate-800 transition-all flex justify-between items-center group relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-[#ffcc33] transition-colors">{course.title}</span>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#ffcc33] transition-colors relative z-10" />
                <div className="absolute inset-0 bg-[#ffcc33]/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- ASSESSMENT & PROJECTS --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeader title="Skill Based Assessment" subtitle="3 Free Attempts Per Test" />
            <div className="grid grid-cols-2 gap-4">
              {['SQL', 'Big Data', 'Data Science', 'Statistics', 'Python', 'Machine Learning'].map(item => (
                <div key={item} className="p-5 bg-slate-900/30 border border-white/10 rounded-2xl text-center font-black uppercase text-[11px] tracking-[0.2em] text-slate-500 hover:text-[#ffcc33] hover:border-[#ffcc33] transition-all cursor-default">{item}</div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Industry Projects" subtitle="Apply Knowledge to Real Use Cases" />
            <div className="relative h-56 bg-slate-900/40 border border-[#ffcc33]/20 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden group hover:border-[#ffcc33]/50 transition-colors">
              <h3 className="text-7xl font-black text-[#ffcc33] opacity-5 uppercase italic tracking-tighter absolute group-hover:opacity-10 transition-opacity">Coming Soon</h3>
              <div className="flex gap-4 relative z-10">
                {['FinTech', 'HealthTech', 'GenAI'].map(tag => (
                  <span key={tag} className="px-5 py-2 bg-[#ffcc33]/10 text-[#ffcc33] text-[10px] font-black rounded-xl uppercase border border-[#ffcc33]/20 shadow-[0_0_10px_rgba(255,204,51,0.1)]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENTORING --- */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center space-y-10 bg-gradient-to-br from-blue-600/5 to-transparent border border-[#ffcc33]/10 p-16 rounded-[4rem] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#ffcc33] blur-[20px]"></div>
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#ffcc33]/10 border border-[#ffcc33]/20 text-[#ffcc33] rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,204,51,0.1)]">
            <Users size={18} /> Mentoring by PragNnan Community
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight italic leading-tight">"A great Mentor is your <br /> guiding light."</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium relaxed">Schedule Career Coaching Sessions with Global Technology Leaders. Visit the PragNnan series to listen to the pearls of wisdom.</p>
          <div className="flex flex-wrap justify-center gap-10 pt-6">
            <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white hover:text-[#ffcc33] transition-all underline decoration-[#ffcc33]/30 underline-offset-[12px]">See Mentors <ExternalLink size={14} /></button>
            <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white hover:text-red-500 transition-all underline decoration-red-500/30 underline-offset-[12px]">Listen to Series <PlayCircle size={14} /></button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}