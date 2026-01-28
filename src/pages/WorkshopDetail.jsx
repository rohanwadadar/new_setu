import { useParams, useNavigate } from "react-router-dom";
import { workshopsData } from "../data/appData";
import { ArrowLeft, Calendar, ShieldCheck, Users } from "lucide-react";

export default function WorkshopDetail() {
    const { workshopId } = useParams();
    const navigate = useNavigate();

    // Find the workshop
    const workshop = workshopsData.find(w => w.id === workshopId);

    if (!workshop) return <div className="text-white p-20">Workshop not found.</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#ffcc33] mb-12 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Home
                </button>

                <div className="space-y-8">
                    <span className="bg-[#ffcc33]/10 text-[#ffcc33] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#ffcc33]/20">
                        {workshop.category} Live Workshop
                    </span>
                    <h1 className="text-5xl font-black leading-tight">{workshop.title}</h1>

                    <div className="grid md:grid-cols-2 gap-6 py-10">
                        <div className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl flex items-center gap-6">
                            <Calendar className="text-[#ffcc33]" size={32} />
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase">Schedule</p>
                                <p className="font-bold">Next Batch Starts Soon</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl flex items-center gap-6">
                            <Users className="text-[#ffcc33]" size={32} />
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase">Status</p>
                                <p className="font-bold">{workshop.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 border border-[#ffcc33]/20 rounded-[2.5rem] bg-gradient-to-br from-[#ffcc33]/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="text-[#ffcc33]" size={40} />
                            <p className="text-slate-300 font-medium">Get a certificate upon completion and access to the PragNnan community.</p>
                        </div>
                        <button className="whitespace-nowrap bg-[#ffcc33] text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}