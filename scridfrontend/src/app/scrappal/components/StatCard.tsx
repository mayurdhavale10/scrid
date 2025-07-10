export default function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}