/*
 src/actions/appAction.js
*/

import fetch from 'cross-fetch'

export const actions = {

  changePageView: target => ({
    type: 'TOGGLE_PAGE_VIEW',
    target
  }),

  // --- Login/signup info --- \\

  inputStagedUsernameAction: value => ({
    type: 'INPUT_STAGED_USERNAME',
    value,
  }),

  inputStagedPasswordAction: value => ({
    type: 'INPUT_STAGED_PASSWORD',
    value,
  }),

  inputStagedPinAction: value => ({
    type: 'INPUT_STAGED_PIN',
    value
  }),

  inputStagedEmailAction: value => ({
    type: 'INPUT_STAGED_EMAIL',
    value
  }),

  // --- Login/signup logic --- \\

  loginUserAction: () => ({
    type: "LOGIN_USER"
  }),

  logoutUserAction: () => ({
    type: 'LOGOUT_USER',
  }),

  validateUserAction: (username, password) => dispatch => {
    fetch("/loginCreds", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
    .then(json => {
      if (json.signedUp) {
        dispatch(actions.loginUserAction());
      } else {
        dispatch(actions.logoutUserAction());
      }
    });
  },

  signupUserAction: (username, password, pin, email) => dispatch => {
    fetch("/signupUser", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        pin,
      }),
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
    .then(json => {
      if (json.signedUp) {
        dispatch(actions.loginUserAction());
      } else {
        dispatch(actions.logoutUserAction());
      }
    })
  },

  // --- kills --- \\
  
  eliminateAction: (targetPin, assassinUsername) => dispatch => {
    fetch("/targetKilled", {
      method: "POST",
      body: JSON.stringify({
        targetPin,
        assassinUsername,
      }),
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
    .then(json => {
      dispatch(actions.loginUserAction());
    })
  },
}