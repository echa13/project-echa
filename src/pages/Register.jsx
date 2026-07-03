import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "../services/userAPI";
import { 
  HiOutlineMail, HiOutlineLockClosed, HiOutlineShieldCheck, 
  HiOutlineUserAdd, HiBadgeCheck, HiExclamationCircle, HiCheckCircle, HiUser
} from "react-icons/hi";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "", email: "", password: "", confirmPassword: "", role: "user"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!dataForm.username.trim()) { setError("Username wajib diisi!"); return; }
    if (!dataForm.email.trim()) { setError("Email wajib diisi!"); return; }
    if (!dataForm.password) { setError("Password wajib diisi!"); return; }
    if (dataForm.password.length < 3) { setError("Password minimal 3 karakter!"); return; }
    if (dataForm.password !== dataForm.confirmPassword) { setError("Konfirmasi password tidak cocok!"); return; }
    try {
      setLoading(true);
      await userAPI.createUser({ username: dataForm.username, email: dataForm.email, password: dataForm.password, role: "user" });
      setSuccess("Pendaftaran berhasil! Mengalihkan ke halaman login...");
      setDataForm({ username: "", email: "", password: "", confirmPassword: "", role: "user" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "";
      if (msg.includes("duplicate") || msg.includes("already exists")) {
        setError("Email ini sudah terdaftar! Gunakan email lain.");
      } else {
        setError("Gagal mendaftar: " + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-full mb-6 border border-pink-100 shadow-sm mx-auto md:mx-0 flex w-max">
        <HiBadgeCheck className="text-pink-500 text-sm" />
        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-pink-600">Sistem Terverifikasi</span>
      </div>
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">Gabung Jadi <span className="text-pink-500 italic">Mitra.</span></h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed font-medium">Daftarkan cabang laundry Anda dan mulai kelola operasional secara digital hari ini.</p>
      </div>
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-red-500 text-sm mb-6 animate-shake shadow-sm">
          <HiExclamationCircle className="text-xl shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm mb-6 shadow-sm">
          <HiCheckCircle className="text-xl shrink-0" />
          <p className="font-bold">{success}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nama Lengkap <span className="text-pink-500">*</span></label>
          <div className="relative group">
            <input type="text" name="username" value={dataForm.username} onChange={handleChange} required disabled={loading} placeholder="Nama agen/cabang Anda" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm" />
            <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Alamat Email Bisnis <span className="text-pink-500">*</span></label>
          <div className="relative group">
            <input type="email" name="email" value={dataForm.email} onChange={handleChange} required disabled={loading} placeholder="nama@laundry.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm" />
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Buat Kata Sandi <span className="text-pink-500">*</span></label>
          <div className="relative group">
            <input type="password" name="password" value={dataForm.password} onChange={handleChange} required disabled={loading} placeholder="Minimal 3 karakter" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-black placeholder:text-slate-400 placeholder:font-medium shadow-sm tracking-widest" />
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Konfirmasi Sandi <span className="text-pink-500">*</span></label>
          <div className="relative group">
            <input type="password" name="confirmPassword" value={dataForm.confirmPassword} onChange={handleChange} required disabled={loading} placeholder="Ketik ulang password" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-12 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 group-hover:border-slate-300 font-black placeholder:text-slate-400 placeholder:font-medium shadow-sm tracking-widest" />
            <HiOutlineShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" disabled={loading} className="w-full relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-pink-600 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-pink-500/20 transition-all duration-300 active:scale-95 group uppercase tracking-widest text-xs">
            {loading ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Mendaftarkan...</span>
              </div>
            ) : (
              <><HiOutlineUserAdd className="text-lg group-hover:scale-110 transition-transform" /> Daftar Sekarang</>
            )}
          </button>
        </div>
      </form>
      <div className="mt-8 text-center md:text-left">
        <p className="text-sm text-slate-500 font-medium">Sudah memiliki akses? <Link to="/login" className="text-pink-600 font-bold hover:text-pink-700 hover:underline underline-offset-4 transition-all">Masuk di sini</Link></p>
      </div>
    </div>
  );
}