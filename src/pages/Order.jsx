import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiClipboardList, 
  HiSearch, 
  HiPlus, 
  HiClock, 
  HiUser,
  HiTag,
  HiOutlineCube,
  HiChevronRight
} from "react-icons/hi";

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const data = [
    { id: "ORD-001", customer: "Andi Saputra", received: "05 Mei 2026", estTime: "Besok, 14:00", service: "Cuci Komplit", weight: "5 kg", status: "Diproses" },
    { id: "ORD-002", customer: "Siti Aisyah", received: "05 Mei 2026", estTime: "Hari ini, 18:00", service: "Setrika Saja", weight: "3 kg", status: "Selesai" },
    { id: "ORD-003", customer: "Budi Santoso", received: "06 Mei 2026", estTime: "Lusa, 10:00", service: "Cuci Kering", weight: "7 kg", status: "Antre" },
    { id: "ORD-004", customer: "Dewi Lestari", received: "04 Mei 2026", estTime: "Kemarin, 12:00", service: "Cuci Komplit Express", weight: "2 kg", status: "Diambil" },
  ];

  const filtered = data.filter((item) =>
    item.customer.toLowerCase().includes(search.toLowerCase()) || 
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    switch (status) {
      case "Selesai": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Diproses": return "bg-pink-50 text-pink-600 border-pink-100";
      case "Antre": return "bg-slate-50 text-slate-500 border-slate-100";
      case "Diambil": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-8 font-sans selection:bg-pink-200 selection:text-pink-900">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* ── HEADER SECTION ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-[1.5rem] shadow-xl shadow-pink-200 text-white rotate-3">
              <HiClipboardList className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Monitoring <span className="text-pink-500">Order</span></h1>
              <p className="text-slate-400 font-medium text-sm">Kendali penuh antrean Chae Laundry Anda</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/orders/add")}
            className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-pink-200 active:scale-95 group"
          >
            <HiPlus className="text-xl group-hover:rotate-90 transition-transform" />
            Buat Order Baru
          </button>
        </div>

        {/* ── SEARCH & TOOLS ── */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-pink-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-md group">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
            <input
              type="text"
              placeholder="Cari nama pelanggan atau No. Order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-pink-50/30 border border-transparent focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-200 transition-all font-medium text-slate-700"
            />
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-4">
             <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
             Live System
          </div>
        </div>

        {/* ── ORDERS GRID/TABLE ── */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-500/5 border border-pink-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-pink-50/50">
                  <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Customer Info</th>
                  <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Timeline</th>
                  <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Service Details</th>
                  <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-pink-50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-pink-50/30 transition-all group cursor-default">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border-2 border-pink-100 rounded-2xl flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all">
                          <HiUser className="text-xl" />
                        </div>
                        <div>
                          <div className="text-slate-800 font-extrabold text-base">{item.customer}</div>
                          <div className="flex items-center gap-1.5 text-pink-400 text-xs font-bold mt-0.5">
                            <HiTag className="text-[10px]" /> {item.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                           <HiClock className="text-pink-400" /> {item.estTime}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Masuk: {item.received}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-pink-50 rounded-xl">
                            <HiOutlineCube className="text-pink-500" />
                         </div>
                         <div>
                            <div className="text-slate-700 font-bold text-sm">{item.service}</div>
                            <div className="text-xs text-slate-400 font-medium">{item.weight}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 text-[10px] rounded-xl font-black uppercase tracking-widest border transition-all ${statusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                        <HiChevronRight className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── EMPTY STATE ── */}
          {filtered.length === 0 && (
            <div className="text-center py-24 bg-white">
              <div className="bg-pink-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 animate-bounce">
                <HiSearch className="text-5xl text-pink-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Tidak ada data order</h3>
              <p className="text-slate-400 font-medium mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </div>

        {/* ── SUMMARY DASHBOARD CARD ── */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10 text-center lg:text-left space-y-2">
            <h4 className="text-2xl font-black italic tracking-tight">Kapasitas Produksi</h4>
            <p className="text-slate-400 font-medium">Monitoring beban kerja operasional hari ini secara real-time.</p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-4">
             {[
               { label: "Antrean", val: "01", color: "text-slate-400" },
               { label: "Proses", val: "01", color: "text-pink-400" },
               { label: "Siap Ambil", val: "02", color: "text-emerald-400" }
             ].map((stat, i) => (
               <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl min-w-[120px] text-center group hover:bg-white/10 transition-colors">
                  <span className={`block text-3xl font-black mb-1 ${stat.color}`}>{stat.val}</span>
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}