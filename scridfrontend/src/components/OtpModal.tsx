"use client";

import { useState } from "react";
import Image from "next/image";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OtpModal({ isOpen, onClose }: OtpModalProps) {
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!identifier.trim()) {
      setError("Please enter email or phone");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to send OTP");
      } else {
        setStep("verify");
        setSuccess("OTP sent successfully");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!code.trim()) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), code: code.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          onClose();
          setIdentifier("");
          setCode("");
          setStep("enter");
        }, 1000);
      } else {
        setError(data.error || "OTP verification failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative animate-fade-in">
        <button
          onClick={() => {
            onClose();
            setIdentifier("");
            setCode("");
            setStep("enter");
            setError("");
            setSuccess("");
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Scrid Logo" width={40} height={40} />
          <h2 className="text-2xl font-bold mt-3">
            {step === "enter" ? "Get Your OTP" : "Verify OTP"}
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          {step === "enter" && (
            <>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or Phone"
                className="w-full border px-4 py-2 rounded focus:ring focus:ring-green-300"
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
              >
                Send OTP
              </button>
            </>
          )}

          {step === "verify" && (
            <>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 4-digit code"
                className="w-full border px-4 py-2 rounded focus:ring focus:ring-green-300"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
              >
                Verify OTP
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
        </div>

        {step === "verify" && (
          <p className="mt-4 text-sm text-center text-gray-600">
            Didn't get the code?{" "}
            <button
              onClick={handleSendOtp}
              className="text-green-700 hover:underline font-medium"
            >
              Resend
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
