import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Landmark, TrendingUp, Map, Sparkles, ShieldCheck } from "lucide-react";
import { PageBackdrop } from "@/components/PageBackdrop";

const EASE = [0.22, 1, 0.36, 1];

const FEATURES = [
  { icon: TrendingUp, title: "Predictive Delay Risk", desc: "ML-powered early warning for every acquisition project" },
  { icon: Map, title: "Geospatial Intelligence", desc: "District-wise risk mapping across the portfolio" },
  { icon: Sparkles, title: "Claude AI Assistant", desc: "Ask questions and get actionable recommendations" },
];

const MARQUEE_ITEMS = [
  "Predictive Delay Risk",
  "Geospatial Intelligence",
  "Explainable AI",
  "Blockchain Audit Trail",
  "Government-Grade Security",
];

function MaskedLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-200/60">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-blue-300/40" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-3.5" data-testid="hero-marquee">
      <div className="animate-lg-marquee flex w-max">
        {row}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {row.props.children}
        </div>
      </div>
    </div>
  );
}

export function AuthLayout({ children }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const glowX = useTransform(sx, (v) => v * 46);
  const glowY = useTransform(sy, (v) => v * 46);
  const gridX = useTransform(sx, (v) => v * -18);
  const gridY = useTransform(sy, (v) => v * -18);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <motion.div
        onMouseMove={onMouseMove}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="lg-noise relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0C3E93] via-[#0A3175] to-[#06255C] lg:flex"
        data-testid="auth-hero"
      >
        <motion.div style={{ x: gridX, y: gridY }} className="bg-dot-grid absolute -inset-10" />
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#3B82F6]/25 blur-[120px]"
        />
        <motion.div
          style={{ x: glowY, y: glowX }}
          className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#60A5FA]/15 blur-[100px]"
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="flex items-center gap-3"
          >
            <div className="rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-sm">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-tight text-white">LandGuard AI</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/70">
                Acquisition Intelligence
              </p>
            </div>
          </motion.div>

          <div className="max-w-lg">
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-white xl:text-[3.4rem]" data-testid="hero-heading">
              <MaskedLine delay={0.55}>Detect land-acquisition delays</MaskedLine>
              <MaskedLine delay={0.7}>before they happen.</MaskedLine>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
              className="mt-6 text-base leading-relaxed text-blue-100/80"
            >
              A predictive analytics command centre for government infrastructure
              projects — powered by machine learning and explainable AI.
            </motion.p>

            <div className="mt-12 space-y-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1.1 + i * 0.15, ease: EASE }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4"
                  data-testid={`hero-feature-${i + 1}`}
                >
                  <div className="rounded-lg border border-white/15 bg-white/10 p-2.5 backdrop-blur-sm">
                    <f.icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{f.title}</p>
                    <p className="mt-0.5 text-sm text-blue-200/70">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="-mx-12 xl:-mx-16"
          >
            <Marquee />
            <div className="mt-6 flex items-center gap-2.5 px-12 text-blue-200/60 xl:px-16">
              <ShieldCheck className="h-4 w-4" />
              <p className="text-xs font-medium">
                Blockchain-verified audit trail · Government-grade security
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-6 py-12">
        <PageBackdrop className="absolute" strong />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="rounded-xl bg-[#0B3D91] p-2.5">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-tight text-slate-900">LandGuard AI</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Acquisition Intelligence
              </p>
            </div>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
