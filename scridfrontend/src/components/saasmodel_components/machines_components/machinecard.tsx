// machinecard.tsx

import React from "react";

interface MachineCardProps {
  title: string;
  status: "running" | "idle" | "down";
  metric: string;
}

export default function MachineCard({ title, status, metric }: MachineCardProps) {
  const statusColors = {
    running: "text-green-600",
    idle: "text-yellow-500",
    down: "text-red-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-2 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-md font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{metric}</p>
      <span className={`text-xs font-medium ${statusColors[status]}`}>
        {status.toUpperCase()}
      </span>
    </div>
  );
}
