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

  validateUserAction: (username, password) => dispatch => {
    fetch("http://localhost:5000/loginCreds", {
      method: "POST",
      body: JSON.stringify({
        username
      }),
      headers: {"Content-Type": "application/json"}
    }).then(response => response.json())
    .then(json => {
      // TODO TEDDY
      // LOGIN OR LOGOUT DEPENDING ON WHETHER IT WORKS
      console.log(json)
      // TODO TEDDY
      console.log("INSIDE VALIDATE USER ACTION")
      // dispatch(actions.loginUserAction())
    })
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
      // TODO TEDDY
      console.log("RESPONSE:")
      console.log(json)
      if (json["signedup"]) {
        dispatch(actions.loginUserAction());
      } else {
        dispatch(actions.logoutUserAction());
      }
    })
  },
  logoutUserAction: () => ({
    type: 'LOGOUT_USER',
  }),
}