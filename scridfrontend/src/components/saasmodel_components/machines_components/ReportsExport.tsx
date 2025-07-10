"use client";

import { useState } from "react";
import { FileDown, CalendarDays, CheckSquare, FileText, DownloadCloud } from "lucide-react";

const reportOptions = [
  { label: "Machine Health", key: "health" },
  { label: "Performance Analytics", key: "performance" },
  { label: "Cost & Impact", key: "cost" },
  { label: "Maintenance Logs", key: "maintenance" },
  { label: "AI Recommendations", key: "ai" },
];

export default function ReportsExport() {
  const [selectedReports, setSelectedReports] = useState<string[]>(["health", "performance"]);
  const [dateRange, setDateRange] = useState("30d");

  const toggleReport = (key: string) => {
    setSelectedReports(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  return (
    <div className="space-y-6 p-6 rounded-2xl glass-effect shadow">
      <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
        📤 Reports & Export Center
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Generate and export detailed reports on machine performance, health, and more.
      </p>

      {/* Report Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reportOptions.map((item) => (
          <div
            key={item.key}
            className={`flex items-center gap-2 p-3 rounded-md cursor-pointer shadow ${
              selectedReports.includes(item.key)
                ? "bg-emerald-100 dark:bg-emerald-800/30 border border-emerald-400"
                : "bg-white dark:bg-[#1a2e2e] border border-gray-300 dark:border-gray-700"
            }`}
            onClick={() => toggleReport(item.key)}
          >
            <CheckSquare
              className={`w-5 h-5 ${
                selectedReports.includes(item.key)
                  ? "text-emerald-600"
                  : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Time Range
        </h4>
        <div className="flex gap-3 text-sm">
          {["7d", "30d", "custom"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1 rounded border ${
                dateRange === range
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              }`}
            >
              {range === "7d" ? "Last 7 Days" : range === "30d" ? "Last 30 Days" : "Custom Range"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-gray-50 dark:bg-[#1a2e2e] rounded-lg border dark:border-gray-700 space-y-2">
        <h4 className="text-sm font-semibold text-emerald-700">📋 Summary</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          You are generating a report for:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
          {selectedReports.map((key) => (
            <li key={key}>
              {
                reportOptions.find((opt) => opt.key === key)?.label
              }
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-1">Time Range: {dateRange === "custom" ? "Custom Dates" : dateRange}</p>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700">
          <FileText size={16} />
          Export as PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
          <DownloadCloud size={16} />
          Export as CSV
        </button>
      </div>
    </div>
  );
}
