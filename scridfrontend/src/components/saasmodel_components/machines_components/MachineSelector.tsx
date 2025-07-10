'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

type Machine = {
  id: string;
  name: string;
  type: string;
  status: 'Running' | 'Idle' | 'Down';
  location: string;
  image: string;
};

const machines: Machine[] = [
  {
    id: 'SHD-002',
    name: 'Shredder #2',
    type: 'Shredder',
    status: 'Running',
    location: 'Line 1 → Zone A',
    image: '/saas_assets/shredder.webp',
  },
  {
    id: 'SEP-004',
    name: 'Magnetic Separator',
    type: 'Separator',
    status: 'Idle',
    location: 'Line 2 → Zone B',
    image: '/saas_assets/magnetic.webp',
  },
  {
    id: 'EXT-007',
    name: 'Dust Extractor',
    type: 'Extractor',
    status: 'Down',
    location: 'Line 1 → Zone C',
    image: '/saas_assets/dust.webp',
  },
];

const statusColors = {
  Running: 'bg-green-500',
  Idle: 'bg-yellow-400',
  Down: 'bg-red-500',
};

export default function MachineSelector() {
  const [selectedId, setSelectedId] = useState('SHD-002');

  return (
    <div className="flex space-x-4 overflow-x-auto no-scrollbar py-4 px-2">
      {machines.map((machine) => {
        const isSelected = machine.id === selectedId;

        return (
          <div
            key={machine.id}
            onClick={() => setSelectedId(machine.id)}
            className={clsx(
              'min-w-[260px] cursor-pointer rounded-xl shadow-md backdrop-blur-sm p-4 transition-all duration-200 border',
              isSelected
                ? 'border-emerald-600 bg-white/70 dark:bg-[#1a2e2e]/80'
                : 'border-transparent bg-white/40 dark:bg-[#1a2e2e]/60 hover:border-emerald-500'
            )}
          >
            <div className="relative w-full h-36 mb-3 rounded-lg overflow-hidden">
              <Image
                src={machine.image}
                alt={machine.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <h3 className="text-md font-semibold text-gray-800 dark:text-white">
              {machine.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              {machine.type} | {machine.id}
            </p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {machine.location}
              </span>
              <span
                className={clsx(
                  'ml-2 h-3 w-3 rounded-full',
                  statusColors[machine.status]
                )}
                title={machine.status}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
