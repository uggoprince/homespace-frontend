import { Skeleton } from '../../ui/skeleton';
import './style.css';

export function AgencyCardSkeleton() {
  return (
    <div
      className="agency-card-skeleton"
    >
      <div className="agency-image-skeleton">
        <Skeleton className="rounded-t-lg w-full h-full" />
      </div>
      <Skeleton className="text-section dark:text-white">
        <div>
          <Skeleton />
        </div>
        <Skeleton className="headline" />
        <div className="supporting-text">
          <Skeleton className="w-full" />
        </div>
        <div className="supporting-text">
          <Skeleton className="w-full" />
        </div>
      </Skeleton>
    </div>
  );
}
