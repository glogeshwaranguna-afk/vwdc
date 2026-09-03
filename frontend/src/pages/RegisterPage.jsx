import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { signIn } from "@/lib/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const em = email.trim() || "officer@department.gov.in";
    const nm = name.trim();
    setLoading(true);
    setTimeout(() => {
      signIn({ email: em, name: nm || undefined });
      toast.success("Account created — welcome to LandGuard AI");
      navigate("/dashboard");
    }, 750);
  };

  const field =
    "w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0B3D91] focus:ring-4 focus:ring-[#0B3D91]/10";
  const icon =
    "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0B3D91]";

  return (
    <AuthLayout>
      <div data-testid="register-form">
        <h2 className="font-display text-2xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-1.5 text-sm text-slate-500">Register to access the acquisition intelligence dashboard</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="register-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Full name
            </label>
            <div className="group relative">
              <User className={icon} />
              <input
                id="register-name"
                data-testid="register-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="A. Sharma"
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Email address
            </label>
            <div className="group relative">
              <Mail className={icon} />
              <input
                id="register-email"
                data-testid="register-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@department.gov.in"
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="group relative">
              <Lock className={icon} />
              <input
                id="register-password"
                data-testid="register-password-input"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className={`${field} pr-11`}
              />
              <button
                type="button"
                data-testid="register-password-toggle"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            data-testid="register-submit-btn"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: loading ? 1 : 0.985 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3D91] py-3 text-sm font-bold text-white shadow-lg shadow-[#0B3D91]/25 transition-colors hover:bg-[#09337A] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            data-testid="register-signin-link"
            className="font-bold text-slate-900 underline-offset-4 transition-colors hover:text-[#0B3D91] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
