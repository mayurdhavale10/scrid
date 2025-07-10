"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MachineHealthData {
  status: "running" | "idle" | "down";
  rpm: number;
  temperature: number;
  vibration: number;
  load: number;
  errorCode?: string;
  healthScore: number;
  nextMaintenance: string;
  lastService: string;
  engineer: string;
}

export default function MachineHealth() {
  const [data, setData] = useState<MachineHealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      const mockApiResponse: MachineHealthData = {
        status: "running",
        rpm: 1480,
        temperature: 68,
        vibration: 1.2,
        load: 82,
        errorCode: "E00",
        healthScore: 91,
        nextMaintenance: "2025-07-15",
        lastService: "2025-06-01",
        engineer: "Raj Patel",
      };
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate delay
      setData(mockApiResponse);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading Machine Health...</p>
      </div>
    );
  }

  const statusColors = {
    running: "text-green-600",
    idle: "text-yellow-500",
    down: "text-red-600",
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg glass-effect space-y-4">
      <h2 className="text-xl font-semibold text-emerald-700 mb-2">
        🔧 Machine Health & Diagnostics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
        <Metric label="Status" value={data.status.toUpperCase()} valueClass={statusColors[data.status]} />
        <Metric label="RPM" value={`${data.rpm} RPM`} />
        <Metric label="Temperature" value={`${data.temperature}°C`} />
        <Metric label="Vibration" value={`${data.vibration} mm/s`} />
        <Metric label="Load" value={`${data.load}%`} />
        <Metric label="Error Code" value={data.errorCode || "None"} valueClass="text-red-500" />
        <Metric label="AI Health Score" value={`${data.healthScore}/100`} valueClass="font-bold text-emerald-700" />
        <Metric label="Next Maintenance" value={data.nextMaintenance} />
        <Metric label="Last Service" value={data.lastService} />
        <Metric label="Assigned Engineer" value={data.engineer} />
      </div>
    </div>
  );
}

const Metric = ({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-xs">{label}</span>
    <span className={cn("text-base font-medium", valueClass)}>{value}</span>
  </div>
);
