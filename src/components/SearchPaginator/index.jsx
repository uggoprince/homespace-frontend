import { useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import './style.css';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const Pager = (props) => {
  const {
    counted, offset, pageChanger,
  } = props;
  const totalPageCount = Math.ceil(counted / 10);
  const handleClick = (data) => {
    pageChanger(data);
  };
  const disableInitialCallback = true;
  const [index, setIndex] = useState((offset / 10));
  useEffect(() => {
    setIndex((offset / 10));
  }, [offset]);
  return (
    <Pagination
      pageCount={totalPageCount}
      onPageChange={handleClick}
      forcePage={index}
      disableInitialCallback={disableInitialCallback}
      previousLabel={(
        <span className="flex items-center gap-1">
          <LuChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}
      nextLabel={(
        <span className="flex items-center gap-1">
          <span className="hidden sm:inline">Next</span>
          <LuChevronRight className="w-4 h-4" />
        </span>
      )}
      containerClassName="flex flex-wrap items-center justify-center gap-1"
      pageLinkClassName={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 px-2 
        sm:px-3 py-1.5 sm:py-2 flex items-center justify-center 
        text-xs sm:text-sm font-medium rounded-lg text-gray-700 
        dark:text-slate-300 bg-white dark:bg-slate-800 border 
        border-gray-200 dark:border-slate-700 hover:bg-gray-50 
        dark:hover:bg-slate-700 transition-colors`}
      activeLinkClassName="!bg-indigo-600 !text-white !border-indigo-600"
      previousLinkClassName={`min-w-[36px] sm:min-w-auto h-9 sm:h-10 flex items-center 
        justify-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs 
        sm:text-sm font-medium text-gray-700 dark:text-slate-300 
        bg-white dark:bg-slate-800 border border-gray-200 
        dark:border-slate-700 rounded-lg hover:bg-gray-50 
        dark:hover:bg-slate-700 transition-colors`}
      nextLinkClassName={`min-w-[36px] sm:min-w-auto h-9 sm:h-10 flex 
        items-center justify-center gap-1 px-2 sm:px-4 py-1.5 
        sm:py-2 text-xs sm:text-sm font-medium text-gray-700 
        dark:text-slate-300 bg-white dark:bg-slate-800 border 
        border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 
        dark:hover:bg-slate-700 transition-colors`}
      breakLinkClassName="min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 flex items-center justify-center text-gray-400 dark:text-slate-500 text-xs sm:text-sm"
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      // eslint-disable-next-line no-console
      // hrefBuilder={generateHref}
    />
  );
};

export default Pager; //
