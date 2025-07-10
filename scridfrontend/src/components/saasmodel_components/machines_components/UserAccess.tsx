"use client";

import { useEffect, useState } from "react";
import { Download, Trash, Upload, CheckCircle, Lock } from "lucide-react";

interface ChangeLog {
  user: string;
  action: string;
  timestamp: string;
  status: "Created" | "Edited" | "Deleted";
}

interface FileEntry {
  name: string;
  uploadedBy: string;
  daysAgo: number;
}

export default function UserAccess() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2e2e] shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading User Access...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 glass-effect rounded-2xl shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-700">🔐 User Access & Logs</h2>
        <p className="text-sm text-gray-500">13 Active Users | 3 Admins | Last Change: 5 hrs ago</p>
      </div>

      {/* Role Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, i) => (
          <div
            key={i}
            className="rounded-xl p-4 bg-white dark:bg-[#1a2e2e] shadow glass-effect space-y-2"
          >
            <h3 className="text-md font-semibold text-emerald-700 flex items-center gap-1">
              {role.icon} {role.name}
            </h3>
            <ul className="text-sm space-y-1">
              {role.permissions.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {p.allowed ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Change Logs */}
      <div className="rounded-xl p-4 bg-white dark:bg-[#1a2e2e] shadow glass-effect">
        <h3 className="text-md font-semibold text-emerald-700 mb-3">📝 Change Logs</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="text-left py-1">User Name</th>
              <th className="text-left py-1">Action Performed</th>
              <th className="text-left py-1">Timestamp</th>
              <th className="text-left py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {changeLogs.map((log, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.timestamp}</td>
                <td>
                  <StatusPill status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload & Version History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload UI (no real backend yet) */}
        <div className="p-4 border-2 border-dashed rounded-xl text-center bg-white dark:bg-[#1a2e2e] shadow glass-effect">
          <Upload className="mx-auto mb-2 text-emerald-600" size={28} />
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Drag & drop files here or click to upload
          </p>
          <button className="text-xs px-3 py-1 bg-emerald-600 text-white rounded">Choose Files</button>
        </div>

        {/* Version History */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#1a2e2e] shadow glass-effect space-y-2">
          <h3 className="text-md font-semibold text-emerald-700 mb-2">📂 Version History</h3>
          {files.map((file, i) => (
            <div key={i} className="flex justify-between items-center text-sm border-b py-1">
              <div className="flex flex-col">
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  Uploaded by {file.uploadedBy} – {file.daysAgo} days ago
                </p>
              </div>
              <div className="flex gap-2">
                <Download size={16} className="cursor-pointer text-gray-500 hover:text-emerald-600" />
                <Trash size={16} className="cursor-pointer text-gray-500 hover:text-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================
// Helpers
// ==========================

const StatusPill = ({ status }: { status: string }) => {
  const colors = {
    Created: "bg-green-100 text-green-700",
    Edited: "bg-blue-100 text-blue-700",
    Deleted: "bg-red-100 text-red-700",
  } as const;

  const colorClass = colors[status as keyof typeof colors] || "bg-gray-200 text-gray-600";

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

const roles = [
  {
    name: "Administrator",
    icon: "🧑‍💼",
    permissions: [
      { label: "Full system access", allowed: true },
      { label: "Can manage users", allowed: true },
      { label: "Can delete machines", allowed: true },
      { label: "Can edit all logs", allowed: true },
    ],
  },
  {
    name: "Supervisor",
    icon: "👨‍🔧",
    permissions: [
      { label: "Can view all logs", allowed: true },
      { label: "Can edit maintenance", allowed: true },
      { label: "Cannot delete machines", allowed: false },
      { label: "Can manage technicians", allowed: true },
    ],
  },
  {
    name: "Technician",
    icon: "🧰",
    permissions: [
      { label: "Can view assigned machines", allowed: true },
      { label: "Can update maintenance logs", allowed: true },
      { label: "Cannot manage users", allowed: false },
      { label: "Cannot delete records", allowed: false },
    ],
  },
];

const changeLogs: ChangeLog[] = [
  {
    user: "John Smith",
    action: "Updated Blade Wear to 72%",
    timestamp: "June 24, 10:43 AM",
    status: "Edited",
  },
  {
    user: "Sarah Chen",
    action: "Created Maintenance Schedule",
    timestamp: "June 24, 09:15 AM",
    status: "Created",
  },
  {
    user: "Mike Johnson",
    action: "Deleted Old Report",
    timestamp: "June 23, 16:22 PM",
    status: "Deleted",
  },
];

const files: FileEntry[] = [
  { name: "manual_v2.pdf", uploadedBy: "John D", daysAgo: 2 },
  { name: "safety_guidelines.pdf", uploadedBy: "Sarah C", daysAgo: 3 },
  { name: "maintenance_log.xlsx", uploadedBy: "Mike J", daysAgo: 4 },
];
