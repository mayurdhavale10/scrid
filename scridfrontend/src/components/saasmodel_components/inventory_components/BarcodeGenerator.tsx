"use client";

import { useEffect, useState } from "react";
import Barcode from "react-barcode";

interface BarcodeItem {
  id: string;
  name: string;
  code: string;
}

export default function BarcodeGenerator() {
  const [items, setItems] = useState<BarcodeItem[]>([]);

  useEffect(() => {
    // Simulated API fetch
    const mockBarcodes: BarcodeItem[] = [
      { id: "1", name: "Copper Scrap", code: "COP-001" },
      { id: "2", name: "PET Bottles", code: "PET-002" },
      { id: "3", name: "Crushed PCB", code: "PCB-003" },
    ];
    setItems(mockBarcodes);
  }, []);

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">🏷️ Barcode Generator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 dark:bg-[#223232] rounded-xl shadow text-center"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {item.name}
            </p>
            <Barcode value={item.code} width={1.5} height={60} displayValue />
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">{item.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
