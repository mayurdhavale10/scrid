"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Player = dynamic(() => import("@/components/LottieClient"), { ssr: false });

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const partnerLogos = [
    { src: "/trusted/clean.inc.webp", alt: "Clean.inc" },
    { src: "/trusted/ECOFORGE.webp", alt: "EcoForge Labs" },
    { src: "/trusted/GRANA.webp", alt: "GRANA" },
    { src: "/trusted/KOVA.webp", alt: "KOVA" },
  ];

  const stats = [
    { src: "/animations/recycling.json", label: "kg Waste Recycled", value: "100,000" },
    { src: "/animations/leaf.json", label: "kg CO₂ Saved", value: "50,000" },
    { src: "/animations/tree.json", label: "Trees Preserved", value: "1,234" },
    { src: "/animations/scridpoints.json", label: "EcoPoints Earned", value: "500,000" },
  ];

  const features = [
    {
      title: "Home Pickups (B2C)",
      desc: "Schedule a pickup for your household scrap. Clean, digital, and effortless.",
    },
    {
      title: "Factory Solutions (B2B)",
      desc: "Manage large scrap volumes with tools for inventory, analytics, and logistics.",
    },
    {
      title: "Eco Marketplace",
      desc: "Shop and sell upcycled products crafted from waste materials.",
    },
    {
      title: "Awareness & Rewards",
      desc: "Earn EcoPoints, attend green events, and track your positive impact.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6" data-aos="fade-right">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            <span className="text-green-700">Recycling.</span> <br />
            <span className="text-emerald-600">Refining.</span> <br />
            <span className="text-lime-600">Rewarding.</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Scrid is your <span className="text-green-700 font-bold text-2xl" style={{ textShadow: "1px 1px 2px #ccc" }}>one-stop</span> digital solution for scrap collection, factory logistics, eco-products & awareness.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow hover:bg-green-700 transition">
              Schedule Pickup
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-md hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0" data-aos="fade-left">
          <Player autoplay loop src="/animations/truck.json" style={{ height: "320px", width: "100%" }} />
        </div>
      </section>

      {/* Features Intro Section */}
      <section className="max-w-7xl mx-auto mt-24 px-6 text-center" data-aos="fade-up">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 tracking-tight leading-tight mt-6 flex items-center justify-center gap-3">
            Can a Single Platform Fix the Scrap Chaos?
            <Player autoplay loop src="/animations/problemsolved.json" style={{ height: "60px", width: "60px" }} />
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            Absolutely. Scrid is your <span className="text-green-700 font-extrabold text-2xl" style={{ textShadow: "2px 2px 4px #ccc" }}>one-stop</span> solution to digitize, track, and profit from your scrap journey.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto mt-16 px-6">
        <div className="grid md:grid-cols-4 gap-6" data-aos="fade-up">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-emerald-700 tracking-tight leading-snug mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Stats */}
      <section className="max-w-7xl mx-auto mt-24 px-6 text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-10 text-green-800">Live Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <Player autoplay loop src={stat.src} style={{ height: "100px", width: "100px" }} />
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teasers */}
      <section className="max-w-7xl mx-auto mt-24 px-6 grid md:grid-cols-2 gap-10" data-aos="fade-up">
        <div className="bg-green-50 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-green-900">Factory Inventory Dashboard</h3>
          <p className="text-sm text-gray-700">
            Monitor scrap flow, optimize recovery, and generate insights to increase profit through our SaaS panel.
          </p>
          <button className="mt-4 text-green-700 font-medium hover:underline">
            Preview Dashboard →
          </button>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-green-900">Top Product from Scrap</h3>
          <p className="text-sm text-gray-700">
            This upcycled tote saved 12 plastic bottles. Discover our eco product collection!
          </p>
          <button className="mt-4 text-green-700 font-medium hover:underline">
            Shop Now →
          </button>
        </div>
      </section>

      {/* Trusted By */}
      <section className="max-w-7xl mx-auto mt-24 px-6 text-center overflow-hidden">
        <h2 className="text-2xl font-bold mb-8 text-green-800">Trusted By</h2>
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {[...partnerLogos, ...partnerLogos].map((partner, i) => (
            <img
              key={i}
              src={partner.src}
              alt={partner.alt}
              className="h-12 w-auto object-contain transition duration-300"
            />
          ))}
        </motion.div>
      </section>

      {/* <Footer /> */}
    </>
  );
}



