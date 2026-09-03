import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/appData";

const CRITICAL = [...PROJECTS].filter((p) => p.risk === "critical").sort((a, b) => b.riskScore - a.riskScore).slice(0, 4);

export function ImmediateAction() {
  const navigate = useNavigate();
  const [starred, setStarred] = useState([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 rounded-2xl border border-slate-200/80 bg-white/95 p-6 backdrop-blur-sm"
      data-testid="immediate-action-section"
    >
      <div className="mb-4">
        <h3 className="font-display text-base font-bold text-slate-900">Projects Requiring Immediate Action</h3>
        <p className="mt-0.5 text-xs text-slate-500">Critical-risk projects flagged by the prediction engine</p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {CRITICAL.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50/40 p-4"
            data-testid={`immediate-project-${p.id}`}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                <span className="text-[#0B3D91]">{p.id}</span> · {p.name}
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-500">{p.action}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-display rounded-lg bg-red-100 px-2.5 py-1 text-sm font-extrabold text-red-700">
                {p.riskScore}
              </span>
              <button
                data-testid={`immediate-open-${p.id}`}
                onClick={() => navigate(`/projects/${p.id}`)}
                className="flex items-center gap-1 rounded-lg bg-[#0B3D91] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#09337A]"
              >
                Open Project <ArrowUpRight className="h-3 w-3" />
              </button>
              <button
                data-testid={`immediate-star-${p.id}`}
                onClick={() => setStarred((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]))}
                className={`rounded-lg border p-1.5 transition-colors ${
                  starred.includes(p.id)
                    ? "border-amber-300 bg-amber-50 text-amber-500"
                    : "border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-500"
                }`}
                aria-label="Flag project"
              >
                <Star className="h-3.5 w-3.5" fill={starred.includes(p.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
