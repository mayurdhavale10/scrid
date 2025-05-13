"use client";

import { useState } from "react";
import Image from "next/image";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void; // ✅ Add this prop for switching to Signup
}

export default function LoginModal({ isOpen, onClose, onSwitch }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
    // Add login logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Scrid Logo" width={40} height={40} />
          <h2 className="text-2xl font-bold mt-3">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1 focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded pr-10 mt-1 focus:ring focus:ring-green-300"
              />
              <span
                className="absolute right-3 top-2.5 text-sm cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <button
            onClick={onSwitch}
            className="text-green-700 ml-1 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
