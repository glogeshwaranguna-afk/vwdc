import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Maximize2 } from "lucide-react";
import { AssistantChat } from "@/components/assistant/AssistantChat";

export function ChatPanel({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            data-testid="chat-panel-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl"
            data-testid="chat-panel"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <div className="rounded-xl bg-[#0B3D91] p-2">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-slate-900">LandGuard Assistant</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Claude Sonnet 4.6
                </p>
              </div>
              <Link
                to="/assistant"
                data-testid="chat-expand-link"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Open full assistant page"
              >
                <Maximize2 className="h-4 w-4" />
              </Link>
              <button
                onClick={onClose}
                data-testid="chat-panel-close"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <AssistantChat compact />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
