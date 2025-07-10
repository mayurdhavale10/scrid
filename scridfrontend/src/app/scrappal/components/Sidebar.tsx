"use client";

import Link from "next/link";
import Image from "next/image";

export default function Sidebar({ activePage }: { activePage: string }) {
  const linkClass = (page: string) =>
    `block px-4 py-2 rounded font-medium ${
      activePage === page
        ? "bg-green-600 text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md h-full hidden md:flex flex-col justify-between">
      <div className="pt-10 px-8 space-y-6">
        <h1 className="text-2xl font-bold text-green-700">♻️ ScrapPal</h1>
        <nav className="space-y-2 pt-6 text-sm">
          <Link href="/scrappal/dashboard" className={linkClass("dashboard")}>
            📊 Dashboard
          </Link>
          <Link href="/scrappal/requests" className={linkClass("requests")}>
            🚚 Pickup Requests
          </Link>
          <Link href="#" className={linkClass("factory")}>
            🏭 Factory Pickups
          </Link>
          <Link href="#" className={linkClass("history")}>
            📜 History
          </Link>
          <Link href="#" className={linkClass("earnings")}>
            💰 Earnings
          </Link>
          <Link href="#" className={linkClass("settings")}>
            ⚙️ Settings
          </Link>
        </nav>
      </div>
      <div className="px-6 pb-6 flex items-center gap-3 border-t pt-4">
        <Image
          src="https://randomuser.me/api/portraits/men/75.jpg"
          width={36}
          height={36}
          alt="ScrapPal"
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-medium">Rajeev Chauhan</p>
          <p className="text-xs text-gray-500">Scrap Collector</p>
        </div>
      </div>
    </aside>
  );
}
