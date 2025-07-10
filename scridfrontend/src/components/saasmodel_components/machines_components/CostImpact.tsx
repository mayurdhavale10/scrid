"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CostImpactData {
  operatingCost: number;
  revenue: number;
  revenueChange: number;
  costPerKg: number;
  efficiencyRating: "Good" | "Average" | "Poor";
  netMargin: number;
  roiPercent: number;
  powerCost: number;
  laborCost: number;
  maintenanceCost: number;
  powerChange: number;
  laborChange: number;
  maintenanceChange: number;
}

export default function CostImpact() {
  const [data, setData] = useState<CostImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCostData = async () => {
      setLoading(true);
      const mockData: CostImpactData = {
        operatingCost: 480,
        revenue: 125000,
        revenueChange: 12,
        costPerKg: 4.2,
        efficiencyRating: "Good",
        netMargin: 72000,
        roiPercent: 32,
        powerCost: 240,
        laborCost: 120,
        maintenanceCost: 120,
        powerChange: 5,
        laborChange: -2,
        maintenanceChange: 0,
      };
      await new Promise((res) => setTimeout(res, 500));
      setData(mockData);
      setLoading(false);
    };

    fetchCostData();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2e2e] shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading Cost Impact...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 rounded-2xl glass-effect shadow">
      <h2 className="text-xl font-semibold text-emerald-700">
        💰 Cost & Business Impact
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Financial performance metrics for Machine M-2240
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-sm">
        <Card>
          <div className="text-2xl font-bold">₹{data.operatingCost} <span className="text-sm font-normal">/hr</span></div>
          <p className="text-xs text-emerald-600 mt-1">Includes power + labor + parts</p>
        </Card>

        <Card>
          <div className="text-2xl font-bold">₹{(data.revenue / 100000).toFixed(2)}L</div>
          <p className="text-xs text-gray-500">this month</p>
          <p className="text-xs text-green-600 mt-1">↑ +{data.revenueChange}% vs last month</p>
        </Card>

        <Card>
          <div className="text-2xl font-bold">₹{data.costPerKg} <span className="text-sm font-normal">/kg</span></div>
          <div className="mt-2 h-2 rounded bg-gray-200 dark:bg-gray-600">
            <div className="h-2 bg-emerald-500 rounded" style={{ width: "65%" }} />
          </div>
          <p className="text-xs mt-1 text-gray-500">Efficiency Rating: {data.efficiencyRating}</p>
        </Card>

        <Card>
          <div className="text-xl font-semibold">₹{data.netMargin.toLocaleString()}</div>
          <p className="text-xs text-gray-500">Net Margin</p>
          <div className="mt-2 h-2 rounded bg-gray-200 dark:bg-gray-600">
            <div className="h-2 bg-green-700 rounded" style={{ width: `${data.roiPercent}%` }} />
          </div>
          <p className="text-xs mt-1 text-green-600">{data.roiPercent}% ROI</p>
        </Card>

        <div className="col-span-full">
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              🧾 Detailed Cost Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SubCost label="Power Consumption" value={data.powerCost} delta={data.powerChange} />
              <SubCost label="Labor Costs" value={data.laborCost} delta={data.laborChange} />
              <SubCost label="Maintenance" value={data.maintenanceCost} delta={data.maintenanceChange} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 rounded-xl bg-white dark:bg-[#1a2e2e] shadow glass-effect space-y-2">
    {children}
  </div>
);

const SubCost = ({
  label,
  value,
  delta,
}: {
  label: string;
  value: number;
  delta: number;
}) => {
  const deltaColor = delta > 0 ? "text-green-600" : delta < 0 ? "text-red-500" : "text-gray-500";
  const deltaSymbol = delta > 0 ? "+" : "";

  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <div className="text-base font-medium">₹{value}/hr</div>
      <p className={`text-xs ${deltaColor}`}>{deltaSymbol}{delta}%</p>
    </div>
  );
};
