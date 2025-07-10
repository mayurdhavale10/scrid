// ✅ TransferModal.tsx
"use client";

import { useState } from "react";

interface TransferItem {
  name: string;
  location: string;
  quantity: number;
}

interface TransferModalProps {
  items: TransferItem[];
  onTransfer: (name: string, from: string, to: string, qty: number) => void;
  onClose: () => void;
}

export default function TransferModal({ items, onTransfer, onClose }: TransferModalProps) {
  const [selectedItem, setSelectedItem] = useState<string>(items[0]?.name || "");
  const [fromLocation, setFromLocation] = useState<string>(items[0]?.location || "");
  const [toLocation, setToLocation] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = () => {
    if (selectedItem && fromLocation && toLocation && quantity > 0) {
      onTransfer(selectedItem, fromLocation, toLocation, quantity);
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">🔁 Transfer Inventory</h2>

        <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Item:</label>
        <select
          value={selectedItem}
          onChange={(e) => {
            const selected = items.find(item => item.name === e.target.value);
            setSelectedItem(e.target.value);
            setFromLocation(selected?.location || "");
          }}
          className="w-full p-2 rounded border dark:bg-[#223232] dark:text-white mb-4"
        >
          {items.map((item, idx) => (
            <option key={idx} value={item.name}>{item.name}</option>
          ))}
        </select>

        <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">From:</label>
        <input
          value={fromLocation}
          readOnly
          className="w-full p-2 rounded border bg-gray-100 dark:bg-[#2a3a3a] dark:text-white mb-4"
        />

        <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">To:</label>
        <input
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          className="w-full p-2 rounded border dark:bg-[#223232] dark:text-white mb-4"
        />

        <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 rounded border dark:bg-[#223232] dark:text-white mb-4"
        />

        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-700 text-white rounded-md">Transfer</button>
        </div>
      </div>
    </div>
  );
}
