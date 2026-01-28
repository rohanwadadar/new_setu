import { useParams, useNavigate } from "react-router-dom";
import { selfPacedCourses } from "../data/appData";
import { ArrowLeft, BookOpen, PlayCircle, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function CourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Find course data based on the ID in the URL
    const course = selfPacedCourses.find((c) => c.id === courseId);

    // NOTE: Title is handled by MasterRoutes.jsx PageManager. No useEffect needed here.

    if (!course) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black">Course Not Found</h1>
                    <button onClick={() => navigate("/")} className="text-[#ffcc33] font-bold underline">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6 selection:bg-[#ffcc33]/30 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 text-slate-500 hover:text-[#ffcc33] mb-12 transition-all"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to All Courses</span>
                </button>

                <div className="grid lg:grid-cols-3 gap-16">

                    {/* LEFT COLUMN: COURSE INFO */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#ffcc33]/10 text-[#ffcc33] text-[10px] font-black rounded-md border border-[#ffcc33]/20 uppercase tracking-widest">
                                    Self-Paced
                                </span>
                                <span className="flex items-center gap-1 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <ShieldCheck size={14} className="text-blue-500" /> Certified Path
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
                                {course.title}
                            </h1>

                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                                Become an expert in <span className="text-white">{course.title}</span>. This industry-vetted curriculum covers everything from foundational concepts to advanced deployment strategies using real-world datasets and AI workflows.
                            </p>
                        </div>

                        {/* STATS GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl group hover:border-[#ffcc33]/30 transition-all">
                                <PlayCircle className="text-[#ffcc33] mb-4" size={28} />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-white">12+ Hours</h3>
                                <p className="text-slate-500 text-[11px] mt-1 font-medium">On-demand Video</p>
                            </div>
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl group hover:border-[#ffcc33]/30 transition-all">
                                <BookOpen className="text-[#ffcc33] mb-4" size={28} />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Practice Labs</h3>
                                <p className="text-slate-500 text-[11px] mt-1 font-medium">Hands-on Projects</p>
                            </div>
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl group hover:border-[#ffcc33]/30 transition-all">
                                <FileText className="text-[#ffcc33] mb-4" size={28} />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Professional</h3>
                                <p className="text-slate-500 text-[11px] mt-1 font-medium">Certification</p>
                            </div>
                        </div>

                        {/* SYLLABUS PREVIEW */}
                        <div className="space-y-6 pt-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4">
                                Course Curriculum <div className="h-px flex-1 bg-slate-800"></div>
                            </h2>
                            <div className="space-y-3">
                                {["Foundational Concepts", "Architecture & Theory", "Applied Industry Projects", "Final Evaluation"].map((module, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-[#0f172a]/20 border border-white/5 rounded-2xl hover:bg-[#0f172a]/40 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-[#ffcc33]">0{i + 1}</div>
                                            <span className="text-sm font-bold text-slate-300">{module}</span>
                                        </div>
                                        <CheckCircle2 size={18} className="text-slate-700" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ENROLLMENT CARD */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#ffcc33] to-[#ffa500] rounded-[2.5rem] blur opacity-20"></div>
                                <div className="relative bg-[#0b1120] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Access Level</p>
                                        <h3 className="text-4xl font-black text-white italic">Premium</h3>
                                    </div>

                                    <ul className="space-y-4">
                                        {["Lifetime Access", "Expert Support", "Community Access", "Certificate"].map(text => (
                                            <li key={text} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                                <div className="w-1.5 h-1.5 bg-[#ffcc33] rounded-full"></div> {text}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="w-full py-4 bg-[#ffcc33] text-black font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(255,204,51,0.3)] active:scale-95 transition-all">
                                        Enroll in Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}