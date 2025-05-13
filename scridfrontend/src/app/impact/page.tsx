"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 text-green-700 font-bold text-xl">
          <Link href="/">♻️ Scrid</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-green-700 transition">
            Home
          </Link>
          <Link href="/impact" className="text-gray-700 hover:text-green-700 transition">
            Impact
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-700 transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-700 transition">
            Contact
          </Link>

          {/* Auth Buttons */}
          {onLoginClick && (
            <button
              onClick={onLoginClick}
              className="text-sm text-gray-700 hover:text-green-700 transition"
            >
              Log In
            </button>
          )}
          {onSignupClick && (
            <button
              onClick={onSignupClick}
              className="bg-green-700 text-white text-sm px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg px-4 pt-4 pb-6 space-y-4">
          <Link
            href="/"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-green-700 transition"
          >
            Home
          </Link>
          <Link
            href="/impact"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-green-700 transition"
          >
            Impact
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-green-700 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-green-700 transition"
          >
            Contact
          </Link>

          {/* Auth Buttons for Mobile */}
          {onLoginClick && (
            <button
              onClick={() => {
                toggleMenu();
                onLoginClick();
              }}
              className="block w-full text-left text-sm text-gray-700 hover:text-green-700 transition"
            >
              Log In
            </button>
          )}
          {onSignupClick && (
            <button
              onClick={() => {
                toggleMenu();
                onSignupClick();
              }}
              className="block w-full text-left bg-green-700 text-white text-sm px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
