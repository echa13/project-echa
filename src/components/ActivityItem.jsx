export default function ActivityItem({ time, title, description }) {
  return (
    <div className="flex gap-4 relative pb-5 last:pb-0 group">
      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-pink-50 group-last:hidden"></div>
      <div className="w-6 h-6 rounded-full bg-white border-4 border-pink-400 z-10 flex-shrink-0"></div>
      <div className="flex-1 -mt-0.5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-700">{title}</h4>
          <span className="text-[10px] text-slate-400 font-medium">{time}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}