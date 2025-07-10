import Sidebar from "@/components/saasmodel_components/layout/sidebar";
import Header from "@/components/saasmodel_components/layout/header";

export default function MachineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-[#101717] min-h-screen">
      <Sidebar /> {/* This is fixed at w-64 (16rem) */}
      <div className="pl-64 flex flex-col min-h-screen"> {/* Add left padding = sidebar width */}
        <Header /> {/* Make sure Header is not overlapping */}
        <main className="pt-16 px-4">{children}</main> {/* top padding = header height */}
      </div>
    </div>
  );
}
