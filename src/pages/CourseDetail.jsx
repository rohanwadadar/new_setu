import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, PlayCircle, FileText, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export default function CourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(import.meta.env.VITE_COURSE_API)
            .then(res => res.json())
            .then(data => {
                if (data && data.courses) {
                    const foundCourse = data.courses.find(c =>
                        (c.course_details?.slug?.toLowerCase() === courseId?.toLowerCase()) ||
                        (c.course_uid?.toLowerCase() === courseId?.toLowerCase())
                    );
                    setCourse(foundCourse);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Course fetch error:", err);
                setLoading(false);
            });
    }, [courseId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
                <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
                <p className="text-slate-400 font-medium tracking-widest uppercase text-[10px]">Retrieving Course Data...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white px-6">
                <div className="text-center space-y-6 max-w-sm">
                    <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                        <ArrowLeft className="text-red-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-black">Course Not Found</h1>
                    <p className="text-slate-400 text-sm">The course you are looking for might have been moved or doesn't exist.</p>
                    <button
                        onClick={() => navigate("/courses")}
                        className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                    >
                        Browse All Courses
                    </button>
                    <button onClick={() => navigate("/")} className="block w-full text-slate-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const title = course.course_name || course.course_details?.course_title;
    const desc = course.course_short_description || course.course_details?.course_description;
    const img = course.course_details?.course_image || import.meta.env.VITE_DEFAULT_COURSE_IMAGE;


    return (
        <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6 selection:bg-[#ffcc33]/30 font-sans">
            <div className="max-w-6xl mx-auto">

                <button
                    onClick={() => navigate("/courses")}
                    className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 mb-12 transition-all"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">All Courses</span>
                </button>

                <div className="grid lg:grid-cols-3 gap-16">

                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-md border border-blue-500/20 uppercase tracking-widest">
                                    Self-Paced
                                </span>
                                <span className="flex items-center gap-1 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <ShieldCheck size={14} className="text-indigo-500" /> Professional Certification
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                                {title}
                            </h1>

                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                                {desc}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl group hover:border-blue-500/30 transition-all">
                                <PlayCircle className="text-blue-400 mb-4" size={28} />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Full Access</h3>
                                <p className="text-slate-500 text-[11px] mt-1 font-medium">On-demand Video</p>
                            </div>
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl group hover:border-blue-500/30 transition-all">
                                <BookOpen className="text-blue-400 mb-4" size={28} />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Project Based</h3>
                                <p className="text-slate-500 text-[11px] mt-1 font-medium">Hands-on Labs</p>
                            </div>
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl group hover:border-blue-500/30 transition-all">
                                <FileText className="text-blue-400 mb-4" size={28} />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Industry recognized</h3>
                                <p className="text-slate-500 text-[11px] mt-1 font-medium">Verifiable Certificate</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4">
                                Path Highlights <div className="h-px flex-1 bg-slate-800"></div>
                            </h2>
                            <div className="space-y-3">
                                {["Comprehensive Curriculum", "Expert Led sessions", "Real-world Case Studies", "Portfolio Ready Projects"].map((module, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-[#0f172a]/20 border border-white/5 rounded-2xl hover:bg-[#0f172a]/40 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400">0{i + 1}</div>
                                            <span className="text-sm font-bold text-slate-300">{module}</span>
                                        </div>
                                        <CheckCircle2 size={18} className="text-slate-700" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.5rem] blur opacity-20"></div>
                                <div className="relative bg-[#0b1120] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-800">
                                        <img src={img} alt={title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Program status</p>
                                        <h3 className="text-4xl font-black text-white italic">Level Up</h3>
                                    </div>

                                    <ul className="space-y-4">
                                        {["Lifetime Access", "Expert Support", "Community Access", "Certificate"].map(text => (
                                            <li key={text} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {text}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-95 transition-all">
                                        Enroll Now
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
