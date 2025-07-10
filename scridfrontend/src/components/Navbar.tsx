"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Get current path
import { useModal } from "@/context/ModalContext";

export default function Navbar() {
  const pathname = usePathname(); // ✅ Get current route
  const { setLoginOpen, setSignupOpen } = useModal();

  // Links for navbar
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/webapp/scan-scrap", label: "Scan Scrap" },
    { href: "/webapp/schedule-pickup", label: "Schedule Pickup" },
    { href: "/webapp/rewards", label: "Rewards" },
    { href: "/webapp/impact", label: "Impact" },
    { href: "/webapp/partners", label: "Partners" },
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 h-[100px]">
      <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Scrid Logo"
            width={120}
            height={40}
            priority
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Nav + Auth Buttons */}
        <div className="flex items-center space-x-6">
          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-green-600 transition ${
                  pathname === href ? "text-green-700 font-medium" : "text-gray-800"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLoginOpen(true)}
              className="px-4 py-2 text-sm border border-green-700 text-green-700 rounded hover:bg-green-50 transition"
            >
              Login
            </button>
            <button
              onClick={() => setSignupOpen(true)}
              className="px-4 py-2 text-sm bg-green-700 text-white rounded hover:bg-green-800 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
