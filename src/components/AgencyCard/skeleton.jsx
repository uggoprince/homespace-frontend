import Skeleton from '@mui/material/Skeleton';
import './style.css';

export function AgencyCardSkeleton() {
  return (
    <div
      className="agency-card-skeleton"
    >
      {/* <div className="card-header">
        <Skeleton className="headline" />
      </div> */}
      <div className="agency-image-skeleton">
        <Skeleton variant="rectangular" width="100%" height="100%" className="rounded-t-lg" />
      </div>
      <div className="text-section dark:text-white">
        <div>
          <Skeleton />
        </div>
        <Skeleton className="headline" />
        <div className="supporting-text">
          <Skeleton width="100%" />
        </div>
        <div className="supporting-text">
          <Skeleton width="100%" />
        </div>
      </div>
    </div>
  );
}
