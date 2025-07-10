"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function RewardsPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const earnings = {
    total: "₹4,580",
    ecoPoints: 2450,
    rank: "Gold",
    nextTier: "125 points to Platinum",
    monthlyEarnings: "₹580",
    monthlyPickups: 15,
  };

  const transactions = [
    {
      date: "2024-02-15",
      action: "Pickup",
      type: "Mixed Paper",
      amount: "₹580",
      points: 145,
      status: "Completed",
    },
    {
      date: "2024-02-12",
      action: "Scan Bonus",
      type: "Plastic Bottles",
      amount: "₹320",
      points: 80,
      status: "Completed",
    },
    {
      date: "2024-02-10",
      action: "Redemption",
      type: "-",
      amount: "₹0",
      points: -200,
      status: "Redeemed",
    },
    {
      date: "2024-02-05",
      action: "Pickup",
      type: "Electronics",
      amount: "₹1200",
      points: 300,
      status: "Completed",
    },
  ];

  const rewards = [
    {
      name: "Free Coffee",
      image: "/coffee.jpg",
      cost: 200,
    },
    {
      name: "Eco Burger",
      image: "/burger.jpg",
      cost: 350,
    },
    {
      name: "₹100 Store Credit",
      image: "/shop.jpg",
      cost: 500,
    },
    {
      name: "Eco Cafe Voucher",
      image: "/cafe.jpg",
      cost: 750,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-32">
        <h1 className="text-2xl font-bold mb-4" data-aos="fade-down">
          Your Rewards & Earnings
        </h1>
        <p className="text-gray-600 mb-8" data-aos="fade-up">
          Track your scrap pickup earnings, EcoPoints, and redemptions.
        </p>

        {/* Earnings Summary */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10" data-aos="fade-up">
          <div className="bg-white shadow-md p-4 rounded">
            <p className="text-sm text-gray-500 mb-1">💸 Total Earnings</p>
            <h2 className="text-xl font-semibold">{earnings.total}</h2>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <p className="text-sm text-gray-500 mb-1">🏅 EcoPoints</p>
            <h2 className="text-xl font-semibold">{earnings.ecoPoints}</h2>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <p className="text-sm text-gray-500 mb-1">🥇 Current Rank</p>
            <h2 className="text-xl font-semibold">{earnings.rank}</h2>
            <p className="text-xs text-green-700">{earnings.nextTier}</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <p className="text-sm text-gray-500 mb-1">📆 This Month</p>
            <h2 className="text-xl font-semibold">{earnings.monthlyEarnings}</h2>
            <p className="text-xs text-gray-600">{earnings.monthlyPickups} pickups completed</p>
          </div>
        </section>

        {/* Transactions */}
        <section data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-green-100 text-gray-700 text-sm">
                <tr>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Action</th>
                  <th className="text-left px-4 py-2">Scrap Type</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-left px-4 py-2">EcoPoints</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-3">{txn.date}</td>
                    <td className="px-4 py-3 font-semibold">{txn.action}</td>
                    <td className="px-4 py-3">{txn.type}</td>
                    <td className="px-4 py-3">{txn.amount}</td>
                    <td className="px-4 py-3">{txn.points}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          txn.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rewards Section */}
        <section className="mt-16" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {rewards.map((reward, idx) => (
              <div key={idx} className="bg-white shadow p-4 rounded-md">
                <img src={reward.image} alt={reward.name} className="w-full h-32 object-cover rounded mb-4" />
                <h3 className="text-lg font-medium">{reward.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {reward.cost} EcoPoints required
                </p>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      
    </>
  );
}
