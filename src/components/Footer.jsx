import React from "react";
import { Mail, Phone, MapPin, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-slate-400 py-16 px-6 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* LEFT COLUMN: LOGO & CONTACT */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex flex-col gap-2">
              {/* SETU LOGO Styled SVG/Text */}
              <div className="flex flex-col">
                <span className="text-yellow-500 text-5xl font-black tracking-tighter italic leading-none">
                  SETU<span className="text-white">®</span>
                </span>
                <span className="text-yellow-500/80 text-[10px] font-medium tracking-[0.3em] ml-1 uppercase">
                  योग: कर्मसु कौशलम्
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed max-w-sm">
              <div className="flex items-start gap-3 group">
                <Mail size={16} className="mt-1 text-yellow-500/50 group-hover:text-yellow-500 transition-colors" />
                <p>
                  <span className="text-white font-medium">Email :</span>{" "}
                  <a href="mailto:mitra@setuschool.com" className="hover:text-white transition-colors">
                    mitra@setuschool.com
                  </a>
                </p>
              </div>

              <div className="flex items-start gap-3 group">
                <Phone size={16} className="mt-1 text-yellow-500/50 group-hover:text-yellow-500 transition-colors" />
                <p>
                  <span className="text-white font-medium">Phone & Whatsapp :</span>{" "}
                  <span className="hover:text-white transition-colors">8100551189</span>
                </p>
              </div>

              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="mt-1 text-yellow-500/50 group-hover:text-yellow-500 transition-colors" />
                <p>
                  Blob Coworking Space, 7th Floor, Yamuna Building, 86 Golaghata Road, 
                  Dakshindari, Ultadanga, Kolkata, West Bengal 700048
                </p>
              </div>
            </div>

            {/* SOCIAL LINKS (Linked to your request) */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.linkedin.com/company/setu-school" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-lg hover:bg-yellow-500 hover:text-black transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-yellow-500 hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-yellow-500 hover:text-black transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* MIDDLE COLUMN: ABOUT */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-lg">About</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="/about" className="hover:text-yellow-500 transition-colors">About us</a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-yellow-500 transition-colors">Blogs</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500 transition-colors">Contact us</a>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: LEGAL */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-white/0 font-black uppercase tracking-widest text-lg select-none hidden md:block">Legal</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-yellow-500 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="/refund" className="hover:text-yellow-500 transition-colors">Return & Refund Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
            © 2026 SETU SCHOOL. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] font-medium text-slate-700">
            Designed for Elevating Your Data & AI Journey
          </p>
        </div>
      </div>
    </footer>
  );
}