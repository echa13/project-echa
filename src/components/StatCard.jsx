export default function StatCard({ title, value, icon, change, isPositive }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-pink-50 flex items-center gap-5 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-2xl font-black text-slate-800 leading-none tracking-tight">{value}</p>
        <p className="text-[13px] text-slate-400 mt-2 font-semibold uppercase tracking-wide">{title}</p>
      </div>
      {change && (
        <span className={`text-[11px] font-bold px-2 py-1 rounded-lg ${
          isPositive ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
        }`}>
          {isPositive ? "↑" : "↓"} {change}
        </span>
      )}
    </div>
  );
}