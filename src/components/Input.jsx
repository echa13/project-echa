export default function Input({ label, type = "text", placeholder, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-pink-100 bg-white p-3.5 text-sm outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 transition-all text-slate-700 placeholder:text-slate-300 font-medium"
      />
    </div>
  );
}