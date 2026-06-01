export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-pink-50 rounded-[2.5rem] p-8 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}