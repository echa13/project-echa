import { FaChevronRight, FaPlus } from "react-icons/fa";

export default function PageHeader({
  title,
  breadcrumb = [],
  children,
  onAdd,
  addLabel,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] border border-pink-100 shadow-sm">

      {/* Left: Title & Breadcrumb */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight tracking-tight m-0">
          {title}
        </h1>

        <div className="flex items-center flex-wrap gap-2 mt-2">
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              return (
                <span key={index} className="flex items-center gap-2">
                  <span
                    className={`text-xs uppercase tracking-wider transition-colors duration-200 ${
                      isLast 
                        ? "font-bold text-pink-500 cursor-default" 
                        : "font-medium text-slate-400 hover:text-pink-500 cursor-pointer"
                    }`}
                  >
                    {item}
                  </span>
                  {!isLast && (
                    <FaChevronRight className="text-[8px] text-slate-300 mt-px" />
                  )}
                </span>
              );
            })
          ) : (
            <span className="text-xs text-slate-400 font-medium">
              {breadcrumb}
            </span>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="w-full sm:w-auto flex justify-end">
        {children ? (
          children
        ) : onAdd ? (
          <button
            onClick={onAdd}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-br from-pink-400 to-pink-500 text-white border-none rounded-2xl py-3 px-6 text-sm font-semibold shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <div className="bg-white/25 p-1 rounded-lg flex items-center justify-center">
              <FaPlus className="text-[10px]" />
            </div>
            {addLabel || "Tambah Baru"}
          </button>
        ) : null}
      </div>

    </div>
  );
}