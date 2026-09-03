export const STAGES = ["Notification", "Survey", "Verification", "Compensation", "R&R", "Possession", "Completed"];

export const RISK_COLORS = { low: "#10B981", medium: "#F59E0B", high: "#F97316", critical: "#EF4444" };

export const PROJECTS = [
  { id: "LA-1011", name: "Delhi-Mumbai Corridor Segment 14", district: "Pune", state: "Maharashtra", type: "Irrigation", stage: "Compensation", delayPct: 91, riskScore: 94, risk: "critical", compensation: "partial", legal: "dispute", approval: "in-progress", families: 590, landArea: 175.0, expected: "2025-11-15", coords: [18.52, 73.86], paidCr: 27.58, pendingCr: 22.57, beneficiaries: 590, pendingCases: 288, action: "Resolve pending compensation & escalate approval" },
  { id: "LA-1695", name: "Bhopal Industrial Corridor", district: "Bhopal", state: "Madhya Pradesh", type: "Industrial", stage: "Verification", delayPct: 88, riskScore: 91, risk: "critical", compensation: "pending", legal: "clear", approval: "pending", families: 412, landArea: 240.5, expected: "2026-02-10", coords: [23.26, 77.41], paidCr: 9.2, pendingCr: 31.4, beneficiaries: 412, pendingCases: 350, action: "Fast-track verification & release compensation" },
  { id: "LA-1083", name: "Jaipur Metro Line 2", district: "Jaipur", state: "Rajasthan", type: "Metro", stage: "Survey", delayPct: 84, riskScore: 87, risk: "critical", compensation: "pending", legal: "dispute", approval: "in-progress", families: 268, landArea: 42.3, expected: "2026-05-30", coords: [26.91, 75.79], paidCr: 12.1, pendingCr: 18.9, beneficiaries: 268, pendingCases: 201, action: "Clear legal dispute & complete survey" },
  { id: "LA-1018", name: "Coimbatore Metro Extension", district: "Chennai", state: "Tamil Nadu", type: "Metro", stage: "Compensation", delayPct: 82, riskScore: 87, risk: "critical", compensation: "partial", legal: "clear", approval: "pending", families: 330, landArea: 38.7, expected: "2026-03-18", coords: [11.02, 76.96], paidCr: 15.4, pendingCr: 12.6, beneficiaries: 330, pendingCases: 172, action: "Clear pending payouts & obtain final approval" },
  { id: "LA-1699", name: "Chennai Coastal Highway", district: "Chennai", state: "Tamil Nadu", type: "Highway", stage: "Compensation", delayPct: 81, riskScore: 86, risk: "critical", compensation: "pending", legal: "clear", approval: "in-progress", families: 455, landArea: 96.2, expected: "2026-01-25", coords: [13.08, 80.27], paidCr: 8.7, pendingCr: 24.3, beneficiaries: 455, pendingCases: 389, action: "Release beneficiary payouts stalled 21 days" },
  { id: "LA-1005", name: "Bhopal Industrial Corridor Phase 2", district: "Bhopal", state: "Madhya Pradesh", type: "Industrial", stage: "Compensation", delayPct: 80, riskScore: 85, risk: "critical", compensation: "pending", legal: "dispute", approval: "pending", families: 380, landArea: 132.8, expected: "2026-04-12", coords: [23.42, 77.6], paidCr: 6.1, pendingCr: 19.8, beneficiaries: 380, pendingCases: 341, action: "Unstall compensation & resolve dispute" },
  { id: "LA-1007", name: "Ahmedabad-Dholera Freight Line", district: "Ahmedabad", state: "Gujarat", type: "Freight Rail", stage: "R&R", delayPct: 72, riskScore: 78, risk: "high", compensation: "partial", legal: "clear", approval: "in-progress", families: 620, landArea: 210.4, expected: "2026-06-01", coords: [23.02, 72.57], paidCr: 41.2, pendingCr: 15.6, beneficiaries: 620, pendingCases: 180, action: "Complete R&R relocation schedule" },
  { id: "LA-1697", name: "Ahmedabad-Dholera Freight Line B", district: "Ahmedabad", state: "Gujarat", type: "Freight Rail", stage: "Notification", delayPct: 70, riskScore: 76, risk: "high", compensation: "pending", legal: "dispute", approval: "pending", families: 214, landArea: 88.1, expected: "2026-08-19", coords: [22.9, 72.45], paidCr: 0.0, pendingCr: 14.2, beneficiaries: 214, pendingCases: 214, action: "Mediate ownership dispute filed this week" },
  { id: "LA-1520", name: "Lucknow Ring Road East", district: "Lucknow", state: "Uttar Pradesh", type: "Highway", stage: "Survey", delayPct: 68, riskScore: 74, risk: "high", compensation: "partial", legal: "clear", approval: "in-progress", families: 350, landArea: 154.6, expected: "2026-07-08", coords: [26.85, 80.95], paidCr: 11.8, pendingCr: 9.4, beneficiaries: 350, pendingCases: 160, action: "Accelerate survey completion" },
  { id: "LA-1330", name: "Hyderabad Pharma City Link", district: "Hyderabad", state: "Telangana", type: "Industrial", stage: "Verification", delayPct: 66, riskScore: 72, risk: "high", compensation: "partial", legal: "clear", approval: "pending", families: 290, landArea: 301.9, expected: "2026-09-14", coords: [17.38, 78.49], paidCr: 18.3, pendingCr: 12.1, beneficiaries: 290, pendingCases: 121, action: "Push pending verification clearances" },
  { id: "LA-1402", name: "Nagpur Logistics Hub", district: "Nagpur", state: "Maharashtra", type: "Industrial", stage: "Compensation", delayPct: 65, riskScore: 71, risk: "high", compensation: "partial", legal: "clear", approval: "in-progress", families: 402, landArea: 188.3, expected: "2026-05-22", coords: [21.15, 79.09], paidCr: 22.6, pendingCr: 10.8, beneficiaries: 402, pendingCases: 144, action: "Clear remaining 144 payout cases" },
  { id: "LA-1250", name: "Patna Ganga Expressway Spur", district: "Patna", state: "Bihar", type: "Highway", stage: "R&R", delayPct: 58, riskScore: 62, risk: "medium", compensation: "partial", legal: "clear", approval: "approved", families: 510, landArea: 176.0, expected: "2026-10-30", coords: [25.59, 85.14], paidCr: 30.4, pendingCr: 7.2, beneficiaries: 510, pendingCases: 88, action: "Monitor R&R execution" },
  { id: "LA-1177", name: "Bengaluru Suburban Rail Corr. 2", district: "Bengaluru", state: "Karnataka", type: "Metro", stage: "Compensation", delayPct: 54, riskScore: 58, risk: "medium", compensation: "partial", legal: "clear", approval: "in-progress", families: 275, landArea: 64.5, expected: "2026-11-20", coords: [12.97, 77.59], paidCr: 19.9, pendingCr: 6.3, beneficiaries: 275, pendingCases: 74, action: "Track compensation disbursal" },
  { id: "LA-1905", name: "Pune Water Grid Phase 3", district: "Pune", state: "Maharashtra", type: "Irrigation", stage: "Possession", delayPct: 50, riskScore: 55, risk: "medium", compensation: "completed", legal: "clear", approval: "approved", families: 160, landArea: 92.4, expected: "2026-08-02", coords: [18.66, 73.98], paidCr: 12.4, pendingCr: 0.4, beneficiaries: 160, pendingCases: 6, action: "Complete possession handover" },
  { id: "LA-1610", name: "Jaipur Solar Park Evacuation Line", district: "Jaipur", state: "Rajasthan", type: "Power", stage: "Verification", delayPct: 48, riskScore: 52, risk: "medium", compensation: "partial", legal: "clear", approval: "in-progress", families: 120, landArea: 145.7, expected: "2026-12-15", coords: [27.02, 75.65], paidCr: 5.6, pendingCr: 3.1, beneficiaries: 120, pendingCases: 42, action: "Close verification with land records" },
  { id: "LA-3084", name: "Ganga Canal Modernization", district: "Lucknow", state: "Uttar Pradesh", type: "Irrigation", stage: "Notification", delayPct: 44, riskScore: 48, risk: "medium", compensation: "pending", legal: "clear", approval: "in-progress", families: 230, landArea: 118.2, expected: "2027-01-28", coords: [26.4, 80.5], paidCr: 0.0, pendingCr: 9.8, beneficiaries: 230, pendingCases: 230, action: "Admin approval due in 2 days — escalate" },
  { id: "LA-2010", name: "Bengaluru Airport Link Rd Widening", district: "Bengaluru", state: "Karnataka", type: "Highway", stage: "Possession", delayPct: 30, riskScore: 32, risk: "low", compensation: "completed", legal: "clear", approval: "approved", families: 95, landArea: 22.6, expected: "2026-07-25", coords: [13.2, 77.71], paidCr: 8.8, pendingCr: 0.2, beneficiaries: 95, pendingCases: 2, action: "On track — routine monitoring" },
  { id: "LA-2100", name: "Hyderabad ORR Service Road", district: "Hyderabad", state: "Telangana", type: "Highway", stage: "Completed", delayPct: 26, riskScore: 28, risk: "low", compensation: "completed", legal: "clear", approval: "approved", families: 60, landArea: 15.1, expected: "2026-06-30", coords: [17.24, 78.3], paidCr: 4.2, pendingCr: 0.0, beneficiaries: 60, pendingCases: 0, action: "Completed — archive records" },
];

