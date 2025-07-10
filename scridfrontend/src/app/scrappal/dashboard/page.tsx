"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import PickupCard from "../components/PickupCard";
import StatCard from "../components/StatCard";
import ActivityCard, { Activity } from "../components/ActivityCard";

type PickupRequest = {
  id: string;
  location: string;
  time: string;
  scrapType: string;
  distance: string;
};

export default function ScrapPalDashboard() {
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pickupCount, setPickupCount] = useState(0);

  useEffect(() => {
    const mockData: PickupRequest[] = [
      {
        id: "REQ001",
        location: "Andheri West",
        time: "2:30 PM",
        scrapType: "Mixed Scrap (25 kg)",
        distance: "1.2 km",
      },
      {
        id: "REQ002",
        location: "Versova",
        time: "3:00 PM",
        scrapType: "Plastic (10 kg)",
        distance: "0.8 km",
      },
      {
        id: "REQ003",
        location: "Malad",
        time: "4:00 PM",
        scrapType: "Paper (8 kg)",
        distance: "1.5 km",
      },
    ];
    setPickupRequests(mockData);
    setPickupCount(mockData.length);
    setActivities([
      {
        type: "new",
        message: "New pickup request from Andheri West",
        timeAgo: "10 mins ago",
      },
    ]);
  }, []);

  const updateActivity = (type: Activity["type"], message: string) => {
    setActivities((prev) => [
      { type, message, timeAgo: "Just now" },
      ...prev,
    ]);
  };

  const handleAccept = (id: string) => {
    const req = pickupRequests.find((r) => r.id === id);
    if (!req) return;
    updateActivity("new", `Accepted pickup from ${req.location}`);
  };

  const handleComplete = (id: string) => {
    const req = pickupRequests.find((r) => r.id === id);
    if (!req) return;
    setPickupRequests((prev) => prev.filter((r) => r.id !== id));
    setPickupCount((prev) => prev - 1);
    updateActivity("completed", `Completed pickup at ${req.location}`);
  };

  const handleReject = (id: string) => {
    const req = pickupRequests.find((r) => r.id === id);
    if (!req) return;
    setPickupRequests((prev) => prev.filter((r) => r.id !== id));
    setPickupCount((prev) => prev - 1);
    updateActivity("cancelled", `Rejected pickup from ${req.location}`);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar activePage="dashboard" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-6 space-y-10"
      >
        <HeaderBar />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Today's Pickups" value={`${pickupCount} Requests`} />
          <StatCard title="Total Weight" value="150 kg" />
          <StatCard title="Factory Requests" value="3 Factories" />
          <StatCard title="Today's Earnings" value="₹3,750" />
        </div>

        {/* Pickup Requests */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Pickup Requests</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pickupRequests.map((req) => (
              <div key={req.id} className="relative bg-white border p-4 rounded-lg shadow">
                <p className="text-sm font-semibold mb-1">{req.location} • {req.distance}</p>
                <p className="text-xs text-gray-500">⏰ {req.time}</p>
                <p className="text-xs text-gray-500">♻️ {req.scrapType}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleComplete(req.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="border border-red-600 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="bg-white border p-4 rounded-lg shadow space-y-3">
            {activities.map((activity, idx) => (
              <ActivityCard key={idx} {...activity} />
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
