'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';
import { usePropertyStore } from '@/stores/propertyStore';
import {
  GET_PROPERTIES_AND_FILTER,
} from '@/lib/graphql/property';
import ErrorHandler from '@/components/ErrorHandler';
import { Property } from '@/types/property';

interface PropertiesResult {
  properties: Property[];
  count: number;
}

const emptySubscribe = () => () => {};
/** Returns false on server, true on client — avoids hydration mismatch. */
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function SearchProperties({ searchQuery }: Readonly<{ searchQuery: string }>) {
  const mounted = useIsMounted();
  const { offset, limit, setOffset } = usePropertyStore();
  const { loading: queryLoading, error, data, refetch } = useQuery(GET_PROPERTIES_AND_FILTER, {
    variables: { search: searchQuery, offset, limit },
    skip: !searchQuery,
  });
  const loading = !mounted || queryLoading;

  useEffect(() => {
    if (loading) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [loading]);

  if (error) return <ErrorHandler error={error} onRetry={() => refetch()} />;

  const result: PropertiesResult = data?.getPropertiesAndFilter || { properties: [], count: 0 };

  return (
    <PropertyGrid
      loading={loading}
      properties={result.properties || []}
      count={result.count || 0}
      offset={offset}
      onPageChange={setOffset}
    />
  );
}

function HomeProperties() {
  const mounted = useIsMounted();
  const auth = useAuth();
  const country = auth?.user?.country || '';
  const { offset, limit, setOffset } = usePropertyStore();

  const { loading: queryLoading, error, data, refetch } = useQuery(GET_PROPERTIES_AND_FILTER, {
    variables: { search: country, offset, limit },
    skip: !country,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
  const loading = !mounted || queryLoading;

  useEffect(() => {
    if (loading) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [loading]);

  if (error) return <ErrorHandler error={error} onRetry={() => refetch()} type="property" />;

  const result: PropertiesResult = data?.getPropertiesAndFilter || { properties: [], count: 0 };

  return (
    <PropertyGrid
      loading={loading}
      properties={result.properties || []}
      count={result.count || 0}
      offset={offset}
      onPageChange={setOffset}
    />
  );
}

export default function Home() {
  const initialAuth = useInitialAuth();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const urlQ = searchParams.get('q') || '';
  const q = usePropertyStore((s) => s.q);
  const syncFromUrl = usePropertyStore((s) => s.syncFromUrl);
  const isAuthenticated = auth?.isAuthenticated || initialAuth.isAuthenticated;

  // Sync store from URL on mount and on popstate (browser back/forward)
  useEffect(() => {
    syncFromUrl();
    const handlePopState = () => syncFromUrl();
    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, [syncFromUrl]);

  // Landing page: unauthenticated users always see Hero
  if (!isAuthenticated && !urlQ) {
    return <Hero />;
  }

  // Search results: has search query
  if (q) {
    return (
      <div className="container hs-pb-100 page-content">
        <SearchProperties searchQuery={urlQ} />
      </div>
    );
  }

  // Authenticated home: country-filtered properties
  return (
    <div className="container hs-pb-100 page-content">
      <HomeProperties />
    </div>
  );
}
