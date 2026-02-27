'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { LuX } from 'react-icons/lu';
import Logo from '../Logo';
import Navigation from '../Navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAgencyStore } from '@/stores/agencyStore';
import './style.css';

interface SearchBarProps {
  search: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { search, onSearch } = props;
  let { placeholder } = props;
  const [searchText, setSearchText] = useState(search);
  const [isFocused, setIsFocused] = useState(false);
  const clearSearch = () => setSearchText('');
  useEffect(() => {
    setSearchText(search);
  }, [search]);
  if (!placeholder) placeholder = 'Search location, property type, ...';

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchText.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <div className="container search-bar flex flex-col justify-items-center">
      <form
        id="searchForm2"
        onSubmit={handleSubmit}
        className={
          `search-bar-form self-center
          flex items-center gap-2 transition-all duration-200
                  ${isFocused
      ? 'border-indigo-500 dark:bg-slate-800 ring-[1px] ring-indigo-500/80 shadow-[0_0_0_2px_rgba(99,102,241,0.15)] dark:shadow-[0_0_0_2px_rgba(99,102,241,0.25)]'
      : `bg-gray-100 dark:bg-slate-800/50 border-gray-900
            dark:border-slate-700 hover:border-gray-300
            dark:hover:border-slate-600 hover:bg-gray-50
            dark:hover:bg-slate-800`
    }
          `
        }
      >
        <HiMagnifyingGlass className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          id="searchPageSearchTextInput"
          type="text"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-slate-500 outline-none
            text-sm transition-colors duration-300`}
        />
        {searchText && (
          <button
            id="searchPageSearchButton"
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="w-5 h-5 rounded-full bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500 flex items-center justify-center transition-colors"
          >
            <LuX className="w-3 h-3 text-gray-600 dark:text-slate-300" />
          </button>
        )}
      </form>
    </div>
  );
};

const AddSearchBar = () => {
  const initialAuth = useInitialAuth();
  const { token } = useAuth() || {};
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasToken = !!token || initialAuth.isAuthenticated;

  const propertySearch = searchParams.get('q') || '';
  const agencySearch = searchParams.get('search') || '';
  const offset = Number(searchParams.get('start')) || 0;

  const setPropertySearch = usePropertyStore((s) => s.setSearch);
  const setAgencySearch = useAgencyStore((s) => s.setSearch);

  const itsThisPath = (path: string) => pathname === path;

  if (itsThisPath('/')) {
    if (propertySearch || offset || hasToken) {
      return <SearchBar search={propertySearch} onSearch={(q) => setPropertySearch(q)} />;
    }
  }
  if (itsThisPath('/agencies')) {
    return <SearchBar search={agencySearch} onSearch={(q) => setAgencySearch(q)} placeholder="Search agencies..." />;
  }
  return null;
};

const Header = () => (
  <header className="header fixed-header">
    <div className="header-nav">
      <Logo />
      <Navigation />
    </div>
    <AddSearchBar />
  </header>
);

export default Header;

export const HeaderBottomMargin = () => (
  <div>
    <br />
    <div className="my-mb-10 max-width my-relative" />
  </div>
);
