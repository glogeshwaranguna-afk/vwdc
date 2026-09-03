import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DashboardShell, Card } from "@/components/dashboard/DashboardShell";
import { RiskBadge } from "@/components/RiskBadge";
import { PROJECTS, RISK_COLORS } from "@/lib/appData";

const COUNTS = ["low", "medium", "high", "critical"].map((r) => ({
  risk: r,
  count: PROJECTS.filter((p) => p.risk === r).length,
}));

const HIGHEST = [...PROJECTS].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

export default function GisMapPage() {
  const navigate = useNavigate();

  return (
    <DashboardShell
      testId="gis-page"
      crumb="GIS Risk Map"
      title="GIS Risk Map"
      subtitle="Geospatial distribution of land acquisition projects by risk level"
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="h-[580px] p-0 xl:col-span-2" testId="gis-map-card">
          <MapContainer center={[22.6, 79.6]} zoom={5} scrollWheelZoom className="h-full w-full rounded-2xl" data-testid="gis-map">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {PROJECTS.map((p) => (
              <CircleMarker
                key={p.id}
                center={p.coords}
                radius={6 + p.riskScore / 10}
                pathOptions={{ color: "#fff", weight: 1.5, fillColor: RISK_COLORS[p.risk], fillOpacity: 0.85 }}
              >
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <strong>{p.name}</strong>
                    <br />
                    {p.id} · Risk score {p.riskScore}
                    <br />
                    <a href={`/projects/${p.id}`} style={{ color: "#0B3D91", fontWeight: 700 }}>
                      Open project →
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </Card>

        <div className="space-y-4">
          <Card title="Risk Legend" sub="Marker size scales with risk score. Click any marker for project intelligence." testId="gis-legend">
            <div className="space-y-3">
              {COUNTS.map((c) => (
                <div key={c.risk} className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                    <span className="h-3.5 w-3.5 rounded-full" style={{ background: RISK_COLORS[c.risk] }} />
                    {c.risk.charAt(0).toUpperCase() + c.risk.slice(1)} Risk
                  </span>
                  <span className="font-display text-sm font-extrabold text-slate-900">{c.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Highest Risk Sites" sub="Critical-risk projects flagged by the prediction engine" testId="gis-highest-risk">
            <div className="space-y-2">
              {HIGHEST.map((p, i) => (
                <button
                  key={p.id}
                  data-testid={`gis-site-${p.id}`}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-3 text-left transition-all hover:border-[#0B3D91]/30 hover:bg-[#0B3D91]/5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">{p.name}</p>
                    <p className="text-xs font-semibold text-slate-400">{p.id}</p>
                  </div>
                  <RiskBadge level={p.risk} />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
