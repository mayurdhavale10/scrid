"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <Image
            src="/logo.png"
            alt="Scrid Logo"
            width={100}
            height={50}
            className="mb-4"
          />
          <h3 className="text-lg font-bold mb-2">Scrid</h3>
          <p className="text-sm text-gray-300">
            Making recycling rewarding for everyone while saving our planet.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">How It Works</Link></li>
            <li><Link href="#">Rewards</Link></li>
            <li><Link href="#">Partners</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">📍 Kalyan, India</p>
          <p className="text-sm text-gray-300">✉️ helloscrid@gmail.com</p>
          <p className="text-sm text-gray-300">📞 +91 93726 52742</p>
        </div>

        {/* Newsletter */}
        <div className="bg-green-100 p-4 rounded-md">
          <h4 className="font-semibold text-gray-800 mb-2">Newsletter</h4>
          <p className="text-sm text-gray-700 mb-3">
            Stay updated with our latest news and offers.
          </p>
          <form className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm text-gray-800 bg-white rounded-l focus:outline-none"
            />
            <button className="px-4 py-2 bg-green-700 text-white text-sm rounded-r hover:bg-green-800">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center gap-6 text-white text-2xl">
        <span title="Instagram">📷</span>
        <span title="LinkedIn">💼</span>
        <span title="Twitter">🐦</span>
        <span title="Facebook">📘</span>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © 2025 Scrid. All rights reserved.
      </div>
    </footer>
  );
}
