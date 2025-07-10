"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Supplier {
  name: string;
  material: string;
  leadTime: string;
  contact: string;
  rating: number;
}

const mockSuppliers: Supplier[] = [
  {
    name: "EcoMetals Pvt Ltd",
    material: "Copper Scrap",
    leadTime: "3 days",
    contact: "+91 98765 43210",
    rating: 4.8,
  },
  {
    name: "PlastiCycle Corp",
    material: "PET Flakes",
    leadTime: "5 days",
    contact: "+91 91234 56789",
    rating: 4.6,
  },
  {
    name: "GreenSteel Traders",
    material: "Steel Shards",
    leadTime: "2 days",
    contact: "+91 99887 77665",
    rating: 4.9,
  },
];

export default function SupplierDirectory() {
  const [query, setQuery] = useState("");

  const filtered = mockSuppliers.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.material.toLowerCase().includes(query.toLowerCase())
  );

  const handleRequest = (supplier: Supplier) => {
    toast.success(`Stock request sent to ${supplier.name}`);
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">📦 Supplier Directory</h2>

      <input
        type="text"
        placeholder="Search supplier or material..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full dark:bg-[#223232] dark:text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((supplier, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 dark:bg-[#1f2f2f] rounded-xl shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{supplier.name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Material: {supplier.material}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Lead Time: {supplier.leadTime}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Contact: {supplier.contact}</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">Rating: ⭐ {supplier.rating}</p>

            <button
              onClick={() => handleRequest(supplier)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Request Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
