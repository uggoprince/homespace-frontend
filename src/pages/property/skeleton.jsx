export const BodySkeleton = () => (
  <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
    <div className="animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-40 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl aspect-[16/10]" />
          <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-96" />
        </div>
        <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-80" />
      </div>
    </div>
  </div>
);
