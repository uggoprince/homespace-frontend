"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_USER_AGENCY, GET_AGENCY_PROPERTIES } from "@/lib/graphql/agency";
import { formatPrice } from "@/Utils/formatters";
import ErrorHandler from "@/components/ErrorHandler";

// --- SVG Icons ---

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const PropertyIcon = () => (
  <svg className="w-8 h-8 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

// --- Loading skeleton ---

const TableSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex justify-between">
      <div className="space-y-2">
        <div className="h-7 w-44 bg-gray-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-60 bg-gray-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="h-10 w-36 bg-gray-200 dark:bg-slate-800 rounded-xl" />
    </div>
    <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
      <div className="h-12 bg-gray-100 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
          <div className="h-5 flex-1 bg-gray-200 dark:bg-slate-800 rounded" />
          <div className="h-5 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 dark:bg-slate-800 rounded" />
          <div className="h-5 w-12 bg-gray-200 dark:bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  </div>
);

// --- Empty state ---

const EmptyState = () => (
  <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-12 text-center transition-colors">
    <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <PropertyIcon />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties yet</h3>
    <p className="text-gray-500 dark:text-slate-400 mb-6">Start by adding your first property listing</p>
    <Link
      href="/properties/new"
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
    >
      <PlusIcon />
      Add Your First Property
    </Link>
  </div>
);

// --- Status badge ---

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
      }`}
    >
      {isActive ? "Active" : "Pending"}
    </span>
  );
};

export default function MyPropertiesPage() {
  const { data: agencyData, loading: agencyLoading } = useQuery(GET_USER_AGENCY);
  const agencyId = agencyData?.getUserAgency?.id;

  const {
    data: propertiesData,
    loading: propertiesLoading,
    error,
  } = useQuery(GET_AGENCY_PROPERTIES, {
    variables: { agencyId, offset: 0, limit: 50 },
    skip: !agencyId,
  });

  const loading = agencyLoading || propertiesLoading;

  if (loading) return <TableSkeleton />;
  if (error) return <ErrorHandler error={error} showBackButton={false} />;

  const properties = propertiesData?.getAgencyProperties?.properties || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Properties</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage your property listings</p>
        </div>
        <Link
          href="/properties/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
        >
          <PlusIcon />
          Add Property
        </Link>
      </div>

      {properties.length > 0 ? (
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Property</th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Price</th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Type</th>
                  <th className="text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {properties.map((property: Record<string, string | number>) => (
                  <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{property.title}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">{property.address}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={(property.status as string) || "active"} />
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatPrice(property.price as number, property.country as string, property.currency as string)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-500 dark:text-slate-400 capitalize">{property.propertyType}</p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/properties/${property.propertyCode}`}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
