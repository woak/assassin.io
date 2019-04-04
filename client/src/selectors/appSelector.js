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

export const stagedUsername = state => state.getIn(
  ['homePageState', 'stagedUsername'],
  ""
);

export const stagedPassword = state => state.getIn(
  ['homePageState', 'stagedPassword'],
  ""
);

export const stagedPin = state => state.getIn(
  ['homePageState', 'stagedPin'],
  ""
);

export const stagedEmail = state => state.getIn(
  ['homePageState', 'stagedEmail'],
  ""
);

export const getCurrentTarget = state => state.getIn(
  ['homePageState', 'currentTarget'],
  {}
);

export const getCurrentId = state => state.getIn(
  ['homePageState', 'currentId'],
  false
);