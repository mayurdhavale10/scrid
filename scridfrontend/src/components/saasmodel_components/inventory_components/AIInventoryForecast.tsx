"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";

interface ForecastItem {
  name: string;
  currentStock: number;
  dailyUsage: number;
  confidence: number; // percentage
}

const mockForecast: ForecastItem[] = [
  { name: "Copper Scrap", currentStock: 1200, dailyUsage: 75, confidence: 92 },
  { name: "PET Flakes", currentStock: 900, dailyUsage: 40, confidence: 88 },
  { name: "Steel Shards", currentStock: 500, dailyUsage: 65, confidence: 94 },
  { name: "Plastic Crumbs", currentStock: 400, dailyUsage: 25, confidence: 91 },
];

export default function AIInventoryForecast() {
  const forecast = useMemo(() => {
    return mockForecast.map((item) => {
      const daysRemaining = Math.floor(item.currentStock / item.dailyUsage);
      const reorderQuantity = item.dailyUsage * 30;
      return { ...item, daysRemaining, reorderQuantity };
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-green-500" /> AI Inventory Forecast
      </h2>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-gray-600 dark:text-gray-300">
          <tr>
            <th className="border-b py-2">Item</th>
            <th className="border-b py-2">Stock Left</th>
            <th className="border-b py-2">Daily Usage</th>
            <th className="border-b py-2">Est. Days Left</th>
            <th className="border-b py-2">Suggested Reorder</th>
            <th className="border-b py-2">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((item, idx) => (
            <tr key={idx} className="text-gray-800 dark:text-gray-200">
              <td className="border-b py-2">{item.name}</td>
              <td className="border-b py-2">{item.currentStock}</td>
              <td className="border-b py-2">{item.dailyUsage}/day</td>
              <td className="border-b py-2">
                {item.daysRemaining} day{item.daysRemaining !== 1 ? "s" : ""}
              </td>
              <td className="border-b py-2">{item.reorderQuantity}</td>
              <td
                className={`border-b py-2 font-medium ${
                  item.confidence > 90 ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {item.confidence}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
