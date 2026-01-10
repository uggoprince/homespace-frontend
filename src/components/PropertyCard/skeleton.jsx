import Skeleton from '@mui/material/Skeleton';
import './style.css';

export function PropertyCardSkeleton() {
  return (
    <div className="prop-card-skeleton">
      {/* Image Skeleton */}
      <div className="card-image-skeleton relative">
        <Skeleton variant="rectangular" width="100%" height="100%" className="rounded-t-lg">
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
