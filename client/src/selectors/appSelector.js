// component selectors
// import { List } from 'immutable';

import fetch from 'cross-fetch'
import createAsyncSelector from 'async-selector'

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

// --- get current target --- \\
// TODO TEDDY : async selector correctly fetches from server but doesn't return
// a value, just returns isWaiting=true. Also runs on ever rerender of the page

const fetchTarget = username => () => fetch("/target", {
  method: "POST",
  body: JSON.stringify({
    username,
  }),
  headers: { "Content-Type": "application/json" }
})
  .then(response => response.json(),
    error => console.log(error))
  .then(json => json);

export const getCurrentTarget = state => createAsyncSelector(
  {
    sync: () => { return { name: "error :/", email: "error :/" } },
    async: fetchTarget(stagedUsername(state)),
    // TODO TEDDY: LOG EVENTS BETTER
    onResolve: (target, selectorResults) => { },
    onReject: (error, selectorResults) => {
      console.log("ERROR RETRIEVING EVENTS: ");
      console.dir(error);
    },
    onCancel: (promise, selectorResults) => {
      console.log("PROMISE CANCELLED RETRIEVING EVENTS: ");
      console.dir(promise);
    },
  },
  // anonymous selector:
  [(state, props) => {
    console.log("INSIDE ANONYMOUS SELECTOR");
  }]
)();

// export const getCurrentTarget = state => state.getIn(
//   ['homePageState', 'currentTarget'],
//   {}
// );