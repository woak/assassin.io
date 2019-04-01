/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

// redux imports
import { actions } from './actions/appAction';
import * as componentSelectors from './selectors/appSelector';

import './App.css';

class App extends Component {

  render = () => (
    <div className="App">
    
    </div>
  );
}

const {
} = componentSelectors

const mapStateToProps = state => ({
});

const {
} = actions;

const mapDispatchToProps = dispatch => ({
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


