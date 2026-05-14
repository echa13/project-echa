import { Link } from "react-router-dom";
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineShieldCheck, 
  HiOutlineUserAdd,
  HiBadgeCheck
} from "react-icons/hi";

export default function Register() {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      
      {/* BADGE (Disesuaikan ke tema Pink) */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-full mb-6 border border-pink-100 shadow-sm mx-auto md:mx-0 flex w-max">
        <HiBadgeCheck className="text-pink-500 text-sm" />
        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-pink-600">
          Sistem Terverifikasi
        </span>
      </div>

      {/* HEADER */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Gabung Jadi <span className="text-pink-500 italic">Mitra.</span>
        </h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed font-medium">
          Daftarkan cabang laundry Anda dan mulai kelola operasional secara digital hari ini.
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* EMAIL INPUT */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            Alamat Email Bisnis
          </label>
          <div className="relative group">
            <input
              type="email"
              required
              placeholder="nama@laundry.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm"
            />
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* PASSWORD INPUT */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            Buat Kata Sandi
          </label>
          <div className="relative group">
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-black placeholder:text-slate-400 placeholder:font-medium shadow-sm tracking-widest"
            />
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            Konfirmasi Sandi
          </label>
          <div className="relative group">
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-black placeholder:text-slate-400 placeholder:font-medium shadow-sm tracking-widest"
            />
            <HiOutlineShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* SUBMIT BUTTON (Disamakan dengan tombol Login) */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full mt-2 relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-pink-500/20 transition-all duration-300 active:scale-95 group uppercase tracking-widest text-xs"
          >
            <HiOutlineUserAdd className="text-lg group-hover:scale-110 transition-transform" />
            Daftar Sekarang
          </button>
        </div>
      </form>

      {/* FOOTER */}
      <div className="mt-8 text-center md:text-left">
        <p className="text-sm text-slate-500 font-medium">
          Sudah memiliki akses?{" "}
          <Link 
            to="/login" 
            className="text-pink-600 font-bold hover:text-pink-700 hover:underline underline-offset-4 transition-all"
          >
            Masuk di sini
          </Link>
        </p>
      </div>

    </div>
  );
}