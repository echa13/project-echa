import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiUserAdd, 
  HiSearch, 
  HiPencilAlt, 
  HiTrash, 
  HiUsers,
  HiDotsVertical
} from "react-icons/hi";

export default function Members() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const data = [
    { id: 1, name: "Andi Saputra", phone: "0812-3456-7890", address: "Jl. Melati No. 10", type: "Premium", status: "Aktif" },
    { id: 2, name: "Siti Aisyah", phone: "0856-7890-1234", address: "Perum. Asri Blok B2", type: "Reguler", status: "Aktif" },
    { id: 3, name: "Budi Santoso", phone: "0813-5555-6666", address: "Jl. Sudirman No. 45", type: "VIP", status: "Nonaktif" },
    { id: 4, name: "Dewi Lestari", phone: "0821-9999-8888", address: "Kos Mawar Kamar 04", type: "Reguler", status: "Aktif" },
  ];

  const filtered = data.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.phone.includes(search)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-500 rounded-xl shadow-lg shadow-pink-200">
              <HiUsers className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Data <span className="text-pink-500">Member</span>
            </h1>
          </div>
          <p className="text-slate-400 font-medium ml-1">
            Kelola pelanggan setia Chae Laundry dengan mudah.
          </p>
        </div>

        <button
          onClick={() => navigate("/members/add")}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-7 py-3.5 rounded-2xl shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/40 hover:-translate-y-1 active:scale-95 font-bold text-sm"
        >
          <HiUserAdd className="text-xl" />
          Tambah Member Baru
        </button>
      </div>

      {/* ── SEARCH & STATS CARD ── */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-pink-50 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl" />
          <input
            type="text"
            placeholder="Cari nama atau nomor telepon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all text-slate-700 font-medium"
          />
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-pink-50 rounded-2xl border border-pink-100">
          <div className="text-right">
            <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Total Terdaftar</p>
            <p className="text-xl font-black text-pink-600 leading-none">{filtered.length} Member</p>
          </div>
        </div>
      </div>

      {/* ── TABLE SECTION ── */}
      <div className="bg-white rounded-[2.5rem] border border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Nama Pelanggan</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Kontak & Alamat</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Tipe</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Opsi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-pink-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner">
                        {m.name.charAt(0)}
                      </div>
                      <span className="font-extrabold text-slate-700 text-base">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 mb-1">{m.phone}</span>
                      <span className="text-xs text-slate-400 font-medium line-clamp-1">{m.address}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border
                      ${m.type === "VIP" ? "bg-amber-50 text-amber-500 border-amber-100" :
                        m.type === "Premium" ? "bg-pink-50 text-pink-500 border-pink-100" :
                        "bg-slate-50 text-slate-400 border-slate-100"}
                    `}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex justify-center">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase
                        ${m.status === "Aktif" ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-400"}
                      `}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === "Aktif" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
                        {m.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3">
                      <button className="p-2.5 hover:bg-pink-500 hover:text-white text-pink-500 bg-pink-50 rounded-xl transition-all duration-300">
                        <HiPencilAlt className="text-lg" />
                      </button>
                      <button className="p-2.5 hover:bg-slate-800 hover:text-white text-slate-400 bg-slate-50 rounded-xl transition-all duration-300">
                        <HiTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── EMPTY STATE ── */}
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-50 rounded-[2rem] mb-6 animate-bounce">
              <HiSearch className="text-4xl text-pink-200" />
            </div>
            <h3 className="text-xl font-black text-slate-800">Member Tidak Ditemukan</h3>
            <p className="text-slate-400 font-medium mt-2">Coba gunakan kata kunci lain atau tambah member baru.</p>
            <button 
              onClick={() => setSearch("")}
              className="mt-6 text-pink-500 font-bold text-sm hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>

      {/* ── INFO BANNER ── */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-2xl border border-pink-500/30">
          💡
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-bold text-pink-400 text-sm uppercase tracking-widest mb-1">Tips Manajemen</h4>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            Member dengan tipe <span className="text-white font-bold text-amber-400 italic font-serif">VIP</span> berhak mendapatkan diskon otomatis 15% pada setiap transaksi Cuci Kering Setrika.
          </p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/10">
          Pelajari Loyalty Program
        </button>
      </div>

    </div>
  );
}