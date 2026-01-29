/* eslint-disable eqeqeq */
/* eslint-disable use-isnan */
import { legacy_createStore as createStore } from 'redux';
import { getSearchString, prepareStartQueryString } from './Urls';

const { q } = getSearchString();
let { start } = getSearchString();
start = prepareStartQueryString(start);
const initialState = {
  q, propsSearchOffset: Number(start), propsSearchLimit: 12, w: q, agencySearchOffset: Number(start), agencySearchLimit: 12, /* token: getLocalStorage('token'), */
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_PROPERTIES':
      return {
        ...state, q: action.q, propsSearchOffset: action.start, redirect: action.redirect,
      };
    case 'PROPERTY_DETAILS_FROM_SEARCH':
      return { ...state, property: action.property };
    case 'SEARCH_PROPERTIES_COUNT':
      return { ...state, countedPropertiesFromSearch: action.count, searchPageIndex: action.searchPageIndex };
    case 'SEARCH_PAGE_CURRENT_INDEX':
      // eslint-disable-next-line no-alert
      alert(action.searchPageIndex);
      return { ...state, searchPageIndex: action.searchPageIndex };
    case 'SEARCH_PAGE_INITIAL_INDEX':
      return { ...state, initialPageIndex: action.initialPageIndex };
    case 'SET_OFFSET':
      return { ...state, propsSearchOffset: action.start };
    case 'SET_OFFSET_AGENCY':
      return { ...state, agencySearchOffset: action.start };
    case 'SET_QUERY_AND_OFFSET':
      return { ...state, q: action.q, propsSearchOffset: action.start };
    case 'SEARCH_AGENCIES':
      return { ...state, w: action.w, agencySearchOffset: action.start };
    default:
      return state;
  }
};

export const store = createStore(reducer);

export const setNewState = (newState) => {
  store.dispatch(newState);
};

export const resetState = () => {
  store.dispatch(initialState);
};

export const getState = () => store.getState();
