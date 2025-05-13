"use client";

import { useState } from "react";
import Image from "next/image";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void; // ✅ Switch to login
}

export default function SignupModal({ isOpen, onClose, onSwitch }: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { name, email, password });
    // Add signup logic here
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
          <h2 className="text-2xl font-bold mt-3">Create Your Account</h2>
          <p className="text-gray-500 text-sm">Sign up to start recycling smart</p>
        </div>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1 focus:ring focus:ring-green-300"
            />
          </div>

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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mt-1 focus:ring focus:ring-green-300"
            />
          </div>

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
            onClick={onSwitch}
            className="text-green-700 ml-1 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
