import { Link } from "react-router-dom";
import { HiArrowLeft, HiOutlineSupport } from "react-icons/hi";

export default function ErrorPage({
  code = "404",
  description = "Waduh! Halaman yang kamu cari sepertinya sedang 'dicuci' atau tidak dapat ditemukan.",
  image,
}) {
  const getTitle = () => {
    switch (String(code)) {
      case "404": return "Halaman Hilang";
      case "400": return "Permintaan Salah";
      case "401": return "Akses Ditolak";
      case "403": return "Terlarang";
      case "500": return "Gangguan Sistem";
      default: return "Terjadi Kesalahan";
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-[85vh] px-6 overflow-hidden bg-[#FFF5F7]">

      {/* Background Soft Glow - Chae Pink Theme */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative text-center max-w-md z-10 flex flex-col items-center">

        {/* Branding Tag */}
        <div className="mb-8 flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-100 px-4 py-2 rounded-2xl shadow-sm">
          <HiOutlineSupport className="text-pink-500 animate-spin-slow" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">Chae Laundry Help Center</span>
        </div>

        {/* ERROR VISUAL (CODE) */}
        {image ? (
          <img
            src={image}
            alt={`error-${code}`}
            className="w-48 sm:w-56 object-contain mb-8 drop-shadow-2xl"
          />
        ) : (
          <div className="relative mb-8">
            {/* Background Big Number - Very Faint Pink */}
            <h1 className="text-[8rem] sm:text-[11rem] font-black text-pink-500/10 leading-none select-none tracking-tighter">
              {code}
            </h1>
            {/* Foreground Number - Dark Slate for contrast */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl font-black text-slate-900 drop-shadow-sm tracking-tighter">
              {code}
            </div>
            {/* Laundry Icon Accent */}
            <div className="absolute -top-2 -right-2 w-14 h-14 bg-white border border-pink-50 rounded-[1.25rem] shadow-xl shadow-pink-200/50 flex items-center justify-center text-2xl animate-bounce">
              🧼
            </div>
          </div>
        )}

        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
          {getTitle()}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-500 mt-5 text-sm sm:text-base leading-relaxed font-medium italic">
          "{description}"
        </p>

        {/* BUTTON ACTION - High Contrast Slate */}
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-3 mt-12 bg-slate-900 hover:bg-pink-600 text-white px-10 py-4 rounded-[1.5rem] shadow-2xl shadow-slate-900/20 transition-all active:scale-95 font-bold uppercase tracking-widest text-xs"
        >
          <HiArrowLeft className="text-lg group-hover:-translate-x-2 transition-transform" />
          Kembali ke Dashboard
        </Link>

        {/* FOOTER DECORATION */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full"></div>
          <p className="text-pink-300 text-[10px] uppercase tracking-[0.4em] font-black">
            Chae Laundry System v2.0
          </p>
        </div>

      </div>
    </div>
  );
}