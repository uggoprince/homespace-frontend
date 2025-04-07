import { useRef } from 'react';
import AgencyCard from '../../components/AgencyCard';
import Pager from '../../components/SearchPaginator';
import { moveToNewAgencyPage } from '../../Utils/EventHandlers';

let agencyDivRef;

const assignAgencyDivRef = () => {
  agencyDivRef = useRef(null);
};

export const getAgencyDivRef = () => agencyDivRef;

export default (props) => {
  const {
    loading, offset, agenciesData, mine,
  } = props;
  const { count, agencies } = agenciesData;
  const returnAgencyCard = (agencyObj) => <AgencyCard key={agencyObj.id} agency={agencyObj} mine={mine} />;
  // const count = agencies.length;
  if (count === 0) {
    if (mine) return (<div className="mt-4">You have no agency. Create one.</div>);
    return <div className="mt-4">No agency found.</div>;
  }
  let pageIndex = 0;
  if (!loading && agencies) {
    pageIndex = (offset / 10) + 1;
  }
  const isPage1 = pageIndex === 1;
  let itemCount = <div>{`Page ${pageIndex} of ${count} results`}</div>;
  if (isPage1) itemCount = <div>{`About ${count} results`}</div>;
  let id = '';
  if (mine) {
    id = 'myAgenciesDiv';
  }
  assignAgencyDivRef();
  return (
    <div className="w-full mb-40">
      <div className="w-auto mb-10 text-lg" />
      <div
        id={id}
        ref={getAgencyDivRef()}
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center w-full "
      >
        {[...agencies].map((obj) => returnAgencyCard(obj))}
      </div>
      <div className="mt-16 w-full">
        <Pager counted={count} offset={offset} pageChanger={moveToNewAgencyPage} />
      </div>
    </div>
  );
};
