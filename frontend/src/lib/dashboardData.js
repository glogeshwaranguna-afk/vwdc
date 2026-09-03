export const STATS = [
  { id: "total", label: "TOTAL PROJECTS", value: 18, suffix: "", sub: "Across 10 districts", icon: "folder", tint: "blue" },
  { id: "at-risk", label: "PROJECTS AT RISK", value: 11, suffix: "", sub: "+3 this week", icon: "shield", tint: "amber", alert: true },
  { id: "avg-delay", label: "AVG DELAY PROBABILITY", value: 56, suffix: "%", sub: "Weighted mean", icon: "trend", tint: "sky" },
  { id: "immediate", label: "IMMEDIATE ACTION", value: 6, suffix: "", sub: "Critical projects", icon: "zap", tint: "red" },
];

export const RISK_CHIPS = [
  { id: "low", label: "LOW RISK", value: 2, classes: "bg-emerald-50 border-emerald-200 text-emerald-900", badge: "bg-emerald-500" },
  { id: "medium", label: "MEDIUM RISK", value: 5, classes: "bg-amber-50 border-amber-200 text-amber-900", badge: "bg-amber-500" },
  { id: "high", label: "HIGH RISK", value: 5, classes: "bg-orange-50 border-orange-200 text-orange-900", badge: "bg-orange-500" },
  { id: "critical", label: "CRITICAL RISK", value: 6, classes: "bg-red-50 border-red-200 text-red-900", badge: "bg-red-500" },
];

export const MONTHLY_DELAY = [
  { month: "Feb", risk: 40 },
  { month: "Mar", risk: 48 },
  { month: "Apr", risk: 55 },
  { month: "May", risk: 53 },
  { month: "Jun", risk: 61 },
  { month: "Jul", risk: 58 },
  { month: "Aug", risk: 68 },
  { month: "Sep", risk: 73 },
];

export const RISK_DISTRIBUTION = [
  { name: "Critical", value: 6, color: "#EF4444" },
  { name: "High", value: 5, color: "#F97316" },
  { name: "Low", value: 2, color: "#10B981" },
  { name: "Medium", value: 5, color: "#F59E0B" },
];

export const DISTRICT_TRENDS = [
  { district: "Pune", risk: 58, color: "#F59E0B" },
  { district: "Nashik", risk: 34, color: "#10B981" },
  { district: "Nagpur", risk: 72, color: "#EF4444" },
  { district: "Thane", risk: 35, color: "#10B981" },
  { district: "Sambhajinagar", risk: 90, color: "#EF4444" },
  { district: "Solapur", risk: 33, color: "#10B981" },
  { district: "Kolhapur", risk: 65, color: "#F97316" },
  { district: "Satara", risk: 55, color: "#F59E0B" },
];

export const DELAY_FACTORS = [
  { id: "compensation", label: "Pending Compensation", count: 12, pct: 100 },
  { id: "approval", label: "Pending Approval", count: 9, pct: 75 },
  { id: "legal", label: "Legal Dispute", count: 7, pct: 58 },
  { id: "docs", label: "Incomplete Docs", count: 6, pct: 50 },
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=60&auto=format&fit=crop";
