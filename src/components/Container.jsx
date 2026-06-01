export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-[1400px] mx-auto ${className}`}>
      {children}
    </div>
  );
}