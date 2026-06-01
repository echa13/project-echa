export default function IconButton({ icon, onClick }) {
  return (
    <button onClick={onClick} className="p-2 bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white rounded-xl transition-all duration-200 shadow-sm shadow-pink-100">
      {icon}
    </button>
  );
}