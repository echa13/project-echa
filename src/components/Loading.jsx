export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-50/40 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        
        {/* Efek Glow di Belakang Logo (Animasi Pulse Pink Soft) */}
        <div className="absolute top-0 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Logo Chae Laundry */}
        <div className="relative z-10 mb-8 flex flex-col items-center">
          <img
            src="/img/logo2.png" // Pastikan path logo sudah benar
            alt="Chae Laundry"
            className="w-32 h-32 object-contain drop-shadow-sm animate-bounce [animation-duration:2s]"
          />
        </div>

        {/* Spinner Modern (Lapis Ganda) */}
        <div className="relative w-12 h-12 mb-6">
          {/* Ring luar (Track pudar) */}
          <div className="absolute inset-0 border-[4px] border-pink-100 rounded-full"></div>
          {/* Ring aktif (Berputar) */}
          <div className="absolute inset-0 border-[4px] border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Teks Loading Berbasis Tema Laundry */}
        <div className="text-center">
          <h2 className="text-slate-800 font-bold tracking-tight text-xl mb-1">
            Menyiapkan Cucian Bersih...
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-slate-500 font-medium animate-pulse">
              Sedang memproses data dashboard
            </span>
            {/* Animasi titik-titik */}
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
            </span>
          </div>
        </div> 
      </div>
    </div>
  );
}