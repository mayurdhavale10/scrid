"use client";

import { useState } from "react";
import ItemForm from "./ItemForm";

interface InventoryItem {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
}

interface InventoryTableProps {
  onOpenTransfer: (items: InventoryItem[]) => void;
}

export default function InventoryTable({ onOpenTransfer }: InventoryTableProps) {
  const [items, setItems] = useState<InventoryItem[]>([{
    name: "Copper Scrap",
    category: "Raw",
    quantity: 1200,
    unit: "kg",
    location: "Warehouse A",
  }, {
    name: "PET Bottles",
    category: "Finished",
    quantity: 500,
    unit: "kg",
    location: "Storage B",
  }, {
    name: "Lubricant",
    category: "Consumable",
    quantity: 40,
    unit: "liters",
    location: "Maintenance Room",
  }]);

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortKey, setSortKey] = useState<string>("name");

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);

  const handleAddNew = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = (itemName: string) => {
    const confirmDelete = confirm(`Are you sure you want to delete '${itemName}'?`);
    if (confirmDelete) {
      setItems((prev) => prev.filter((item) => item.name !== itemName));
    }
  };

  const handleSubmit = (item: InventoryItem) => {
    if (editItem) {
      setItems((prev) => prev.map((i) => i.name === editItem.name ? item : i));
    } else {
      setItems((prev) => [...prev, item]);
    }
  };

  const filteredItems = items
    .filter((item) => filterCategory === "all" || item.category === filterCategory)
    .sort((a, b) => {
      if (sortKey === "quantity") return b.quantity - a.quantity;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-emerald-700">📋 Inventory Table</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onOpenTransfer(items)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
          >
            🔁 Transfer
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md"
          >
            ➕ Add Item
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Filter:
          <select
            className="ml-2 p-1 rounded border dark:bg-[#223232] dark:text-white"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Raw">Raw</option>
            <option value="Finished">Finished</option>
            <option value="Consumable">Consumable</option>
          </select>
        </label>

        <label className="text-sm text-gray-700 dark:text-gray-300">
          Sort by:
          <select
            className="ml-2 p-1 rounded border dark:bg-[#223232] dark:text-white"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="quantity">Quantity</option>
          </select>
        </label>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-[#223232] text-gray-700 dark:text-gray-200">
          <tr>
            <th className="py-2 px-3">Item</th>
            <th className="py-2 px-3">Category</th>
            <th className="py-2 px-3">Qty</th>
            <th className="py-2 px-3">Unit</th>
            <th className="py-2 px-3">Location</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr
              key={`${item.name}-${item.location}`}
              className={`border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 ${item.quantity < 100 ? "bg-red-50 dark:bg-red-950" : ""}`}
            >
              <td className="py-2 px-3">{item.name}</td>
              <td className="py-2 px-3">{item.category}</td>
              <td className="py-2 px-3">{item.quantity}</td>
              <td className="py-2 px-3">{item.unit}</td>
              <td className="py-2 px-3">{item.location}</td>
              <td className="py-2 px-3 space-x-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(item.name)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ItemForm
          mode={editItem ? "edit" : "add"}
          initialData={editItem || undefined}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
