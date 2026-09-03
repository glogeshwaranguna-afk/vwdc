import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, ShieldCheck } from "lucide-react";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { RiskBadge, Tag } from "@/components/RiskBadge";
import { projectById, SHAP_FACTORS, STAGES, RISK_COLORS } from "@/lib/appData";

const compTone = { pending: "red", partial: "amber", completed: "emerald" };
const legalTone = { dispute: "red", clear: "emerald" };
const apprTone = { pending: "amber", "in-progress": "blue", approved: "emerald" };

function RiskGauge({ score, level }) {
  const r = 64;
  const c = Math.PI * r;
  return (
    <div className="relative mx-auto w-44">
      <svg viewBox="0 0 160 96" className="w-full">
        <path d="M 16 88 A 64 64 0 0 1 144 88" fill="none" stroke="#e8edf5" strokeWidth="12" strokeLinecap="round" />
        <motion.path
          d="M 16 88 A 64 64 0 0 1 144 88"
          fill="none"
          stroke={RISK_COLORS[level]}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="font-display text-4xl font-extrabold text-slate-900">{score}</p>
        <RiskBadge level={level} />
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const p = projectById(id) || projectById("LA-1011");
  const stageIdx = STAGES.indexOf(p.stage);
  const total = p.paidCr + p.pendingCr;

  const overview = [
    { label: "Project ID", value: p.id },
    { label: "Affected Families", value: p.families },
    { label: "Compensation", tag: <Tag tone={compTone[p.compensation]}>{p.compensation}</Tag> },
    { label: "Location", value: `${p.district}, ${p.state}` },
    { label: "Current Stage", value: p.stage },
    { label: "Legal Status", tag: <Tag tone={legalTone[p.legal]}>{p.legal}</Tag> },
    { label: "Land Area", value: `${p.landArea.toFixed(1)} ha` },
    { label: "Expected Completion", value: p.expected },
    { label: "Approval", tag: <Tag tone={apprTone[p.approval]}>{p.approval.replace("-", " ")}</Tag> },
  ];

  return (
    <DashboardShell
      testId="project-detail-page"
      crumb="Project Register"
      title={p.name}
      subtitle={`${p.type} · ${p.district}, ${p.state}`}
      actions={
        <motion.button
          data-testid="run-whatif-btn"
          onClick={() => navigate(`/simulator?project=${p.id}`)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0B3D91]/25 transition-colors hover:bg-[#09337A]"
        >
          <Zap className="h-4 w-4" /> Run What-If
        </motion.button>
      }
    >
      <Link
        to="/projects"
        data-testid="back-to-register-link"
        className="mb-5 -mt-3 flex w-fit items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-[#0B3D91]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to register
      </Link>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card title="Project Overview" sub="Acquisition record summary" className="xl:col-span-2" testId="project-overview">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {overview.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">{f.label}</p>
                <div className="mt-1.5 text-sm font-bold text-slate-800">{f.tag || f.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Risk Assessment" sub="ML predictive engine output" testId="risk-assessment">
          <RiskGauge score={p.riskScore} level={p.risk} />
          <div className="mt-6 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Delay Probability</p>
              <p className="font-display mt-1 text-xl font-extrabold text-slate-900">{p.delayPct}%</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Predicted Delay</p>
              <p className="font-display mt-1 text-xl font-extrabold text-slate-900">{Math.round(p.delayPct * 0.99)}d</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="Why is This Project At Risk" sub="Explainable AI (SHAP) — top contributing factors provided by the backend model" testId="shap-factors">
          <div className="space-y-4 pt-1">
            {SHAP_FACTORS.map((f, i) => (
              <div key={f.name} className="flex items-center gap-4">
                <p className="w-44 shrink-0 text-xs font-semibold text-slate-600">{f.name}</p>
                <div className="h-5 flex-1 overflow-hidden rounded-md bg-slate-100">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: f.value / 35 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full origin-left rounded-md"
                    style={{ background: f.value >= 18 ? "#EF4444" : f.value >= 10 ? "#F59E0B" : "#10B981" }}
                  />
                </div>
                <p className="w-10 text-right text-xs font-extrabold text-slate-800">+{f.value}%</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Approval Workflow" sub="Stage-wise acquisition progress" testId="approval-workflow">
          <div className="flex items-center pt-6">
            {STAGES.map((s, i) => {
              const done = i < stageIdx;
              const current = i === stageIdx;
              return (
                <div key={s} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-extrabold ${
                        done
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : current
                            ? "border-[#0B3D91] bg-[#0B3D91] text-white"
                            : "border-slate-200 bg-white text-slate-300"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </motion.div>
                    <p className={`absolute-static w-16 text-center text-[9px] font-bold uppercase tracking-wide ${current ? "text-[#0B3D91]" : done ? "text-emerald-600" : "text-slate-400"}`}>
                      {s}
                    </p>
                  </div>
                  {i < STAGES.length - 1 && <div className={`mx-1 mb-5 h-0.5 flex-1 rounded ${i < stageIdx ? "bg-emerald-400" : "bg-slate-200"}`} />}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card title="Compensation Snapshot" sub="Beneficiary payout status" className="mt-4" testId="compensation-snapshot">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: "Paid", value: `₹${p.paidCr.toFixed(2)} Cr`, cls: "text-emerald-600" },
            { label: "Pending", value: `₹${p.pendingCr.toFixed(2)} Cr`, cls: "text-red-500" },
            { label: "Total", value: `₹${total.toFixed(2)} Cr`, cls: "text-slate-900" },
            { label: "Beneficiaries", value: p.beneficiaries, cls: "text-slate-900" },
            { label: "Pending Cases", value: `${p.pendingCases} pending cases`, cls: "text-amber-600" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-slate-50 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{m.label}</p>
              <p className={`font-display mt-1.5 text-lg font-extrabold ${m.cls}`}>{m.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5" /> Personal beneficiary details are protected and not exposed in this view.
        </p>
      </Card>
    </DashboardShell>
  );
}
