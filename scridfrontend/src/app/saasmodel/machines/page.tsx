"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy-load components to improve performance
const MachineSelector = dynamic(() => import('@/components/saasmodel_components/machines_components/MachineSelector'));
const MachineHealth = dynamic(() => import('@/components/saasmodel_components/machines_components/MachineHealth'));
const MachineMetadata = dynamic(() => import('@/components/saasmodel_components/machines_components/MachineMetadata'));
const PerformanceAnalytics = dynamic(() => import('@/components/saasmodel_components/machines_components/PerformanceAnalytics'));
const CostImpact = dynamic(() => import('@/components/saasmodel_components/machines_components/CostImpact'));
const MaintenanceLogs = dynamic(() => import('@/components/saasmodel_components/machines_components/MaintenanceLogs'));
const UserAccess = dynamic(() => import('@/components/saasmodel_components/machines_components/UserAccess'));
const AISuggestions = dynamic(() => import('@/components/saasmodel_components/machines_components/AISuggestions'));
const ComplianceDocs = dynamic(() => import('@/components/saasmodel_components/machines_components/ComplianceDocs'));
const ReportsExport = dynamic(() => import('@/components/saasmodel_components/machines_components/ReportsExport'));

export default function MachinesDashboardPage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-emerald-700">⚙️ Machine Dashboard</h1>

      <Suspense fallback={<p className="text-sm text-gray-500">Loading Selector...</p>}>
        <MachineSelector />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<Skeleton name="MachineHealth" />}>
          <MachineHealth />
        </Suspense>
        <Suspense fallback={<Skeleton name="MachineMetadata" />}>
          <MachineMetadata />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton name="PerformanceAnalytics" />}>
        <PerformanceAnalytics />
      </Suspense>

      <Suspense fallback={<Skeleton name="CostImpact" />}>
        <CostImpact />
      </Suspense>

      <Suspense fallback={<Skeleton name="MaintenanceLogs" />}>
        <MaintenanceLogs />
      </Suspense>

      <Suspense fallback={<Skeleton name="UserAccess" />}>
        <UserAccess />
      </Suspense>

      <Suspense fallback={<Skeleton name="AISuggestions" />}>
        <AISuggestions />
      </Suspense>

      <Suspense fallback={<Skeleton name="ComplianceDocs" />}>
        <ComplianceDocs />
      </Suspense>

      <Suspense fallback={<Skeleton name="ReportsExport" />}>
        <ReportsExport />
      </Suspense>
    </div>
  );
}

function Skeleton({ name }: { name: string }) {
  return (
    <div className="p-6 bg-white dark:bg-[#1a2e2e] rounded-2xl shadow-md text-sm text-gray-400">
      Loading {name}...
    </div>
  );
}
