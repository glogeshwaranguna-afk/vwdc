import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCheck, BellOff } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RiskBadge } from "@/components/RiskBadge";
import { ALERTS } from "@/lib/appData";

export default function AlertsPage() {
  const navigate = useNavigate();
  const [readIds, setReadIds] = useState([]);
  const [assignedIds, setAssignedIds] = useState([]);
  const [escalatedIds, setEscalatedIds] = useState([]);

  const unread = ALERTS.filter((a) => !readIds.includes(a.id)).length;

  const markRead = (id) => setReadIds((s) => [...new Set([...s, id])]);
  const markAll = () => {
    setReadIds(ALERTS.map((a) => a.id));
    toast.success("All alerts marked as read");
  };
  const assign = (a) => {
    setAssignedIds((s) => [...new Set([...s, a.id])]);
    toast.success(`Officer assigned. Case ID: A${a.id} assigned.`);
  };
  const escalate = (a) => {
    setEscalatedIds((s) => [...new Set([...s, a.id])]);
    toast.success(`Alert ${a.projectId} escalated to district collector`);
  };

  return (
    <DashboardShell
      testId="alerts-page"
      crumb="Alerts & Notifications"
      title="Alerts & Notifications"
      subtitle={`${unread} unread alerts requiring attention`}
      actions={
        <motion.button
          data-testid="mark-all-read-btn"
          onClick={markAll}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-[#0B3D91]/40 hover:text-[#0B3D91]"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all read
        </motion.button>
      }
    >
      <div className="space-y-3" data-testid="alerts-list">
        {ALERTS.map((a, i) => {
          const isRead = readIds.includes(a.id);
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border bg-white/95 p-5 backdrop-blur-sm transition-opacity ${
                isRead ? "border-slate-200/60 opacity-60" : "border-slate-200/80"
              }`}
              data-testid={`alert-card-${a.id}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <RiskBadge level={a.level} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{a.projectId}</p>
                    <p className="mt-1 text-sm text-slate-600">{a.text}</p>
                    <p className="mt-1.5 text-xs font-medium text-slate-400">{a.time}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    data-testid={`alert-open-${a.id}`}
                    onClick={() => navigate(`/projects/${a.projectId}`)}
                    className="rounded-lg bg-[#0B3D91] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#09337A]"
                  >
                    Open Project
                  </button>
                  <button
                    data-testid={`alert-escalate-${a.id}`}
                    onClick={() => escalate(a)}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-600"
                  >
                    {escalatedIds.includes(a.id) ? "Escalated" : "Escalate"}
                  </button>
                  <button
                    data-testid={`alert-assign-${a.id}`}
                    onClick={() => assign(a)}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-[#0B3D91]/40 hover:text-[#0B3D91]"
                  >
                    {assignedIds.includes(a.id) ? "Assigned" : "Assign"}
                  </button>
                  {!isRead && (
                    <button
                      data-testid={`alert-mark-read-${a.id}`}
                      onClick={() => markRead(a.id)}
                      className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-600"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {unread === 0 && (
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm font-semibold text-slate-400">
          <BellOff className="h-4 w-4" /> All caught up — no unread alerts
        </p>
      )}
    </DashboardShell>
  );
}
