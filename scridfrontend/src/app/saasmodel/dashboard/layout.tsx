import React from "react";
import Sidebar from "@/components/saasmodel_components/layout/sidebar";
import Header from "@/components/saasmodel_components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#101717]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="pt-16 ml-64 px-4">
 {/* ⬅️ Removed ml-64, kept header offset */}
          {children}
        </main>
      </div>
    </div>
  );
}


