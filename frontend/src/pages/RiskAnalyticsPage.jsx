import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
} from "recharts";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { DISTRICT_TRENDS, MONTHLY_DELAY } from "@/lib/dashboardData";
import { FACTOR_RADAR, COMPLETION_TIMELINE } from "@/lib/appData";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 24px -8px rgba(15,23,42,0.15)",
  fontSize: 12,
  fontWeight: 700,
};

export default function RiskAnalyticsPage() {
  return (
    <DashboardShell
      testId="analytics-page"
      crumb="Risk Analytics"
      title="Risk Analytics"
      subtitle="Deep dive analytics across districts, factors and completion trends"
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="District-wise Delay Trends" sub="Average delay probability per district" testId="analytics-district-chart">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_TRENDS} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8edf5" vertical={false} />
                <XAxis dataKey="district" tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Avg Delay %"]} cursor={{ fill: "rgba(11,61,145,0.05)" }} />
                <Bar dataKey="risk" radius={[6, 6, 0, 0]} animationDuration={1400}>
                  {DISTRICT_TRENDS.map((d) => <Cell key={d.district} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Delay Factor Concentration" sub="Relative intensity of each delay driver" testId="analytics-radar-chart">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={FACTOR_RADAR} outerRadius="72%">
                <PolarGrid stroke="#e8edf5" />
                <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10, fill: "#64748b", fontWeight: 700 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#0B3D91" strokeWidth={2} fill="#0B3D91" fillOpacity={0.22} animationDuration={1400} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Monthly Delay Probability" sub="Trend of predicted delay likelihood" testId="analytics-monthly-chart">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_DELAY} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B3D91" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0B3D91" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8edf5" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 80]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Delay probability"]} />
                <Area type="monotone" dataKey="risk" stroke="#0B3D91" strokeWidth={2.5} fill="url(#analyticsFill)" animationDuration={1600} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Project Completion Timeline" sub="Planned vs actual completions per quarter" testId="analytics-completion-chart">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPLETION_TIMELINE} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8edf5" vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(11,61,145,0.05)" }} />
                <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                <Bar name="Planned" dataKey="planned" fill="#CBD5E1" radius={[6, 6, 0, 0]} animationDuration={1200} />
                <Bar name="Actual" dataKey="actual" fill="#0B3D91" radius={[6, 6, 0, 0]} animationDuration={1400} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
