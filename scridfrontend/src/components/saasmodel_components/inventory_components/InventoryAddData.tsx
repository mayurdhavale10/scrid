"use client";

import { useState } from "react";
import { PlusCircle, FileUp } from "lucide-react";
import ItemForm from "./ItemForm";
import ExcelImporter from "./ExcelImporter";

interface InventoryItemInput {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
}

interface ImportedInventoryItem {
  name: string;
  category: string;
  quantity: number;
  location: string;
}

export default function InventoryAddData() {
  const [items, setItems] = useState<InventoryItemInput[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (item: InventoryItemInput) => {
    setItems((prev) => [...prev, item]);
  };

  const handleImport = (imported: ImportedInventoryItem[]) => {
    const enriched = imported.map((item) => ({
      ...item,
      unit: "kg" // default unit for imported items
    }));
    setItems((prev) => [...prev, ...enriched]);
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-emerald-700">Add Inventory Manually</h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm">Add New Item</span>
        </button>
      </div>

      {showForm && (
        <ItemForm
          mode="add"
          onSubmit={(item) => {
            handleAdd(item);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}

      <div>
        <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center gap-2">
          <FileUp className="w-4 h-4" /> Import from Excel
        </h3>
        <ExcelImporter onImport={handleImport} />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        <h4 className="font-medium mb-2">Current Items:</h4>
        {items.length > 0 ? (
          <ul className="list-disc list-inside">
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} {item.unit} ({item.category}) @ {item.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items added yet.</p>
        )}
      </div>
    </div>
  );
}
