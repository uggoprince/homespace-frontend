'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useQuery } from '@apollo/client';
import { AgencyGrid } from '@/components/AgencyGrid';
import { useAgencyStore } from '@/stores/agencyStore';
import { GET_AGENCIES } from '@/lib/graphql/agency';
import ErrorHandler from '@/components/ErrorHandler';
import { Agency } from '@/types/property';

interface AgenciesResult {
  agencies: Agency[];
  count: number;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function AgenciesPage() {
  const mounted = useIsMounted();
  const { q, offset, limit, setOffset, syncFromUrl } = useAgencyStore();

  useEffect(() => {
    syncFromUrl();
    const handlePopState = () => syncFromUrl();
    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, [syncFromUrl]);

  const variables = q
    ? { offset, limit, search: q }
    : { offset, limit };

  const { loading: queryLoading, error, data, refetch } = useQuery(GET_AGENCIES, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });
  const loading = !mounted || queryLoading;

  useEffect(() => {
    if (loading) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [loading]);

  if (error) return <ErrorHandler error={error} onRetry={() => refetch()} type="agency" />;

  const result: AgenciesResult = data?.getAgencies || { agencies: [], count: 0 };

  return (
    <div className="container mx-auto pb-14 page-content">
      <AgencyGrid
        loading={loading}
        agencies={result.agencies || []}
        count={result.count || 0}
        offset={offset}
        onPageChange={setOffset}
      />
    </div>
  );
}
