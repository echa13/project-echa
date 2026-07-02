import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serviceAPI } from "../services/serviceAPI";
import { userAPI } from "../services/userAPI";
import { 
  HiClipboardList, 
  HiSearch, 
  HiPlus, 
  HiClock, 
  HiUser,
  HiTag,
  HiOutlineCube,
  HiChevronRight,
  HiRefresh,
  HiCheckCircle,
  HiExclamationCircle
} from "react-icons/hi";

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [ordersData, servicesData] = await Promise.all([
        userData.role === 'admin' ? serviceAPI.fetchOrders() : serviceAPI.fetchOrdersByUser(userData.id),
        serviceAPI.fetchServices()
      ]);
      setOrders(ordersData);
      setServices(servicesData);
    } catch (err) {
      setError("Gagal memuat data order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const getServiceName = (serviceId) => {
    const s = services.find(sv => sv.id === serviceId);
    return s ? s.service_name : "Layanan #" + serviceId;
  };

  const getStatusLabel = (status) => {
    const labels = { pending: "Pending", proses: "Diproses", selesai: "Selesai", terkirim: "Terkirim" };
    return labels[status] || status;
  };

  const statusStyle = (status) => {
    switch (status) {
      case "selesai": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "proses": return "bg-pink-50 text-pink-600 border-pink-100";
      case "pending": return "bg-slate-50 text-slate-500 border-slate-100";
      case "terkirim": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await serviceAPI.updateOrderStatus(id, newStatus);
      
      // Sistem Poin: setiap Rp 10.000 = 1 poin
      if (newStatus === "selesai") {
        const order = orders.find(o => o.id === id);
        if (order && userData.id) {
          const pointsEarned = Math.floor(order.total_price / 10000);
          const currentPoints = userData.points || 0;
          await userAPI.updateUserPoints(userData.id, currentPoints + pointsEarned);
          
          // Update localStorage
          userData.points = currentPoints + pointsEarned;
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
      
      fetchData();
    } catch (err) {
      setError("Gagal update status: " + err.message);
    }
  };

  const filtered = orders.filter((item) =>
    (item.customer_name || "").toLowerCase().includes(search.toLowerCase()) || 
    ("#ORD-" + item.id).toLowerCase().includes(search.toLowerCase())
  ).map(item => ({
    ...item,
    service_name: getServiceName(item.service_id),
    status_label: getStatusLabel(item.status)
  }));

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // Stats summary
  const stats = {
    pending: orders.filter(o => o.status === "pending").length,
    proses: orders.filter(o => o.status === "proses").length,
    selesai: orders.filter(o => o.status === "selesai").length,
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
          <div className="flex items-center gap-3">
            <button onClick={fetchData} className="p-3 bg-white border border-pink-100 rounded-2xl text-slate-400 hover:text-pink-500 hover:border-pink-200 transition-all" title="Refresh">
              <HiRefresh className="text-xl" />
            </button>
            <button onClick={() => navigate("/orders/add")} className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 group">
              <HiPlus className="text-xl group-hover:rotate-90 transition-transform" />
              Buat Order Baru
            </button>
          </div>
        </div>

        {/* ── SEARCH & TOOLS ── */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-pink-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-md group">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
            <input type="text" placeholder="Cari nama pelanggan atau No. Order..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-pink-50/30 border border-transparent focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-200 transition-all font-medium text-slate-700" />
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <span className="text-pink-500">{orders.length}</span> Total Order
          </div>
        </div>

        {/* ── ERROR STATE ── */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-6 flex items-center gap-3">
            <HiExclamationCircle className="text-rose-500 text-xl shrink-0" />
            <p className="text-rose-600 font-bold text-sm">{error}</p>
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="bg-white rounded-[2.5rem] p-20 text-center">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Memuat data order...</p>
          </div>
        )}

        {/* ── ORDERS TABLE ── */}
        {!loading && !error && (
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-500/5 border border-pink-50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="bg-pink-50/50">
                    <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Customer Info</th>
                    <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Tanggal</th>
                    <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Service & Berat</th>
                    <th className="px-8 py-6 text-[11px] font-black text-pink-400 uppercase tracking-[0.2em]">Total</th>
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
                            <div className="text-slate-800 font-extrabold text-base">{item.customer_name || "-"}</div>
                            <div className="flex items-center gap-1.5 text-pink-400 text-xs font-bold mt-0.5">
                              <HiTag className="text-[10px]" /> #ORD-{item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                          <HiClock className="text-pink-400" /> {formatDate(item.created_at)}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-pink-50 rounded-xl">
                            <HiOutlineCube className="text-pink-500" />
                          </div>
                          <div>
                            <div className="text-slate-700 font-bold text-sm">{item.service_name}</div>
                            <div className="text-xs text-slate-400 font-medium">{item.weight_kg} kg</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-black text-slate-800">Rp {item.total_price?.toLocaleString("id-ID")}</span>
                      </td>
                      <td className="px-8 py-6">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                          className={`px-3 py-2 text-[10px] rounded-xl font-black uppercase tracking-widest border cursor-pointer transition-all ${statusStyle(item.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="proses">Proses</option>
                          <option value="selesai">Selesai</option>
                          <option value="terkirim">Terkirim</option>
                        </select>
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

            {filtered.length === 0 && (
              <div className="text-center py-24 bg-white">
                <div className="bg-pink-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                  <HiSearch className="text-5xl text-pink-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Tidak ada data order</h3>
                <p className="text-slate-400 font-medium mt-2">Belum ada order laundry yang tercatat.</p>
              </div>
            )}
          </div>
        )}

        {/* ── SUMMARY STATS ── */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="relative z-10 text-center lg:text-left space-y-2">
            <h4 className="text-2xl font-black italic tracking-tight">Ringkasan Order</h4>
            <p className="text-slate-400 font-medium">Data real-time dari database Supabase.</p>
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl min-w-[120px] text-center group hover:bg-white/10 transition-colors">
              <span className="block text-3xl font-black mb-1 text-slate-400">{stats.pending}</span>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">Pending</span>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl min-w-[120px] text-center group hover:bg-white/10 transition-colors">
              <span className="block text-3xl font-black mb-1 text-pink-400">{stats.proses}</span>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">Diproses</span>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl min-w-[120px] text-center group hover:bg-white/10 transition-colors">
              <span className="block text-3xl font-black mb-1 text-emerald-400">{stats.selesai}</span>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">Selesai</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}