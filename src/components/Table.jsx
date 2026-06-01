export default function Table({ headers = [], children }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] border-b border-slate-50">
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {children}
        </tbody>
      </table>
    </div>
  );
}