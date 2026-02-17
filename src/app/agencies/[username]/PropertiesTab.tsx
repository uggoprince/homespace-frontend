'use client';

import { useQuery } from '@apollo/client';
import { GET_AGENCY_PROPERTIES } from '@/lib/graphql/agency';
import PropertyCard from '@/components/PropertyCard';
import { PropertyCardSkeleton } from '@/components/PropertyCard/skeleton';
import { Property } from '@/types/property';
import ErrorHandler from '@/components/ErrorHandler';

const SKELETON_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6'];

interface PropertiesTabProps {
  agencyId: string;
}

export default function PropertiesTab({ agencyId }: PropertiesTabProps) {
  const { loading, error, data, refetch } = useQuery(GET_AGENCY_PROPERTIES, {
    variables: { agencyId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const properties: Property[] = data?.getAgencyProperties?.properties || [];
  const count: number = data?.getAgencyProperties?.count || 0;


  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800/50 p-5 sm:p-6 shadow-lg">
      {loading && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {SKELETON_KEYS.map((key) => (
            <PropertyCardSkeleton key={key} />
          ))}
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No properties listed yet</h3>
          <p className="text-slate-600 dark:text-slate-400">This agency has not listed any properties</p>
        </div>
      )}

      {!loading && properties.length > 0 && (
        <>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {count} {count === 1 ? 'property' : 'properties'}
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="mt-0">
          <ErrorHandler error={error} onRetry={() => refetch()} type="property" showBackButton={false} />
        </div>
      )}
    </div>
  );
}
