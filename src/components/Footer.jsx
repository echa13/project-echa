export default function Footer() {
  return (
    <footer className="mt-20 pb-10 flex items-center justify-between border-t border-pink-100 pt-6 opacity-40">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        © 2026 Chae Laundry Cloud
      </p>
      <div className="flex gap-4">
        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
      </div>
    </footer>
  );
}