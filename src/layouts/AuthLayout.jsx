import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#F8FAFC] font-sans relative overflow-hidden selection:bg-pink-100">
      
      {/* ── BACKGROUND DECORATION ── */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-pink-50 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-100/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-100 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-[460px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* ── MAIN CARD ── */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100">
          
          {/* Accent Branding Line */}
          <div className="h-2 w-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 animate-gradient-x"></div>
          
          <div className="p-8 sm:p-12">
            
            {/* ── LOGO & BRAND ── */}
            <div className="flex flex-col items-center mb-10">
              {/* Kontainer Logo - Tilted SaaS Style */}
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-slate-900/20 mb-6 rotate-3 overflow-hidden p-3 border-4 border-white">
                {/* ── LOGO IMAGE DISINI ── */}
                <img 
                  src="img/logocha.jpg"
                  alt="Chae Laundry Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Teks Brand */}
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                Chae<span className="text-pink-500">Laundry</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-4 bg-pink-200"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Smart Management</p>
                <div className="h-[1px] w-4 bg-pink-200"></div>
              </div>
            </div>

            {/* ── CONTENT AREA (Login/Register) ── */}
            <div className="min-h-[300px]">
              <Outlet />
            </div>

          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-slate-500 font-medium">
            Butuh bantuan teknis?{" "}
            <Link to="/support" className="text-pink-600 font-bold hover:text-pink-700 transition-colors hover:underline underline-offset-8">
              Hubungi Support
            </Link>
          </p>
          <div className="flex justify-center gap-4 opacity-20">
             <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
          </div>
        </div>

      </div>
    </div>
  );
}