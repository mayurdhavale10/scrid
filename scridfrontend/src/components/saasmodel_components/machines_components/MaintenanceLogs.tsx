"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export default function MaintenanceLogs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2e2e] shadow-lg">
        <p className="text-emerald-700 dark:text-emerald-400">Loading Maintenance Logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 rounded-2xl glass-effect shadow">
      <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
        🛠️ Maintenance, Logs & Contacts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Service History */}
        <Card title="Service History">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left">Date</th>
                <th className="text-left">Engineer</th>
                <th className="text-left">Notes</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "June 14, 2025", engineer: "R. Kumar", notes: "Replaced fan belt", status: "Completed" },
                { date: "June 12, 2025", engineer: "A. Singh", notes: "Oil change", status: "Completed" },
                { date: "June 10, 2025", engineer: "M. Patel", notes: "Scheduled maintenance", status: "Pending" },
                { date: "June 8, 2025", engineer: "S. Sharma", notes: "Emergency repair", status: "Missed" },
              ].map((log, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-600">
                  <td>{log.date}</td>
                  <td>{log.engineer}</td>
                  <td>{log.notes}</td>
                  <td>
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Spare Parts Tracker */}
        <Card title="Spare Parts Tracker">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Fan Belt", qty: 12, status: "ok" },
              { name: "Oil Filter", qty: 3, status: "low" },
              { name: "Motor", qty: 0, status: "out" },
              { name: "Bearings", qty: 8, status: "ok" },
            ].map((part, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span>{part.name} (Qty: {part.qty})</span>
                {part.status === "ok" && <CheckCircle className="text-green-500 w-4 h-4" />}
                {part.status === "low" && <AlertCircle className="text-yellow-500 w-4 h-4" />}
                {part.status === "out" && <XCircle className="text-red-500 w-4 h-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Engineer Contact Info */}
        <Card title="Engineer Contact Info">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <p className="font-semibold">Ravi Kumar</p>
              <p className="text-xs text-gray-500">Senior Maintenance Engineer</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-emerald-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
                  <Phone size={14} /> Call Now
                </button>
                <button className="bg-gray-100 dark:bg-gray-700 text-xs px-3 py-1 rounded flex items-center gap-1">
                  <Mail size={14} /> Email
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Issue Tickets */}
        <Card title="Issue Tickets">
          <div className="space-y-3 text-sm">
            {[
              { code: "E67", issue: "Overheating", time: "4 hours ago", status: "Open" },
              { code: "E66", issue: "Belt tension", time: "8 hours ago", status: "Open" },
              { code: "E65", issue: "Oil pressure", time: "1 day ago", status: "Closed" },
            ].map((ticket, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">{ticket.code}</span>
                    <span>{ticket.issue}</span>
                  </div>
                  <p className="text-xs text-gray-500">{ticket.time}</p>
                </div>
                <StatusBadge status={ticket.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Assigned Engineers */}
        <Card title="Assigned Engineers">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { name: "Ravi Singh", shift: "Morning", zone: "A", active: true },
              { name: "Priya J.", shift: "Evening", zone: "B", active: true },
              { name: "Amit K.", shift: "Night", zone: "A", active: false },
              { name: "Sneha M.", shift: "Morning", zone: "C", active: true },
            ].map((eng, i) => (
              <div key={i} className="border p-2 rounded-lg">
                <p className="font-semibold">{eng.name}</p>
                <p className="text-xs text-gray-500">{eng.shift} Shift – Zone {eng.zone}</p>
                <p className={`text-xs font-semibold ${eng.active ? "text-green-600" : "text-gray-400"}`}>
                  {eng.active ? "Active" : "Off"}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Maintenance Notes */}
        <Card title="Maintenance Notes">
          <textarea
            className="w-full border rounded-md p-2 text-sm h-24 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            placeholder="Add maintenance notes..."
          />
          <div className="flex gap-2 mt-2">
            <button className="text-xs px-3 py-1 rounded bg-emerald-600 text-white">Attach Files</button>
            <button className="text-xs px-3 py-1 rounded bg-gray-100 dark:bg-gray-700">Add Images</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-[#1a2e2e] p-4 rounded-xl shadow glass-effect space-y-3">
    <h3 className="text-sm font-semibold text-emerald-700">{title}</h3>
    {children}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Missed: "bg-red-100 text-red-700",
    Open: "bg-red-100 text-red-700",
    Closed: "bg-green-100 text-green-700",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[status] || "bg-gray-200 text-gray-600"}`}>
      {status}
    </span>
  );
};
