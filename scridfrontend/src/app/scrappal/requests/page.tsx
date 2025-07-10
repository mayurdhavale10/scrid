"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

type PickupRequest = {
  id: string;
  address: string;
  distance: string;
  time: string;
  date: string;
  type: string;
  customer: string;
};

export default function PickupRequestsPage() {
  const [requests, setRequests] = useState<PickupRequest[]>([]);
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    setRequests([
      {
        id: "1",
        address: "123 Main Street, Downtown",
        distance: "2.5 km",
        time: "10:30 AM",
        date: "2025-06-11",
        type: "E-waste",
        customer: "John Smith",
      },
      {
        id: "2",
        address: "456 Park Avenue, Westside",
        distance: "3.8 km",
        time: "11:45 AM",
        date: "2025-06-11",
        type: "Metal",
        customer: "Sarah Johnson",
      },
      {
        id: "3",
        address: "Kalyan",
        distance: "3.0 km",
        time: "9:00 AM",
        date: "2025-06-12",
        type: "E-waste",
        customer: "Kiran Rao",
      },
    ]);
  }, []);

  const updateStatus = (id: string, status: string) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleAmountChange = (id: string, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const filteredRequests = requests.filter(
    (r) =>
      (search === "" || r.address.toLowerCase().includes(search.toLowerCase())) &&
      (filterDate === "" || r.date === filterDate) &&
      (filterType === "" || r.type === filterType)
  );

  const renderSection = (title: string, matchStatus: string) => (
    <section className="space-y-4 mt-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests
          .filter((r) => statuses[r.id] === matchStatus)
          .map((r) => (
            <div key={r.id} className="bg-white border shadow-md p-4 rounded-lg">
              <p>📍 <strong>{r.address}</strong> • {r.distance}</p>
              <p>⏰ {r.time}</p>
              <p>📅 {r.date}</p>
              <p>♻️ {r.type}</p>
              <p>👤 {r.customer}</p>
              {matchStatus === "completed" && (
                <input
                  type="text"
                  placeholder="Enter Amount ₹"
                  value={amounts[r.id] || ""}
                  onChange={(e) => handleAmountChange(r.id, e.target.value)}
                  className="mt-2 border px-2 py-1 rounded text-sm w-full"
                />
              )}
            </div>
          ))}
      </div>
    </section>
  );

  const renderNewRequests = () => (
    <section className="space-y-4 mt-10">
      <h2 className="text-lg font-semibold">🆕 New Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests
          .filter((r) => !statuses[r.id])
          .map((r) => (
            <div key={r.id} className="bg-white border shadow-md p-4 rounded-lg">
              <p>📍 <strong>{r.address}</strong> • {r.distance}</p>
              <p>⏰ {r.time}</p>
              <p>📅 {r.date}</p>
              <p>♻️ {r.type}</p>
              <p>👤 {r.customer}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(r.id, "accepted")}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(r.id, "completed")}
                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(r.id, "rejected")}
                  className="border border-red-600 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-100"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar activePage="requests" />
      <main className="flex-1 p-10 space-y-10 bg-gray-50">
        <h1 className="text-xl font-bold">Pickup Requests</h1>

        <div className="bg-white border shadow-lg p-8 rounded-lg space-y-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location..."
              className="border px-4 py-2 rounded text-sm w-full md:w-1/3"
            />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border px-4 py-2 rounded text-sm w-full md:w-1/4"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border px-4 py-2 rounded text-sm w-full md:w-1/4"
            >
              <option value="">All Materials</option>
              <option value="E-waste">E-waste</option>
              <option value="Plastic">Plastic</option>
              <option value="Metal">Metal</option>
            </select>
          </div>
        </div>

        {renderNewRequests()}
        {renderSection("✅ Accepted", "accepted")}
        {renderSection("❌ Rejected", "rejected")}
        {renderSection("⏳ Pending", "pending")}
        {renderSection("💰 Completed", "completed")}
      </main>
    </div>
  );
}
