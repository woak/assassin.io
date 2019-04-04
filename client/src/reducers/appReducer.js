/*
 src/reducers/appReducer.js
*/
import { Map } from 'immutable';

export default (state = new Map(), action) => {

  switch (action.type) {

    case 'TOGGLE_PAGE_VIEW': return state.setIn(['viewFocus'], action.target);

    // --- LOGIN/SIGNUP --- \\

    case 'INPUT_STAGED_USERNAME': return state.setIn(['stagedUsername'], action.value);

    case 'INPUT_STAGED_PASSWORD': return state.setIn(['stagedPassword'], action.value);

    case 'INPUT_STAGED_PIN': return state.setIn(['stagedPin'], action.value); 

    case 'INPUT_STAGED_EMAIL': return state.setIn(['stagedEmail'], action.value); 

    case 'LOGIN_USER': return state.setIn(['isLoggedIn'], true);

    case 'LOGOUT_USER': return state.setIn(['isLoggedIn'], false);

    case 'SET_TARGET': return state.setIn(['currentTarget'], action.targetInfo);

    case 'SET_ID': return state.setIn(["currentId"], action.id);

    default: return state;
  }
  
}