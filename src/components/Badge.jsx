export default function Badge({ children, type = "primary" }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-500",  // Selesai
    primary: "bg-pink-50 text-pink-500",      // Proses
    danger: "bg-slate-100 text-slate-400",    // Batal
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${styles[type] || styles.primary}`}>
      {children}
    </span>
  );
}