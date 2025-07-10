"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

const inventoryData = [
  { name: "Raw", value: 1200 },
  { name: "Finished", value: 500 },
  { name: "Consumable", value: 40 },
];

export default function InventoryChart() {
  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold text-emerald-700 mb-3">
        📊 Inventory by Category
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={inventoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#f0fdf4", borderColor: "#10b981" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
