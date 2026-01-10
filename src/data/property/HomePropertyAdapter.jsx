import { useRef } from 'react';
import PropTypes from 'prop-types';
import PropertyCard from '../../components/PropertyCard';
import Pager from '../../components/SearchPaginator';
import { moveToNewPropertyPage } from '../../Utils/EventHandlers';
import { PropertyCardSkeleton } from '../../components/PropertyCard/skeleton';

const HomePropertyAdapter = (props) => {
  const {
    number, loading, data, offset,
  } = props;
  const skeletonKeys = useRef(Array.from({ length: 9 }, () => Math.random().toString(36).substring(2, 11)));
  const { properties, count = 0 } = data;
  const returnPropCard = (propObj) => (
    <PropertyCard key={propObj.id} property={propObj} number={number} />
  );
  let pageIndex = 0;
  if (!loading && data) {
    pageIndex = (offset / 10) + 1;
  }
  const isPage1 = pageIndex === 1;
  let itemCount = <div>{`Page ${pageIndex} of ${count} results`}</div>;
  if (isPage1) itemCount = <div>{`About ${count} results`}</div>;

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
        {!loading && properties?.map((propObj) => returnPropCard(propObj))}
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