export const ALERTS = [
  { id: 1, level: "critical", projectId: "LA-1011", text: "Project LA-1011 has 84% delay risk. Immediate intervention required on Delhi-Mumbai Corridor Segment 14.", time: "12 min ago" },
  { id: 2, level: "critical", projectId: "LA-1005", text: "Project LA-1005 crossed critical threshold. Bhopal Industrial Corridor Phase 2 compensation stalled.", time: "48 min ago" },
  { id: 3, level: "high", projectId: "LA-1699", text: "Compensation pending for 21 days. Chennai Coastal Highway beneficiary payouts delayed.", time: "2 hrs ago" },
  { id: 4, level: "medium", projectId: "LA-1697", text: "Legal dispute escalation. Ahmedabad-Dholera Freight Line ownership dispute filed.", time: "6 hrs ago" },
  { id: 5, level: "low", projectId: "LA-3084", text: "Approval approaching SLA limit. Ganga Canal Modernization admin approval due in 2 days.", time: "7 hrs ago" },
];

export const RECOMMENDATIONS = [
  { id: "P1", title: "Resolve pending compensation verification", detail: "Compensation pending for 342 families across LA-1011 and LA-1699", dept: "Revenue Department", impact: "-28 risk pts" },
  { id: "P2", title: "Fast-track collector approval for LA-1695", detail: "Approval pending 19 days at District Collectorate", dept: "District Collectorate", impact: "-19 risk pts" },
  { id: "P3", title: "Digitise incomplete land records", detail: "6 projects held back by incomplete documentation", dept: "Land Records", impact: "-12 risk pts" },
  { id: "P4", title: "Mediate ownership dispute on LA-1697", detail: "Legal dispute filed 6 days ago — early mediation advised", dept: "Legal Cell", impact: "-9 risk pts" },
];

