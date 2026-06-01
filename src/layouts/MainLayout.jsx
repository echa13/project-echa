import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import fotoProfil from "../assets/Profil.png"; 

export default function MainLayout() {
  return (
    <div className="w-screen min-h-screen flex bg-[#FFF5F7] font-sans selection:bg-pink-200">
      
      {/* SIDEBAR FIXED 
          Memberikan border-right halus daripada shadow tebal agar lebih modern 
      */}
      <aside className="w-72 h-screen fixed left-0 top-0 bg-white border-r border-pink-50 z-30">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="ml-72 flex-1 flex flex-col min-h-screen relative">
        
        {/* Decorative Background Element (Aksen Pink Lembut) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        {/* HEADER 
            Dibuat sticky agar tetap terlihat saat scroll, dengan efek backdrop blur 
        */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-pink-50/50">
          {/* Kirim file fotoProfil ke komponen Header lewat props userImage sesuai arahan modul */}
          <Header userImage={fotoProfil} />
        </header>

        {/* PAGE CONTENT 
            Diberikan max-width dan padding agar konten tidak terlalu "lebar" di layar besar
        */}
        <main className="flex-1 p-8 lg:p-10">
          <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Outlet />
          </div>

          {/* Footer Internal Chae */}
          <footer className="mt-20 pb-10 flex items-center justify-between border-t border-pink-100 pt-6 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              © 2026 Chae Laundry Cloud
            </p>
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
}