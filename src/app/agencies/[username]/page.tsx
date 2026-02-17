'use client';

import { useSyncExternalStore } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import {
  ArrowLeft, Star, MapPin,
} from 'lucide-react';
import { GET_AGENCY_BY_USERNAME } from '@/lib/graphql/agency';
import ErrorHandler from '@/components/ErrorHandler';
import { PhoneButton, WhatsAppButton, EmailButton } from '@/components/ContactButtons';
import { Agency } from '@/types/property';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AboutTab from './AboutTab';
import PropertiesTab from './PropertiesTab';
import ReviewsTab from './ReviewsTab';
import { CustomTabList, CustomTabTrigger } from '@/components/Tabs';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function AgencyPage() {
  const mounted = useIsMounted();
  const router = useRouter();
  const { username } = useParams<{ username: string }>();

  const { loading: queryLoading, error, data, refetch } = useQuery(GET_AGENCY_BY_USERNAME, {
    variables: { username },
    skip: !username,
  });
  const loading = !mounted || queryLoading;

  const agency: Agency | null = data?.getAgencyByUsername || null;

  if (error) return <ErrorHandler error={error} onRetry={() => refetch()} type="agency" />;

  return (
    <div className="container w-full min-h-screen dark:text-white">
      {loading && (
        <div className="mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-32" />
            <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-64" />
            <div className="space-y-3">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-64" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-40" />
            </div>
          </div>
        </div>
      )}

      {agency && !loading && (
        <main className="mx-auto py-6 space-y-4 lg:space-y-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          {/* Agency Header Card */}
          <div
            className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border
              border-slate-200 dark:border-slate-800/50 p-5 sm:p-6 mb-8 shadow-xl
              dark:shadow-2xl dark:shadow-violet-500/5"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Banner */}
              <div className="shrink-0 flex-1">
                <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-100
                  dark:bg-slate-800 ring-4 ring-slate-200 dark:ring-slate-700/50 shadow-lg"
                >
                  <Image
                    src={agency.banner}
                    alt={agency.name}
                    className="w-full h-full object-cover"
                    width={600}
                    height={320}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 lg:max-w-96">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold tracking-tight">{agency.name}</h1>
                      <span
                        className="inline-flex items-center gap-1 bg-emerald-500/20
                          text-emerald-600 dark:text-emerald-400 px-2.5 py-1
                          rounded-full text-xs font-medium"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">4.8</span>
                        <span>(24 reviews)</span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-600">•</span>
                      <span>@{agency.username}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>
                        {agency.address}, {agency.state}, {agency.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <PhoneButton phoneNumber={agency.phoneNumber} />
                  <EmailButton email={agency.email} />
                  <WhatsAppButton phoneNumber={agency.whatsapp} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="properties">
            <CustomTabList>
              <CustomTabTrigger value="properties">
                Properties
              </CustomTabTrigger>
              <CustomTabTrigger value="about">
                About
              </CustomTabTrigger>
              <CustomTabTrigger value="reviews">
                Reviews
              </CustomTabTrigger>
            </CustomTabList>

            <TabsContent value="properties">
              <PropertiesTab agencyId={agency.id} />
            </TabsContent>
            <TabsContent value="about">
              <AboutTab agency={agency} />
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewsTab />
            </TabsContent>
          </Tabs>
        </main>
      )}
    </div>
  );
}
