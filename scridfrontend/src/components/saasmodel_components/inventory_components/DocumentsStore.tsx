"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function DocumentsStore() {
  const [docs, setDocs] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDocs((prev) => [...prev, ...Array.from(files)]);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">📁 Inventory Documents</h2>

      <label className="flex items-center gap-3 bg-gray-100 dark:bg-[#243434] hover:bg-gray-200 dark:hover:bg-[#2f4646] text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md cursor-pointer">
        <UploadCloud className="w-5 h-5" />
        <span>Upload Files</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xlsx,.csv,.jpg,.png"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      <div className="mt-4 space-y-2">
        {docs.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No documents uploaded yet.</p>
        ) : (
          <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
            {docs.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
