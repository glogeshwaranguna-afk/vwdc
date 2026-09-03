import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Plus, ChevronLeft, ChevronRight, Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { RiskBadge, Tag } from "@/components/RiskBadge";
import { PROJECTS, STAGES } from "@/lib/appData";

const PAGE_SIZE = 10;
const DISTRICTS = [...new Set(PROJECTS.map((p) => p.district))].sort();
const compTone = { pending: "red", partial: "amber", completed: "emerald" };

const selectCls =
  "rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#0B3D91] focus:ring-4 focus:ring-[#0B3D91]/10";

export default function ProjectRegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("all");
  const [risk, setRisk] = useState("all");
  const [stage, setStage] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (district === "all" || p.district === district) &&
          (risk === "all" || p.risk === risk) &&
          (stage === "all" || p.stage === stage)
      ),
    [district, risk, stage]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const exportCsv = () => {
    const header = "Project ID,Name,District,Type,Stage,Delay %,Risk Score,Risk,Compensation";
    const lines = filtered.map((p) =>
      [p.id, `"${p.name}"`, p.district, p.type, p.stage, p.delayPct, p.riskScore, p.risk, p.compensation].join(",")
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "landguard-project-register.csv";
    a.click();
    toast.success(`Exported ${filtered.length} projects to CSV`);
  };

  return (
    <DashboardShell
      testId="register-page"
      crumb="Project Register"
      title="Project Register"
      subtitle={`${PROJECTS.length} land acquisition projects tracked`}
      actions={
        <div className="flex gap-2">
          <button
            data-testid="export-csv-btn"
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-[#0B3D91]/40 hover:text-[#0B3D91]"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <motion.button
            data-testid="add-project-btn"
            onClick={() => toast.info("Project intake opens after district approval — demo mode")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-xl bg-[#0B3D91] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#0B3D91]/25 transition-colors hover:bg-[#09337A]"
          >
            <Plus className="h-4 w-4" /> Add Project
          </motion.button>
        </div>
      }
    >
      <Card className="p-0" testId="project-register-table">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <select data-testid="filter-district" value={district} onChange={(e) => { setDistrict(e.target.value); setPage(1); }} className={selectCls}>
            <option value="all">All Districts</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select data-testid="filter-risk" value={risk} onChange={(e) => { setRisk(e.target.value); setPage(1); }} className={selectCls}>
            <option value="all">All Risk</option>
            {["low", "medium", "high", "critical"].map((r) => <option key={r} value={r}>{r.toUpperCase()}</option>)}
          </select>
          <select data-testid="filter-stage" value={stage} onChange={(e) => { setStage(e.target.value); setPage(1); }} className={selectCls}>
            <option value="all">All Stages</option>
            {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="ml-auto text-xs font-semibold text-slate-400">{filtered.length} results</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm font-semibold text-slate-400" data-testid="register-loading">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading project register...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                  {["Project ID", "Name", "District", "Type", "Stage", "Delay %", "Risk Score", "Risk", "Compensation", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="cursor-pointer border-b border-slate-50 transition-colors hover:bg-[#0B3D91]/[0.03]"
                    data-testid={`project-row-${p.id}`}
                  >
                    <td className="px-4 py-3.5 font-bold text-[#0B3D91]">{p.id}</td>
                    <td className="max-w-[220px] truncate px-4 py-3.5 font-semibold text-slate-800">{p.name}</td>
                    <td className="px-4 py-3.5 text-slate-600">{p.district}</td>
                    <td className="px-4 py-3.5 text-slate-600">{p.type}</td>
                    <td className="px-4 py-3.5 text-slate-600">{p.stage}</td>
                    <td className="px-4 py-3.5 font-bold text-slate-800">{p.delayPct}%</td>
                    <td className="px-4 py-3.5 font-display font-extrabold text-slate-900">{p.riskScore}</td>
                    <td className="px-4 py-3.5"><RiskBadge level={p.risk} /></td>
                    <td className="px-4 py-3.5"><Tag tone={compTone[p.compensation]}>{p.compensation}</Tag></td>
                    <td className="px-4 py-3.5">
                      <button
                        data-testid={`project-open-${p.id}`}
                        onClick={(e) => { e.stopPropagation(); navigate(`/projects/${p.id}`); }}
                        className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-[#0B3D91]/40 hover:text-[#0B3D91]"
                      >
                        Open <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={10} className="px-4 py-14 text-center text-sm font-semibold text-slate-400">No projects match these filters</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3.5">
          <p className="text-xs font-semibold text-slate-400" data-testid="register-pagination-info">
            Page {current} of {pages} · {filtered.length} results
          </p>
          <div className="flex gap-2">
            <button
              data-testid="register-prev-page"
              disabled={current <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-[#0B3D91]/40 hover:text-[#0B3D91] disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              data-testid="register-next-page"
              disabled={current >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-[#0B3D91]/40 hover:text-[#0B3D91] disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
