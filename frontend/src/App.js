import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import AssistantPage from "@/pages/AssistantPage";
import AlertsPage from "@/pages/AlertsPage";
import ProjectRegisterPage from "@/pages/ProjectRegisterPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import GisMapPage from "@/pages/GisMapPage";
import RiskAnalyticsPage from "@/pages/RiskAnalyticsPage";
import RecommendationsPage from "@/pages/RecommendationsPage";
import SimulatorPage from "@/pages/SimulatorPage";
import BlockchainPage from "@/pages/BlockchainPage";
import DocumentIntegrityPage from "@/pages/DocumentIntegrityPage";
import CompensationPage from "@/pages/CompensationPage";
import ApprovalTrackingPage from "@/pages/ApprovalTrackingPage";
import { getSession } from "@/lib/auth";

function RequireAuth({ children }) {
  return getSession() ? children : <Navigate to="/login" replace />;
}

function RootRedirect() {
  return <Navigate to={getSession() ? "/dashboard" : "/login"} replace />;
}

function PageShell({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<PageShell><LoginPage /></PageShell>} />
        <Route path="/register" element={<PageShell><RegisterPage /></PageShell>} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <PageShell>
                <DashboardPage />
              </PageShell>
            </RequireAuth>
          }
        />
        <Route
          path="/assistant"
          element={
            <RequireAuth>
              <PageShell>
                <AssistantPage />
              </PageShell>
            </RequireAuth>
          }
        />
        <Route path="/alerts" element={<RequireAuth><PageShell><AlertsPage /></PageShell></RequireAuth>} />
        <Route path="/projects" element={<RequireAuth><PageShell><ProjectRegisterPage /></PageShell></RequireAuth>} />
        <Route path="/projects/:id" element={<RequireAuth><PageShell><ProjectDetailPage /></PageShell></RequireAuth>} />
        <Route path="/gis" element={<RequireAuth><PageShell><GisMapPage /></PageShell></RequireAuth>} />
        <Route path="/analytics" element={<RequireAuth><PageShell><RiskAnalyticsPage /></PageShell></RequireAuth>} />
        <Route path="/recommendations" element={<RequireAuth><PageShell><RecommendationsPage /></PageShell></RequireAuth>} />
        <Route path="/simulator" element={<RequireAuth><PageShell><SimulatorPage /></PageShell></RequireAuth>} />
        <Route path="/blockchain" element={<RequireAuth><PageShell><BlockchainPage /></PageShell></RequireAuth>} />
        <Route path="/documents" element={<RequireAuth><PageShell><DocumentIntegrityPage /></PageShell></RequireAuth>} />
        <Route path="/compensation" element={<RequireAuth><PageShell><CompensationPage /></PageShell></RequireAuth>} />
        <Route path="/approvals" element={<RequireAuth><PageShell><ApprovalTrackingPage /></PageShell></RequireAuth>} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