export const SHAP_FACTORS = [
  { name: "Pending Compensation", value: 32 },
  { name: "Pending Approval", value: 25 },
  { name: "Legal Dispute", value: 18 },
  { name: "Incomplete Documentation", value: 11 },
  { name: "Slow Stakeholder Response", value: 6 },
  { name: "Weather/Terrain", value: 4 },
];

export const AUDIT_TRAIL = {
  projectId: "LA-517",
  projectName: "Delhi-Mumbai Corridor Segment 16",
  network: { status: "ONLINE", latestBlock: "#184,213", transactions: "92,847", verification: "Active" },
  events: [
    { title: "Project Created", date: "2025-02-14", time: "09:42 IST", actor: "System Admin", hash: "0x7f3a9c2e81b4f6d0a5c8e2b7d4f91a3c" },
    { title: "Document Uploaded", date: "2025-02-21", time: "14:05 IST", actor: "Local Records Officer", hash: "0x2b8d4f6a91c3e5b7d0a2c4f6e8b1d3a5" },
    { title: "Land Survey Completed", date: "2025-03-09", time: "11:27 IST", actor: "Survey Dept", hash: "0x9c1e3a5b7d9f2b4c6e8a0d2f4b6c8e1a" },
    { title: "Approval Submitted", date: "2025-04-02", time: "16:50 IST", actor: "Department Officer", hash: "0x4e6b8d0a2c4f6b8d1a3c5e7f9b2d4a6c" },
    { title: "Compensation Approved", date: "2025-05-18", time: "10:12 IST", actor: "Revenue Department", hash: "0x1d3f5a7c9e2b4d6f8a0c2e4b6d8f0a2c" },
  ],
};

