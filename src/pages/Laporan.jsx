import { useState } from "react";
import { 
  HiDocumentReport, 
  HiTrendingUp, 
  HiCash, 
  HiShoppingBag, 
  HiDownload,
  HiFilter,
  HiChevronDown,
  HiLightningBolt
} from "react-icons/hi";

export default function Reports() {
  const [period, setPeriod] = useState("Bulan Ini");

  const stats = [
    { label: "Omzet Bruto", value: "Rp 8.450.000", icon: <HiCash />, trend: "+12.5%", color: "pink" },
    { label: "Volume Order", value: "142", icon: <HiShoppingBag />, trend: "+8%", color: "rose" },
    { label: "Member Baru", value: "24", icon: <HiTrendingUp />, trend: "+18%", color: "purple" },
  ];

  const reportData = [
    { id: 1, date: "01 Mei 2026", orders: 12, revenue: "Rp 450.000", favorite: "Cuci Komplit", efficiency: "98%" },
    { id: 2, date: "02 Mei 2026", orders: 15, revenue: "Rp 620.000", favorite: "Express", efficiency: "95%" },
    { id: 3, date: "03 Mei 2026", orders: 10, revenue: "Rp 380.000", favorite: "Cuci Komplit", efficiency: "100%" },
    { id: 4, date: "04 Mei 2026", orders: 22, revenue: "Rp 940.000", favorite: "Setrika", efficiency: "92%" },
    { id: 5, date: "05 Mei 2026", orders: 18, revenue: "Rp 710.000", favorite: "Cuci Komplit", efficiency: "97%" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-10 font-sans selection:bg-pink-200">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ── TOP ACTION BAR ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-pink-500 rounded-lg text-white">
                <HiDocumentReport className="text-xl" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-pink-500">Business Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Performa <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Finansial</span></h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white border-2 border-pink-50 pl-5 pr-12 py-3.5 rounded-2xl text-sm font-black text-slate-700 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-200 transition-all cursor-pointer shadow-sm shadow-pink-500/5"
              >
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
                <option>Tahun Ini</option>
              </select>
              <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
            </div>
            
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-pink-600 text-white px-7 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-pink-900/10 group">
              <HiDownload className="group-hover:bounce" />
              Unduh Laporan
            </button>
          </div>
        </div>

        {/* ── STATS SECTION (High Contrast) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-500/5 border border-pink-50 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-pink-50 text-pink-500 text-2xl group-hover:bg-pink-500 group-hover:text-white transition-all duration-500`}>
                    {item.icon}
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {item.trend}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">{item.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter">{item.value}</h3>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-pink-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
            </div>
          ))}
        </div>

        {/* ── DATA TABLE ── */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-pink-500/5 border border-pink-50 overflow-hidden">
          <div className="p-8 border-b border-pink-50 bg-pink-50/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-2 h-6 bg-pink-500 rounded-full"></div>
               <h3 className="font-black text-slate-800 text-xl tracking-tight">Detail Transaksi Harian</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-pink-400 bg-white px-4 py-2 rounded-xl border border-pink-100">
               <HiFilter /> Filter Aktif
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white">
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Log Tanggal</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Vol. Order</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top Service</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">SLA/Efisiensi</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Net Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50/50">
                {reportData.map((row) => (
                  <tr key={row.id} className="hover:bg-pink-50/20 transition-all group">
                    <td className="px-8 py-6 text-slate-600 font-bold text-sm">{row.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-slate-800 w-6">{row.orders}</span>
                        <div className="flex-1 min-w-[60px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="bg-pink-500 h-full group-hover:bg-rose-500 transition-colors" style={{ width: `${(row.orders/25)*100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black py-1.5 px-3 bg-slate-900 text-white rounded-lg uppercase tracking-wider">
                        {row.favorite}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs">
                          <HiLightningBolt /> {row.efficiency}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-slate-900 text-base">
                      {row.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-900 p-8 flex justify-between items-center text-white">
             <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Gross Total</p>
                <p className="text-xs text-pink-400 font-medium italic">Termasuk pajak & biaya admin</p>
             </div>
             <div className="text-right">
                <span className="text-3xl font-black text-white tracking-tighter">Rp 3.100.000</span>
             </div>
          </div>
        </div>

        {/* ── AI INSIGHT BOX ── */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-pink-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-5xl shrink-0 shadow-inner">
            ⚡
          </div>
          <div className="relative z-10">
            <h4 className="text-2xl font-black tracking-tight">Analisis Smart-Chae</h4>
            <p className="text-pink-100 mt-3 leading-relaxed font-medium">
              Permintaan layanan <span className="text-white font-bold underline decoration-pink-300 underline-offset-4">Express</span> naik tajam di hari Selasa. 
              Saran: Aktifkan shift tambahan untuk kurir pada jam 10:00 - 14:00 guna mempertahankan SLA tetap 100%.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}