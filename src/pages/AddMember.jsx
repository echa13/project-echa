import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons dari Heroicons (via react-icons)
import { 
  HiUser, 
  HiPhone, 
  HiLocationMarker, 
  HiArrowLeft,
  HiExclamationCircle,
  HiIdentification,
  HiBadgeCheck,
  HiSparkles
} from "react-icons/hi";

export default function AddMembers() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "Regular",
    phone: "",
    address: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      setError("Nama member dan nomor WhatsApp wajib diisi!");
      return;
    }

    console.log("DATA MEMBER BARU:", form);
    alert("Member baru berhasil diaktivasi!");
    navigate("/members"); // Kembali ke halaman Data Member
  };

  return (
    // Background utama menggunakan Pink super soft agar match dengan estetik foto 2
    <div className="relative min-h-screen bg-pink-50/40 font-sans overflow-hidden selection:bg-pink-200/60 transition-all selection:text-pink-900">
      
      {/* Background Decorative Orbs - Menambahkan efek 'soft glow' agar halaman form terasa hidup */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-100 rounded-full blur-[120px] -z-10 opacity-70"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white rounded-full blur-[130px] -z-10 opacity-80"></div>

      {/* Wrapper Utama dengan Padding */}
      <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-10 animate-in fade-in duration-700 relative z-10">
        
        {/* ── HEADER SECTION ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            {/* Tag Kategori (Aksen Modern) */}
            <div className="flex items-center gap-2 mb-1">
              <HiSparkles className="text-pink-400" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-400">Onboarding Pelanggan</p>
            </div>
            {/* Judul dengan aksen gradient soft pink */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tighter leading-tight">
              Aktivasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Member Baru</span>
            </h1>
            <p className="text-slate-500 font-medium italic mt-1 max-w-xl">
              Entry data pelanggan ke dalam ekosistem Chae Laundry untuk mulai mengelola pesanan mereka.
            </p>
          </div>
          
          {/* Tombol Batal yang senada dengan estetik 'filter' di foto 2 */}
          <button 
            onClick={() => navigate("/members")}
            className="group flex items-center gap-2.5 px-6 py-3.5 bg-white border border-pink-100 rounded-[1.25rem] text-slate-600 hover:text-pink-600 hover:border-pink-200 font-bold text-sm transition-all shadow-sm hover:shadow-pink-500/10 active:scale-95"
          >
            <HiArrowLeft className="text-lg group-hover:-translate-x-1.5 transition-transform" />
            Batal & Kembali
          </button>
        </div>

        {/* ── SPLIT LAYOUT: INFO PANEL & FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sisi Kiri: PANEL INFO (Sekarang Putih Bersih dengan Aksen Pink) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-9 rounded-[2.5rem] border border-pink-50 shadow-lg shadow-pink-500/5 relative overflow-hidden group">
               {/* Decorative Icon */}
               <HiBadgeCheck className="absolute -right-8 -top-8 text-[12rem] text-pink-50 rotate-12 group-hover:scale-110 transition-transform duration-700" />
               
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner border border-pink-200/50">
                    <HiBadgeCheck />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Benefit Member</h3>
                 <ul className="space-y-4 text-slate-600 text-sm font-medium">
                   <li className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-pink-400 rounded-full"></div> Tracking via WhatsApp
                   </li>
                   <li className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-pink-400 rounded-full"></div> Poin Reward Transaksi
                   </li>
                   <li className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-pink-400 rounded-full"></div> Riwayat Cuci Terpusat
                   </li>
                 </ul>
               </div>
            </div>

            {/* Panel Tips/Petunjuk */}
            <div className="bg-white p-7 rounded-[2rem] border border-pink-100/50 shadow-sm shadow-pink-500/5 flex gap-4 items-center">
                <div className="text-3xl">💡</div>
               <p className="text-pink-800 text-xs font-semibold leading-relaxed italic">
                 <span className="font-bold text-pink-500">Tips Admin:</span> Pastikan nomor WhatsApp aktif untuk fitur notifikasi otomatis saat cucian selesai diproses.
               </p>
            </div>
          </div>

          {/* Sisi Kanan: FORM AKTIVASI (Putih Bersih dengan Aksen Pink Lembut) */}
          <div className="lg:col-span-2 relative">
            {/* Container Form Utama */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-pink-500/5 border border-white relative overflow-hidden">
              
              {/* Banner Error (Bila ada) */}
              {error && (
                <div className="mb-8 flex items-center gap-3 bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl border border-rose-100 text-sm font-bold animate-pulse">
                  <HiExclamationCircle className="text-xl shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10 transition-all duration-300">
                
                {/* Field: Nama Lengkap */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nama Lengkap Member <span className="text-pink-500">*</span></label>
                  <div className="relative group">
                    <HiIdentification className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-200 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Masukkan nama sesuai KTP"
                      value={form.name}
                      onChange={handleChange}
                      // Input field menggunakan warna bg super soft pink/putih, border pink tipis, focus pink pekat
                      className="w-full pl-14 pr-6 py-4.5 bg-pink-50/50 border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner placeholder:text-pink-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Field: No WhatsApp */}
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">No. WhatsApp <span className="text-pink-500">*</span></label>
                    <div className="relative group">
                      <HiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-200 text-xl group-focus-within:text-pink-500 transition-colors" />
                      <input
                        type="text"
                        name="phone"
                        placeholder="0812345678..."
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4.5 bg-pink-50/50 border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner placeholder:text-pink-200"
                      />
                    </div>
                  </div>

                  {/* Field: Kategori Membership */}
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Kategori Membership</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      // Select field disesuaikan gayanya
                      className="w-full px-6 py-4.5 bg-pink-50/50 border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 cursor-pointer appearance-none shadow-inner"
                    >
                      <option value="Regular">Regular Member</option>
                      <option value="Premium">Premium Member (Gold)</option>
                      <option value="Corporate">Corporate / B2B</option>
                    </select>
                  </div>
                </div>

                {/* Field: Alamat */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Alamat Penjemputan</label>
                  <div className="relative group">
                    <HiLocationMarker className="absolute left-5 top-6 text-pink-200 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <textarea
                      name="address"
                      rows="3"
                      placeholder="Alamat lengkap rumah/kantor..."
                      value={form.address}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 py-4.5 bg-pink-50/30 border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 resize-none shadow-inner placeholder:text-pink-200"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON - Menggunakan gradasi soft pink/rose (seperti tombol di foto 2 tapi lebih lebar) */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 hover:from-pink-500 hover:via-pink-600 hover:to-rose-500 text-white py-5 rounded-[1.5rem] font-extrabold uppercase tracking-[0.2em] text-xs shadow-xl shadow-pink-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <HiUser className="text-xl group-hover:scale-110 transition-transform" />
                  Finalisasi Registrasi Member
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}