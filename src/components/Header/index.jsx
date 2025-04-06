import { FaSearch } from 'react-icons/fa';
import { Component, useEffect, useState } from 'react';
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
  useEffect(() => {
    setSearchText(search);
  }, [search]);
  if (!inputName) inputName = 'searchText';
  return (
    <div className="search-bar hs-max-width-95 flex flex-col justify-items-center">
      <form
        id="searchForm2"
        className="search-bar-form self-center"
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   const formData = new FormData(e.target);
        //   const searchValue = formData.get(inputName); // Get input value
        //   console.log('Search Value:', searchValue);
        // }}
      >
        <input
          required
          type="search"
          name={inputName}
          id="searchPageSearchTextInput"
          placeholder="Search..."
          className="search-input"
          defaultValue={searchText}
        />
        <button id="searchPageSearchButton" type="submit" className="cursor-pointer focus:outline-none">
          <FaSearch />
        </button>
        {/* <input type="submit" value={<FaSearch />} className="w-1/12 cursor-pointer" /> */}
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
      <header className="header">
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
