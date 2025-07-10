type PickupRequest = {
  id: string;
  location: string;
  time: string;
  scrapType: string;
  distance: string;
};

export default function PickupCard({
  id,
  location,
  time,
  scrapType,
  distance,
}: PickupRequest) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm relative">
      {/* ✅ Single clean NEW badge */}
      <span className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold shadow">
        NEW
      </span>

      <div className="text-sm text-gray-700 space-y-1">
        <p>📍 <span className="font-medium">{location}</span> • {distance} away</p>
        <p>⏰ {time}</p>
        <p>♻️ {scrapType}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">
          Accept
        </button>
        <button className="border px-3 py-1 rounded text-sm hover:bg-gray-100 transition">
          Reject
        </button>
      </div>
    </div>
  );
}
