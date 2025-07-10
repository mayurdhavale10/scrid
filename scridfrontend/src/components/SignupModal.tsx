"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";

export default function SignupModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignupOpen, setSignupOpen, setLoginOpen } = useModal();

  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [previousPath, setPreviousPath] = useState("/");

  useEffect(() => {
    if (isSignupOpen) {
      setPreviousPath(pathname); // Save current page path when modal opens
    }
  }, [isSignupOpen, pathname]);

  if (!isSignupOpen) return null;

  const sendOtp = async () => {
    setError("");
    setSuccess("");

    if (!identifier.trim()) {
      setError("Please enter email or phone first.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setSuccess("OTP sent successfully!");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Could not connect to the server.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !identifier || !password || !otp) {
      setError("All fields are required.");
      return;
    }

    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.trim(),
        identifier: identifier.trim(),
        password,
        otp,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Signup successful!");
      setSignupOpen(false);
      router.push(previousPath || "/dashboard"); // ✅ Redirect back to where user was
    } else {
      setError(data.error || "Signup failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={() => setSignupOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Scrid Logo" width={40} height={40} />
          <h2 className="text-2xl font-bold mt-3">Create Your Account</h2>
          <p className="text-gray-500 text-sm">Sign up to start recycling smart</p>
        </div>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:ring"
            required
          />

          <input
            type="text"
            placeholder="Email or Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:ring"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:ring"
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:ring"
            required
          />

          <button
            type="button"
            onClick={sendOtp}
            className="w-full bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded border"
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <button
            onClick={() => {
              setSignupOpen(false);
              setLoginOpen(true);
            }}
            className="text-green-700 ml-1 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
