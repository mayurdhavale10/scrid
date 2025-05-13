"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

interface ScrapPal {
  name: string;
  id: string;
  rating: number;
  distance: string;
  avatar: string;
}

const mockScrapPals: ScrapPal[] = [
  {
    name: "Rajesh Kumar",
    id: "KW38291",
    rating: 4.5,
    distance: "2.5 km",
    avatar: "/avatar1.png",
  },
  {
    name: "Anita Sharma",
    id: "KW15892",
    rating: 4.8,
    distance: "1.8 km",
    avatar: "/avatar2.png",
  },
  {
    name: "Vikram Singh",
    id: "KW89410",
    rating: 4.6,
    distance: "3.2 km",
    avatar: "/avatar3.png",
  },
];

export default function SchedulePickupPage() {
  const [scrapType, setScrapType] = useState("Plastic");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [scrapPal, setScrapPal] = useState<ScrapPal | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleConfirmPickup = () => {
    const randomPal = mockScrapPals[Math.floor(Math.random() * mockScrapPals.length)];
    setScrapPal(randomPal);
    setPickupConfirmed(true);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto pt-32 px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4" data-aos="fade-down">
          Schedule Your Scrap Pickup
        </h1>
        <p className="text-gray-600 mb-8" data-aos="fade-up">
          Select your scrap type and book a pickup at your convenience.
        </p>

        {/* Scrap Types */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" data-aos="fade-up">
          {["Plastic", "Paper", "Metal", "E-waste"].map((type) => (
            <button
              key={type}
              onClick={() => setScrapType(type)}
              className={`px-4 py-2 border rounded ${
                scrapType === type ? "bg-green-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" data-aos="fade-up">
          <input
            type="text"
            placeholder="Enter quantity (Optional)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Enter pickup address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-3 rounded w-full"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded w-full"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-3 rounded w-full"
          />
        </div>

        <button
          onClick={handleConfirmPickup}
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
          data-aos="zoom-in"
        >
          Confirm Pickup
        </button>

        {/* ScrapPal Panel */}
        {pickupConfirmed && scrapPal && (
          <section
            className="mt-12 p-6 border rounded shadow-lg bg-white"
            data-aos="fade-up"
          >
            <h2 className="text-xl font-semibold mb-4">Your ScrapPal is on the way!</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Image
                src={scrapPal.avatar}
                alt="ScrapPal Avatar"
                width={80}
                height={80}
                className="rounded-full border"
              />
              <div className="flex-1">
                <p className="text-lg font-medium">{scrapPal.name}</p>
                <p className="text-sm text-gray-600">ID: {scrapPal.id}</p>
                <p className="text-sm text-gray-600">⭐ {scrapPal.rating} rating</p>
                <p className="text-sm text-gray-600">📍 {scrapPal.distance} away</p>
              </div>
              <button className="text-green-700 border border-green-700 px-4 py-2 rounded hover:bg-green-50">
                Call Now
              </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
