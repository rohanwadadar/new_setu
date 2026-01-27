import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Users, Target, Star, CheckCircle2,
  ArrowRight, Briefcase, Mail, Phone, MapPin,
  TrendingUp, Award, BookOpen, Laptop,
  MessageSquare, Globe, ArrowLeft, Linkedin
} from "lucide-react";

// --- Animation Presets ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const goldenGlow = "shadow-[0_0_20px_rgba(255,204,51,0.12)] border border-[#ffcc33]/20";

export default function EnterpriseRedesign() {
  const [activeTab, setActiveTab] = useState("AI for All");

  // --- DATA FROM SCREENSHOTS ---
  const stats = [
    { label: "Repeat Clients", value: "95%" },
    { label: "Professionals Trained", value: "5250+" },
    { label: "Hours Delivered", value: "1450+" },
    { label: "Average Rating", value: "4.82/5" },
  ];

  const partners = ["Accenture", "Tata 1mg", "PwC", "Wipro", "IBM", "EY", "IDFC First", "Redington", "RateGain"];

  const pedagogy = [
    "Tailored curriculum systematically designed",
    "Practitioner-driven industry immersive training",
    "Fundamental rigor with executional excellence",
    "Live instructor led sessions (Hybrid/Virtual)",
    "Scientific 360° learning assessment",
    "Masterclasses for CXO and Leadership teams"
  ];

  const successStories = [
    {
      org: "RateGain",
      title: "Prompt Engineering & Vibe Coding",
      desc: "57 Professionals equipped for GenAI Productization and rapid prototyping.",
      img: "https://setucontainer.blob.core.windows.net/setu/RateGainPartner.c1fec9ab26af02cb92e2.png"
    },
    {
      org: "EY",
      title: "EY Partner Training",
      desc: "450+ Partners trained in GenAI 101 Masterclasses across global domains.",
      img: "https://setucontainer.blob.core.windows.net/setu/EYPartners.f1de6b1ea3f5a877085d.png"
    }
  ];

  const testimonials = [
    { name: "Ananthanarayanan S", role: "Partner at EY", quote: "The AI session was exceptionally insightful, shedding light on transformative impacts.", img: "https://ui-avatars.com/api/?name=Ananthanarayanan+S&background=ffcc33&color=000" },
    { name: "Navdeep Shankhdhar", role: "Assoc. Director at EY", quote: "Great insights on GenAI capabilities in reasoning and contextual understanding.", img: "https://ui-avatars.com/api/?name=Navdeep+Shankhdhar&background=ffcc33&color=000" },
    { name: "Jayant Krishna", role: "Associate at PwC", quote: "The sessions were very patient and I am proud to take something away from them.", img: "https://ui-avatars.com/api/?name=Jayant+Krishna&background=ffcc33&color=000" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-[#ffcc33] selection:text-black">

      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto text-center min-h-[85vh] flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffcc33]/5 border border-[#ffcc33]/20 text-[#ffcc33] text-[10px] font-black tracking-[0.3em] uppercase">
            <Globe size={12} /> <span>Global Strategic Partner</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            EMPOWERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcc33] via-yellow-500 to-yellow-700 drop-shadow-[0_0_30px_rgba(255,204,51,0.2)]">ENTERPRISES</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium border-l-2 border-[#ffcc33] pl-6">
            Build GenAI expertise and drive AI-powered transformation from Freshers to CXOs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button className="px-10 py-5 bg-[#ffcc33] text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#ffcc33]/20">
              Get In Touch
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. LOGO CLOUD (Treated with Grayscale to Color transition) */}
      <section className="py-16 border-y border-white/5 bg-slate-900/20 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {partners.map((p) => (
            <span key={p} className="text-xl font-black text-slate-500 hover:text-white uppercase tracking-tighter transition-colors">{p}</span>
          ))}
        </div>
      </section>

      {/* 3. STATS DASHBOARD */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} {...fadeInUp} className={`p-8 rounded-[2rem] bg-slate-900/40 text-center ${goldenGlow}`}>
              <h2 className="text-4xl font-black text-white mb-2">{stat.value}</h2>
              <p className="text-[#ffcc33] text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SETU AS 1-STOP SOLUTION (Visual Bento) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">1-Stop <span className="text-[#ffcc33]">Solution</span></h2>
          <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Scaling Excellence Across Every Tier</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <SolutionCard title="Freshers" label="Strengthening Core" desc="Transforming young professionals into industry-ready assets." />
          <SolutionCard title="Mid Managers" label="Competitive Edge" desc="Upskilling transformation champions for the GenAI era." />
          <SolutionCard title="CXOs & Partners" label="Expanding Wisdom" desc="NeoSkilling leadership to drive AI strategic innovation." />
        </div>
      </section>

      {/* 5. SUCCESS STORIES */}
      <section className="py-32 px-6 bg-[#0f172a]/20 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Success <br /><span className="text-[#ffcc33]">Stories</span></h2>
            <div className="flex gap-4">
              <button className="p-3 bg-white/5 rounded-xl hover:bg-[#ffcc33] hover:text-black transition-all"><ArrowLeft size={20} /></button>
              <button className="p-3 bg-[#ffcc33] text-black rounded-xl hover:scale-110 transition-all"><ArrowRight size={20} /></button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {successStories.map((story, i) => (
              <motion.div key={i} {...fadeInUp} className={`group relative h-[450px] rounded-[3rem] overflow-hidden ${goldenGlow}`}>
                <img src={story.img} alt={story.org} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-900/60 to-transparent p-10 flex flex-col justify-end">
                  <p className="text-[#ffcc33] font-black text-xs uppercase tracking-widest mb-2">{story.org}</p>
                  <h3 className="text-3xl font-black text-white mb-4 leading-tight">{story.title}</h3>
                  <p className="text-slate-400 text-sm max-w-sm">{story.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PEDAGOGY & TRAINING CATEGORIES */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-10">
            <h2 className="text-5xl font-black text-white leading-none uppercase">Training <br /> <span className="text-[#ffcc33]">Pedagogy</span></h2>
            <div className="space-y-6">
              {pedagogy.map((p, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <CheckCircle2 className="text-[#ffcc33] shrink-0" size={20} />
                  <p className="text-sm font-medium group-hover:text-white transition-colors leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className={`p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 relative overflow-hidden`}>
              <div className="flex flex-wrap gap-4 mb-10 border-b border-white/5 pb-6">
                {["AI for All", "AI Engineering", "Data Science", "Visionaries"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`text-xs font-black uppercase tracking-widest py-2 px-6 rounded-xl transition-all ${activeTab === tab ? 'bg-[#ffcc33] text-black' : 'text-slate-500 hover:text-white'}`}>{tab}</button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-6 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-[#ffcc33]/50 transition-all cursor-pointer group">
                    <div className="p-3 bg-[#ffcc33]/10 text-[#ffcc33] rounded-xl group-hover:bg-[#ffcc33] group-hover:text-black transition-all"><BookOpen size={20} /></div>
                    <p className="font-bold text-sm text-white">Advanced Course Module 0{i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-black text-white mb-20 uppercase tracking-tighter">WHAT OUR <span className="text-[#ffcc33]">CUSTOMERS</span> SAY</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-[#ffcc33]/40 transition-all group`}>
              <MessageSquare className="text-[#ffcc33]/20 mb-6 group-hover:text-[#ffcc33] transition-colors" size={32} />
              <p className="text-slate-300 italic mb-8 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} className="w-12 h-12 rounded-full border border-white/20" alt="" />
                <div>
                  <p className="text-white font-black text-sm">{t.name}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TALK TO US (Premium Form) */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className={`p-16 rounded-[4rem] bg-gradient-to-br from-slate-900 to-[#020617] border border-[#ffcc33]/20 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-12 opacity-5"><Globe size={300} /></div>
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-white leading-none uppercase">Talk To <br /> <span className="text-[#ffcc33]">Us.</span></h2>
              <p className="text-slate-400 text-lg">Interested in how SETU can accelerate your workforce potential? Let's innovate together.</p>
              <div className="space-y-4 pt-4">
                <p className="flex items-center gap-4 font-bold text-white"><Mail className="text-[#ffcc33]" size={20} /> mitra@setuschool.com</p>
                <p className="flex items-center gap-4 font-bold text-white"><Phone className="text-[#ffcc33]" size={20} /> +91 8100551189</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Work Email" />
              </div>
              <Input placeholder="Company Name" />
              <textarea placeholder="How can we help?" className="w-full h-32 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#ffcc33] transition-all" />
              <button className="w-full py-5 bg-[#ffcc33] text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-[#ffcc33]/10 hover:bg-yellow-400 transition-all">Submit Request</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- SUB COMPONENTS ---

const SolutionCard = ({ title, label, desc }) => (
  <motion.div {...fadeInUp} whileHover={{ y: -10 }} className={`p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-[#ffcc33]/50 transition-all`}>
    <div className="w-12 h-12 rounded-2xl bg-[#ffcc33]/10 text-[#ffcc33] flex items-center justify-center mb-6"><TrendingUp size={24} /></div>
    <p className="text-[#ffcc33] text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
    <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Input = ({ placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#ffcc33] transition-all text-sm"
  />
);