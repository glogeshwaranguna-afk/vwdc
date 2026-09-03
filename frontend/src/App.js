import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
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
