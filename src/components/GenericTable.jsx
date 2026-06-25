import React from "react";

export default function GenericTable({ headers = [], data = [], onDelete }) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        {/* TABLE HEAD */}
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
              >
                {header}
              </th>
            ))}
            {onDelete && (
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                Aksi
              </th>
            )}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-slate-100">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-6 text-sm font-bold text-slate-900">{rowIndex + 1}</td>
              <td className="py-4 px-6 text-sm font-medium text-slate-700">{row.username}</td>
              <td className="py-4 px-6 text-sm font-medium text-slate-600">{row.email}</td>
              <td className="py-4 px-6 text-sm">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  row.role === "admin" 
                    ? "bg-pink-50 text-pink-600 border border-pink-100" 
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {row.role || "user"}
                </span>
              </td>
              {onDelete && (
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => {
                      if (window.confirm(`Yakin ingin menghapus user "${row.username}"?`)) {
                        onDelete(row.id);
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-red-500 hover:text-white bg-transparent hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-xl transition-all duration-200"
                  >
                    Hapus
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}