import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ShieldCheck } from "lucide-react";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { projectById } from "@/lib/appData";

const p = projectById("LA-1011");
const total = p.paidCr + p.pendingCr;
const paidPct = Math.round((p.paidCr / total) * 100);
const DONUT = [
  { name: "Paid", value: p.paidCr, color: "#10B981" },
  { name: "Pending", value: p.pendingCr, color: "#EF4444" },
];

const METRICS = [
  { label: "TOTAL COMPENSATION", value: `₹${total.toFixed(2)} Cr`, cls: "text-slate-900" },
  { label: "PAID", value: `₹${p.paidCr.toFixed(2)} Cr`, cls: "text-emerald-600" },
  { label: "PENDING", value: `₹${p.pendingCr.toFixed(2)} Cr`, cls: "text-red-500" },
  { label: "BENEFICIARIES", value: p.beneficiaries, cls: "text-slate-900" },
];

export default function CompensationPage() {
  return (
    <DashboardShell
      testId="compensation-page"
      crumb="Compensation"
      title="Compensation Tracking"
      subtitle={`${p.id} — ${p.name} · Beneficiary payout status and disbursement analytics`}
    >
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 backdrop-blur-sm"
            data-testid={`comp-metric-${i}`}
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">{m.label}</p>
            <p className={`font-display mt-2 text-2xl font-extrabold ${m.cls}`}>{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="Disbursement Breakdown" sub="Paid vs pending compensation" testId="comp-donut">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DONUT} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3} strokeWidth={0} animationDuration={1400}>
                  {DONUT.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12, fontWeight: 700 }}
                  formatter={(v) => [`₹${v.toFixed(2)} Cr`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-center gap-6">
            {DONUT.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                {d.name} · ₹{d.value.toFixed(2)} Cr
              </span>
            ))}
          </div>
        </Card>

        <Card title="Payout Progress" sub="Disbursement execution" testId="payout-progress">
          <div className="space-y-6 pt-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">Amount Disbursed</span>
                <span className="font-display font-extrabold text-slate-900">{paidPct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: paidPct / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">Cases Received</span>
                <span className="font-display font-extrabold text-slate-900">{p.beneficiaries - p.pendingCases}/{p.beneficiaries}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: (p.beneficiaries - p.pendingCases) / p.beneficiaries }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#0B3D91] to-[#3B82F6]"
                />
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-display text-xl font-extrabold text-amber-700">{p.pendingCases} pending cases</p>
              <p className="mt-0.5 text-xs font-semibold text-amber-600">Oldest case pending 21 days — escalate to Revenue Dept</p>
            </div>
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Personal beneficiary details are protected and not exposed in this view.
            </p>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
