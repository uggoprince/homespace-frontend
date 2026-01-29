import { useRef } from 'react';
import PropTypes from 'prop-types';
import AgencyCard from '../../components/AgencyCard';
import Pager from '../../components/SearchPaginator';
import { moveToNewAgencyPage } from '../../Utils/EventHandlers';
import { AgencyCardSkeleton } from '../../components/AgencyCard/skeleton';

const AgencyAdapter = (props) => {
  const {
    loading, offset, agenciesData, mine,
  } = props;
  const agencyDivRef = useRef(null);
  const skeletonKeys = useRef(Array.from({ length: 8 }, () => Math.random().toString(36).substring(2, 11)));
  const { count = 0, agencies } = agenciesData;
  if (count === 0 && !loading) {
    if (mine) return (<div className="mt-4">You have no agency. Create one.</div>);
    return <div className="mt-4">No agency found.</div>;
  }
  let id = '';
  if (mine) {
    id = 'myAgenciesDiv';
  }
  return (
    <div className="pb-10 w-full space-y-6">
      <div className="w-auto mb-10 text-lg" />
      <div
        id={id}
        ref={agencyDivRef}
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 justify-items-center w-full"
      >
        {loading && (
          skeletonKeys.current.map((key) => (
            <AgencyCardSkeleton key={key} />
          ))
        )}
        {!loading && agencies && [...agencies].map((obj) => <AgencyCard key={obj.id} agency={obj} mine={mine} />)}
      </div>
      <div className="pt-3 w-full">
        <Pager counted={count} offset={offset} pageChanger={moveToNewAgencyPage} />
      </div>
    </div>
  );
};

AgencyAdapter.propTypes = {
  loading: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
  agenciesData: PropTypes.shape({
    count: PropTypes.number,
    agencies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
  }).isRequired,
  mine: PropTypes.bool,
};

AgencyAdapter.defaultProps = {
  mine: false,
};

export default AgencyAdapter;