export const PIPELINE_LA1007 = [
  { stage: "Notification", status: "completed", start: "2024-11-04", end: "2024-11-20", days: "—", dept: "Revenue" },
  { stage: "Survey", status: "completed", start: "2024-11-21", end: "2025-01-15", days: "—", dept: "Survey" },
  { stage: "Verification", status: "completed", start: "2025-01-16", end: "2025-03-02", days: "—", dept: "Land Records" },
  { stage: "Compensation", status: "completed", start: "2025-03-03", end: "2025-05-28", days: "—", dept: "Revenue" },
  { stage: "R&R", status: "in-progress", start: "2025-05-29", end: "—", days: "0.24d", dept: "P&R Cell" },
  { stage: "Possession", status: "pending", start: "—", end: "—", days: "—", dept: "District Office" },
  { stage: "Completed", status: "pending", start: "—", end: "—", days: "—", dept: "PMO" },
];

export const FACTOR_RADAR = [
  { factor: "Compensation", value: 85 },
  { factor: "Approval", value: 70 },
  { factor: "Legal", value: 55 },
  { factor: "Documentation", value: 48 },
  { factor: "Stakeholder", value: 35 },
];

export const COMPLETION_TIMELINE = [
  { quarter: "Q1", planned: 4, actual: 3 },
  { quarter: "Q2", planned: 5, actual: 4 },
  { quarter: "Q3", planned: 4, actual: 3 },
  { quarter: "Q4", planned: 5, actual: 2 },
];

export const SIMULATOR_CONFIG = {
  baseRisk: 87,
  baseDelayDays: 90,
  factors: [
    { key: "compensation", label: "Compensation", current: "Pending", options: ["Pending", "Partial", "Completed"], relief: { Pending: 0, Partial: 6, Completed: 12 } },
    { key: "approval", label: "Approval", current: "Pending", options: ["Pending", "In Progress", "Approved"], relief: { Pending: 0, "In Progress": 4, Approved: 9 } },
    { key: "legal", label: "Legal Dispute", current: "Yes", options: ["Yes", "No"], relief: { Yes: 0, No: 8 } },
    { key: "documentation", label: "Documentation", current: "Incomplete", options: ["Incomplete", "Partial", "Complete"], relief: { Incomplete: 0, Partial: 3, Complete: 6 } },
    { key: "stakeholder", label: "Stakeholder Response", current: "Slow", options: ["Slow", "Medium", "Fast"], relief: { Slow: 0, Medium: 3, Fast: 5 } },
  ],
};

export const projectById = (id) => PROJECTS.find((p) => p.id === id);
