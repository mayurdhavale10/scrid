"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Package,
  Truck,
  FileText,
  TrendingUp,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Dashboard", href: "/saasmodel/dashboard", icon: LayoutDashboard },
  { label: "Machines", href: "/saasmodel/machines", icon: Cpu },
  { label: "Inventory", href: "/saasmodel/inventory", icon: Package },
  { label: "Logistics", href: "/saasmodel/logistics", icon: Truck },
  { label: "Invoices", href: "/saasmodel/invoices", icon: FileText },
  { label: "Profit", href: "/saasmodel/profit", icon: TrendingUp },
  { label: "Employees", href: "/saasmodel/employeedetails", icon: Users },
  { label: "Settings", href: "/saasmodel/setting", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#1A2E2E]/95 backdrop-blur-md text-white z-40 shadow-lg flex flex-col justify-between">
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2 mt-12">
          {routes.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all relative",
                  isActive
                    ? "bg-[#164C3A] text-white shadow-inner"
                    : "text-gray-300 hover:bg-[#164C3A]/80 hover:text-white"
                )}
                title={label}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{label}</span>
                <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 text-xs rounded shadow-md hidden group-hover:inline md:hidden z-50">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/avatar-user.webp"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium hidden md:inline">Annie</span>
        </div>
        <button className="hover:text-red-400" title="Logout">
          <LogOut size={18} />
          <span className="sr-only">Logout</span>
        </button>
      </div>
    </aside>
  );
}
