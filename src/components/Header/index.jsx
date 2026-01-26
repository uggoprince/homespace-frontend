import { Component, useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { LuX } from 'react-icons/lu';
import Logo from '../Logo';
import Navigation from '../Navigation';
import { itsThisPath } from '../../Utils/Urls';
import { setNavMenuButtonEvent, prepareSearchPageSearch } from '../../Utils/EventHandlers';
import { useAuth } from '../../auth/AuthProvider';
import './style.css';

const SearchBar = (props) => {
  const { search } = props;
  let { inputName } = props;
  const [searchText, setSearchText] = useState(search);
  const [isFocused, setIsFocused] = useState(false);
  const clearSearch = () => setSearchText('');
  useEffect(() => {
    setSearchText(search);
  }, [search]);
  if (!inputName) inputName = 'searchText';
  return (
    <div className="search-bar hs-max-width-95 flex flex-col justify-items-center">
      <form
        id="searchForm2"
        className={
          `search-bar-form self-center
          flex items-center gap-2 rounded-full px-4 py-2.5
                  border transition-all duration-200
                  ${isFocused
            ? 'border-indigo-500 bg-white dark:bg-slate-800 ring-2 ring-indigo-500/20 shadow-sm dark:shadow-none'
            : `bg-gray-100 dark:bg-slate-800/50 border-gray-200 
            dark:border-slate-700 hover:border-gray-300 
            dark:hover:border-slate-600 hover:bg-gray-50 
            dark:hover:bg-slate-800`
                }
          `
        }
      >
        <HiMagnifyingGlass className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <input
          id="searchPageSearchTextInput"
          type="text"
          name={inputName}
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchText.trim()) {
              e.target.form.requestSubmit();
            }
          }}
          defaultValue={searchText}
          placeholder="Search location, property type..."
          className={`flex-1 bg-transparent text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-slate-500 outline-none 
            text-sm transition-colors duration-300`}
        />
        {/* <button id="searchPageSearchButton" type="submit" className="cursor-pointer focus:outline-none">
          <FaSearch />
        </button> */}
        {searchText && (
          <button
            id="searchPageSearchButton"
            type="submit"
            aria-label="Clear search"
            onClick={clearSearch}
            className="w-5 h-5 rounded-full bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500 flex items-center justify-center transition-colors"
          >
            {/* <svg className="w-3 h-3 text-gray-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg> */}
            <LuX className="w-3 h-3 text-gray-600 dark:text-slate-300" />
          </button>
        )}
      </form>
    </div>
  );
};

const AddSearchBar = ({ props }) => {
  const { token } = useAuth();
  const { search, offset } = props;
  if (itsThisPath('/')) {
    if (search || offset || token) return <SearchBar search={search} />;
  }
  if (itsThisPath('/agency')) {
    if (search || offset || token) return <SearchBar search={search} inputName="searchTextForAgency" />;
  }
  return null;
};

export default class Header extends Component {
  componentDidMount() {
    setNavMenuButtonEvent();
    prepareSearchPageSearch();
  }

  render() {
    return (
      <header className="header fixed-header">
        <div className="header-nav">
          <Logo />
          <Navigation />
        </div>
        <AddSearchBar props={this.props} />
      </header>
    );
  }
}

/* const Header = (props) => (
  <header className="container max-width h-auto inline-block z-10 sticky top-0 bg-white border border-b border-gray-300">
    <div className="container py-4 flex flex-auto justify-between hs-max-width-85 mx-auto">
      <Logo />
      <Navigation />
    </div>
    {addSearchBar(props)}
  </header>
); */

export const HeaderBottomMargin = () => (
  <div>
    <br />
    <div className="my-mb-10 max-width my-relative" />
  </div>
);
