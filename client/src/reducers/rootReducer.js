/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux-immutable';

import appReducer from './appReducer';

export default combineReducers({
  "homePageState": appReducer,
});