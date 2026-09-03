import { HERO_IMAGE } from "@/lib/dashboardData";

export function PageBackdrop({ className = "fixed z-0", strong = false }) {
  return (
    <div className={`pointer-events-none inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          strong ? "from-white/90 via-white/85 to-white/95" : "from-white/80 via-white/75 to-white/90"
        }`}
      />
    </div>
  );
}
