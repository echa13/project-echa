import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

// ─── IMPORT KOMPONEN REUSABLE (Sesuai Syarat 15 Komponen) ───
import Card from "../components/Card";
import Table from "../components/Table";
import Badge from "../components/Badge";
import StatCard from "../components/StatCard";

// ─── Data Dummy (Tetap Sama 100%) ──────────────────────────────
const chartData = [
  { name: "Jan", weight: 800, revenue: 16000000 },
  { name: "Feb", weight: 950, revenue: 19000000 },
  { name: "Mar", weight: 1100, revenue: 22000000 },
  { name: "Apr", weight: 1300, revenue: 26000000 },
  { name: "May", weight: 1550, revenue: 31000000 },
  { name: "Jun", weight: 1900, revenue: 38000000 },
];

const topServices = [
  { id: 1, name: "Wash & Fold", count: 350, price: "Rp 12.000/kg", pct: 90 },
  { id: 2, name: "Dry Cleaning (Suit)", count: 120, price: "Rp 75.000/pc", pct: 70 },
  { id: 3, name: "Express Wash", count: 180, price: "Rp 20.000/kg", pct: 60 },
  { id: 4, name: "Household Items", count: 60, price: "Rp 40.000/pc", pct: 40 },
];

const recentOrders = [
  { id: "#ORD-3051", customer: "Budi Santoso", details: "Wash & Fold (8kg)", status: "success", statusText: "Selesai" },
  { id: "#ORD-3050", customer: "Dewi Anggraini", details: "Dry Clean (Dress)", status: "primary", statusText: "Proses" },
  { id: "#ORD-3049", customer: "Agus Rahmat", details: "Wash & Iron (5kg)", status: "success", statusText: "Selesai" },
  { id: "#ORD-3048", customer: "Citra Dewi", details: "Express Wash (10kg)", status: "danger", statusText: "Batal" },
  { id: "#ORD-3047", customer: "Eko Prasetyo", details: "Wash & Fold (12kg)", status: "primary", statusText: "Proses" },
];

// ─── Komponen Ikon (Tetap Sama) ──────────────────────
const Icons = {
  Clock: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Package: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M7.5 8l-3-4"/><path d="M16.5 8l3-4"/><path d="M12 2l3 6H9l3-6Z"/></svg>,
  Trend: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Clipboard: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  Truck: ({ className }) => <svg className={className} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
};

// ─── Komponen Pendukung Grafik ──────────────────────────────────────
function CustomTooltip({ active, payload, label, prefix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-pink-100 rounded-xl px-4 py-3 shadow-xl text-[13px]">
      <p className="text-slate-400 mb-1 text-[10px] uppercase tracking-widest font-bold">{label}</p>
      <p className="text-pink-600 font-extrabold text-[16px]">
        {prefix}{payload[0].value.toLocaleString("id-ID")}
      </p>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const tableHeaders = ["ID Order", "Pelanggan", "Detail", "Status", "Total"];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Ringkasan <span className="text-pink-500">Laundry</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Pantau performa operasional Chae Laundry hari ini.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/orders/add")}
            className="flex items-center gap-2 bg-white border border-pink-100 text-slate-600 px-5 py-3 rounded-2xl text-sm font-bold transition-all hover:border-pink-300 hover:text-pink-500 hover:shadow-sm shadow-pink-200"
          >
            <Icons.Clipboard className="w-4 h-4" /> Order Baru
          </button>
          <button
            onClick={() => navigate("/pickup/add")}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5 active:scale-95"
          >
            <Icons.Truck className="w-4 h-4" /> Request Pick-up
          </button>
        </div>
      </div>

      {/* ── KPI Row (Menggunakan Komponen Reusable StatCard) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Order" value="1,050" icon={<Icons.Clock className="text-pink-500" />} change="8%" isPositive={true} />
        <StatCard title="Terkirim" value="985" icon={<Icons.Package className="text-emerald-500" />} change="12%" isPositive={true} />
        <StatCard title="Masalah Kirim" value="65" icon={<Icons.Truck className="text-rose-500" />} change="3%" isPositive={false} />
        <StatCard title="Pendapatan" value="Rp 130.1M" icon={<Icons.Trend className="text-violet-500" />} change="18%" isPositive={true} />
      </div>

      {/* ── Charts + Top Services ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AREA CHART: Revenue Trends (Menggunakan Komponen Reusable Card) */}
        <Card className="lg:col-span-2 p-8 rounded-[2.5rem] border border-pink-50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Tren Pendapatan</h3>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em] bg-pink-50 px-3 py-1 rounded-lg">Jan – Jun 2025</span>
          </div>
          <div className="h-[300px]">
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
          </div>
        </Card>

        {/* Top Services (Menggunakan Komponen Reusable Card) */}
        <Card className="p-8 rounded-[2.5rem] border border-pink-50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Layanan Terlaris</h3>
          </div>
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
                  <div 
                    className="h-full bg-gradient-to-r from-pink-300 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-5 bg-pink-50/50 rounded-2xl border border-pink-100">
            <p className="text-xs font-bold text-pink-600 mb-1 leading-none">Insight Bisnis</p>
            <p className="text-[11px] text-pink-500 leading-relaxed font-medium">
              Permintaan <span className="font-bold">Wash & Fold</span> naik 20%. Pertimbangkan penambahan stok deterjen.
            </p>
          </div>
        </Card>
      </div>

      {/* ── Recent Orders Table (Menggunakan Komponen Reusable Card & Table) ── */}
      <Card className="rounded-[2.5rem] border border-pink-50 shadow-sm p-0">
        <div className="p-8 pb-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Order Terbaru</h3>
          <button className="text-xs font-bold text-pink-500 hover:underline px-4 py-2 bg-pink-50 rounded-xl transition-colors">Lihat Semua</button>
        </div>
        <div className="px-4 pb-4">
          <Table headers={tableHeaders}>
            {recentOrders.map((o) => (
              <tr key={o.id} className="group hover:bg-pink-50/30 transition-colors cursor-pointer">
                <td className="px-6 py-5 text-sm font-bold text-pink-500">{o.id}</td>
                <td className="px-6 py-5 text-sm font-extrabold text-slate-700">{o.customer}</td>
                <td className="px-6 py-5 text-sm text-slate-500 font-medium">{o.details}</td>
                <td className="px-6 py-5">
                  <Badge type={o.status}>{o.statusText}</Badge>
                </td>
                <td className="px-6 py-5 text-sm font-black text-slate-800 text-right">{o.total}</td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  );
}