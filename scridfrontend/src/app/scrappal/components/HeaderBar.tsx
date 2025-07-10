import Image from "next/image";

export default function HeaderBar() {
  return (
    <div className="flex justify-between items-center py-4 border-b px-2 md:px-0">
      {/* Dashboard title */}
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Dashboard</h1>

      {/* Top Right Actions */}
      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300 cursor-pointer">
          🌐 <span>EN</span> <span className="text-xs">▾</span>
        </div>

        {/* Notification Bell with Red Dot */}
        <div className="relative cursor-pointer">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-zinc-800"></span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <Image
            src="https://randomuser.me/api/portraits/men/75.jpg" // Replace with your actual avatar service
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm leading-tight">
            <p className="font-medium text-zinc-900 dark:text-white">Rahul Kumar</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Kabadiwala</p>
          </div>
        </div>
      </div>
    </div>
  );
}
