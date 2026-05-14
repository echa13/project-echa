import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="flex relative items-center justify-center min-h-[85vh] px-6 overflow-hidden bg-[#FFF5F7]">
      
      {/* Efek Glow Latar Belakang - Chae Pink Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative text-center max-w-lg z-10 flex flex-col items-center">
        
        {/* Branding Chae Laundry Small Tag */}
        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-pink-100 mb-8 animate-bounce">
          <HiSparkles className="text-pink-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Chae Laundry System</span>
        </div>

        {/* Tipografi 404 Dual-Layer */}
        <div className="relative mb-6">
          <h1 className="text-[8rem] sm:text-[11rem] font-black text-pink-500/10 leading-none tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl font-black text-slate-900 tracking-tighter">
            404
          </div>
        </div>

        {/* Judul & Deskripsi */}
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Oops! <span className="text-pink-500">Tersesat di Jemuran?</span>
        </h2>
        
        <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed max-w-sm">
          Halaman yang Anda cari mungkin sedang dicuci, dikeringkan, atau terselip di antara tumpukan kain di <span className="font-bold text-pink-400">Chae Laundry</span>.
        </p>

        {/* Tombol Kembali - Elegant Slate Style */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-3 mt-10 bg-slate-900 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-pink-500/20 transition-all duration-300 active:scale-95 group"
        >
          <FiHome className="text-xl group-hover:scale-110 transition-transform" />
          Kembali ke Dashboard Chae
        </Link>
        
        {/* Decorative Footer */}
        <div className="mt-16 flex items-center gap-4 opacity-30">
          <div className="h-[1px] w-12 bg-pink-400"></div>
          <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">Your Fresh Start Starts Here</span>
          <div className="h-[1px] w-12 bg-pink-400"></div>
        </div>
        
      </div>
    </div>
  );
}