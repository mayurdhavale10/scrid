"use client";

interface TransferRecord {
  item: string;
  quantity: number;
  from: string;
  to: string;
  timestamp: string;
}

interface TransferHistoryProps {
  records: TransferRecord[];
  onEdit?: (index: number, newQty: number) => void;
  onDelete?: (index: number) => void;
}

export default function TransferHistory({
  records = [],
  onEdit,
  onDelete,
}: TransferHistoryProps) {
  const handleEdit = (index: number) => {
    const current = records[index];
    const newQty = prompt("Enter new quantity:", current.quantity.toString());
    if (newQty !== null && !isNaN(Number(newQty))) {
      onEdit?.(index, Number(newQty));
    }
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      onDelete?.(index);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">📜 Transfer History</h2>
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-gray-600 dark:text-gray-300">
            <th className="border-b py-2">Item</th>
            <th className="border-b py-2">Qty</th>
            <th className="border-b py-2">From</th>
            <th className="border-b py-2">To</th>
            <th className="border-b py-2">Timestamp</th>
            <th className="border-b py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => (
            <tr key={idx} className="text-gray-800 dark:text-gray-200">
              <td className="border-b py-2">{record.item}</td>
              <td className="border-b py-2">{record.quantity}</td>
              <td className="border-b py-2">{record.from}</td>
              <td className="border-b py-2">{record.to}</td>
              <td className="border-b py-2">{record.timestamp}</td>
              <td className="border-b py-2 space-x-2">
                <button onClick={() => handleEdit(idx)} className="text-blue-600 hover:underline text-xs">✏️ Edit</button>
                <button onClick={() => handleDelete(idx)} className="text-red-600 hover:underline text-xs">🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
