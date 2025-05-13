"use client";

import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function ScanScrapPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setShowAnalysis(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setShowAnalysis(true);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold mb-2" data-aos="fade-down">
          Scan Your Scrap
        </h1>
        <p className="text-gray-600 mb-10" data-aos="fade-up">
          Upload a photo of your recyclable items for instant AI analysis
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-green-600 bg-green-50 p-12 rounded-lg text-center mb-12"
          data-aos="zoom-in"
        >
          <div className="mb-4">
            <Image src="/upload.png" alt="Upload" width={50} height={50} className="mx-auto" />
          </div>
          <p className="text-gray-700 mb-2 text-lg">Drag & Drop your image here</p>
          <p className="mb-4 text-sm text-gray-500">or</p>
          <button
            onClick={handleBrowseClick}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
          >
            Browse Files
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {showAnalysis && uploadedImage && (
          <section className="bg-white border rounded-lg p-6 shadow-xl" data-aos="fade-up">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={uploadedImage}
                alt="Uploaded Scrap"
                width={260}
                height={200}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">AI Analysis Results</h2>
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <ul className="mt-4 space-y-1 text-sm text-gray-800">
                  <li><strong>Material Type:</strong> Mixed Plastic</li>
                  <li><strong>Approx Weight:</strong> 2.5 kg</li>
                  <li><strong>Estimated Value:</strong> ₹75.00</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-4 rounded-md text-sm text-green-800">
              ✅ You will earn 30 EcoPoints for this scan. Points will be added to your account after successful pickup.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800">
                Confirm Pickup for this Item
              </button>
              <button
                className="border border-green-700 text-green-700 px-5 py-2 rounded hover:bg-green-50"
                onClick={() => {
                  setUploadedImage(null);
                  setShowAnalysis(false);
                }}
              >
                Scan Another
              </button>
            </div>

            <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
              💡 <strong>Pro Tip:</strong> Separate plastic from paper to get more value.
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
