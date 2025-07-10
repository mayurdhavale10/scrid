import React from "react";

export type Activity = {
  type: "completed" | "new" | "cancelled";
  message: string;
  timeAgo: string;
};

export default function ActivityCard({ type, message, timeAgo }: Activity) {
  const icon = {
    completed: "✅",
    new: "🔔",
    cancelled: "❌",
  }[type];

  return (
    <div className="text-sm flex items-start gap-2">
      <span className="text-xl">{icon}</span>
      <div>
        <p>{message}</p>
        <p className="text-gray-500 text-xs">{timeAgo}</p>
      </div>
    </div>
  );
}
