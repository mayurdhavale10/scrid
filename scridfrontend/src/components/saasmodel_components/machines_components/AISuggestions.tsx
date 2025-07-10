"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Thermometer, Timer, Scale3D, FileDown, ArrowRight } from "lucide-react";

interface AISuggestion {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  type: "overheat" | "balance" | "maintenance";
  efficiencyDrop?: number;
  cta?: string;
}

export default function AISuggestions() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading AI Suggestions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 rounded-2xl glass-effect shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
          🧠 AI & Smart Recommendations
        </h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-sm text-emerald-700 hover:underline">
            <FileDown size={16} /> Export as PDF
          </button>
          <button className="flex items-center gap-1 text-sm text-emerald-700 hover:underline">
            <FileDown size={16} /> Export as CSV
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">Machine-specific AI-powered suggestions for optimal performance</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-sm">
        {/* Suggestion 1: Overheating */}
        <Card>
          <div className="flex justify-between">
            <div className="font-semibold flex items-center gap-2">
              <Thermometer className="text-red-500" size={18} />
              Compressor temperature rising unusually
            </div>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">High Risk</span>
          </div>
          <div className="mt-3 h-16 bg-gradient-to-t from-red-200 to-transparent rounded-lg"></div>
          <p className="text-xs mt-2 text-gray-500">Risk of overheating in 5–7 hrs based on current trend</p>
        </Card>

        {/* Suggestion 2: Load Imbalance */}
        <Card>
          <div className="font-semibold flex items-center gap-2">
            <Scale3D className="text-emerald-600" size={18} />
            Shift 20% load from Crusher to Separator
          </div>
          <div className="mt-4 space-y-2">
            <Bar label="Crusher" percent={85} color="bg-red-500" />
            <Bar label="Separator" percent={40} color="bg-emerald-500" />
          </div>
          <p className="text-xs mt-2 text-gray-500">Crusher nearing threshold; separator underutilized</p>
        </Card>

        {/* Suggestion 3: Lubrication */}
        <Card>
          <div className="font-semibold flex items-center gap-2">
            <Timer className="text-yellow-600" size={18} />
            Lubrication overdue by 3 days
          </div>
          <div className="bg-orange-50 text-orange-600 text-xs p-2 rounded mt-3">
            ⚠️ 8% efficiency drop detected
          </div>
          <button className="mt-3 bg-emerald-600 text-white text-sm px-3 py-1 rounded hover:bg-emerald-700">
            Optimize Schedule
          </button>
        </Card>

        {/* System Performance Overview */}
        <Card>
          <div className="font-semibold flex items-center gap-2">
            <AlertCircle className="text-blue-600" size={18} />
            System Performance Overview
          </div>
          <div className="text-sm mt-3 space-y-1">
            <p className="flex justify-between">
              <span>Overall Efficiency</span>
              <span className="text-green-600 font-medium">92%</span>
            </p>
            <p className="flex justify-between">
              <span>Uptime</span>
              <span className="text-green-600 font-medium">99.9%</span>
            </p>
            <p className="flex justify-between">
              <span>Active Alerts</span>
              <span className="text-red-600 font-semibold">3</span>
            </p>
          </div>
        </Card>
      </div>

      <div className="pt-4">
        <button className="w-full text-center text-sm font-medium text-white bg-emerald-800 py-2 rounded-lg hover:bg-emerald-900 flex items-center justify-center gap-2">
          View All AI Suggestions <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 rounded-xl bg-white dark:bg-[#1a2e2e] shadow glass-effect space-y-2">
    {children}
  </div>
);

const Bar = ({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) => (
  <div>
    <div className="flex justify-between mb-1 text-xs">
      <span>{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded">
      <div className={`h-2 ${color} rounded`} style={{ width: `${percent}%` }} />
    </div>
  </div>
);
