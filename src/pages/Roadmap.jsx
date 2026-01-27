import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import {
  CheckCircle, Code, Brain, MessageSquare, Sparkles,
  Target, Layers, Zap, ArrowRight, Search, Cpu
} from "lucide-react";

// --- NEW COMPONENT: SHIFU AI LOGO WITH ANIMATIONS ---
const ShifuLogo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center mb-10">
      {/* AI Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 border-2 border-dashed border-yellow-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-48 h-48 border border-blue-500/10 rounded-full"
        />
        {/* Pulsing Core Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-32 h-32 bg-yellow-500/20 blur-[40px] rounded-full"
        />
      </div>

      {/* The Actual Logo Icon */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.4)] border border-yellow-300/50"
      >
        <Cpu className="w-10 h-10 text-black" strokeWidth={2.5} />
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 z-10"
      >
        <h2 className="text-xl font-black tracking-[0.3em] uppercase italic flex items-center gap-2">
          <span className="text-white">Shifu</span>
          <span className="text-yellow-400">AI</span>
          <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </h2>
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mt-1" />
      </motion.div>
    </div>
  );
};

export default function Roadmap() {
  const [prompt, setPrompt] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Steps data stays same...
  const steps = [
    {
      title: "Term 1: Data Foundations",
      icon: <Code className="w-5 h-5" />,
      content: "Environment setup and core programming logic using Python.",
      sublinks: ["Python Fundamentals", "Advanced SQL & RDBMS", "Data Cleaning", "Regular Expressions"]
    },
    {
      title: "Term 2: Applied Machine Learning",
      icon: <Brain className="w-5 h-5" />,
      content: "Transitioning from theory to industry-grade predictive modeling.",
      sublinks: ["Supervised Learning", "Clustering & PCA", "Hyperparameter Tuning", "Intro to LLMs"]
    },
    {
      title: "Problem Solving & Storytelling",
      icon: <MessageSquare className="w-5 h-5" />,
      content: "Setu's unique module on defining strategy and business impact.",
      sublinks: ["Hypothesis Generation", "ROI Analysis", "Data Driven Storytelling", "Stakeholder Management"]
    }
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (prompt.trim()) setIsGenerated(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30 font-sans pb-20 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <div className="relative pt-16 pb-16 px-6 text-center">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* INSERTED LOGO COMPONENT HERE */}
          <ShifuLogo />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
          >
            What are you learning today?
          </motion.h1>

          <div className="space-y-2 mb-12">
            <p className="text-slate-300 text-lg font-bold">Write what you want to learn</p>
            <p className="text-slate-500 text-sm">I will create a comprehensive roadmap to master it</p>
          </div>

          {/* INPUT CARD */}
          <form onSubmit={handleGenerate} className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-3 md:p-4 shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-center gap-2 md:gap-4 transition-transform focus-within:scale-[1.02]">
              <div className="pl-4 text-slate-400">
                <Search size={24} />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Frontend Developer Roadmap"
                className="flex-1 bg-transparent border-none outline-none text-slate-900 text-lg md:text-xl font-medium placeholder:text-slate-300"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-4 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center gap-2 font-bold"
              >
                <span className="hidden md:block uppercase tracking-wider text-xs">Generate</span>
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. FEATURE CARDS */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 relative z-10">
        <FeatureCard
          icon={<Target className="text-yellow-500" size={32} />}
          title="Personalized Path"
          desc="AI-generated roadmap tailored to your goals and skill level"
        />
        <FeatureCard
          icon={<Layers className="text-yellow-500" size={32} />}
          title="Curated Content"
          desc="Validated resources for each chapter - no time wasted searching"
        />
        <FeatureCard
          icon={<Zap className="text-yellow-500" size={32} />}
          title="Start Learning"
          desc="Your roadmap is ready in seconds. Just begin your journey"
        />
      </div>

      {/* 3. GENERATED CONTENT (Timeline) */}
      <AnimatePresence>
        {isGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto px-6"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="h-8 w-1.5 bg-yellow-400 rounded-full"></div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Your Custom Roadmap</h2>
            </div>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-yellow-500/50 before:to-transparent">
              {steps.map((step, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="relative pl-12 group"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-yellow-400 z-10 group-hover:border-yellow-400/50 transition-colors">
                    {step.icon}
                  </div>

                  <div className="bg-[#0b1120] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-all hover:bg-white/[0.02]">
                    <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">{step.content}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.sublinks.map((sub, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-black/40 p-3 rounded-xl border border-white/5 group-hover:text-slate-300 transition-colors">
                          <CheckCircle size={14} className="text-yellow-400" />
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Button removed */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-[#0b1120] border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-white/[0.02] transition-all"
    >
      <div className="mb-6 bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}