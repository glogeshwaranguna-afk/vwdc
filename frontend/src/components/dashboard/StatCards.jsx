import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FolderOpen, ShieldAlert, TrendingUp, Zap, ArrowUpRight } from "lucide-react";
import { STATS, RISK_CHIPS } from "@/lib/dashboardData";

const ICONS = { folder: FolderOpen, shield: ShieldAlert, trend: TrendingUp, zap: Zap };
const TINTS = {
  blue: "bg-blue-50 text-[#0B3D91]",
  amber: "bg-amber-50 text-amber-600",
  sky: "bg-sky-50 text-sky-600",
  red: "bg-red-50 text-red-600",
};

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatCards() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.div
              key={s.id}
              data-testid={`stat-card-${s.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px -12px rgba(11,61,145,0.18)" }}
              className="flex items-start justify-between rounded-2xl border border-slate-200/80 bg-white/95 p-5 backdrop-blur-sm transition-colors"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{s.label}</p>
                <p className="font-display mt-2 text-3xl font-extrabold text-slate-900">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                {s.alert ? (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-500">
                    <ArrowUpRight className="h-3 w-3" />
                    {s.sub}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs font-medium text-slate-500">{s.sub}</p>
                )}
              </div>
              <div className={`rounded-xl p-2.5 ${TINTS[s.tint]}`}>
                <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {RISK_CHIPS.map((c, i) => (
          <motion.div
            key={c.id}
            data-testid={`risk-chip-${c.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className={`flex items-center justify-between rounded-2xl border p-4 ${c.classes}`}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">{c.label}</p>
              <p className="font-display mt-1 text-2xl font-extrabold">
                <CountUp value={c.value} suffix="" />
              </p>
            </div>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white ${c.badge}`}>
              {c.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
