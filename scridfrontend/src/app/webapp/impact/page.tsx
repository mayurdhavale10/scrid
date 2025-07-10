"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function ImpactPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = () => {
    console.log("Login clicked");
  };

  const handleSignup = () => {
    console.log("Signup clicked");
  };

  return (
    <>
      <Navbar  />

      <main className="bg-white text-gray-800 pt-20">
        {/* Hero Section */}
        <section
          className="bg-cover bg-center text-white py-24 px-4"
          style={{ backgroundImage: "url('/vol1.jpg')" }}
        >
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold">
              Measure the Difference You Make
            </h1>
            <p className="mt-4 text-lg">
              Track your environmental impact and join our community of
              change-makers
            </p>
            <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
              Get Started
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            data-aos="fade-up"
          >
            <div className="p-6 bg-white rounded shadow">
              <div className="text-3xl mb-2">🌲</div>
              <div className="text-4xl text-green-600 font-bold">1,234</div>
              <div className="text-gray-600">Trees Saved</div>
              <div className="text-sm text-gray-500">
                Through paper reduction initiatives
              </div>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <div className="text-3xl mb-2">🍃</div>
              <div className="text-4xl text-green-600 font-bold">456</div>
              <div className="text-gray-600">Tons CO₂</div>
              <div className="text-sm text-gray-500">Reduced carbon footprint</div>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <div className="text-3xl mb-2">♻️</div>
              <div className="text-4xl text-green-600 font-bold">789</div>
              <div className="text-gray-600">Tons</div>
              <div className="text-sm text-gray-500">
                Waste diverted from landfills
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6">Become a Volunteer</h2>
            <p className="mb-8 text-gray-600">
              Join our community events at Juhu Beach
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-gray-50 p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>📅 Beach Cleanup Drive – Feb 15, 2024 (Juhu Beach)</li>
                  <li>📅 Tree Planting Initiative – Feb 22, 2024 (Juhu Garden)</li>
                  <li>
                    📅 Waste Segregation Workshop – Mar 1, 2024 (Community Center)
                  </li>
                </ul>
              </div>
              <div className="bg-green-600 text-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
                <p className="mb-4 text-sm">
                  Make a difference by joining over 500 active volunteers.
                </p>
                <button className="bg-white text-green-700 font-semibold px-5 py-2 rounded hover:bg-gray-100 transition">
                  Join as Volunteer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Connect Section */}
        <section className="py-16 bg-gray-50 text-center">
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-down">
            Stay Connected
          </h2>
          <p className="mb-8 text-gray-600">
            Join our social media communities
          </p>
          <div className="flex flex-wrap justify-center gap-6" data-aos="zoom-in">
            <a
              href="#"
              className="bg-pink-500 text-white px-6 py-3 rounded shadow"
            >
              📷 Instagram
            </a>
            <a
              href="#"
              className="bg-blue-500 text-white px-6 py-3 rounded shadow"
            >
              ✈️ Telegram
            </a>
            <a
              href="#"
              className="bg-green-500 text-white px-6 py-3 rounded shadow"
            >
              💬 WhatsApp
            </a>
          </div>
        </section>

        {/* Impact Stories */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-center mb-8">Impact Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded shadow">
                <img
                  src="/beach-cleanup.jpg"
                  alt="Beach Cleanup"
                  className="rounded mb-4 w-full h-40 object-cover"
                />
                <h4 className="font-semibold">Beach Cleanup Success</h4>
                <p className="text-sm text-green-600">2 Tons of Waste Collected</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow">
                <img
                  src="/tree-planting.jpg"
                  alt="Tree Planting"
                  className="rounded mb-4 w-full h-40 object-cover"
                />
                <h4 className="font-semibold">Tree Planting Drive</h4>
                <p className="text-sm text-green-600">100 Trees Planted</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow">
                <img
                  src="/recycling.jpg"
                  alt="Recycling"
                  className="rounded mb-4 w-full h-40 object-cover"
                />
                <h4 className="font-semibold">Recycling Initiative</h4>
                <p className="text-sm text-green-600">5 Tons Recycled</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      
    </>
  );
}
