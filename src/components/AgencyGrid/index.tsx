'use client';

import { Agency } from '@/types/property';
import { Skeleton } from '@/components/ui/skeleton';
import { AgencyCardSkeleton } from '@/components/AgencyCard/skeleton';
import AgencyCard from '@/components/AgencyCard';
import SearchPaginator from '@/components/SearchPaginator';

const SKELETON_KEYS = Array.from({ length: 9 }, (_, i) => `skeleton-${i}`);

interface AgencyGridProps {
  loading: boolean;
  agencies: Agency[];
  count: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

export const AgencyGrid = ({
  loading, agencies, count, offset, onPageChange,
}: AgencyGridProps) => {
  if (count === 0 && !loading) {
    return <div className="mt-4 dark:text-white">No agency found.</div>;
  }

  let pageIndex = 0;
  if (!loading) {
    pageIndex = Math.floor(offset / 12) + 1;
  }
  const isPage1 = pageIndex === 1;

  const resultText = isPage1 ? `About ${count} results` : `Page ${pageIndex} of ${count} results`;
  const itemCount = loading
    ? <Skeleton className="w-45 h-7" />
    : <div>{resultText}</div>;

  return (
    <div className="pb-10 w-full space-y-6">
      <div className="w-auto mt-6 text-lg dark:text-white">
        {itemCount}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 justify-items-center w-full">
        {loading && SKELETON_KEYS.map((key) => (
          <AgencyCardSkeleton key={key} />
        ))}
        {!loading && agencies?.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
      <div className="pt-3 w-full">
        <SearchPaginator
          totalCount={count}
          currentOffset={offset}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AgencyGrid;
