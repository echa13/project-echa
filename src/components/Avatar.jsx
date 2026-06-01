export default function Avatar({ name = "User" }) {
  return (
    <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center font-bold text-xs uppercase border border-pink-100 shrink-0">
      {name.charAt(0)}
    </div>
  );
}