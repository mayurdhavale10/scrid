"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MachineMetadata {
  machineId: string;
  name: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  location: string;
  commissioningDate: string;
  operatingHours: number;
  warrantyStatus: "active" | "expired" | "under review";
  tags: string[];
}

export default function MachineMetadata() {
  const [data, setData] = useState<MachineMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching metadata from API
    const fetchMetadata = async () => {
      setLoading(true);
      const mockMetadata: MachineMetadata = {
        machineId: "SCRID-AX1201",
        name: "Industrial Shredder Mk-II",
        type: "Shredder",
        manufacturer: "GreenTech Industries",
        serialNumber: "GT-SHD-9347281",
        location: "Zone B - Line 3",
        commissioningDate: "2023-01-15",
        operatingHours: 4521,
        warrantyStatus: "active",
        tags: ["High Priority", "Critical Zone"],
      };
      await new Promise((res) => setTimeout(res, 600));
      setData(mockMetadata);
      setLoading(false);
    };

    fetchMetadata();
  }, []);

  const warrantyColors = {
    active: "text-green-600",
    expired: "text-red-600",
    "under review": "text-yellow-600",
  };

  if (loading || !data) {
    return (
      <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading Machine Metadata...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-lg glass-effect space-y-4">
      <h2 className="text-xl font-semibold text-emerald-700 mb-2">
        🆔 Machine Identification & Metadata
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
        <MetaItem label="Machine ID" value={data.machineId} />
        <MetaItem label="Machine Name" value={data.name} />
        <MetaItem label="Type" value={data.type} />
        <MetaItem label="Manufacturer" value={data.manufacturer} />
        <MetaItem label="Serial Number" value={data.serialNumber} />
        <MetaItem label="Location" value={data.location} />
        <MetaItem label="Commissioned On" value={data.commissioningDate} />
        <MetaItem label="Operating Hours" value={`${data.operatingHours} hrs`} />
        <MetaItem
          label="Warranty Status"
          value={data.warrantyStatus.toUpperCase()}
          valueClass={warrantyColors[data.warrantyStatus]}
        />
        <MetaItem
          label="Tags"
          value={data.tags.length > 0 ? data.tags.join(", ") : "None"}
          valueClass="text-blue-600"
        />
      </div>
    </div>
  );
}

const MetaItem = ({
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
