import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { PageBackdrop } from "@/components/PageBackdrop";

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-slate-50" data-testid="assistant-page">
      <PageBackdrop className="fixed z-0" />
      <Sidebar />

      <div className="relative z-10 lg:pl-[264px]">
        <Topbar />

        <main className="px-5 pb-8 pt-7 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              LandGuard AI
              <ChevronRight className="h-3 w-3" />
              <span className="font-bold text-slate-800">AI Assistant</span>
            </p>
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900" data-testid="assistant-title">
              AI Assistant
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              I can help you analyse acquisition delay risk, interpret model outputs and suggest next actions — powered by Claude.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-[calc(100dvh-270px)] min-h-[420px] max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-sm"
          >
            <AssistantChat />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
