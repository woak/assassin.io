// component selectors
// import { List } from 'immutable';

export const currentPageFocus = state => state.getIn(
  ['homePageState', 'viewFocus'],
  "home"
);

export const isLoggedIn = state => state.getIn(
  ['homePageState', 'isLoggedIn'],
  false
);