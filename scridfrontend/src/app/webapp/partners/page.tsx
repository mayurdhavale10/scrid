"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function PartnersPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex flex-col justify-center items-start px-6 text-white"
        style={{
          backgroundImage: "url(/partnering.png)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >   
      </section>

      {/* Partner Stats */}
      <section className="py-12 bg-white text-center" data-aos="fade-up">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {["2,450+", "1.2M", "850K", "15M+"].map((stat, idx) => (
            <div key={idx}>
              <div className="text-2xl font-bold text-green-700">{stat}</div>
              <p className="text-gray-600 text-sm">
                {[
                  "Active Partners",
                  "Tons CO₂ Offset",
                  "kg Plastic Saved",
                  "Generated for Green Initiatives"
                ][idx]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner of the Month */}
      <section className="py-12 bg-green-50" data-aos="fade-up">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <Image src="/dustbin.png" alt="Partner logo" width={300} height={200} className="rounded" />
          <div>
            <p className="text-xs uppercase text-gray-500 mb-1">Partner of the Month</p>
            <h2 className="text-2xl font-bold mb-2">TerraCycle</h2>
            <p className="text-gray-700 mb-4 max-w-md">
              Revolutionizing recycling solutions for hard-to-recycle materials through innovative programs and circular economy initiatives.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Waste Recycled: <strong>50M kg</strong></li>
              <li>Global Reach: <strong>21 Countries</strong></li>
              <li>Active Programs: <strong>300+</strong></li>
              <li>Impact Score: <strong>95/100</strong></li>
            </ul>
            <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Sustainable Partners */}
      <section className="py-16 bg-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-10">Our Sustainable Partners</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            ["EcoVibe", "Bamboo Cutlery Set", "€24.99", "125 EcoPoints"],
            ["GreenTech Solutions", "Solar Power Bank", "€49.99", "250 EcoPoints"],
            ["Pure Earth", "Organic Care Package", "€39.99", "200 EcoPoints"],
            ["Sustainable Threads", "Recycled Cotton Tee", "€29.99", "150 EcoPoints"],
            ["Clean Ocean", "Recycled Ocean Bottle", "€34.99", "175 EcoPoints"],
            ["Forest First", "Recycled Notebook Set", "€19.99", "100 EcoPoints"]
          ].map(([name, product, price, points], i) => (
            <div key={i} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-1">{name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product}</p>
              <p className="text-green-700 font-semibold mb-1">{price}</p>
              <p className="text-xs text-gray-500 mb-2">{points}</p>
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                Buy & Earn
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-20 bg-green-50" data-aos="fade-up">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Join Our Sustainable Ecosystem</h3>
            <ul className="text-gray-700 list-disc list-inside space-y-2 text-sm">
              <li>Access to 1M+ eco-conscious customers</li>
              <li>Sustainable business certification</li>
              <li>Marketing and visibility support</li>
              <li>Impact tracking and reporting</li>
              <li>Earn EcoPoints through purchases</li>
            </ul>
          </div>
          <form className="bg-white p-6 rounded shadow-md space-y-4">
            <h4 className="text-lg font-semibold">Apply to Become a Partner</h4>
            <input type="text" placeholder="Company Name" className="w-full border px-4 py-2 rounded text-sm" />
            <input type="email" placeholder="Business Email" className="w-full border px-4 py-2 rounded text-sm" />
            <select className="w-full border px-4 py-2 rounded text-sm">
              <option>Select your industry</option>
              <option>Recycling</option>
              <option>Retail</option>
              <option>Technology</option>
              <option>Logistics</option>
            </select>
            <textarea placeholder="Tell us about your sustainable initiatives" rows={4} className="w-full border px-4 py-2 rounded text-sm" />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full">
              Submit Application
            </button>
          </form>
        </div>
      </section>

      
    </>
  );
}
