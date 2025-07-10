"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

export default function LoginModal() {
  const router = useRouter();
  const { isLoginOpen, setLoginOpen, setSignupOpen } = useModal();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [forgotMode, setForgotMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [msg, setMsg] = useState("");

  if (!isLoginOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
        setLoginOpen(false);
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (step === "request") {
      const res = await fetch("http://localhost:8080/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("verify");
        setMsg("OTP sent. Check your email or phone.");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } else if (step === "verify") {
      const res = await fetch("http://localhost:8080/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code: otp, newPassword })

      });
      const data = await res.json();
      if (res.ok) {
        setLoginOpen(false);
        setForgotMode(false);
        alert("✅ Password updated. You can now log in.");
      } else {
        setError(data.error || "Failed to reset password");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative animate-fade-in">
        <button
          onClick={() => {
            setLoginOpen(false);
            setForgotMode(false);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Scrid Logo" width={40} height={40} />
          <h2 className="text-2xl font-bold mt-3">
            {forgotMode ? "Reset Password" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-sm">
            {forgotMode ? "Enter details to reset your password" : "Login to your account"}
          </p>
        </div>

        {forgotMode ? (
          <form onSubmit={handleForgot} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded focus:ring"
            />

            {step === "verify" && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded focus:ring"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded focus:ring"
                />
              </>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {msg && <p className="text-green-600 text-sm">{msg}</p>}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
            >
              {step === "request" ? "Send OTP" : "Reset Password"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded focus:ring"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded pr-10 focus:ring"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
            >
              Log In
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          {forgotMode ? (
            <button
              onClick={() => {
                setForgotMode(false);
                setStep("request");
              }}
              className="text-green-700 hover:underline"
            >
              ← Back to login
            </button>
          ) : (
            <>
              <button
                onClick={() => setForgotMode(true)}
                className="text-green-700 hover:underline"
              >
                Forgot Password?
              </button>
              <br />
              Don't have an account?
              <button
                onClick={() => {
                  setLoginOpen(false);
                  setSignupOpen(true);
                }}
                className="text-green-700 ml-1 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
