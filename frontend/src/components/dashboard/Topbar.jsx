import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BadgeCheck, Bell, Settings, ChevronDown, LogOut, Landmark } from "lucide-react";
import { toast } from "sonner";
import { getSession, signOut, initialsOf } from "@/lib/auth";

export function Topbar() {
  const navigate = useNavigate();
  const session = getSession() || { name: "A. Sharma", role: "Admin" };

  const onLogout = () => {
    signOut();
    toast.success("Signed out");
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200/70 bg-white/80 px-5 py-3 backdrop-blur-xl lg:px-8"
      data-testid="dashboard-topbar"
    >
      <div className="flex items-center gap-2.5 lg:hidden">
        <div className="rounded-lg bg-[#0B3D91] p-1.5">
          <Landmark className="h-4 w-4 text-white" />
        </div>
        <span className="font-display text-sm font-bold text-slate-900">LandGuard AI</span>
      </div>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          data-testid="dashboard-search-input"
          type="text"
          placeholder="Search projects, districts, LA-IDs..."
          className="w-full rounded-xl border border-transparent bg-slate-100/80 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#0B3D91]/30 focus:bg-white focus:ring-4 focus:ring-[#0B3D91]/10"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <span
          data-testid="blockchain-verified-badge"
          className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 md:flex"
        >
          <BadgeCheck className="h-3.5 w-3.5" />
          Blockchain Verified
        </span>

        <button
          data-testid="notifications-btn"
          className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            4
          </span>
        </button>

        <button
          data-testid="settings-btn"
          className="rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Settings"
        >
          <Settings className="h-4.5 w-4.5 h-[18px] w-[18px]" />
        </button>

        <button
          data-testid="logout-btn"
          onClick={onLogout}
          className="rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="h-4.5 w-4.5 h-[18px] w-[18px]" />
        </button>

        <div className="hidden items-center gap-2.5 border-l border-slate-200 pl-3 sm:flex" data-testid="user-profile">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B3D91] text-xs font-bold text-white">
            {initialsOf(session.name)}
          </div>
          <div className="hidden xl:block">
            <p className="text-sm font-bold leading-tight text-slate-900">{session.name}</p>
            <p className="text-xs leading-tight text-slate-500">{session.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </motion.header>
  );
}
