'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/types/property';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCard, PropertyCardSkeleton } from '@/components/Cards';
import PropertyDetailsSideView from '@/components/Property/PropertyDetailsSideView';
import SearchPaginator from '@/components/SearchPaginator';
import { usePropertyDetailsStore } from '@/stores/propertyDetailsStore';

const SKELETON_KEYS = Array.from({ length: 9 }, (_, i) => `skeleton-${i}`);

interface PropertyGridProps {
  loading: boolean;
  properties: Property[];
  count: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

const PropertyGrid = ({
  loading, properties, count, offset, onPageChange,
}: PropertyGridProps) => {
  const selectedProperty = usePropertyDetailsStore((s) => s.selectedProperty);
  const isOpen = !!selectedProperty;
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('.header');
    if (!header) return;
    const updateHeight = () => setHeaderHeight(header.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  let pageIndex = 0;
  if (!loading) {
    pageIndex = (offset / 12) + 1;
  }
  const isPage1 = pageIndex === 1;

  const resultText = isPage1 ? `About ${count} results` : `Page ${pageIndex} of ${count} results`;
  const itemCount = loading
    ? <Skeleton className="w-45 h-7" />
    : <div>{resultText}</div>;

  return (
    <>
      {/* Properties grid */}
      <div
        className="transition-[width] duration-300 ease-in-out"
        style={{ width: isOpen ? '65%' : '100%' }}
      >
        <div className="w-full min-h-full space-y-6">
          <div className="w-auto mt-6 text-lg dark:text-white">
            {itemCount}
          </div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
            {loading && SKELETON_KEYS.map((key) => (
              <PropertyCardSkeleton key={key} />
            ))}
            {!loading && properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="w-full pt-3">
            <SearchPaginator
              totalCount={count}
              currentOffset={offset}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      {/* Property details sidebar - fixed to right edge of screen */}
      <div
        className="fixed right-0 bottom-0 z-20 overflow-x-hidden overflow-y-auto
          bg-white dark:bg-slate-900
          transition-[width,min-width] duration-300 ease-in-out border-l-[0.5px] border-gray-300 dark:border-gray-700
          shadow-[0px_0px_5px_#aaaaaa] dark:shadow-[0px_0px_0px_#888888]"
        id="propertyDetailsSidebar"
        style={{
          top: `${headerHeight}px`,
          width: isOpen ? '35%' : '0%',
          minWidth: isOpen ? '400px' : '0px',
        }}
      >
        {selectedProperty && <PropertyDetailsSideView property={selectedProperty} />}
      </div>
    </>
  );
};

export default PropertyGrid;
