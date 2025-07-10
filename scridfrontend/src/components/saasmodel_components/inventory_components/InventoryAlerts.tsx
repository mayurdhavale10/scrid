"use client";

import { useEffect, useState } from "react";

interface InventoryItem {
  name: string;
  quantity: number;
  threshold: number;
}

export default function InventoryAlerts() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // Simulate API fetch for inventory items
    const mockData: InventoryItem[] = [
      { name: "Copper Scrap", quantity: 180, threshold: 200 },
      { name: "PET Bottles", quantity: 500, threshold: 300 },
      { name: "Lubricant Oil", quantity: 15, threshold: 50 },
      { name: "Crushed PCB", quantity: 620, threshold: 500 },
    ];
    setItems(mockData);
  }, []);

  const lowStockItems = items.filter((item) => item.quantity < item.threshold);

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">
        ⚠️ Low Stock Alerts
      </h2>

      {lowStockItems.length === 0 ? (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          ✅ All items are above their minimum thresholds.
        </p>
      ) : (
        <ul className="space-y-2">
          {lowStockItems.map((item, idx) => (
            <li
              key={idx}
              className="p-3 border-l-4 border-red-600 bg-red-50 dark:bg-red-950 text-sm text-red-800 dark:text-red-300 rounded-md"
            >
              {item.name} is below threshold: {item.quantity} units (Min: {item.threshold})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
