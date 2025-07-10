"use client";

import { useState } from "react";
import { toast } from "sonner";

interface AuditEntry {
  date: string;
  item: string;
  expected: number;
  actual: number;
  variance: number;
}

export default function AuditTools() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [item, setItem] = useState("");
  const [expected, setExpected] = useState<number>(0);
  const [actual, setActual] = useState<number>(0);

  const handleAudit = () => {
    if (!item || expected < 0 || actual < 0) {
      toast.error("Fill all fields correctly");
      return;
    }

    const variance = actual - expected;
    const entry: AuditEntry = {
      date: new Date().toLocaleString(),
      item,
      expected,
      actual,
      variance,
    };
    setAuditLog([entry, ...auditLog]);
    toast.success("Audit entry added.");
    setItem("");
    setExpected(0);
    setActual(0);
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">
        🧾 Inventory Audit Tools
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Item Name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="p-2 border rounded dark:bg-[#223232] dark:text-white"
        />
        <input
          type="number"
          placeholder="Expected Qty"
          value={expected}
          onChange={(e) => setExpected(parseInt(e.target.value))}
          className="p-2 border rounded dark:bg-[#223232] dark:text-white"
        />
        <input
          type="number"
          placeholder="Actual Qty"
          value={actual}
          onChange={(e) => setActual(parseInt(e.target.value))}
          className="p-2 border rounded dark:bg-[#223232] dark:text-white"
        />
      </div>

      <button
        onClick={handleAudit}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Audit Entry
      </button>

      {auditLog.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="text-gray-600 dark:text-gray-300">
              <tr>
                <th className="border-b py-2">Date</th>
                <th className="border-b py-2">Item</th>
                <th className="border-b py-2">Expected</th>
                <th className="border-b py-2">Actual</th>
                <th className="border-b py-2">Variance</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((entry, idx) => (
                <tr key={idx} className="text-gray-800 dark:text-gray-200">
                  <td className="border-b py-2 whitespace-nowrap">{entry.date}</td>
                  <td className="border-b py-2">{entry.item}</td>
                  <td className="border-b py-2">{entry.expected}</td>
                  <td className="border-b py-2">{entry.actual}</td>
                  <td
                    className={`border-b py-2 font-semibold ${
                      entry.variance < 0
                        ? "text-red-600"
                        : entry.variance > 0
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {entry.variance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
