import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { PageBackdrop } from "@/components/PageBackdrop";

export function DashboardShell({ crumb, title, subtitle, actions, children, testId }) {
  return (
    <div className="min-h-screen bg-slate-50" data-testid={testId}>
      <PageBackdrop className="fixed z-0" />
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
                <span className="font-bold text-slate-800">{crumb}</span>
              </p>
              <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900" data-testid={`${testId}-title`}>
                {title}
              </h1>
              {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
            </div>
            {actions}
          </motion.div>

          {children}
        </main>
      </div>
    </div>
  );
}

export function Card({ title, sub, children, className = "", testId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-slate-200/80 bg-white/95 p-6 backdrop-blur-sm ${className}`}
      data-testid={testId}
    >
      {(title || sub) && (
        <div className="mb-4">
          {title && <h3 className="font-display text-base font-bold text-slate-900">{title}</h3>}
          {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
