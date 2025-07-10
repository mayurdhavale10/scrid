"use client";

import { useMemo } from "react";

interface InventoryItem {
  name: string;
  quantity: number;
  unitCost: number;
}

const mockInventory: InventoryItem[] = [
  { name: "Copper Scrap", quantity: 1200, unitCost: 75 },
  { name: "PET Flakes", quantity: 950, unitCost: 42 },
  { name: "Steel Shards", quantity: 700, unitCost: 58 },
  { name: "Plastic Crumbs", quantity: 400, unitCost: 33 },
];

export default function InventoryValuation() {
  const totalValue = useMemo(
    () =>
      mockInventory.reduce(
        (acc, item) => acc + item.quantity * item.unitCost,
        0
      ),
    []
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">
        💰 Inventory Valuation (FIFO)
      </h2>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-gray-600 dark:text-gray-300">
          <tr>
            <th className="border-b py-2">Item</th>
            <th className="border-b py-2">Quantity</th>
            <th className="border-b py-2">Unit Cost</th>
            <th className="border-b py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {mockInventory.map((item, idx) => (
            <tr key={idx} className="text-gray-800 dark:text-gray-200">
              <td className="border-b py-2">{item.name}</td>
              <td className="border-b py-2">{item.quantity}</td>
              <td className="border-b py-2">{formatCurrency(item.unitCost)}</td>
              <td className="border-b py-2">{formatCurrency(item.quantity * item.unitCost)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-4 text-lg font-semibold text-emerald-700">
        Total Inventory Value: {formatCurrency(totalValue)}
      </div>
    </div>
  );
}
