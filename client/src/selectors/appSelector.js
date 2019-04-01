// component selectors
// import { List } from 'immutable';

export const currentPageFocus = state => state.getIn(
  ['viewFocus'],
  "home"
);