import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { MONTHLY_DELAY, RISK_DISTRIBUTION, DISTRICT_TRENDS, DELAY_FACTORS } from "@/lib/dashboardData";

const EASE = [0.22, 1, 0.36, 1];

const card =
  "rounded-2xl border border-slate-200/80 bg-white/95 p-6 backdrop-blur-sm";

function CardTitle({ title, sub }) {
  return (
    <div className="mb-4">
      <h3 className="font-display text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 24px -8px rgba(15,23,42,0.15)",
  fontSize: 12,
  fontWeight: 700,
};

export function MonthlyDelayChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={card}
      data-testid="monthly-delay-chart"
    >
      <CardTitle title="Monthly Delay Probability" sub="Trend of predicted delay likelihood" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_DELAY} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="delayFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B3D91" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#0B3D91" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8edf5" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 80]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Delay probability"]} />
            <Area type="monotone" dataKey="risk" stroke="#0B3D91" strokeWidth={2.5} fill="url(#delayFill)" animationDuration={1600} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function RiskDonut() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      className={card}
      data-testid="risk-distribution-chart"
    >
      <CardTitle title="Risk Distribution" sub="Portfolio by risk level" />
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={RISK_DISTRIBUTION}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              strokeWidth={0}
              animationDuration={1400}
            >
              {RISK_DISTRIBUTION.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {RISK_DISTRIBUTION.map((d) => (
          <span key={d.name} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            {d.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function DistrictBars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={card}
      data-testid="district-trends-chart"
    >
      <CardTitle title="District-wise Delay Trends" sub="Average delay probability per district" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DISTRICT_TRENDS} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8edf5" vertical={false} />
            <XAxis dataKey="district" tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Avg delay"]} cursor={{ fill: "rgba(11,61,145,0.05)" }} />
            <Bar dataKey="risk" radius={[6, 6, 0, 0]} animationDuration={1400}>
              {DISTRICT_TRENDS.map((d) => (
                <Cell key={d.district} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function DelayFactors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      className={card}
      data-testid="delay-factors-list"
    >
      <CardTitle title="Top Delay Factors" sub="What's driving risk portfolio-wide" />
      <div className="space-y-5 pt-1">
        {DELAY_FACTORS.map((f, i) => (
          <div key={f.id} data-testid={`delay-factor-${f.id}`}>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">{f.label}</p>
              <p className="font-display text-sm font-extrabold text-slate-900">{f.count}</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: f.pct / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#0B3D91] to-[#3B82F6]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
