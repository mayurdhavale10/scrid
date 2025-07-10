"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Sun, Bell, ChevronDown } from "lucide-react";

const factories = ["Alpha Factory", "Beta Facility", "Gamma Processing"];

export default function Header() {
  const [selectedFactory, setSelectedFactory] = useState(factories[0]);
  const [isFactoryOpen, setIsFactoryOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [time, setTime] = useState("--:--");
  const [date, setDate] = useState("--");

  useEffect(() => {
    const now = new Date();
    setDate(
      now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", !isDark);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1A2E2E] border-b border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-between px-6 z-50">
      {/* LEFT: Logo (aligned with Sidebar width) */}
      <div className="w-64 flex items-center gap-3">
        <Image
          src="/scrid_saas_logo.webp"
          alt="Scrid Logo"
          width={130}
          height={130}
          className="rounded-sm"
        />
      </div>

      {/* CENTER: Factory Dropdown + Info */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-visible">
        <div className="flex items-center gap-4 flex-wrap justify-center text-sm text-gray-700 dark:text-gray-300">
          {/* Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setIsFactoryOpen(!isFactoryOpen)}
              className="flex items-center font-semibold text-gray-800 dark:text-white"
            >
              {selectedFactory}
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {isFactoryOpen && (
              <ul className="absolute left-0 mt-2 bg-white dark:bg-[#1A2E2E] border border-gray-200 dark:border-white/10 rounded shadow z-50 w-44">
                {factories.map((factory) => (
                  <li key={factory}>
                    <button
                      onClick={() => {
                        setSelectedFactory(factory);
                        setIsFactoryOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#164C3A] dark:text-white"
                    >
                      {factory}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date */}
          <div className="hidden sm:flex items-center gap-1">
            📅 <span>{date}</span>
          </div>

          {/* Time */}
          <div className="hidden sm:flex items-center gap-1">
            ⏱ <span>{time}</span>
          </div>

          {/* Alert */}
          <span className="text-green-600 dark:text-green-400 font-medium truncate max-w-[300px] sm:max-w-xs">
            ⚠️ Important: Shredder #2 blade inspection pending!
          </span>
        </div>
      </div>

      {/* RIGHT: Theme + Bell + Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#2C3E3E]"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#2C3E3E]"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-white flex items-center justify-center font-bold text-sm shadow cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
}

