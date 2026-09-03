import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, TrendingDown, Clock, Crosshair } from "lucide-react";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { SIMULATOR_CONFIG, projectById } from "@/lib/appData";

const FACTOR_DEFAULTS = {
  compensation: { pending: "Pending", partial: "Partial", completed: "Completed" },
  approval: { pending: "Pending", "in-progress": "In Progress", approved: "Approved" },
  legal: { dispute: "Yes", clear: "No" },
};

const initialFor = (proj) => ({
  compensation: FACTOR_DEFAULTS.compensation[proj.compensation],
  approval: FACTOR_DEFAULTS.approval[proj.approval],
  legal: FACTOR_DEFAULTS.legal[proj.legal],
  documentation: proj.riskScore >= 70 ? "Incomplete" : "Partial",
  stakeholder: "Slow",
});

export default function SimulatorPage() {
  const [searchParams] = useSearchParams();
  const project = projectById(searchParams.get("project")) || projectById("LA-1011");
  const cfg = { ...SIMULATOR_CONFIG, baseRisk: project.riskScore, baseDelayDays: Math.round(project.delayPct * 0.99) };
  const initial = initialFor(project);

  const [values, setValues] = useState(initial);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setValues(initialFor(project));
    setResult(null);
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  const run = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      const relief = SIMULATOR_CONFIG.factors.reduce((sum, f) => sum + (f.relief[values[f.key]] || 0), 0);
      const sim = Math.max(5, cfg.baseRisk - relief);
      setResult({
        sim,
        delta: cfg.baseRisk - sim,
        delay: Math.round(sim * (cfg.baseDelayDays / cfg.baseRisk)),
      });
      setRunning(false);
    }, 1300);
  };

  const scaleColor = (v) => (v >= 70 ? "#EF4444" : v >= 50 ? "#F97316" : v >= 30 ? "#F59E0B" : "#10B981");

  return (
    <DashboardShell
      testId="simulator-page"
      crumb="What-If Simulator"
      title="What-If Simulator"
      subtitle={`Interactive prediction sandbox for project ${project.id} — adjust factors and re-run the risk model`}
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="Scenario Inputs" sub="Change acquisition parameters" testId="simulator-inputs">
          <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-4 py-3" data-testid="simulator-project-chip">
            <Crosshair className="h-4 w-4 shrink-0 text-[#0B3D91]" />
            <p className="truncate text-sm font-bold text-slate-800">
              {project.id} · <span className="font-semibold text-slate-500">{project.name}</span>
            </p>
          </div>
          <div className="space-y-5">
            {SIMULATOR_CONFIG.factors.map((f) => (
              <div key={f.key}>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">{f.label}</label>
                  <span className="text-xs font-semibold text-slate-400">Current is {initial[f.key]}</span>
                </div>
                <select
                  data-testid={`sim-input-${f.key}`}
                  value={values[f.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#0B3D91] focus:ring-4 focus:ring-[#0B3D91]/10"
                >
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}

            <motion.button
              data-testid="run-prediction-btn"
              onClick={run}
              disabled={running}
              whileHover={{ scale: running ? 1 : 1.02 }}
              whileTap={{ scale: running ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3D91] py-3 text-sm font-bold text-white shadow-lg shadow-[#0B3D91]/25 transition-colors hover:bg-[#09337A] disabled:opacity-70"
            >
              {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {running ? "Running model..." : "Run Prediction"}
            </motion.button>
          </div>
        </Card>

        <Card title="Prediction Result" sub={`Simulated impact of your scenario on ${project.name}`} testId="simulator-result">
          <AnimatePresence mode="wait">
            {running ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-72 flex-col items-center justify-center gap-3" data-testid="simulator-loading">
                <Loader2 className="h-8 w-8 animate-spin text-[#0B3D91]" />
                <p className="text-sm font-semibold text-slate-400">Re-running risk model...</p>
              </motion.div>
            ) : result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} data-testid="simulator-output">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <p className="font-display text-5xl font-extrabold" style={{ color: scaleColor(cfg.baseRisk) }}>
                      {cfg.baseRisk}
                    </p>
                    <span className="mt-1 inline-block rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-700">
                      Current Risk
                    </span>
                  </div>
                  <div className="font-display text-2xl font-extrabold text-slate-300">→</div>
                  <div className="text-center">
                    <motion.p
                      key={result.sim}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="font-display text-5xl font-extrabold"
                      style={{ color: scaleColor(result.sim) }}
                    >
                      {result.sim}
                    </motion.p>
                    <span className="mt-1 inline-block rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                      Simulated Risk
                    </span>
                  </div>
                </div>

                <div className="relative mx-auto mt-8 h-3 max-w-sm rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500">
                  <div className="absolute -top-1 h-5 w-1.5 rounded-full bg-slate-800" style={{ left: `calc(${cfg.baseRisk}% - 3px)` }} title="Current" />
                  <motion.div
                    className="absolute -top-2.5 h-8 w-1.5 rounded-full bg-white ring-2 ring-slate-900"
                    initial={false}
                    animate={{ left: `calc(${result.sim}% - 3px)` }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    title="Simulated"
                  />
                </div>
                <div className="mx-auto mt-2 flex max-w-sm justify-between text-[10px] font-bold text-slate-400">
                  <span>0</span><span>50</span><span>100</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50 p-4 text-center">
                    <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-extrabold text-emerald-600">
                      <TrendingDown className="h-5 w-5" /> {result.delta} pts
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-700">Reduction in risk</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-extrabold text-slate-900">
                      <Clock className="h-5 w-5" /> {result.delay}d
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">Estimated delay after intervention</p>
                  </div>
                </div>

                <p className="mt-5 rounded-xl border border-[#0B3D91]/15 bg-[#0B3D91]/5 p-4 text-sm leading-relaxed text-slate-600" data-testid="simulator-explanation">
                  Resolving the selected factors could reduce delay risk for {project.id} by{" "}
                  <strong className="text-slate-900">{result.delta} points</strong>, moving the project toward a
                  healthier acquisition trajectory.
                </p>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-72 items-center justify-center" data-testid="simulator-idle">
                <p className="max-w-xs text-center text-sm font-medium text-slate-400">
                  Adjust the scenario parameters on the left, then press <strong>Run Prediction</strong> to simulate the impact on {project.id}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </DashboardShell>
  );
}
