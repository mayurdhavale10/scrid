"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@components/Footer";
// Import custom components
import Navbar from "@components/Navbar";
import LoginModal from "@components/LoginModal";
import SignupModal from "@components/SignupModal";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Navbar with login/signup triggers */}
      <Navbar 
        onLoginClick={() => setShowLogin(true)} 
        onSignupClick={() => setShowSignup(true)} 
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitch={() => {
          setShowLogin(false);
          setShowSignup(true);
        }} 
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)} 
        onSwitch={() => {
          setShowSignup(false);
          setShowLogin(true);
        }} 
      />

      {/* Hero Section */}
      <main className="pt-[140px] px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-140px)]">
        <div className="w-full md:w-1/2 md:pr-10" data-aos="fade-right">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-snug mb-6 break-words">
            Recycle Smart.<br />Earn Smarter.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Turn your waste into rewards while saving the planet. Join thousands
            of eco-warriors making a difference, one recycling action at a time.
          </p>

          <div className="flex gap-6 mb-24">
            <button className="bg-green-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-800 transition">
              Start Recycling
            </button>
            <button className="border border-green-700 text-green-700 font-semibold px-6 py-3 rounded-md hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div
          className="w-full md:w-[500px] h-[300px] mt-10 md:mt-0 relative overflow-hidden rounded-xl shadow-xl"
          data-aos="fade-left"
        >
          <video
            src="/scrid-home-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
      </main>

      {/* Feature Cards */}
      <section
        className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {[
          {
            iconImg: "/upload.png",
            title: "Scan & Identify",
            desc: "Upload photos of your scrap for instant AI-powered identification and pricing",
            link: "Upload Now →",
          },
          {
            iconImg: "/star.png",
            title: "Collect EcoPoints",
            desc: "Convert your recycling actions into points and unlock exciting rewards",
            link: "View Rewards →",
          },
          {
            iconImg: "/earth.png",
            title: "See Your Impact",
            desc: "Track your contribution to environmental conservation in real-time",
            link: "Check Impact →",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-green-100 p-6 rounded-lg shadow-md"
            data-aos="fade-up"
          >
            <Image
              src={card.iconImg}
              alt={card.title}
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              {card.title}
            </h3>
            <p className="text-green-800 text-sm mb-4">{card.desc}</p>
            <a
              href="#"
              className="text-green-900 font-medium hover:underline text-sm"
            >
              {card.link}
            </a>
          </div>
        ))}
      </section>

      {/* Impact Stats */}
      <section
        className="max-w-7xl mx-auto px-4 mt-20 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-10">Our Collective Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            ["🌲", "1,234", "Trees Preserved"],
            ["🌍", "50,000", "kg CO₂ Reduced"],
            ["♻️", "100,000", "kg Waste Recycled"],
            ["⭐", "500,000", "EcoPoints Earned"],
          ].map(([icon, value, label], i) => (
            <div key={i}>
              <div className="text-green-700 text-4xl">{icon}</div>
              <div className="text-xl font-bold">{value}</div>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Recyclers */}
      <section
        className="max-w-7xl mx-auto px-4 mt-20 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-10">Top Recyclers</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((rank, index) => (
            <div
              key={rank}
              className="flex justify-between items-center max-w-md mx-auto"
            >
              <span className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold">{rank}</span>
                Eco Warrior {rank}
              </span>
              <span className="text-sm text-gray-600">
                {1000 - index * 100} points 🌟
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Redeem & Eat */}
      <section
        className="max-w-7xl mx-auto px-4 mt-20 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-10">Redeem & Eat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="bg-white rounded-lg shadow p-4"
              data-aos="fade-up"
            >
              <Image
                src={`/cafe${num}.jpg`}
                alt={`Eco Cafe ${num}`}
                width={200}
                height={120}
                className="rounded mb-3 w-full object-cover"
              />
              <h3 className="font-semibold text-gray-800">Eco Cafe {num}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Redeem your points for delicious meals
              </p>
              <p className="text-green-700 font-bold mb-2">500 points</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                Redeem
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Our Partners */}
      <section
        className="max-w-7xl mx-auto px-4 mt-20 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-10">Our Partners</h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              src={`/partner${i}.png`}
              alt={`Partner ${i}`}
              width={100}
              height={60}
              className="object-contain"
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
 