import * as React from "react";

export const Table = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`w-full overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`} {...props}>
    <table className="min-w-full border-collapse text-left text-sm text-slate-700">{children}</table>
  </div>
));
Table.displayName = "Table";

export const TableHeader = ({ className = "", ...props }) => (
  <thead className={`bg-slate-50 ${className}`} {...props} />
);

export const TableBody = ({ className = "", ...props }) => (
  <tbody className={`divide-y divide-slate-100 ${className}`} {...props} />
);

export const TableRow = ({ className = "", ...props }) => (
  <tr className={`${className}`} {...props} />
);

export const TableHead = ({ className = "", ...props }) => (
  <th className={`px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${className}`} {...props} />
);

export const TableCell = ({ className = "", ...props }) => (
  <td className={`px-6 py-4 align-top ${className}`} {...props} />
);
