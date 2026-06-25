import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "../../services/userAPI"; // Mengarah ke file konfigurasi API kamu
import { HiOutlineMail, HiOutlineLockClosed, HiLogin, HiExclamationCircle } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();

  // Bersihkan data dummy bawaan template agar form kosong saat dibuka
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Cari user di Supabase berdasarkan email yang diinput
      const users = await userAPI.loginCheck(dataForm.email);

      // 2. Jika email tidak terdaftar di database
      if (users.length === 0) {
        setError("Email tidak terdaftar di sistem!");
        return;
      }

      const userFound = users[0];

      // 3. Cocokkan password yang diinput dengan password asli di database
      if (userFound.password === dataForm.password) {
        alert("Login Berhasil!");
        
        // Simpan data session user nyata ke localStorage
        localStorage.setItem("user", JSON.stringify(userFound));
        
        // Alihkan halaman ke dashboard utama
        navigate("/");
      } else {
        setError("Password yang Anda masukkan salah!");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan sistem saat mencoba masuk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      
      {/* HEADER LOGIN */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Selamat Datang</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">Silakan masuk untuk melanjutkan.</p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-red-500 text-sm mb-6 animate-shake shadow-sm">
          <HiExclamationCircle className="text-xl shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* FORM AREA */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* EMAIL INPUT */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
            Email Admin
          </label>
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              required
              placeholder="Masukkan email Anda"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm"
            />
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* PASSWORD INPUT */}
        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Kata Sandi
            </label>
            <Link to="/forgot" className="text-[11px] font-bold text-pink-500 hover:text-pink-600 hover:underline underline-offset-4 transition-all">
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative group">
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-black placeholder:text-slate-400 placeholder:font-medium shadow-sm tracking-widest"
            />
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-pink-600 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-pink-500/20 transition-all duration-300 active:scale-95 group uppercase tracking-widest text-xs"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memproses...</span>
            </div>
          ) : (
            <>
              <HiLogin className="text-lg group-hover:translate-x-1 transition-transform" />
              <span>Masuk ke Sistem</span>
            </>
          )}
        </button>
      </form>

      {/* ── FOOTER SWITCH TO REGISTER ── */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500 font-medium">
          Belum memiliki cabang?{" "}
          <Link to="/register" className="text-pink-600 font-bold hover:text-pink-700 hover:underline underline-offset-4 transition-all">
            Daftar sekarang
          </Link>
        </p>
      </div>

    </div>
  );
}