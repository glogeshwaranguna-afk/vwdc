import { motion } from "framer-motion";
import { BadgeCheck, Link2, Boxes, Activity, ShieldCheck, FileCheck2 } from "lucide-react";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { AUDIT_TRAIL } from "@/lib/appData";

const NET = [
  { label: "Network Status", value: AUDIT_TRAIL.network.status, icon: Activity, cls: "text-emerald-600 bg-emerald-50" },
  { label: "Latest Block", value: AUDIT_TRAIL.network.latestBlock, icon: Boxes, cls: "text-[#0B3D91] bg-blue-50" },
  { label: "Transactions", value: AUDIT_TRAIL.network.transactions, icon: Link2, cls: "text-sky-600 bg-sky-50" },
  { label: "Verification", value: AUDIT_TRAIL.network.verification, icon: ShieldCheck, cls: "text-emerald-600 bg-emerald-50" },
];

export default function BlockchainPage() {
  return (
    <DashboardShell
      testId="blockchain-page"
      crumb="Blockchain Verify"
      title="Blockchain Verify"
      subtitle="Immutable audit trail — verified against the governance ledger (read-only frontend)"
    >
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {NET.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 backdrop-blur-sm"
            data-testid={`network-${n.label.toLowerCase().replace(/\s/g, "-")}`}
          >
            <div className={`mb-3 w-fit rounded-xl p-2.5 ${n.cls}`}>
              <n.icon className="h-[18px] w-[18px]" />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">{n.label}</p>
            <p className="font-display mt-1 text-xl font-extrabold text-slate-900">{n.value}</p>
          </motion.div>
        ))}
      </div>

      <Card
        title="Project Audit Trail"
        sub={`${AUDIT_TRAIL.projectId} · ${AUDIT_TRAIL.projectName}`}
        className="mt-4"
        testId="audit-trail"
      >
        <div className="relative space-y-6 pl-8 before:absolute before:bottom-2 before:left-[13px] before:top-2 before:w-0.5 before:bg-slate-200">
          {AUDIT_TRAIL.events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              data-testid={`audit-event-${i}`}
            >
              <div className="absolute -left-8 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-emerald-500 bg-white">
                <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-slate-900">{e.title}</p>
                <span className="flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  <BadgeCheck className="h-3 w-3" /> Verified on-chain
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {e.date} · {e.time} · {e.actor}
              </p>
              <p className="mt-1.5 w-fit rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-500">
                {e.hash}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
}
