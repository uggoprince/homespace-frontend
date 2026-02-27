'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_PROPERTY_DETAILS_BY_CODE } from '@/lib/graphql/property';
import { Property } from '@/types/property';
import PropertyForm from '../../form/propertyForm';
import ErrorHandler from '@/components/ErrorHandler';
import NotFoundContent from '@/app/not-found-content';

const SKELETON_SECTIONS = ['basic', 'location', 'pricing', 'details'];

const EditSkeleton = () => (
  <div className="space-y-8 max-w-4xl animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-800" />
      <div className="space-y-2">
        <div className="h-7 w-48 bg-gray-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-36 bg-gray-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
    {SKELETON_SECTIONS.map((section) => (
      <div key={section} className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 p-6">
        <div className="h-6 w-40 bg-gray-200 dark:bg-slate-800 rounded mb-6" />
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 dark:bg-slate-800 rounded-xl" />
          <div className="h-12 bg-gray-100 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, loading, error, refetch } = useQuery(GET_PROPERTY_DETAILS_BY_CODE, {
    variables: { propertyCode: id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <EditSkeleton />;
  if (error) return <ErrorHandler error={error} onRetry={() => refetch()} />;

  const property = data?.getPropertyByCode as Property | null;

  if (!property) return <NotFoundContent type="property" />;

  return <PropertyForm mode="edit" propertyData={property} />;
}
