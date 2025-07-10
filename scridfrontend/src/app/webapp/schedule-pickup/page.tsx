"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

// Type definition for ScrapPal
type ScrapPal = {
  name: string;
  id: string;
  rating: number;
  distance: string;
  avatar: string;
};

const mockScrapPals: ScrapPal[] = [
  {
    name: "Rajesh Kumar",
    id: "KW38291",
    rating: 4.5,
    distance: "2.5 km",
    avatar: "🧑",
  },
  {
    name: "Anita Sharma",
    id: "KW15892",
    rating: 4.8,
    distance: "1.8 km",
    avatar: "👩",
  },
  {
    name: "Vikram Singh",
    id: "KW89410",
    rating: 4.6,
    distance: "3.2 km",
    avatar: "👨",
  },
];

const allScrapCategories: {
  title: string;
  items: { name: string; price: string }[];
}[] = [
  {
    title: "♻️ Normal Recyclables",
    items: [
      { name: "📰 Newspaper", price: "₹14/kg" },
      { name: "📦 Cardboard", price: "₹8/kg" },
      { name: "🍾 Bottles", price: "₹2/kg" },
    ],
  },
  {
    title: "🔌 Small Appliances",
    items: [
      { name: "📠 Printer", price: "₹20/kg" },
      { name: "📺 CRT TV", price: "₹200/pc" },
    ],
  },
  {
    title: "📱 Mobiles & Computers",
    items: [
      { name: "💻 Laptop", price: "₹300/pc" },
      { name: "🧠 CPU", price: "₹225/pc" },
    ],
  },
  {
    title: "🧺 Large Appliances",
    items: [
      { name: "❄️ AC", price: "₹4150/pc" },
      { name: "🧊 Fridge", price: "₹1200/pc" },
    ],
  },
];

const whyUs = [
  {
    icon: "🚀",
    title: "Fast Pickup",
    description: "Schedule and get your scrap picked up within hours."
  },
  {
    icon: "💰",
    title: "Best Rates",
    description: "We offer competitive market rates for all materials."
  },
  {
    icon: "🌱",
    title: "Eco Friendly",
    description: "Every pickup contributes to a cleaner environment."
  }
];

export default function SchedulePickupPage() {
  const [scrapType, setScrapType] = useState("Plastic");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning (8 AM - 12 PM)");
  const [scrapPal, setScrapPal] = useState<ScrapPal | null>(null);
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
        setLocationFetched(true);
      },
      () => alert("Unable to fetch location")
    );
  };

  const handleConfirmPickup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://your-backend-api.com/api/schedule", {
        scrapType,
        quantity,
        address,
        date,
        time,
      });

      if (response.data.success) {
        const pal = mockScrapPals[Math.floor(Math.random() * mockScrapPals.length)];
        setScrapPal(pal);
        setPickupConfirmed(true);
        console.log("Pickup scheduled and ScrapPal assigned.");
      } else {
        alert("Failed to schedule pickup. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while scheduling pickup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto pt-28 px-4 min-h-screen text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-6 sm:p-10 mb-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6">📅 Schedule a Pickup</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {["Plastic", "Paper", "Metal", "E-Waste"].map((type) => (
            <button
              key={type}
              onClick={() => setScrapType(type)}
              className={`rounded border py-3 font-medium transition ${
                scrapType === type
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white border-gray-300 dark:border-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter quantity (e.g. 10kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-3 rounded w-full bg-white dark:bg-zinc-900 dark:border-zinc-700"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Pickup Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-3 rounded w-full bg-white dark:bg-zinc-900 dark:border-zinc-700"
            />
            <button
              onClick={getCurrentLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              📍 Use Current Location
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-3 rounded w-full bg-white dark:bg-zinc-900 dark:border-zinc-700"
            />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-3 rounded w-full bg-white dark:bg-zinc-900 dark:border-zinc-700"
            >
              <option>Morning (8 AM - 12 PM)</option>
              <option>Afternoon (12 PM - 4 PM)</option>
              <option>Evening (4 PM - 8 PM)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleConfirmPickup}
          disabled={isLoading}
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition w-full sm:w-auto mt-4"
        >
          {isLoading ? "Scheduling..." : "Confirm Pickup ✅"}
        </button>

        {pickupConfirmed && scrapPal && (
          <div className="mt-10 p-6 border rounded-xl shadow bg-white dark:bg-zinc-800" data-aos="fade-up">
            <h3 className="text-lg font-semibold mb-4">🎉 Your ScrapPal is on the way!</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-5xl">{scrapPal.avatar}</div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-lg">{scrapPal.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">ID: {scrapPal.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">⭐ {scrapPal.rating} rating</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">📍 {scrapPal.distance} away</p>
              </div>
              <button className="text-green-700 border border-green-700 px-4 py-2 rounded hover:bg-green-50 transition dark:border-green-400 dark:text-green-400 dark:hover:bg-zinc-700">
                📞 Call Now
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden whitespace-nowrap mb-16">
        <div className="flex animate-scroll-trail gap-8 w-max">
          {allScrapCategories.map((category, index) => (
            <div key={index} className="min-w-[300px] bg-white dark:bg-zinc-800 p-4 rounded shadow">
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              <div className="space-y-2">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700"
                  >
                    <p className="font-semibold text-green-600">{item.name}</p>
                    <p className="text-sm">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-24 px-4" data-aos="fade-up">
        {whyUs.map((feature, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
