import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serviceAPI } from "../services/serviceAPI";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

import Card from "../components/Card";
import Table from "../components/Table";
import Badge from "../components/Badge";
import StatCard from "../components/StatCard";

const Icons = {
  Clock: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Package: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M7.5 8l-3-4"/><path d="M16.5 8l3-4"/><path d="M12 2l3 6H9l3-6Z"/></svg>,
  Trend: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

function CustomTooltip({ active, payload, label, prefix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-pink-100 rounded-xl px-4 py-3 shadow-xl text-[13px]">
      <p className="text-slate-400 mb-1 text-[10px] uppercase tracking-widest font-bold">{label}</p>
      <p className="text-pink-600 font-extrabold text-[16px]">{prefix}{payload[0].value.toLocaleString("id-ID")}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchData();
  }, []);

  // KPI calculations
  const totalOrders = orders.length;
  const totalTerkirim = orders.filter(o => o.status === "selesai" || o.status === "terkirim").length;
  const totalPending = orders.filter(o => o.status === "pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);

  // Chart data (group by month)
  const monthlyData = {};
  orders.forEach(o => {
    if (!o.created_at) return;
    const d = new Date(o.created_at);
    const monthKey = d.toLocaleString("id-ID", { month: "short", year: "2-digit" });
    if (!monthlyData[monthKey]) monthlyData[monthKey] = { revenue: 0, weight: 0 };
    monthlyData[monthKey].revenue += o.total_price || 0;
    monthlyData[monthKey].weight += o.weight_kg || 0;
  });
  const chartData = Object.entries(monthlyData).slice(-6).map(([name, data]) => ({
    name,
    revenue: data.revenue,
    weight: Math.round(data.weight * 10) / 10,
  }));

  // Top services
  const serviceCount = {};
  orders.forEach(o => {
    const sId = o.service_id;
    if (!serviceCount[sId]) serviceCount[sId] = { count: 0, totalRevenue: 0 };
    serviceCount[sId].count += 1;
    serviceCount[sId].totalRevenue += o.total_price || 0;
  });
  const topServices = Object.entries(serviceCount)
    .map(([sId, data]) => {
      const svc = services.find(s => s.id === parseInt(sId));
      return {
        id: sId,
        name: svc?.service_name || "Layanan #" + sId,
        count: data.count,
        revenue: data.totalRevenue,
        pct: Math.min(100, Math.round((data.count / totalOrders) * 100)),
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  // Recent orders
  const recentOrders = orders.slice(0, 5).map(o => {
    const svc = services.find(s => s.id === o.service_id);
    return {
      id: "#ORD-" + o.id,
      customer: o.customer_name || "-",
      details: (svc?.service_name || "-") + " (" + (o.weight_kg || 0) + "kg)",
      status: o.status === "selesai" || o.status === "terkirim" ? "success" : o.status === "pending" ? "danger" : "primary",
      statusText: o.status === "pending" ? "Pending" : o.status === "proses" ? "Proses" : o.status === "selesai" ? "Selesai" : "Terkirim",
      total: "Rp " + (o.total_price || 0).toLocaleString("id-ID"),
    };
  });

  const tableHeaders = ["ID Order", "Pelanggan", "Detail", "Status", "Total"];

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Memuat data dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Ringkasan <span className="text-pink-500">Laundry</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Data real-time dari {totalOrders} transaksi tercatat.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/orders/add")} className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5 active:scale-95">
            <Icons.Clock className="w-4 h-4" /> Order Baru
          </button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Order" value={totalOrders.toLocaleString("id-ID")} icon={<Icons.Clock className="text-pink-500" />} />
        <StatCard title="Selesai" value={totalTerkirim.toLocaleString("id-ID")} icon={<Icons.Package className="text-emerald-500" />} change="" isPositive={true} />
        <StatCard title="Pending" value={totalPending.toLocaleString("id-ID")} icon={<Icons.Clock className="text-rose-500" />} change="" isPositive={false} />
        <StatCard title="Pendapatan" value={"Rp " + totalRevenue.toLocaleString("id-ID")} icon={<Icons.Trend className="text-violet-500" />} />
      </div>

      {/* ── Charts + Top Services ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <Card className="lg:col-span-2 p-8 rounded-[2.5rem] border border-pink-50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Tren Pendapatan</h3>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em] bg-pink-50 px-3 py-1 rounded-lg">{chartData.length > 0 ? "Data Real" : "Belum ada data"}</span>
          </div>
          <div className="h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip prefix="Rp " />} />
                  <Area type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={4} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                Belum ada transaksi untuk ditampilkan di grafik.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-8 rounded-[2.5rem] border border-pink-50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Layanan Terlaris</h3>
          </div>
          {topServices.length > 0 ? (
            <div className="space-y-6">
              {topServices.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm font-bold text-slate-700">{p.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{p.count} Transaksi</p>
                    </div>
                    <p className="text-xs font-black text-pink-500">{p.pct}%</p>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-300 to-pink-500 rounded-full transition-all duration-1000" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 font-medium text-sm">Belum ada data layanan.</p>
          )}
        </Card>
      </div>

      {/* ── Recent Orders ── */}
      <Card className="rounded-[2.5rem] border border-pink-50 shadow-sm p-0">
        <div className="p-8 pb-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Order Terbaru</h3>
          <button onClick={() => navigate("/orders")} className="text-xs font-bold text-pink-500 hover:underline px-4 py-2 bg-pink-50 rounded-xl transition-colors">Lihat Semua</button>
        </div>
        <div className="px-4 pb-4">
          <Table headers={tableHeaders}>
            {recentOrders.length > 0 ? recentOrders.map((o) => (
              <tr key={o.id} className="group hover:bg-pink-50/30 transition-colors cursor-pointer">
                <td className="px-6 py-5 text-sm font-bold text-pink-500">{o.id}</td>
                <td className="px-6 py-5 text-sm font-extrabold text-slate-700">{o.customer}</td>
                <td className="px-6 py-5 text-sm text-slate-500 font-medium">{o.details}</td>
                <td className="px-6 py-5"><Badge type={o.status}>{o.statusText}</Badge></td>
                <td className="px-6 py-5 text-sm font-black text-slate-800 text-right">{o.total}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium">Belum ada order.</td>
              </tr>
            )}
          </Table>
        </div>
      </Card>
    </div>
  );
}