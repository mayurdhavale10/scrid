"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface AuditEntry {
  date: string;
  item: string;
  expected: number;
  actual: number;
  variance: number;
  auditor: string;
  method: "Manual" | "System" | "Auto";
}

export default function AuditTools() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [item, setItem] = useState("");
  const [expected, setExpected] = useState<number>(0);
  const [actual, setActual] = useState<number>(0);
  const [auditor, setAuditor] = useState("John D");
  const [method, setMethod] = useState<"Manual" | "System" | "Auto">("Manual");

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
      auditor,
      method,
    };
    setAuditLog([entry, ...auditLog]);
    toast.success("✅ Audit entry saved");
    setItem("");
    setExpected(0);
    setActual(0);
  };

  const exportCSV = () => {
    const csvContent = [
      ["Date", "Item", "Expected", "Actual", "Variance", "Auditor", "Method"],
      ...auditLog.map((e) => [
        e.date,
        e.item,
        e.expected,
        e.actual,
        e.variance,
        e.auditor,
        e.method,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory_audit_log.csv";
    link.click();
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-emerald-700">
          🧾 Inventory Audit Tools
        </h2>
        {auditLog.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-1 border border-green-700 text-green-700 rounded hover:bg-green-100 dark:hover:bg-[#193a3a]"
          >
            <Download size={16} /> Export CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          className="p-2 border rounded dark:bg-[#223232] dark:text-white"
        >
          <option value="Manual">Manual</option>
          <option value="System">System</option>
          <option value="Auto">Auto</option>
        </select>
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
                <th className="border-b py-2">Auditor</th>
                <th className="border-b py-2">Method</th>
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
                  <td className="border-b py-2">{entry.auditor}</td>
                  <td className="border-b py-2">{entry.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
