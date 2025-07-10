type RequestProps = {
  id: string;
  address: string;
  distance: string;
  time: string;
  type: string;
  customer: string;
  isNew?: boolean;
};

export default function RequestCard({
  address,
  distance,
  time,
  type,
  customer,
  isNew,
}: RequestProps) {
  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm relative">
      {isNew && (
        <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
          NEW
        </span>
      )}
      <div className="text-sm space-y-1 text-gray-800">
        <p>📍 <span className="font-medium">{address}</span> • {distance} away</p>
        <p>⏰ {time}</p>
        <p>♻️ {type}</p>
        <p>👤 {customer}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">Accept</button>
        <button className="bg-gray-100 px-4 py-1 rounded text-sm">Reject</button>
      </div>
    </div>
  );
}

