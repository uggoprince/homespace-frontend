import { Skeleton } from "@/components/ui/skeleton";

export const PropertySkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 py-8">
    <div className="">
      <Skeleton className="h-8 dark:bg-slate-800 rounded w-40 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className=" dark:bg-slate-800 rounded-2xl aspect-16/10" />
          <Skeleton className=" dark:bg-slate-800 rounded-2xl h-96" />
        </div>
        <Skeleton className=" dark:bg-slate-800 rounded-2xl h-80" />
      </div>
    </div>
  </div>
);