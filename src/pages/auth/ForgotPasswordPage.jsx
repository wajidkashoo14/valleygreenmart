import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Leaf,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import AuthField from "../../components/auth/AuthField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [step, setStep] = useState("email"); // 'email' | 'sent'
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const validate = () => {
    if (!email.trim()) {
      setEmailErr("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setEmailErr("");
    if (!validate()) return;
    const ok = await forgotPassword(email.trim());
    if (ok) setStep("sent");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 justify-center mb-8 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Leaf size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-green-900 leading-tight">
              Valley Green Mart
            </div>
            <div className="text-[9px] text-green-500 uppercase tracking-widest">
              Srinagar · Kashmir
            </div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.10)] border border-green-100 overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-green-100">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              animate={{ width: step === "sent" ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="p-7 sm:p-8">
            <AnimatePresence mode="wait">
              {/* ── Step 1: Enter email ─────────────────────────────── */}
              {step === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                    <Mail size={22} className="text-green-700" />
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    Forgot password?
                  </h1>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Enter your registered email and we'll send you a link to
                    reset your password.
                  </p>

                  {/* Server error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 overflow-hidden"
                      >
                        <AlertCircle size={15} className="flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <AuthField
                      ref={emailRef}
                      label="Email Address"
                      icon={<Mail size={15} />}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailErr("");
                        clearError();
                      }}
                      error={emailErr}
                      autoComplete="email"
                    />

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg"
                    >
                      {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Reset Link <ArrowRight size={15} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 2: Sent confirmation ───────────────────────── */}
              {step === "sent" && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 14,
                      delay: 0.1,
                    }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5"
                  >
                    <CheckCircle size={40} className="text-green-600" />
                  </motion.div>

                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    Check your inbox!
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-1 max-w-xs">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-semibold text-green-800 text-sm mb-6 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                    {email}
                  </p>

                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left mb-6 w-full">
                    <p className="text-xs font-bold text-amber-700 mb-2">
                      📌 What to do next
                    </p>
                    <ol className="text-xs text-amber-700 space-y-1.5 list-decimal list-inside leading-relaxed">
                      <li>Open the email from Valley Green Mart</li>
                      <li>
                        Click <strong>"Reset password"</strong> in the email
                      </li>
                      <li>Choose a new password on the page that opens</li>
                      <li>Come back here and sign in with your new password</li>
                    </ol>
                  </div>

                  <button
                    onClick={handleSubmit.bind(null, {
                      preventDefault: () => {},
                    })}
                    disabled={isLoading}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors mb-5 disabled:opacity-50"
                  >
                    Didn't receive it?{" "}
                    <span className="text-green-700 font-semibold underline">
                      Resend link
                    </span>
                  </button>

                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg w-full"
                  >
                    Back to Sign In <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Back link — only on email step */}
        {step === "email" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-sm text-gray-500 mt-5"
          >
            <Link
              to="/login"
              className="text-green-700 font-semibold hover:text-green-900 transition-colors flex items-center gap-1 justify-center"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </motion.p>
        )}
      </div>
    </div>
  );
}
