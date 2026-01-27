import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    Linkedin, Youtube, Facebook, Mail, Phone,
    MapPin, Volume2, VolumeX, Sparkles, Target, Star
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } }
};

const goldenGlow = "shadow-[0_0_20px_rgba(255,204,51,0.1)] border border-[#ffcc33]/20";

export default function About() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const mentors = [
        { name: "Ireena Vittal", desc: "Ex-partner Mckinsey & Independent Director", img: "https://setuschool.com/static/media/Ireena-Vittal.943d58ff40d7946d2c9625f3942f8f5b.svg" },
        { name: "Arindam Banerji", desc: "Professor at IIM Ahmedabad", img: "https://setuschool.com/static/media/Arindam-banerji.e91fd4aac5311b0f15d9120f978a3185.svg" },
        { name: "Ashok Banerji", desc: "E-Learning Consultant & Faculty", img: "https://setuschool.com/static/media/Ashok-banerjee.3bc008940c2d56ad6ad3eb7a3768246a.svg" }
    ];

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-[#ffcc33] selection:text-black">

            {/* 1. HERO SECTION: Compact & High Visibility */}
            <section className="relative pt-16 pb-12 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 space-y-2"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffcc33]/5 border border-[#ffcc33]/20 text-[#ffcc33] text-[9px] font-bold tracking-[0.3em] uppercase">
                        <Sparkles size={10} /> <span>The Bridge to Excellence</span>
                    </div>
                    {/* Single Line Header */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter whitespace-nowrap">
                        ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcc33] via-yellow-500 to-yellow-700 drop-shadow-[0_0_20px_rgba(255,204,51,0.2)]">SETU SCHOOL</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Transforming Professionals into AI-Ready Global Pioneers
                    </p>
                </motion.div>

                {/* Hero Video: Tighter Aspect Ratio to fit screen */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`relative group aspect-[16/8] w-full max-w-5xl rounded-[2.5rem] overflow-hidden ${goldenGlow} bg-black shadow-2xl`}
                >
                    <video
                        ref={videoRef}
                        src="https://setucontainer.blob.core.windows.net/setu/Daksh%20Video%20Final_AbousUs.mp4"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                        autoPlay loop muted playsInline
                    />

                    {/* Small Subtle Toggle */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-6 right-6 p-2.5 bg-black/40 hover:bg-[#ffcc33] text-white hover:text-black rounded-lg backdrop-blur-md border border-white/10 transition-all duration-300"
                    >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                </motion.div>
            </section>

            {/* 2. BENTO MISSION/VISION (Reduced padding) */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    className="grid md:grid-cols-3 gap-6"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="md:col-span-2 p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden group"
                    >
                        <Target className="absolute -top-4 -right-4 text-[#ffcc33]/5 group-hover:text-[#ffcc33]/10" size={200} />
                        <h3 className="text-[#ffcc33] font-bold text-xs tracking-[0.4em] uppercase mb-4">Our Mission</h3>
                        <p className="text-2xl md:text-4xl font-bold text-white leading-tight">
                            Empowering <span className="text-[#ffcc33]">1 Million+</span> <br />
                            <span className="opacity-80 text-xl md:text-2xl font-medium">Industry-Ready AI Professionals.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#ffcc33] to-yellow-600 text-black flex flex-col justify-between"
                    >
                        <Star size={24} className="opacity-30" />
                        <div>
                            <p className="text-3xl font-black mb-2">योग: कर्मसु कौशलम्</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest border-t border-black/20 pt-2 opacity-70">Excellence in Action</p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* 3. FOUNDER: Profile (Compact) */}
            <section className="py-24 px-6 bg-slate-900/10 border-y border-white/5">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="lg:col-span-5 relative">
                        <div className={`aspect-square rounded-[2.5rem] overflow-hidden ${goldenGlow}`}>
                            <img
                                src="https://setuschool.com/static/media/ujjayini-img.eb92edf7cef901903b27ae8e6dda335f.svg"
                                alt="Ujjyaini Mitra"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-slate-900 p-5 rounded-2xl border border-[#ffcc33]/30 shadow-xl">
                            <p className="text-white font-black text-xl tracking-tight">Ujjyaini Mitra</p>
                            <p className="text-[#ffcc33] text-[9px] font-black tracking-widest uppercase">Founder & CDO</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="lg:col-span-7 space-y-6">
                        <h2 className="text-4xl font-black text-white leading-none uppercase">
                            Strategic <span className="text-[#ffcc33]">Leadership</span>
                        </h2>
                        <div className="space-y-4 text-slate-400 text-base leading-relaxed">
                            <p>Ujjyaini Mitra brings **18+ years** of high-level expertise, having established Data Innovation hubs for giants like **McKinsey, Flipkart, and Airtel**.</p>
                            <p>As the former **Chief Data Officer at ZEE**, she now pioneers outcome-driven learning at SETU.</p>
                            <a href="https://www.linkedin.com/in/ujjayini-mitra" className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-[#ffcc33] hover:text-black transition-all font-bold text-sm">
                                <Linkedin size={18} /> View Journey
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. MENTORS: Balanced Grid */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2 variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        The <span className="text-[#ffcc33]">Faculty</span>
                    </motion.h2>
                    <div className="h-0.5 w-16 bg-[#ffcc33] mx-auto rounded-full" />
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    className="grid md:grid-cols-3 gap-8"
                >
                    {mentors.map((mentor, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -8 }}
                            className={`relative group bg-slate-900/40 rounded-[2rem] p-1 ${goldenGlow} transition-all duration-300`}
                        >
                            <div className="relative h-64 w-full overflow-hidden rounded-t-[1.8rem] bg-white">
                                <img src={mentor.img} alt={mentor.name} className="w-full h-full object-contain p-6" />
                            </div>
                            <div className="px-6 py-6 text-center bg-slate-900/60 rounded-b-[1.8rem]">
                                <h3 className="text-xl font-black text-white group-hover:text-[#ffcc33] transition-colors">{mentor.name}</h3>
                                <p className="text-slate-400 text-[11px] mt-2 uppercase tracking-wider leading-relaxed">{mentor.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 5. MINIMAL CONTACT STRIP */}
            <section className="pb-24 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 p-10 rounded-[3rem] bg-slate-900/30 border border-white/5 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <Mail className="text-[#ffcc33]" size={20} />
                        <p className="text-xs font-bold">mitra@setushool.com</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Linkedin className="hover:text-[#ffcc33] cursor-pointer" size={20} />
                        <Youtube className="hover:text-[#ffcc33] cursor-pointer" size={20} />
                        <Facebook className="hover:text-[#ffcc33] cursor-pointer" size={20} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <MapPin className="text-[#ffcc33]" size={20} />
                        <p className="text-xs font-bold text-center">Kolkata, WB 700048</p>
                    </div>
                </div>
            </section>

        </div>
    );
}