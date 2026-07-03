import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiSearch, 
  HiBell, 
  HiCog, 
  HiOutlineUser, 
  HiOutlineLogout,
  HiOutlineAdjustments
} from "react-icons/hi";

// Ambil props userImage yang dikirim dari MainLayout
export default function Header({ userImage }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown saat user mengklik area di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-[76px] bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm font-sans transition-all">
      
      {/* BRAND / LOGO */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center">
          <img 
            src="/img/logocha.jpg" 
            alt="Chae Laundry Logo" 
            className="h-15 w-auto object-contain"
          />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            Chae<span className="text-pink-500 font-medium">Laundry</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">
            Admin Panel
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <form 
        className="relative w-full max-w-md hidden md:block"
        onSubmit={(e) => e.preventDefault()}
      >
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl" />
        <input
          type="search"
          placeholder="Cari ID pesanan atau nama pelanggan..."
          aria-label="Search"
          className="w-full h-11 pl-12 pr-4 rounded-full border border-pink-100 bg-pink-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all text-sm text-slate-700 shadow-sm placeholder:text-slate-400"
        />
      </form>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-3">

        {/* NOTIFICATION */}
        <button 
          aria-label="Notifications"
          className="relative p-2.5 rounded-xl text-slate-400 hover:bg-pink-50 hover:text-pink-500 transition-colors"
        >
          <HiBell className="text-2xl" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-pink-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>

        {/* SETTINGS */}
        <button 
          aria-label="Settings"
          className="p-2.5 rounded-xl text-slate-400 hover:bg-pink-50 hover:text-pink-500 transition-colors"
        >
          <HiCog className="text-2xl" />
        </button>

        {/* BORDER PEMISAH */}
        <div className="h-8 w-px bg-pink-100 mx-2 hidden sm:block"></div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-pink-50 border border-transparent hover:border-pink-100 transition-all"
          >
            {/* PERBAIKAN: Menambahkan ring-2 ring-pink-400 agar ada lingkaran pink estetik di luar foto */}
            <div className="w-10 h-10 rounded-full bg-pink-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0 ring-2 ring-pink-400">
              {userImage ? (
                <img src={userImage} alt="Chae Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-pink-600 text-sm font-bold">CH</div>
              )}
            </div>
            
            {/* PERBAIKAN: Mengubah teks statis agar sesuai dengan nama "Cha" & "ADMIN" di foto mockup */}
            <div className="hidden sm:block text-left">
              <span className="block text-sm font-bold text-slate-700 leading-none mb-1">
                Cha
              </span>
              <span className="block text-[10px] text-pink-500 font-extrabold tracking-wider uppercase leading-none">
                ADMIN
              </span>
            </div>
          </button>

          {/* DROPDOWN MENU */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-pink-50 rounded-2xl shadow-xl shadow-pink-100/50 py-2 z-50 transform origin-top-right transition-all">
              
              <div className="px-4 py-3 border-b border-pink-50 sm:hidden">
                <span className="block text-sm font-bold text-slate-700">Cha</span>
                <span className="block text-xs text-pink-500 font-bold uppercase">ADMIN</span>
              </div>

              <div className="p-2">
                <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-pink-50 hover:text-pink-500 transition-colors">
                  <HiOutlineUser className="text-lg" />
                  Profil Saya
                </button>
                <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-pink-50 hover:text-pink-500 transition-colors">
                  <HiOutlineAdjustments className="text-lg" />
                  Pengaturan
                </button>
              </div>
              
              <div className="h-px bg-pink-50 my-1 mx-2"></div>
              
              <div className="p-2">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium text-rose-500 rounded-xl hover:bg-rose-50 transition-colors">
                  <HiOutlineLogout className="text-lg" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}