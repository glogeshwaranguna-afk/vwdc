import { motion } from "framer-motion";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { Tag } from "@/components/RiskBadge";
import { PIPELINE_LA1007, projectById } from "@/lib/appData";

const p = projectById("LA-1007");
const statusTone = { completed: "emerald", "in-progress": "blue", pending: "slate" };

export default function ApprovalTrackingPage() {
  const currentIdx = PIPELINE_LA1007.findIndex((s) => s.status === "in-progress");

  return (
    <DashboardShell
      testId="approvals-page"
      crumb="Approval Tracking"
      title="Approval Tracking"
      subtitle={`${p.id} — ${p.name} · Visual workflow of the land acquisition approval pipeline`}
    >
      <Card title="Acquisition Pipeline" sub="Stage-wise progress" testId="pipeline-visual">
        <div className="flex items-center overflow-x-auto px-2 pb-2 pt-6">
          {PIPELINE_LA1007.map((s, i) => {
            const done = s.status === "completed";
            const current = s.status === "in-progress";
            return (
              <div key={s.stage} className="flex min-w-[90px] flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-extrabold ${
                      done
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : current
                          ? "border-[#0B3D91] bg-[#0B3D91] text-white"
                          : "border-slate-200 bg-white text-slate-300"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </motion.div>
                  <p className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-wide ${current ? "text-[#0B3D91]" : done ? "text-emerald-600" : "text-slate-400"}`}>
                    {s.stage}
                  </p>
                </div>
                {i < PIPELINE_LA1007.length - 1 && (
                  <div className={`mx-2 mb-6 h-0.5 min-w-[24px] flex-1 rounded ${i < currentIdx ? "bg-emerald-400" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="Stage Details" sub="Department-wise pipeline status" className="mt-4 p-0" testId="stage-details">
        <div className="overflow-x-auto p-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                {["Stage", "Status", "Start Date", "Completion Date", "Days Pending", "Department"].map((h) => (
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PIPELINE_LA1007.map((s) => (
                <tr key={s.stage} className="border-b border-slate-50 transition-colors hover:bg-[#0B3D91]/[0.03]" data-testid={`stage-row-${s.stage.toLowerCase().replace(/[^a-z]/g, "-")}`}>
                  <td className="px-4 py-3.5 font-bold text-slate-800">{s.stage}</td>
                  <td className="px-4 py-3.5"><Tag tone={statusTone[s.status]}>{s.status}</Tag></td>
                  <td className="px-4 py-3.5 text-slate-600">{s.start}</td>
                  <td className="px-4 py-3.5 text-slate-600">{s.end}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700">{s.days}</td>
                  <td className="px-4 py-3.5 text-slate-600">{s.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  );
}
