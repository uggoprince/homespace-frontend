import { Skeleton } from "@/components/ui/skeleton";
import './style.css';

export function PropertyCardSkeleton() {
  return (
    <div className="prop-card-skeleton">
      {/* Image Skeleton */}
      <div className="card-image-skeleton relative">
        <Skeleton className="rounded-t-lg w-full h-full">
          <div className="">
            <div className="font-medium inline-block" />
            <div className="font-bold mt-1" />
          </div>
        </Skeleton>
      </div>

      {/* Text content */}
      <div className="px-2 py-2">
        <div className="mb-1">
          <Skeleton />
        </div>
        <div>
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
