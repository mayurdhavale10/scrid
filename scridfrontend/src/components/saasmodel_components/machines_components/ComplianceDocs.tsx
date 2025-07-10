"use client";

import { useEffect, useState } from "react";
import { FileText, AlertCircle, CheckCircle2, Clock, Download } from "lucide-react";

interface ComplianceDoc {
  name: string;
  type: "SOP" | "SLA" | "Audit";
  status: "valid" | "expiring_soon" | "expired";
  lastUpdated: string;
  expiryDate: string;
}

export default function ComplianceDocs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const docs: ComplianceDoc[] = [
    {
      name: "Machine_SOP_v3.pdf",
      type: "SOP",
      status: "valid",
      lastUpdated: "2025-05-10",
      expiryDate: "2026-05-10",
    },
    {
      name: "Recycling_SLA_Q2.pdf",
      type: "SLA",
      status: "expiring_soon",
      lastUpdated: "2025-04-01",
      expiryDate: "2025-08-01",
    },
    {
      name: "Audit_Trail_2024.zip",
      type: "Audit",
      status: "expired",
      lastUpdated: "2024-03-12",
      expiryDate: "2025-03-12",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2e2e] shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading Compliance Documents...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 rounded-2xl glass-effect shadow">
      <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
        📑 Compliance & Documentation
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Review SLAs, SOPs, audit trails, and policy documents
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-sm">
        {docs.map((doc, i) => (
          <div key={i} className="p-4 rounded-xl bg-white dark:bg-[#1a2e2e] shadow glass-effect space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-semibold">
                <FileText className="text-emerald-600" size={18} />
                {doc.name}
              </div>
              <StatusBadge status={doc.status} />
            </div>
            <p className="text-xs text-gray-500">Type: {doc.type}</p>
            <p className="text-xs text-gray-500">Last Updated: {doc.lastUpdated}</p>
            <p className="text-xs text-gray-500">Expiry: {doc.expiryDate}</p>
            <div className="flex gap-2 mt-2">
              <button className="text-xs px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700">
                Download
              </button>
              <button className="text-xs px-3 py-1 rounded bg-gray-100 dark:bg-gray-700">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: ComplianceDoc["status"] }) => {
  const statusMap = {
    valid: { label: "Valid", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
    expiring_soon: { label: "Expiring Soon", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    expired: { label: "Expired", color: "bg-red-100 text-red-700", icon: AlertCircle },
  };

  const Icon = statusMap[status].icon;

  return (
    <span className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded-full ${statusMap[status].color}`}>
      <Icon size={14} /> {statusMap[status].label}
    </span>
  );
};
