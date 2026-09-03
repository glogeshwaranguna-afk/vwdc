import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Landmark,
  LayoutDashboard,
  FolderOpen,
  Map,
  ShieldAlert,
  Sparkles,
  SlidersHorizontal,
  Bot,
  Link2,
  FileCheck,
  Wallet,
  ClipboardCheck,
  Bell,
} from "lucide-react";

const SECTIONS = [
  {
    title: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
      { id: "register", label: "Project Register", icon: FolderOpen, to: "/projects" },
      { id: "gis", label: "GIS Risk Map", icon: Map, to: "/gis" },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { id: "analytics", label: "Risk Analytics", icon: ShieldAlert, to: "/analytics" },
      { id: "recommendations", label: "AI Recommendations", icon: Sparkles, to: "/recommendations" },
      { id: "simulator", label: "What-If Simulator", icon: SlidersHorizontal, to: "/simulator" },
      { id: "assistant", label: "AI Assistant", icon: Bot, badge: "Claude", to: "/assistant" },
    ],
  },
  {
    title: "Governance",
    items: [
      { id: "blockchain", label: "Blockchain Verify", icon: Link2, to: "/blockchain" },
      { id: "documents", label: "Document Integrity", icon: FileCheck, to: "/documents" },
      { id: "compensation", label: "Compensation", icon: Wallet, to: "/compensation" },
      { id: "approvals", label: "Approval Tracking", icon: ClipboardCheck, to: "/approvals" },
      { id: "alerts", label: "Alerts & Notifications", icon: Bell, to: "/alerts" },
    ],
  },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col bg-gradient-to-b from-[#0C3E93] via-[#0A3175] to-[#06255C] lg:flex"
      data-testid="dashboard-sidebar"
    >
      <div className="flex items-center gap-3 px-6 pb-6 pt-6">
        <div className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
          <Landmark className="h-4.5 w-4.5 h-[18px] w-[18px] text-white" />
        </div>
        <div>
          <p className="font-display text-base font-bold leading-tight text-white">LandGuard AI</p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-blue-200/70">
            Acquisition Intelligence
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 pb-4">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-200/50">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const inner = (
                  <>
                    <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-md bg-sky-400/25 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-200">
                        {item.badge}
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={item.id}>
                    {item.to ? (
                      <NavLink
                        to={item.to}
                        data-testid={`sidebar-nav-${item.id}`}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-white/15 text-white shadow-inner"
                              : "text-blue-100/70 hover:bg-white/10 hover:text-white"
                          }`
                        }
                      >
                        {inner}
                      </NavLink>
                    ) : (
                      <span
                        data-testid={`sidebar-nav-${item.id}`}
                        className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-blue-100/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
                      >
                        {inner}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-5" data-testid="system-status">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-200/50">System Status</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <p className="text-xs font-semibold text-blue-100/80">All services online</p>
        </div>
      </div>
    </motion.aside>
  );
}
