'use client';

import { useState, useSyncExternalStore } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { ChevronLeft, Users } from 'lucide-react';
import { GET_PROPERTY_DETAILS_BY_CODE } from '@/lib/graphql/property';
import { formatPrice } from '@/Utils/formatters';

import ErrorHandler from '@/components/ErrorHandler';
import ContactButtons from '@/components/ContactButtons';
import { Property } from '@/types/property';
import FullscreenGallery from '../../../components/Property/FullscreenGallery';
import PropertyLeftColumn from '../../../components/Property/PropertyLeftColumn';
import { PropertySkeleton } from './Skeleton';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function PropertyPage() {
  const mounted = useIsMounted();
  const router = useRouter();
  const params = useParams();
  const propertyId = params.propertyId as string;

  const [state, setState] = useState({
    currentImage: 0,
    isSaved: false,
    showShareMenu: false,
    showGallery: false,
  });

  const { loading: queryLoading, error, data, refetch } = useQuery(GET_PROPERTY_DETAILS_BY_CODE, {
    variables: { propertyCode: propertyId },
    fetchPolicy: 'cache-and-network'
  });
  const loading = !mounted || queryLoading;

  const property: Property | null = data?.getPropertyByCode ?? null;
  const {
    currentImage, isSaved, showShareMenu, showGallery,
  } = state;

  const photos = property?.photos || [];
  const numberOfPhotos = photos.length;

  const nextImage = () => setState((prev) => ({
    ...prev,
    currentImage: (prev.currentImage + 1) % numberOfPhotos,
  }));

  const prevImage = () => setState((prev) => ({
    ...prev,
    currentImage: (prev.currentImage - 1 + numberOfPhotos) % numberOfPhotos,
  }));

  const setCurrentImage = (index: number) => setState((prev) => ({ ...prev, currentImage: index }));
  const toggleSaved = () => setState((prev) => ({ ...prev, isSaved: !prev.isSaved }));
  const toggleShareMenu = () => setState((prev) => ({ ...prev, showShareMenu: !prev.showShareMenu }));
  const toggleGallery = () => setState((prev) => ({ ...prev, showGallery: !prev.showGallery }));

  return (
    <div className="container w-full min-h-screen dark:text-white">
      {/* Loading State */}
      {loading && <PropertySkeleton />}

      {/* Error State */}
      {error && <ErrorHandler type="property" error={error} onRetry={refetch} />}

      {/* Property Content */}
      {property && !error && !loading && (
        <main className="max-w-7xl mx-auto py-6 space-y-4 lg:space-y-6 mb-3">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column */}
            <PropertyLeftColumn
              property={property}
              photos={photos}
              currentImage={currentImage}
              numberOfPhotos={numberOfPhotos}
              isSaved={isSaved}
              showShareMenu={showShareMenu}
              toggleGallery={toggleGallery}
              toggleSaved={toggleSaved}
              toggleShareMenu={toggleShareMenu}
              prevImage={prevImage}
              nextImage={nextImage}
              setCurrentImage={setCurrentImage}
              formatPrice={formatPrice}
            />

            {/* Right Column - Agent Card */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div
                  className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl
                    border border-slate-200 dark:border-slate-800/50 p-5 sm:p-6
                    shadow-xl dark:shadow-2xl dark:shadow-violet-500/5"
                >
                  {/* Agency Info */}
                  {property.agency && (
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                      <div
                        className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-500
                          to-purple-500 flex items-center justify-center text-white text-xl
                          font-bold shrink-0"
                      >
                        {property.agency.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/agencies/${property.agency.username}`}
                          className="font-semibold text-slate-900 dark:text-white truncate
                            block hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {property.agency.name}
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-500 truncate">
                          @{property.agency.username}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Contact Buttons */}
                  <ContactButtons
                    phoneNumber={property.agency?.phoneNumber}
                    email={property.agency?.email}
                  />

                  {/* View Agency */}
                  {property.agency && (
                    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={`/agencies/${property.agency.username}`}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4
                          rounded-xl font-medium border-2 border-indigo-600 text-indigo-600
                          dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20
                          transition-colors"
                      >
                        <Users className="w-5 h-5" />
                        <span>View Agency Profile</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Safety Tips */}
                <div
                  className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200
                    dark:border-amber-800/50 rounded-xl p-5 sm:p-6 mt-0"
                >
                  <h4 className="font-medium text-amber-800 dark:text-amber-400 text-sm mb-2">
                    Safety Tips
                  </h4>
                  <ul className="text-xs text-amber-700 dark:text-amber-500 space-y-1">
                    <li>• Verify property documents before payment</li>
                    <li>• Meet agents in safe, public locations</li>
                    <li>• Never pay in advance without viewing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <FullscreenGallery
          photos={photos}
          currentImage={currentImage}
          numberOfPhotos={numberOfPhotos}
          prevImage={prevImage}
          nextImage={nextImage}
          onClose={toggleGallery}
        />
      )}
    </div>
  );
}
