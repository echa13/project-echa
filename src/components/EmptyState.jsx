import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function EmptyState({ message = "Belum ada data tersedia" }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 my-4">
      <div className="p-4 bg-slate-100 rounded-2xl text-slate-400 mb-3">
        <HiOutlineUserGroup className="text-3xl" />
      </div>
      <p className="text-sm font-bold text-slate-700">{message}</p>
      <p className="text-xs text-slate-400 mt-1">Data yang kamu masukkan melalui form akan muncul di sini.</p>
    </div>
  );
}