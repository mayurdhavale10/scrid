"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { 
  LuInstagram, 
  LuLinkedin, 
  LuSend, 
  LuTwitter, 
  LuFacebook,
  LuMapPin,
  LuMail,
  LuPhone
} from "react-icons/lu";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Social links data
  const socialLinks = [
    { 
      href: "https://www.instagram.com/scrid_official", 
      icon: <LuInstagram className="w-6 h-6" style={{ color: "#E1306C" }} />,
      label: "Instagram" 
    },
    { 
      href: "https://www.linkedin.com/in/hello-scrid-261288370", 
      icon: <LuLinkedin className="w-6 h-6" style={{ color: "#0077B5" }} />,
      label: "LinkedIn" 
    },
    { 
      href: "#", 
      icon: <LuSend className="w-6 h-6" style={{ color: "#0088CC" }} />,
      label: "Telegram" 
    },
    { 
      href: "#", 
      icon: <LuTwitter className="w-6 h-6" style={{ color: "#1DA1F2" }} />,
      label: "Twitter" 
    },
    { 
      href: "#", 
      icon: <LuFacebook className="w-6 h-6" style={{ color: "#1877F2" }} />,
      label: "Facebook" 
    }
  ];

  // Quick links data
  const quickLinks = [
    { href: "#", label: "About Us" },
    { href: "#", label: "How It Works" },
    { href: "#", label: "Rewards" },
    { href: "#", label: "Partners" },
  ];

  // Contact items data
  const contactItems = [
    {
      icon: <LuMapPin className="w-5 h-5 text-red-500"/>,
      text: "Kalyan, India"
    },
    {
      icon: <LuMail className="w-5 h-5 text-blue-500" />,
      text: "scridofficial@gmail.com"
    },
    {
      icon: <LuPhone className="w-5 h-5 text-green-500"/>,
      text: "+91 93726 52742"
    }
  ];

  return (
    <footer className="bg-gray-950 text-white mt-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-800">
        
        {/* Branding Section */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Scrid Logo" 
              width={200}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </div>
          <p className="text-gray-400 text-sm">
            Making recycling rewarding while protecting the planet.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8 text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-400">
                  <span className="shrink-0">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Stay Updated</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white text-sm rounded-r"
              >
                Subscribe
              </button>
            </div>
            {subscribed && (
              <p className="text-green-400 text-xs">Thank you for subscribing!</p>
            )}
          </form>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-gray-800">
        <div className="flex justify-center gap-8">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-400 w-10 h-10 flex items-center justify-center"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Scrid. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="text-gray-500">Privacy Policy</Link>
            <Link href="#" className="text-gray-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}