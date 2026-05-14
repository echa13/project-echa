import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiUser, 
  HiCalendar, 
  HiClock, 
  HiTruck, 
  HiArrowLeft,
  HiExclamationCircle,
  HiMap,
  HiPaperAirplane
} from "react-icons/hi";

export default function AddSchedule() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer: "",
    date: "",
    time: "",
    courier: "",
    serviceType: "Pick-up",
    status: "Menunggu",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.customer || !form.date || !form.time || !form.courier) {
      setError("Nama pelanggan, tanggal, waktu, dan kurir wajib ditentukan!");
      return;
    }

    console.log("LOGISTIK LAUNDRY:", form);
    alert("Jadwal operasional berhasil diaktivasi!");
    navigate("/schedule");
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-10 font-sans selection:bg-pink-200">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-pink-100/50 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-100/50 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate("/orders")}
          className="group flex items-center gap-2 text-slate-400 hover:text-pink-600 font-black text-xs uppercase tracking-[0.2em] transition-all w-fit"
        >
          <HiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
          Kembali ke Dashboard Logistik
        </button>

        {/* MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[3rem] shadow-2xl shadow-pink-200/40 border border-pink-50 overflow-hidden">
          
          {/* LEFT SIDE: INFO (Dark Theme) */}
          <div className="lg:col-span-4 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-900/40 mb-8 rotate-3">
                <HiTruck className="text-3xl" />
              </div>
              <h1 className="text-3xl font-black tracking-tight leading-tight">
                Penjadwalan <span className="text-pink-400">Kurir</span>
              </h1>
              <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                Pastikan rute dan waktu jemput sudah dikoordinasikan dengan pelanggan agar efisien.
              </p>
            </div>

            <div className="mt-12 space-y-6 relative z-10">
              <div className="flex items-center gap-4 text-sm font-bold text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                System Live Sync
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="lg:col-span-8 p-8 md:p-12">
            {error && (
              <div className="mb-8 flex items-center gap-3 bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl border border-rose-100 text-sm font-bold animate-shake">
                <HiExclamationCircle className="text-xl shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Nama Pelanggan */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Pelanggan
                  </label>
                  <div className="relative group">
                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input
                      type="text"
                      name="customer"
                      placeholder="Contoh: Ibu Ratna - Antapani"
                      value={form.customer}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner"
                    />
                  </div>
                </div>

                {/* Jenis Layanan */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Jenis Operasional
                  </label>
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={form.serviceType}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer shadow-inner"
                    >
                      <option value="Pick-up">🚗 Penjemputan (Pick-up)</option>
                      <option value="Delivery">📦 Pengantaran (Delivery)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-300">
                      <HiPaperAirplane className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Kurir */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Kurir Bertugas
                  </label>
                  <div className="relative group">
                    <HiMap className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input
                      type="text"
                      name="courier"
                      placeholder="Nama Kurir"
                      value={form.courier}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner"
                    />
                  </div>
                </div>

                {/* Tanggal */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Tanggal Tugas
                  </label>
                  <div className="relative group">
                    <HiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner"
                    />
                  </div>
                </div>

                {/* Waktu */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Jam Operasional
                  </label>
                  <div className="relative group">
                    <HiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner"
                    />
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  className="flex-1 px-8 py-5 rounded-[1.5rem] font-black text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600 transition-all uppercase tracking-[0.2em] text-[10px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-[2] px-8 py-5 rounded-[1.5rem] font-black text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-xl shadow-pink-200 transition-all active:scale-95 uppercase tracking-[0.2em] text-[10px]"
                >
                  Konfirmasi & Simpan Jadwal
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* BOTTOM DECORATION */}
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            Chae Laundry Logistics Interface v2.0
          </p>
        </div>
      </div>
    </div>
  );
}