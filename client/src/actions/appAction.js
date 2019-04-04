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
      // TODO TEDDY
      console.log("USER SIGNED UP :")
      console.dir(json);
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
      // TODO TEDDY
      console.log(json)
      if (json.wasKilled) {
        // update target name
        dispatch(actions.retreiveTargetAction(assassinUsername));
      } else {
        dispatch(actions.changePageView("error"));
      }
    })
  },

  // --- get target --- \\

  retrieveTargetAction: username => dispatch => {
    fetch("/target", {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(json => {
      if (json.target) {
        dispatch(actions.setTargetAction(json.target));
      } else {
        dispatch(actions.changePageView("error"))
      }
    });
  },

  setTargetAction: targetInfo => ({
    type: "SET_TARGET",
    targetInfo,
  }),

  // --- get id --- \\
  retrieveIdAction: username => dispatch => {
    fetch("/id", {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(json => {
      if (json.id) {
        dispatch(actions.setIdAction(json.id));
      } else {
        dispatch(actions.changePageView("error"))
      }
    });
  },

  setIdAction: id => ({
    type: "SET_ID",
    id,
  }),

}