export default function Button({ children, type = "primary", onClick }) {
  const styles = {
    primary: "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:shadow-lg hover:shadow-pink-500/30",
    secondary: "bg-white border border-pink-100 text-slate-600 hover:border-pink-300 hover:text-pink-500 hover:shadow-sm shadow-pink-200"
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[type]} flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5 active:scale-95`}
    >
      {children}
    </button>
  );
}