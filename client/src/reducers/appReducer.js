/*
 src/reducers/appReducer.js
*/
import { Map } from 'immutable';

export default (state = new Map(), action) => {

  switch (action.type) {

    case 'TOGGLE_PAGE_VIEW': return state.setIn(['viewFocus'], action.target)

    default: return state;
  }
  
}