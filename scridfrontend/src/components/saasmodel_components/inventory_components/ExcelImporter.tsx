"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface InventoryItem {
  name: string;
  category: string;
  quantity: number;
  location: string;
}

interface ExcelImporterProps {
  onImport: (items: InventoryItem[]) => void;
}

export default function ExcelImporter({ onImport }: ExcelImporterProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);

      const parsedData: InventoryItem[] = (json as any[]).map((row) => ({
        name: row["Item Name"] || "",
        category: row["Category"] || "",
        quantity: Number(row["Quantity"] || 0),
        location: row["Location"] || "",
      }));

      onImport(parsedData);
      setError(null);
    } catch (err) {
      setError("Invalid file or structure. Please use correct Excel format.");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-emerald-700">📥 Import Inventory from Excel</h3>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="block w-full mb-3"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-xs text-gray-500">Ensure columns: <code>Item Name</code>, <code>Category</code>, <code>Quantity</code>, <code>Location</code></p>
    </div>
  );
}
