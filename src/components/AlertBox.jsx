import React from "react";
import { HiExclamationCircle, HiCheckCircle } from "react-icons/hi";

export default function AlertBox({ type = "error", children }) {
  const isError = type === "error";
  
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border mb-6 shadow-sm animate-in fade-in duration-300 ${
      isError 
        ? "bg-red-50 border-red-100 text-red-500" 
        : "bg-emerald-50 border-emerald-100 text-emerald-600"
    }`}>
      {isError ? (
        <HiExclamationCircle className="text-xl shrink-0" />
      ) : (
        <HiCheckCircle className="text-xl shrink-0" />
      )}
      <p className="font-bold text-sm">{children}</p>
    </div>
  );
}