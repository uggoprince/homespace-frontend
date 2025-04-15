import PropertyCard from '../../components/PropertyCard';
import Pager from '../../components/SearchPaginator';
import { moveToNewPropertyPage } from '../../Utils/EventHandlers';

export default (props) => {
  const {
    number, loading, data, offset,
  } = props;
  const { properties, count } = data;
  const returnPropCard = (propObj) => (
    <PropertyCard key={propObj.id} property={propObj} number={number} />
  );
  const propertiesInDom = properties.map((propObj) => returnPropCard(propObj));
  let pageIndex = 0;
  if (!loading && data) {
    pageIndex = (offset / 10) + 1;
  }
  const isPage1 = pageIndex === 1;
  let itemCount = <div>{`Page ${pageIndex} of ${count} results`}</div>;
  if (isPage1) itemCount = <div>{`About ${count} results`}</div>;

  return (
    <div className="w-full min-h-full mx-auto ">
      <div className="w-auto mb-5 mt-5 text-lg dark:text-white">
        {itemCount}
      </div>
      <div className=" w-full
        grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center"
      >
        {propertiesInDom}
      </div>
      <div className="mt-16 w-full">
        <Pager counted={count} offset={offset} pageChanger={moveToNewPropertyPage} />
      </div>
    </div>
  );
};
