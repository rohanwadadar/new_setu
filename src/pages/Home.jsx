import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  Terminal, Compass, BookOpen, ArrowRight,
  ChevronRight, Users, ExternalLink, Sparkles, Cpu, PlayCircle, Loader2
} from "lucide-react";

/**
 * 🔹 REUSABLE SUB-COMPONENTS
 */

function DottedArrow() {
  return (
    <div className="flex items-center opacity-40">
      <svg width="48" height="8" viewBox="0 0 48 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4H43" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
        <path d="M41 1L47 4L41 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionHeader({ title, subtitle, badgeIcon }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter px-8 py-4 border border-blue-500/40 rounded-2xl bg-blue-500/5 flex items-center gap-4 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
          {badgeIcon} {title}
        </h2>
        {subtitle && (
          <span className="hidden md:block px-4 py-1.5 bg-blue-600/10 text-blue-400 text-[10px] font-black rounded-lg uppercase border border-blue-500/20 tracking-widest">
            {subtitle}
          </span>
        )}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
    </div>
  );
}

/**
 * 🔹 MAIN HOME COMPONENT
 */
export default function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_COURSE_API)
      .then(res => res.json())
      .then(data => {
        if (data && data.courses) {
          setCourses(data.courses);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Home API error:", err);
        setLoading(false);
      });
  }, []);

  const steps = [
    {
      icon: <Terminal className="text-blue-400" size={42} strokeWidth={1.5} />,
      title: "Tell Shifu your goal",
      desc: "'Want to be a Data Analyst' or 'learn Agentic AI in Finance'?"
    },
    {
      icon: <Compass className="text-blue-400" size={42} strokeWidth={1.5} />,
      title: "Get your personalized roadmap",
      desc: "Shifu analyzes millions of paths to build the one just for you."
    },
    {
      icon: <BookOpen className="text-blue-400" size={42} strokeWidth={1.5} />,
      title: "Access Curated Contents",
      desc: "The best articles, videos, and courses, all in one place"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans">

      {/* --- HERO SECTION --- */}
      <div className="relative pt-10 pb-16 px-6 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-80 text-center lg:text-left animate-pulse">
            योग: कर्मसु कौशलम्
          </p>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 relative z-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                  Shifu - <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">your personal AI learning coach</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium max-w-lg">
                  Stop searching. Start Learning with a clear path in <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-4">3 simple steps</span>.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/roadmap")}
                  className="group relative flex items-center gap-4 bg-blue-500 text-white font-black px-10 py-4 rounded-xl transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] active:scale-95 uppercase text-xs tracking-widest overflow-hidden"
                >
                  <span className="relative">Create My Roadmap</span>
                  <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative aspect-video w-full bg-[#020617] border border-blue-500/20 rounded-[2rem] overflow-hidden shadow-2xl">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                  <source src="https://setucontainer.blob.core.windows.net/setu/Shifu%20Video%20Part%202.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-20">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center w-full group">
                <div className="flex-1 bg-[#0f172a]/40 border border-blue-500/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-blue-500/60 transition-all duration-500 backdrop-blur-sm group-hover:-translate-y-1">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
                  <h3 className="text-sm font-bold mb-2 uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">{step.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed italic">{step.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="hidden md:block px-2"><DottedArrow /></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ALL COURSES SECTION (LIVE FROM API) --- */}
      <section id="courses" className="py-24 px-6 relative border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Explore Professional AI Path"
            badgeIcon={<Sparkles className="text-blue-400" size={20} />}
            subtitle="Live from SETU API"
          />

          {loading ? (
            <div className="text-center py-20 bg-blue-500/5 rounded-3xl border border-blue-500/10">
              <Loader2 className="animate-spin text-blue-500 mx-auto" size={32} />
              <p className="mt-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Fetching latest curriculum...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => {
                const slug = course.course_details?.slug || course.course_uid;
                const title = course.course_name || course.course_details?.course_title;
                const img = course.course_details?.course_image || import.meta.env.VITE_DEFAULT_COURSE_IMAGE;

                return (
                  <Link
                    key={idx}
                    to={`/course/${slug}`}
                    className="group block p-px bg-gradient-to-br from-white/10 to-transparent hover:from-blue-600/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] rounded-2xl transition-all duration-500"
                  >
                    <div className="bg-[#0b1120] rounded-[calc(1rem-1px)] h-32 flex items-center justify-center px-6 transition-all duration-500 group-hover:bg-[#0f172a]">
                      <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors leading-[1.3] text-center">
                        {title}
                      </h3>
                    </div>
                  </Link>
                );

              })}
            </div>
          )}
        </div>
      </section>

      {/* --- ASSESSMENT & PROJECTS --- */}
      <section className="py-24 px-6 bg-slate-900/10 border-t border-white/5">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeader
              title="Skill Assessment"
              subtitle="Verification"
              badgeIcon={<Cpu className="text-indigo-400" size={18} />}
            />
            <div className="grid grid-cols-2 gap-4">
              {['SQL', 'Big Data', 'Data Science', 'Statistics', 'Python', 'Machine Learning'].map(item => (
                <div key={item} className="p-5 bg-slate-900/30 border border-white/10 rounded-2xl text-center font-black uppercase text-[11px] tracking-[0.2em] text-slate-500 hover:text-blue-400 hover:border-blue-400 transition-all cursor-default">{item}</div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Industry Projects" subtitle="Apply Knowledge" />
            <div className="relative h-56 bg-slate-900/40 border border-blue-500/20 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden group hover:border-blue-500/50 transition-colors">
              <h3 className="text-7xl font-black text-blue-500 opacity-5 uppercase italic tracking-tighter absolute group-hover:opacity-10 transition-opacity">Coming Soon</h3>
              <div className="flex gap-4 relative z-10">
                {['FinTech', 'HealthTech', 'GenAI'].map(tag => (
                  <span key={tag} className="px-5 py-2 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-xl uppercase border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENTORING --- */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center space-y-10 bg-gradient-to-br from-blue-600/5 to-transparent border border-blue-500/10 p-16 rounded-[4rem] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-blue-500 blur-[20px]"></div>
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Users size={18} /> Mentoring by PragNnan Community
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight italic leading-tight">"A great Mentor is your <br /> guiding light."</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium relaxed">Schedule Career Coaching Sessions with Global Technology Leaders. Visit the PragNnan series to listen to the pearls of wisdom.</p>
          <div className="flex flex-wrap justify-center gap-10 pt-6">
            <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white hover:text-blue-400 transition-all underline decoration-blue-500/30 underline-offset-[12px]">See Mentors <ExternalLink size={14} /></button>
            <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white hover:text-red-500 transition-all underline decoration-red-500/30 underline-offset-[12px]">Listen to Series <PlayCircle size={14} /></button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
