"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Pencil, XCircle } from "lucide-react";

interface InventoryItemInput {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
}

interface ItemFormProps {
  mode: "add" | "edit";
  initialData?: InventoryItemInput;
  onSubmit: (item: InventoryItemInput) => void;
  onClose: () => void;
}

export default function ItemForm({ mode, initialData, onSubmit, onClose }: ItemFormProps) {
  const [form, setForm] = useState<InventoryItemInput>({
    name: "",
    category: "Raw",
    quantity: 0,
    unit: "kg",
    location: "",
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      setForm(initialData);
    }
  }, [initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.location || form.quantity <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
          {mode === "edit" ? <Pencil className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          {mode === "edit" ? "Edit Item" : "Add New Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800 dark:text-gray-100">
          <div>
            <label className="block mb-1">Item Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white dark:bg-[#162c2c] border border-gray-300 dark:border-gray-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white dark:bg-[#162c2c] border border-gray-300 dark:border-gray-700"
              >
                <option value="Raw">Raw</option>
                <option value="WIP">WIP</option>
                <option value="Finished">Finished</option>
                <option value="Consumable">Consumable</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Quantity</label>
              <input
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white dark:bg-[#162c2c] border border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Unit</label>
              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white dark:bg-[#162c2c] border border-gray-300 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white dark:bg-[#162c2c] border border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md flex items-center gap-1"
            >
              <XCircle className="w-4 h-4" /> Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-1"
            >
              {mode === "edit" ? <Pencil className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
              {mode === "edit" ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
