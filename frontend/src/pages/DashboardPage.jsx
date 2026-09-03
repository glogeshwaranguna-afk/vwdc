import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCards } from "@/components/dashboard/StatCards";
import { MonthlyDelayChart, RiskDonut, DistrictBars, DelayFactors } from "@/components/dashboard/Charts";
import { HERO_IMAGE } from "@/lib/dashboardData";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50" data-testid="dashboard-root">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/75 to-white/90" />
      </div>

      <Sidebar />

      <div className="relative z-10 lg:pl-[264px]">
        <Topbar />

        <main className="px-5 pb-16 pt-7 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                LandGuard AI
                <ChevronRight className="h-3 w-3" />
                <span className="font-bold text-slate-800">Dashboard</span>
              </p>
              <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900" data-testid="dashboard-title">
                Command Dashboard
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                AI-powered predictive overview of land acquisition delay risk across all active projects
              </p>
            </div>
            <motion.button
              data-testid="ask-ai-assistant-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0B3D91]/25 transition-colors hover:bg-[#09337A]"
            >
              <Zap className="h-4 w-4" />
              Ask AI Assistant
            </motion.button>
          </motion.div>

          <StatCards />

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <MonthlyDelayChart />
            </div>
            <RiskDonut />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <DistrictBars />
            </div>
            <DelayFactors />
          </div>
        </main>
      </div>
    </div>
  );
}
