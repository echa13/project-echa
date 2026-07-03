import { useState, useEffect } from "react";
import { serviceAPI } from "../services/serviceAPI";
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
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersData, servicesData] = await Promise.all([
        serviceAPI.fetchOrders(),
        serviceAPI.fetchServices()
      ]);
      setOrders(ordersData);
      setServices(servicesData);
    } catch (err) {
      console.error("Gagal muat data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const getServiceName = (id) => {
    const s = services.find(sv => sv.id === id);
    return s ? s.service_name : "Layanan #" + id;
  };

  // Hitung statistik dari data real
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = [...new Set(orders.map(o => o.customer_name).filter(Boolean))].length;

  const stats = [
    { label: "Omzet Bruto", value: "Rp " + totalRevenue.toLocaleString("id-ID"), icon: <HiCash />, trend: "Data Real", color: "pink" },
    { label: "Volume Order", value: totalOrders.toString(), icon: <HiShoppingBag />, trend: totalOrders > 0 ? "+" + totalOrders : "0", color: "rose" },
    { label: "Pelanggan", value: totalCustomers.toString(), icon: <HiTrendingUp />, trend: totalCustomers > 0 ? "+" + totalCustomers : "0", color: "purple" },
  ];

  // Data harian dari orders
  const dailyMap = {};
  orders.forEach(o => {
    if (!o.created_at) return;
    const day = new Date(o.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    if (!dailyMap[day]) dailyMap[day] = { orders: 0, revenue: 0, services: {} };
    dailyMap[day].orders += 1;
    dailyMap[day].revenue += o.total_price || 0;
    const sName = getServiceName(o.service_id);
    dailyMap[day].services[sName] = (dailyMap[day].services[sName] || 0) + 1;
  });

  const reportData = Object.entries(dailyMap).slice(0, 7).map(([date, data], idx) => {
    const topService = Object.entries(data.services).sort((a, b) => b[1] - a[1])[0];
    return {
      id: idx + 1,
      date,
      orders: data.orders,
      revenue: "Rp " + data.revenue.toLocaleString("id-ID"),
      favorite: topService ? topService[0] : "-",
      efficiency: Math.min(100, Math.round((data.orders / Math.max(...Object.values(dailyMap).map(d => d.orders))) * 100)) + "%"
    };
  });

  const grossTotal = reportData.reduce((sum, r) => {
    const num = parseInt(r.revenue.replace(/[^0-9]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-10 font-sans selection:bg-pink-200">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ── LOADING STATE ── */}
        {loading ? (
          <div className="bg-white rounded-[2.5rem] p-20 text-center shadow-xl shadow-pink-500/5 border border-pink-50">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Memuat data laporan...</p>
          </div>
        ) : (
        <>
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
                <span className="text-3xl font-black text-white tracking-tighter">Rp {grossTotal.toLocaleString("id-ID")}</span>
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
        </>        
        )}

      </div>
    </div>
  );
}