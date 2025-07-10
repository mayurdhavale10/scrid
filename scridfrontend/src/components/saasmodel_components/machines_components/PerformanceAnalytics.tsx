"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

interface PerformanceSnapshot {
  outputPerHour: number;
  efficiency: number;
  efficiencyChange: number;
  downtimeHours: number;
  downtimeReasons: { reason: string; percent: number; color: string }[];
  factoryAvg: number;
  lastMonthEfficiency: number;
}

export default function PerformanceAnalytics() {
  const [data, setData] = useState<PerformanceSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mock: PerformanceSnapshot = {
        outputPerHour: 2.3,
        efficiency: 87,
        efficiencyChange: 5,
        downtimeHours: 12,
        downtimeReasons: [
          { reason: "Blade Jam", percent: 35, color: "bg-emerald-500" },
          { reason: "Overheating", percent: 25, color: "bg-yellow-400" },
          { reason: "Maintenance", percent: 20, color: "bg-blue-400" },
          { reason: "Other", percent: 20, color: "bg-gray-400" },
        ],
        factoryAvg: 75,
        lastMonthEfficiency: 78,
      };
      await new Promise((res) => setTimeout(res, 600));
      setData(mock);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading Performance Data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 glass-effect rounded-2xl shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-emerald-700">📊 Performance Analytics</h2>
        <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">
          <Download size={16} /> Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-sm text-gray-800 dark:text-gray-200">
        <Card title="Live + Historical Production">
          <div className="text-2xl font-bold">{data.outputPerHour} T/hr</div>
          <div className="mt-2 h-24 bg-gradient-to-t from-emerald-300/30 to-transparent rounded-lg"></div>
          <div className="mt-2 text-xs flex gap-2">
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">7D</span>
            <span className="px-2 py-0.5 bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 rounded">30D</span>
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">90D</span>
          </div>
        </Card>

        <Card title="Efficiency Overview">
          <div className="text-2xl font-bold">{data.efficiency}%</div>
          <div className="text-sm text-green-600">↑ +{data.efficiencyChange}% vs last week</div>
          <div className="mt-2 h-20 bg-gradient-to-t from-emerald-400/30 to-transparent rounded-lg"></div>
        </Card>

        <Card title="Power Usage">
          <span className="text-xs text-emerald-600 mb-1">High Efficiency ✅</span>
          <div className="h-20 bg-gradient-to-t from-green-400/40 via-green-200/30 to-transparent rounded-lg"></div>
          <div className="text-xs text-gray-500 mt-1">Morning • Afternoon • Evening</div>
        </Card>

        <Card title="Downtime Distribution">
          <div className="text-sm font-medium mb-2">Total Downtime: {data.downtimeHours} hrs</div>
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500">Chart</div>
          <ul className="text-xs mt-2 space-y-1">
            {data.downtimeReasons.map((r) => (
              <li key={r.reason} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${r.color}`}></div>
                {r.reason}: {r.percent}%
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Performance Benchmarking">
          <div className="text-sm">Machine: {data.efficiency}%</div>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded mt-1">
            <div
              className="h-2 bg-emerald-500 rounded"
              style={{ width: `${data.efficiency}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Factory Avg: {data.factoryAvg}%</div>
          <div className="text-xs text-emerald-600 mt-1">+12% vs last month ✅</div>
        </Card>

        <Card title="Month-over-Month">
          <div className="text-sm">This Month: {data.efficiency}%</div>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded mt-1">
            <div
              className="h-2 bg-emerald-400 rounded"
              style={{ width: `${data.efficiency}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Last Month: {data.lastMonthEfficiency}%</div>
        </Card>
      </div>
    </div>
  );
}

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-4 rounded-xl bg-white dark:bg-[#1a2e2e] shadow glass-effect space-y-2">
    <h3 className="text-sm font-semibold text-emerald-700">{title}</h3>
    {children}
  </div>
);
