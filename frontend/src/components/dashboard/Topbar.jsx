import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BadgeCheck, Bell, Settings, ChevronDown, LogOut, Landmark, User, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { getSession, signOut, initialsOf } from "@/lib/auth";

export function Topbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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
          onClick={() => navigate("/alerts")}
          className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            4
          </span>
        </button>

        <button
          data-testid="settings-btn"
          onClick={() => toast.info("Preferences open from the profile menu — demo mode")}
          className="rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Settings"
        >
          <Settings className="h-[18px] w-[18px]" />
        </button>

        <div className="relative hidden border-l border-slate-200 pl-3 sm:block" data-testid="user-profile">
          <button
            data-testid="user-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-xl px-1.5 py-1 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B3D91] text-xs font-bold text-white">
              {initialsOf(session.name)}
            </div>
            <div className="hidden text-left xl:block">
              <p className="text-sm font-bold leading-tight text-slate-900">{session.name}</p>
              <p className="text-xs leading-tight text-slate-500">{session.role}</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
                  data-testid="user-menu-dropdown"
                >
                  <button
                    data-testid="menu-my-profile"
                    onClick={() => { setMenuOpen(false); toast.info(`Signed in as ${session.email || session.name} — demo mode`); }}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <User className="h-4 w-4 text-slate-400" /> My Profile
                  </button>
                  <button
                    data-testid="menu-preferences"
                    onClick={() => { setMenuOpen(false); toast.info("Preferences — demo mode"); }}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-slate-400" /> Preferences
                  </button>
                  <button
                    data-testid="logout-btn"
                    onClick={() => { setMenuOpen(false); onLogout(); }}
                    className="flex w-full items-center gap-2.5 border-t border-slate-100 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
