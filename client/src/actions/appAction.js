/*
 src/actions/appAction.js
*/


export const actions = {

  changePageView: target => ({
    type: 'TOGGLE_PAGE_VIEW',
    target
  }),

  inputLoginUsernameAction: value => ({
    type: 'INPUT_LOGIN_USERNAME',
    value,
  }),

  inputLoginPasswordAction: value => ({
    type: 'INPUT_LOGIN_PASSWORD',
    value,
  }),

  inputSignupUsernameAction: value => ({
    type: 'INPUT_SIGNUP_USERNAME',
    value,
  }),

  inputSignupPasswordAction: value => ({
    type: 'INPUT_SIGNUP_PASSWORD',
    value,
  }),

}