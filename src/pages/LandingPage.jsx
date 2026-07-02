import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiArrowRight,
  HiShieldCheck,
  HiClock,
  HiTag,
  HiSparkles,
  HiPhone,
  HiLocationMarker,
  HiMail,
  HiChevronDown,
  HiUserCircle,
  HiLogin,
} from "react-icons/hi";

// ─── Service Card Data (Fallback jika API belum siap) ───
const defaultServices = [
  {
    id: 1,
    service_name: "Wash & Fold",
    icon: "🧺",
    price_per_kg: 12000,
    estimate_hours: 24,
    description: "Cuci + lipat rapi, wangi tahan lama. Cocok untuk pakaian sehari-hari.",
  },
  {
    id: 2,
    service_name: "Dry Cleaning",
    icon: "👔",
    price_per_kg: 75000,
    estimate_hours: 48,
    description: "Perawatan khusus untuk bahan premium. Setelan jas, gaun, dan kain sensitif.",
  },
  {
    id: 3,
    service_name: "Express Wash",
    icon: "⚡",
    price_per_kg: 20000,
    estimate_hours: 6,
    description: "Cuci cepat 6 jam. Untuk Anda yang butuh pakaian dalam waktu singkat.",
  },
  {
    id: 4,
    service_name: "Cuci Komplit",
    icon: "🧼",
    price_per_kg: 15000,
    estimate_hours: 24,
    description: "Paket lengkap cuci, setrika, dan lipat. Pakaian siap pakai dalam 1 hari.",
  },
  {
    id: 5,
    service_name: "Setrika Saja",
    icon: "👕",
    price_per_kg: 8000,
    estimate_hours: 24,
    description: "Khusus setrika untuk pakaian yang sudah dicuci. Hasil rapi dan wangi.",
  },
  {
    id: 6,
    service_name: "Household Items",
    icon: "🏠",
    price_per_kg: 40000,
    estimate_hours: 72,
    description: "Laundry untuk barang rumah tangga: sprei, gorden, selimut, dan karpet.",
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ─── Main Landing Page ─────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Cek login status & scroll
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll ke section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setShowMobileMenu(false);
  };

  // Handle "Pesan Sekarang"
  const handleOrder = (service) => {
    setSelectedService(service);
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    } else {
      navigate("/orders/add", { state: { service } });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-pink-500/5 border-b border-pink-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-white shadow-md border border-pink-50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/img/logo2.png"
                  alt="Chae Laundry"
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-slate-900">
                  Chae<span className="text-pink-500">Laundry</span>
                </span>
                <p className="text-[9px] font-bold uppercase tracking-widest text-pink-400 -mt-0.5">
                  Smart Management
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { label: "Beranda", href: "#hero", onClick: () => scrollToSection("hero") },
                { label: "Layanan & Harga", href: "#services", onClick: () => scrollToSection("services") },
                { label: "Lokasi Cabang", href: "#footer", onClick: () => scrollToSection("footer") },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-pink-600 rounded-2xl hover:bg-pink-50 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 transition-all"
                >
                  <HiUserCircle className="text-xl" />
                  Portal Admin
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold text-slate-700 border-2 border-slate-200 hover:border-pink-300 hover:text-pink-600 transition-all hover:bg-pink-50"
                  >
                    <HiLogin className="text-lg" />
                    Masuk ke Sistem
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 transition-all"
                  >
                    Daftar Agen
                    <HiArrowRight className="text-lg" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-pink-50 hover:text-pink-500 transition-all"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all"
              >
                Layanan & Harga
              </button>
              <button
                onClick={() => scrollToSection("footer")}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all"
              >
                Lokasi Cabang
              </button>
              <div className="h-px bg-pink-100 my-4"></div>
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 text-center justify-center"
                >
                  <HiUserCircle className="text-xl" />
                  Portal Admin
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-pink-50 justify-center"
                  >
                    <HiLogin className="text-lg" />
                    Masuk ke Sistem
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 justify-center"
                  >
                    Daftar Agen
                    <HiArrowRight className="text-lg" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Background Decorative */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/80 via-white to-white pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Floating Laundry Icons */}
        <div className="absolute top-1/4 left-10 lg:left-20 text-6xl opacity-10 animate-float-slow pointer-events-none select-none">
          🧺
        </div>
        <div className="absolute bottom-1/3 right-10 lg:right-20 text-5xl opacity-10 animate-float-slower pointer-events-none select-none">
          👕
        </div>
        <div className="absolute top-2/3 left-1/4 text-4xl opacity-10 animate-float pointer-events-none select-none">
          🧼
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-100 px-5 py-2 rounded-full shadow-sm mb-8 animate-in fade-in zoom-in-95 duration-700">
              <HiSparkles className="text-pink-500 text-lg" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">
                Layanan Laundry Premium
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Cucian Bersih, Wangi,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500">
                dan Rapi Tanpa Repot.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              Layanan laundry premium berbasis aplikasi untuk memudahkan kebutuhan harian Anda.
              Nikmati kemudahan antar-jemput, tracking real-time, dan manajemen keagenan yang cerdas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
              <button
                onClick={() => scrollToSection("services")}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-pink-500/30 hover:shadow-3xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
              >
                Lihat Layanan Kami
                <HiChevronDown className="text-xl group-hover:translate-y-0.5 transition-transform" />
              </button>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-slate-700 border-2 border-slate-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300"
              >
                Daftar Jadi Agen
                <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-in fade-in duration-700 delay-500">
              {[
                { value: "1.050+", label: "Order Selesai" },
                { value: "48", label: "Mitra Agen" },
                { value: "99%", label: "Kepuasan" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section id="services" className="relative py-24 lg:py-32">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-pink-50/50 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full mb-6">
              <HiTag className="text-pink-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-pink-500">
                Daftar Harga
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Layanan & <span className="text-pink-500">Harga</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              Pilih layanan yang sesuai dengan kebutuhan Anda. Harga transparan, tanpa biaya tersembunyi.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl border border-pink-50 shadow-lg shadow-pink-500/5 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-pink-500/0 to-pink-500/0 group-hover:from-pink-500/[0.02] group-hover:via-pink-500/[0.01] group-hover:to-pink-500/0 transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner border border-pink-100">
                    {service.icon}
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {service.service_name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Price & Time */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-3xl font-black text-pink-600">
                        {formatPrice(service.price_per_kg)}
                      </span>
                      <span className="text-slate-400 font-medium text-xs">/kg</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <HiClock className="text-pink-400" />
                      Estimasi {service.estimate_hours} jam
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleOrder(service)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 text-slate-600 hover:text-white font-bold py-3.5 rounded-2xl border border-slate-100 hover:border-transparent transition-all duration-300 text-sm group/btn"
                  >
                    Pesan Sekarang
                    <HiArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-pink-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl">
              <HiShieldCheck className="text-2xl text-emerald-500" />
              <span className="text-sm font-bold text-slate-600">
                Harga sudah termasuk layanan antar-jemput gratis area kota
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Siap Bergabung Jadi Mitra?
          </h2>
          <p className="text-lg text-pink-100 font-medium max-w-xl mx-auto mb-10">
            Daftarkan agen laundry Anda sekarang dan nikmati kemudahan sistem manajemen berbasis cloud dari ChaeLaundry.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-white text-pink-600 px-10 py-4 rounded-2xl text-base font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
            >
              <HiSparkles className="text-xl" />
              Daftar Agen Sekarang
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              Masuk ke Sistem
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="footer" className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src="/img/logo2.png"
                    alt="Chae Laundry"
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">
                    Chae<span className="text-pink-400">Laundry</span>
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                Solusi laundry premium berbasis teknologi. Bersih, wangi, dan rapi tanpa repot.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {["📱", "💬", "📧"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/30 flex items-center justify-center text-lg transition-all"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400 mb-6">
                Navigasi
              </h4>
              <ul className="space-y-4">
                {["Beranda", "Layanan", "Harga", "Lokasi Cabang", "Kontak"].map(
                  (item) => (
                    <li key={item}>
                      <button
                        onClick={() =>
                          scrollToSection(
                            item === "Beranda"
                              ? "hero"
                              : item === "Layanan" || item === "Harga"
                                ? "services"
                                : "footer"
                          )
                        }
                        className="text-sm text-slate-400 hover:text-pink-400 font-medium transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400 mb-6">
                Kontak
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <HiPhone className="text-pink-400 mt-0.5 flex-shrink-0" />
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <HiMail className="text-pink-400 mt-0.5 flex-shrink-0" />
                  <span>hello@chaelaundry.com</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <HiLocationMarker className="text-pink-400 mt-0.5 flex-shrink-0" />
                  <span>Jl. Melati No. 10, Jakarta</span>
                </li>
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400 mb-6">
                Jam Operasional
              </h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span className="text-white font-bold">08:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="text-white font-bold">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Minggu</span>
                  <span className="text-pink-400 font-bold">09:00 - 15:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} Chae Laundry. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                Kebijakan Privasi
              </span>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                Syarat & Ketentuan
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── LOGIN DIALOG (Modal) ─── */}
      {showLoginDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowLoginDialog(false)}
          ></div>

          {/* Dialog */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <HiUserCircle className="text-5xl text-pink-500" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Masuk untuk Memesan
              </h3>
              <p className="text-slate-500 font-medium mb-8">
                Silakan masuk ke akun Anda terlebih dahulu untuk memesan layanan{" "}
                <span className="font-bold text-pink-500">
                  {selectedService?.service_name}
                </span>
              </p>

              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={() => setShowLoginDialog(false)}
                  className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Masuk ke Sistem
                </Link>
                <button
                  onClick={() => {
                    setShowLoginDialog(false);
                    navigate("/register");
                  }}
                  className="block w-full border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-bold text-sm hover:border-pink-300 hover:text-pink-600 transition-all"
                >
                  Daftar Akun Baru
                </button>
              </div>

              <button
                onClick={() => setShowLoginDialog(false)}
                className="mt-6 text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors"
              >
                Nanti saja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── INLINE STYLE FOR ANIMATIONS ─── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
