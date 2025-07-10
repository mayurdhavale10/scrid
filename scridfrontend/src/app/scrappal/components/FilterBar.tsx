"use client";

import { useState } from "react";

export default function FilterBar({
  onSearchChange,
  onDateChange,
}: {
  onSearchChange: (val: string) => void;
  onDateChange: (date: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="bg-white border shadow p-6 px-10 rounded-lg space-y-4 mt-4">
      <input
        type="text"
        placeholder="Search by location or type"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearchChange(e.target.value);
        }}
        className="border px-3 py-2 rounded w-full md:w-64"
      />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          onDateChange(e.target.value);
        }}
        className="border px-3 py-2 rounded text-sm"
      />
    </div>
  );
}
