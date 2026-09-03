# LandGuard AI — PRD

## Original problem statement
Build a landing page matching https://builderfest-showcase-2.preview.emergentagent.com/login ("OPEN EXACT WHAT IS KEPT") — user confirmed: Login + Register + a basic dashboard after sign-in, visual-only auth (any credentials work), match the reference closely, elevated with award-worthy motion (framer-motion reveals, lenis smooth scroll, parallax hero, marquee).

## User personas
- Government infrastructure officer (demo: A. Sharma, Admin) monitoring land-acquisition delay risk
- Evaluator/reviewer clicking through a polished demo of the product

## Architecture
- Frontend-only experience: React 19 + react-router-dom 7, framer-motion (reveals, count-ups, parallax), lenis (momentum scroll), recharts (area/donut/bar), sonner toasts, Tailwind + Archivo/Manrope fonts
- Backend: FastAPI template untouched (only health endpoint used)
- Auth: visual only — localStorage session via src/lib/auth.js; no real accounts

## Routes
- `/` → redirects to /dashboard if signed in, else /login
- `/login` → split-screen hero + sign-in (any credentials work; demo autofill button)
- `/register` → same hero + create account form
- `/dashboard` → protected Command Dashboard (redirects to /login when signed out)

## Implemented (2026-07-03... actually Sept 2026 session)
- Split-screen auth layout: navy blueprint hero with dot-grid parallax, glow orbs, masked line-by-line heading reveal, slow editorial marquee, blockchain footer strip
- Login page: email/password with show-hide toggle, demo credentials autofill, loading state, toast
- Register page: full name / email / password, same design language
- Command Dashboard: navy sidebar (Overview / Intelligence / Governance + system status), topbar (search, Blockchain Verified pill, notifications, settings, logout, user chip), stat cards with count-up, risk chips (Low/Medium/High/Critical), Monthly Delay Probability area chart, Risk Distribution donut, District-wise Delay Trends bars, Top Delay Factors animated bars, faint aerial-photo backdrop
- Page transitions via AnimatePresence; Lenis smooth scrolling; data-testids on all interactive elements

## Verified
- Login → dashboard flow, register → dashboard flow, logout → /login redirect, protected route, backend /api health 200

## Backlog
- P0: none blocking
- P1: working sub-pages for sidebar items (Project Register, GIS Risk Map, Risk Analytics, AI Assistant chat)
- P1: real JWT auth + seeded admin if user wants persistence
- P2: AI Assistant chat panel (Claude via Emergent LLM key), What-If simulator, dark mode, mobile sidebar drawer
