import { useRef } from 'react';
import PropTypes from 'prop-types';
import PropertyCard from '../../components/PropertyCard';
import Pager from '../../components/SearchPaginator';
import { moveToNewPropertyPage } from '../../Utils/EventHandlers';
import { PropertyCardSkeleton } from '../../components/PropertyCard/skeleton';
import { Skeleton } from '../../components/Skeleton';

const HomePropertyAdapter = (props) => {
  const {
    number, loading, data, offset,
  } = props;
  const skeletonKeys = useRef(Array.from({ length: 9 }, () => Math.random().toString(36).substring(2, 11)));
  const { properties, count = 0 } = data;
  let pageIndex = 0;
  if (!loading && data) {
    pageIndex = (offset / 10) + 1;
  }
  const isPage1 = pageIndex === 1;
  const itemCount = loading
    ? <Skeleton variant="text" width={180} height={28} />
    : <div>{isPage1 ? `About ${count} results` : `Page ${pageIndex} of ${count} results`}</div>;

  return (
    <div className="w-full container min-h-full space-y-6">
      <div className="w-auto mt-6 text-lg dark:text-white">
        {itemCount}
      </div>
      <div className=" w-full
          grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center"
      >
        {loading && (
          skeletonKeys.current.map((key) => (
            <PropertyCardSkeleton key={key} />
          ))
        )}
        {!loading && properties?.map((propObj) => <PropertyCard key={propObj.id} property={propObj} number={number} />)}
      </div>
      <div className=" w-full">
        <Pager counted={count} offset={offset} pageChanger={moveToNewPropertyPage} />
      </div>
    </div>
  );
};

HomePropertyAdapter.propTypes = {
  number: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    properties: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
    count: PropTypes.number,
  }).isRequired,
  offset: PropTypes.number.isRequired,
};

HomePropertyAdapter.defaultProps = {
  number: null,
};

export default HomePropertyAdapter;
