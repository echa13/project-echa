import { NavLink } from "react-router-dom";

// ── Icons (Diperbarui dengan ukuran relatif Tailwind) ─────────
const DashIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);
const MemberIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const OrderIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/>
  </svg>
);
const ReportIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

// BARU: Menambahkan ikon untuk Manajemen User agar serasi
const UserGroupIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const WarnIcon = ({ color }) => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke={color} strokeWidth="1.7" viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const LockIcon = ({ color }) => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke={color} strokeWidth="1.7" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const BanIcon = ({ color }) => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke={color} strokeWidth="1.7" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// ── Sub-components ────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-3 text-slate-400">
      {children}
    </p>
  );
}

function NavItem({ to, end, icon, label, badge }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all duration-300 group
        ${isActive 
          ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md shadow-pink-500/20 translate-x-1" 
          : "text-slate-500 hover:bg-pink-50 hover:text-pink-600 hover:translate-x-1"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <span className={`transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-pink-500"}`}>
            {icon}
          </span>
          
          <span className="flex-1">{label}</span>
          
          {badge && (
            <span className={`
              text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300
              ${isActive ? "bg-white/20 text-white" : "bg-pink-100 text-pink-600"}
            `}>
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function StatusItem({ to, icon, label, code, dotColor }) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium mb-1 text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-slate-700"
    >
      {icon}
      <span className="flex-1">{label}</span>
      <span className="text-[11px] mr-1 text-slate-400">{code}</span>
      <span 
        className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
        style={{ backgroundColor: dotColor }} 
      />
    </NavLink>
  );
}

// ── Main Sidebar ──────────────────────────────────────────────
export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 h-screen flex-shrink-0 p-5 sticky top-0 z-40 bg-white/90 backdrop-blur-md border-r border-pink-100 font-sans transition-all">
      
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-white flex items-center justify-center shadow-sm border border-pink-50 overflow-hidden">
            <img 
              src="/img/logo2.png" 
              alt="Chae Laundry Logo" 
              className="w-full h-full object-contain p-1" 
            />
          </div>
          <div>
            <p className="text-xl font-bold leading-none text-slate-800">
              Chae<span className="text-pink-500 font-medium">Laundry</span>
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest mt-1 text-pink-400">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Main Menu */}
        <div className="mb-6">
          <SectionLabel>Menu Utama</SectionLabel>
          <NavItem to="/" end icon={<DashIcon />} label="Dashboard" badge="Baru" />
          <NavItem to="/members" icon={<MemberIcon />} label="Member" badge="48" />
          <NavItem to="/orders" icon={<OrderIcon />} label="Order" badge="5" />
          <NavItem to="/reports" icon={<ReportIcon />} label="Laporan" />
          
          {/* DIUBAH: Menambahkan baris menu Manajemen User sesuai arahan modul dosen */}
          <NavItem to="/admin-users" icon={<UserGroupIcon />} label="Manajemen User" />
        </div>

        {/* Divider */}
        <div className="h-px bg-pink-50 mx-2 mb-6"></div>

        {/* System Status */}
        <div>
          <SectionLabel>Status Sistem</SectionLabel>
          <StatusItem to="/400" icon={<WarnIcon color="#f59e0b" />} label="Bad Request"    code="400" dotColor="#f59e0b" />
          <StatusItem to="/401" icon={<LockIcon color="#3b82f6" />} label="Unauthorized"   code="401" dotColor="#3b82f6" />
          <StatusItem to="/403" icon={<BanIcon  color="#ef4444" />} label="Forbidden"      code="403" dotColor="#ef4444" />
        </div>
      </div>

      {/* Bottom */}
      <div>
        {/* CTA Card */}
        <div className="relative overflow-hidden rounded-2xl p-5 mb-4 bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg shadow-pink-500/20">
          <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white opacity-10"></div>
          
          <svg
            viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
            className="absolute -bottom-2 right-2 w-16 opacity-20"
          >
            <rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect>
            <circle cx="12" cy="13" r="5"></circle>
            <path d="M7 6h10"></path>
          </svg>

          <p className="text-xs leading-relaxed mb-4 relative z-10 text-pink-50 font-medium">
            Tambahkan pesanan pelanggan baru hari ini.
          </p>
          
          <button className="relative z-10 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-pink-500 bg-white border-none shadow-sm transition-all hover:bg-pink-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95">
            <PlusIcon />
            Tambah Order
          </button>
        </div>

        {/* Footer */}
        <div className="px-2 text-center">
          <p className="text-xs font-semibold text-slate-500">ChaeLaundry Admin</p>
          <p className="text-[10px] mt-1 text-slate-400">© 2025 All Rights Reserved</p>
        </div>
      </div>
      
    </aside>
  );
}