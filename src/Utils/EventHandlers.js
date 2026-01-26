/* eslint-disable no-console */
// import { useLocation, useSearchParams } from 'react-router-dom';
import { validateImageFile } from './Checkers';
import { store, setNewState } from './Store';
import {
  // computeSearchPath,
  computeSearchUrl, getPath, getSearchString, setSearchUrl, setUrlOnAddressBar,
} from './Urls';

const runSearch = (form) => {
  const { searchText, searchTextForAgency } = form.elements;
  if (searchText) {
    // computeSearchUrl(searchText);
    let { value } = searchText;
    value = value.trim();
    if (value !== '' && value != null) {
      const newUrl = computeSearchUrl(value);
      setNewState({ type: 'SEARCH_PROPERTIES', q: value, start: 0 });
      // setSearchUrl(newUrl);
      setUrlOnAddressBar(newUrl, 'Home');
    // history.push(newUrl);
    }
  } else if (searchTextForAgency) {
    let { value } = searchTextForAgency;
    value = value.trim();
    const newUrl = computeSearchUrl(value, 0, '/agency');
    setNewState({ type: 'SEARCH_AGENCIES', w: value, start: 0 });
    // setSearchUrl(newUrl);
    setUrlOnAddressBar(newUrl, 'Agency');
  }
};

export const prepareLandingPageSearch = () => {
  const searchForm = document.getElementById('searchForm');
  const searchTextInput = document.getElementById('homeSearchTextInput');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runSearch(searchForm);
    });
  }
  if (searchTextInput) {
    searchTextInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        runSearch(searchForm);
      }
    });
  }
};

export const prepareSearchPageSearch = () => {
  const searchForm = document.getElementById('searchForm2');
  const searchTextInput = document.getElementById('searchPageSearchTextInput');
  const button = document.getElementById('searchPageSearchButton');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runSearch(searchForm);
    });
  }
  if (searchTextInput) {
    searchTextInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        runSearch(searchForm);
      }
    });
    button.addEventListener('click', (e) => {
      e.preventDefault();
      runSearch(searchForm);
    });
  }
};

export const displayCardDetails = (e, property, num) => {
  store.dispatch({ type: 'PROPERTY_DETAILS_FROM_SEARCH', property });
  const propertyDetailsDiv = document.getElementById(`propertyDetailsFromSearchDiv${num}`);
  const propertiesDiv = document.getElementById(`propertiesDiv${num}`);
  propertyDetailsDiv.classList.remove('hidden');
  propertiesDiv.style.width = '65%';
  // propertiesDiv.style.maxWidth = '60%';
  propertyDetailsDiv.style.width = '35%';
  // propertyDetailsDiv.style.maxWidth = '40%';
  propertyDetailsDiv.style.minWidth = '400px';
};

export const closeCardDetails = (e, num) => {
  const propertyDetailsDiv = document.getElementById(`propertyDetailsFromSearchDiv${num}`);
  const propertiesDiv = document.getElementById(`propertiesDiv${num}`);
  propertyDetailsDiv.style.width = '0%';
  propertyDetailsDiv.style.minWidth = '0px';
  propertiesDiv.style.width = '100%';
  store.dispatch({ type: 'PROPERTY_DETAILS_FROM_SEARCH', property: null });
  propertyDetailsDiv.classList.add('hidden');
};

export const moveToNewPropertyPage = (data) => {
  const { selected } = data;
  const offset = selected * 10;
  const { q } = getSearchString();
  let newUrl;
  if (q) newUrl = computeSearchUrl(q, offset);
  else newUrl = computeSearchUrl(null, offset);
  setUrlOnAddressBar(newUrl, 'Home');
  setNewState({ type: 'SET_OFFSET', start: offset });
};

export const moveToNewAgencyPage = (data) => {
  const { selected } = data;
  const offset = selected * 10;
  const { q } = getSearchString();
  let newUrl;
  if (q) newUrl = computeSearchUrl(q, offset, '/agencies');
  else newUrl = computeSearchUrl(null, offset, '/agencies');
  setUrlOnAddressBar(newUrl, 'Agency');
  setNewState({ type: 'SET_OFFSET_AGENCY', start: offset });
};

export const paginator = (data) => {
  const { selected } = data;
  const offset = selected * 10;
  const { q } = getSearchString();
  const newUrl = computeSearchUrl(q, offset);
  retrieveProperties(q, offset);
};

export const prepareSignup = () => {
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
};

const rerenderProperties = () => {
  const { q, start } = getSearchString();
  if (q && start) {
    setNewState({ type: 'SET_QUERY_AND_OFFSET', q, start: parseInt(start, 10) });
  } else if (start && !q) {
    setNewState({ type: 'SET_OFFSET', start: parseInt(start, 10) });
  } else if (!q && !start) {
    setNewState({ type: 'SET_QUERY_AND_OFFSET', q, start: 0 });
  }
};

export const setNavMenuButtonEvent = () => {
  const navMenu = document.getElementById('navMenu');
  const navMenuButton = document.getElementById('navMenuButton');
  navMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
};

export const setImageForUpload = (e, setFile) => {
  const file = e.target.files[0];
  const error = validateImageFile(file);
  let fileUrl = null;
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      fileUrl = event.target.result;
      setFile(file, fileUrl, error);
    };
  }
};

window.onpopstate = () => {
  const path = getPath();
  if (path === '/' || path === '') rerenderProperties();
};
