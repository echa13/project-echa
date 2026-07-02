import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serviceAPI } from "../services/serviceAPI";
import { 
  HiUser, 
  HiArrowLeft,
  HiExclamationCircle,
  HiCheckCircle,
  HiCube,
  HiScale,
  HiCash,
  HiLocationMarker,
  HiDocumentText,
  HiShoppingCart
} from "react-icons/hi";

export default function AddOrder() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    customer_name: "",
    service_id: "",
    weight_kg: "",
    total_price: "",
    pickup_address: "",
    notes: "",
  });

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await serviceAPI.fetchServices();
        setServices(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, service_id: data[0].id.toString() }));
        }
      } catch (err) {
        setError("Gagal memuat daftar layanan: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");

    if (name === "service_id" || name === "weight_kg") {
      const sid = name === "service_id" ? value : form.service_id;
      const w = parseFloat(name === "weight_kg" ? value : form.weight_kg);
      const svc = services.find(s => s.id.toString() === sid);
      if (svc && w > 0) {
        setTimeout(() => setForm(prev => ({ ...prev, total_price: (svc.price_per_kg * w).toString() })), 0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.customer_name.trim()) { setError("Nama pelanggan wajib diisi!"); return; }
    if (!form.service_id) { setError("Pilih jenis layanan!"); return; }
    const weight = parseFloat(form.weight_kg);
    if (!weight || weight <= 0) { setError("Berat (Kg) harus diisi dengan angka valid!"); return; }
    if (!userData.id) { setError("Session tidak ditemukan. Silakan login ulang."); return; }

    try {
      setSubmitting(true);
      const svc = services.find(s => s.id.toString() === form.service_id);
      const total = svc ? svc.price_per_kg * weight : parseFloat(form.total_price) || 0;
      await serviceAPI.createOrder({
        user_id: userData.id,
        service_id: parseInt(form.service_id),
        weight_kg: weight,
        total_price: total,
        pickup_address: form.pickup_address || "-",
        notes: form.notes || "",
        status: "pending"
      });
      setSuccess("Order berhasil dibuat! " + (svc?.service_name || "") + " - " + weight + " kg = Rp " + total.toLocaleString("id-ID"));
      setForm({ customer_name: "", service_id: services[0]?.id.toString() || "", weight_kg: "", total_price: "", pickup_address: "", notes: "" });
    } catch (err) {
      setError("Gagal menyimpan order: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Memuat data layanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-10 font-sans selection:bg-pink-200">
      <div className="fixed top-0 right-0 w-96 h-96 bg-pink-100/50 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-100/50 rounded-full blur-[100px] -z-10"></div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <button onClick={() => navigate("/orders")} className="group flex items-center gap-2 text-slate-400 hover:text-pink-600 font-black text-xs uppercase tracking-[0.2em] transition-all w-fit">
          <HiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
          Kembali ke Monitoring Order
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[3rem] shadow-2xl shadow-pink-200/40 border border-pink-50 overflow-hidden">
          <div className="lg:col-span-4 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-900/40 mb-8 rotate-3">
                <HiShoppingCart className="text-3xl" />
              </div>
              <h1 className="text-3xl font-black tracking-tight leading-tight">
                Order <span className="text-pink-400">Baru</span>
              </h1>
              <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                Masukkan data pelanggan dan pilih layanan laundry untuk membuat order baru.
              </p>
            </div>
            <div className="mt-12 space-y-6 relative z-10">
              <div className="flex items-center gap-4 text-sm font-bold text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                Terintegrasi dengan Supabase
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 p-8 md:p-12">
            {error && (
              <div className="mb-8 flex items-center gap-3 bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl border border-rose-100 text-sm font-bold animate-shake">
                <HiExclamationCircle className="text-xl shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="mb-8 flex items-center gap-3 bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl border border-emerald-100 text-sm font-bold">
                <HiCheckCircle className="text-xl shrink-0" />
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Nama Pelanggan <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative group">
                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input type="text" name="customer_name" placeholder="Contoh: Andi Saputra" value={form.customer_name} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Jenis Layanan <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative group">
                    <HiCube className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <select name="service_id" value={form.service_id} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer shadow-inner">
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.icon || "🧺"} {s.service_name} - Rp {s.price_per_kg.toLocaleString("id-ID")}/kg
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Berat (Kg) <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative group">
                    <HiScale className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input type="number" name="weight_kg" step="0.5" min="0.5" placeholder="Contoh: 5" value={form.weight_kg} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 shadow-inner" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Total Harga (Otomatis)
                  </label>
                  <div className="relative group">
                    <HiCash className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <input type="text" value={form.total_price ? "Rp " + parseFloat(form.total_price).toLocaleString("id-ID") : "Rp 0"} readOnly className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-pink-600 cursor-not-allowed shadow-inner" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Alamat Penjemputan
                  </label>
                  <div className="relative group">
                    <HiLocationMarker className="absolute left-4 top-5 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <textarea name="pickup_address" rows="2" placeholder="Jl. Contoh No. 123, Jakarta" value={form.pickup_address} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 resize-none shadow-inner" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Catatan
                  </label>
                  <div className="relative group">
                    <HiDocumentText className="absolute left-4 top-5 text-pink-300 text-xl group-focus-within:text-pink-500 transition-colors" />
                    <textarea name="notes" rows="2" placeholder="Catatan khusus (opsional)" value={form.notes} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-pink-50/30 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm font-bold text-slate-700 resize-none shadow-inner" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-4 pt-8">
                <button type="button" onClick={() => navigate("/orders")} className="flex-1 px-8 py-5 rounded-[1.5rem] font-black text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600 transition-all uppercase tracking-[0.2em] text-[10px]">
                  Batal
                </button>
                <button type="submit" disabled={submitting} className="flex-[2] px-8 py-5 rounded-[1.5rem] font-black text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-xl shadow-pink-200 transition-all active:scale-95 uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Menyimpan..." : "Konfirmasi & Simpan Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}