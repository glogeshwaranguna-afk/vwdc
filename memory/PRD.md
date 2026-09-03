# LandGuard AI — PRD

## Original problem statement
Build a landing page matching the reference (builderfest-showcase-2 preview /login), then: add Claude AI Models integration (Claude Sonnet 4.6, Emergent Universal Key, chat panel + full page, dashboard-style background on all pages), then make the whole app work like the user's screen recording (all sidebar modules functional).

## User personas
- Government infrastructure officer (demo: A. Sharma, Admin) monitoring land-acquisition delay risk
- Evaluator/reviewer demoing the product end-to-end

## Architecture
- Frontend: React 19 + react-router-dom 7, framer-motion, lenis smooth scroll, recharts, react-leaflet + OSM tiles, react-markdown, sonner, Tailwind (Archivo/Manrope)
- Backend: FastAPI — /api/assistant/chat (SSE streaming via emergentintegrations, anthropic/claude-sonnet-4-6, per-session LlmChat cache, transcripts in Mongo assistant_messages), /api/assistant/history
- Auth: visual only — localStorage session (src/lib/auth.js)
- Data: MOCKED portfolio in src/lib/appData.js (18 projects, 10 districts) + src/lib/dashboardData.js; assistant system prompt mirrors the same data

## Routes (all protected except auth)
- /login, /register — split-screen hero + aerial-photo backdrop on form side
- /dashboard — stats, risk chips, monthly/donut/district charts, delay factors, Projects Requiring Immediate Action, Ask AI Assistant slide-over panel
- /projects — register table: filters (district/risk/stage), pagination 10/page, Export CSV, Add Project (toast), row → detail
- /projects/:id — overview grid, risk gauge, SHAP factors, approval workflow timeline, compensation snapshot
- /gis — react-leaflet India map, risk-scaled colored markers + popups, legend, highest-risk sites list
- /analytics — district bars, delay-factor radar, monthly area, planned-vs-actual completion
- /recommendations — P1–P4 cards, Accept/Assign/Mark Complete/Escalate with state + toasts
- /simulator — per-project via ?project=<id> (Run What-If passes the viewed project); 5 factor dropdowns pre-loaded from the project's real status → Run Prediction → current vs simulated risk, scale bar, delta pts + est delay
- /blockchain — network status cards + LA-517 audit trail with hashes
- /documents — drag&drop upload → real browser SHA-256 → verified result card
- /compensation — LA-1011 metrics, paid/pending donut, payout progress
- /approvals — LA-1007 pipeline visual + stage details table
- /alerts — 5 alerts, Open Project/Escalate/Assign/Mark read, Mark all read
- /assistant — full Claude chat page (suggested prompts, markdown rendering, disclaimer); also slide-over ChatPanel on dashboard
- Topbar: search, Blockchain Verified pill, bell → /alerts, profile dropdown (My Profile / Preferences / Sign out)

## Verified
Login/register/logout flows; every sidebar page loads; register filter+pagination; project detail navigation; simulator run; recommendation Accept; alert Assign (toast "Officer assigned. Case ID: A1 assigned."); Claude streaming chat via curl (SSE, data-grounded) and in UI with markdown; history persisted in Mongo; profile dropdown sign-out.

## Backlog
- P1: notifications dropdown from bell (currently links to /alerts); mark-read state could persist to backend
- P1: per-project simulator (currently fixed LA-1011) — pass project id from Run What-If
- P2: real JWT auth + per-user dashboards; real project CRUD for Add Project
- P2: searchable topbar (currently decorative); dark mode; mobile sidebar drawer
