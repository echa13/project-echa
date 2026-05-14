import { Link } from "react-router-dom";
import { HiOutlineMail, HiOutlineArrowNarrowLeft, HiOutlineInformationCircle, HiPaperAirplane } from "react-icons/hi";

export default function Forgot() {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      
      {/* HEADER */}
      <div className="mb-8 text-center md:text-left">
        {/* BADGE disesuaikan dengan tema Pink */}
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-pink-50 rounded-full border border-pink-100 shadow-sm mx-auto md:mx-0 flex w-max">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-pink-600">
            Pemulihan Akses
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Lupa Kata <span className="text-pink-500 italic">Sandi?</span>
        </h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed font-medium">
          Jangan khawatir, masukkan email admin Anda di bawah. Kami akan mengirimkan instruksi pemulihan.
        </p>
      </div>

      {/* INFO BOX */}
      <div className="flex items-start gap-3 px-4 py-4 rounded-[1.2rem] bg-slate-50 border border-slate-100 mb-8 shadow-sm">
        <HiOutlineInformationCircle className="text-xl text-pink-500 shrink-0 mt-0.5" />
        <p className="text-[0.8rem] text-slate-600 leading-relaxed font-medium">
          Tautan reset akan berlaku selama <strong className="text-slate-900 font-bold">15 menit</strong>. Pastikan periksa folder spam jika email tidak muncul.
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-6" onSubmit={e => e.preventDefault()}>

        {/* EMAIL INPUT (Disesuaikan ketebalannya dan labelnya) */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            Email Terdaftar
          </label>
          <div className="relative group">
            <input
              type="email"
              id="email"
              required
              placeholder="admin@chaelaundry.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm"
            />
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* SUBMIT BUTTON (Disamakan dengan tombol Login/Register) */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-pink-500/20 transition-all duration-300 active:scale-95 group uppercase tracking-widest text-xs"
          >
            <HiPaperAirplane className="text-lg rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Kirim Instruksi
          </button>
        </div>
      </form>

      {/* BACK TO LOGIN */}
      <div className="mt-10 pt-6 border-t border-slate-100">
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors group"
        >
          <HiOutlineArrowNarrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
          Kembali ke halaman login
        </Link>
      </div>

    </div>
  );
}