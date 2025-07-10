import Sidebar from "@/components/saasmodel_components/layout/sidebar";
import Header from "@/components/saasmodel_components/layout/header";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-[#101717] min-h-screen">
      {/* Sidebar (fixed, 16rem wide) */}
      <Sidebar />

      {/* Main content pushed right using pl-64 */}
      <div className="pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="pt-24 px-4 pb-10 bg-[#f6fff4] dark:bg-[#101e1e] min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
