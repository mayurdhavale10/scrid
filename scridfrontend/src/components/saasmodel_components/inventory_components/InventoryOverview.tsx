"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface InventoryCategory {
  name: string;
  current: number;
  capacity: number;
  unit: string;
  threshold: number;
  icon: string;
}

const mockData: InventoryCategory[] = [
  {
    name: "Raw Materials",
    current: 1200,
    capacity: 2000,
    unit: "kg",
    threshold: 500,
    icon: "🪵",
  },
  {
    name: "WIP - Crushed PCB",
    current: 650,
    capacity: 1000,
    unit: "kg",
    threshold: 300,
    icon: "⚙️",
  },
  {
    name: "Finished Goods",
    current: 480,
    capacity: 600,
    unit: "kg",
    threshold: 200,
    icon: "📦",
  },
  {
    name: "Consumables",
    current: 80,
    capacity: 300,
    unit: "liters",
    threshold: 100,
    icon: "🛢️",
  },
];

export default function InventoryOverview() {
  const [inventory, setInventory] = useState<InventoryCategory[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setInventory(mockData); // Simulate API call
    }, 500);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {inventory.map((item) => {
        const percentage = Math.round((item.current / item.capacity) * 100);
        const isLow = item.current < item.threshold;

        return (
          <div
            key={item.name}
            className="relative p-4 rounded-2xl glass-effect shadow-lg backdrop-blur-md transition-transform transform hover:scale-[1.01] dark:border dark:border-emerald-900"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold text-emerald-700 dark:text-emerald-300">
                {item.icon} {item.name}
              </h3>
              {isLow && (
                <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded-full">
                  ⚠️ Reorder Soon
                </span>
              )}
            </div>

            {/* Progress Circle */}
            <div className="relative w-20 h-20 mx-auto my-2">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  className="text-gray-300"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                />
                <circle
                  className={cn(
                    "transition-all duration-500 ease-in-out",
                    isLow ? "text-red-500" : "text-green-600"
                  )}
                  strokeWidth="8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                  strokeDasharray="188.4"
                  strokeDashoffset={188.4 - (188.4 * percentage) / 100}
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-white">
                {percentage}%
              </div>
            </div>

            <div className="text-center mt-2 text-sm text-gray-700 dark:text-gray-300">
              {item.current} / {item.capacity} {item.unit}
            </div>

            {isLow && (
              <button className="mt-3 w-full text-xs bg-red-500 text-white py-1.5 rounded-xl hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition">
                Reorder Now
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
