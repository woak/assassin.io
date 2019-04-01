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

  pageFocus = () => {
    switch (this.props.currentFocus) {

      case "gotOne": return <div className="bodyElementWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">GOT ONE</h1>
      </div>

      case "gameOverview": return <div className="bodyElementWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">GAME OVERVIEW</h1>
      </div>

      case "profile": return <div className="bodyElementWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">PROFILE</h1>
      </div>

      // home
      default: return <div className="bodyElementWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">HOME</h1>
      </div>
    } 
  }

  render = () => (
    <div className="App">
      <div className="homepage">
        <div className="nagivagorWrapper">
          <b className="title">
            EPO E-ssassin
          </b>
          <div className="navigatorBar">
            <b className="navigatorButton">Home</b>
            <b className="navigatorButton">GOT ONE?!</b>
            <b className="navigatorButton">Game overview</b>
            <b className="navigatorButton">Profile</b>
          </div>
        </div>
        <div className="bodyWrapper">
          {this.pageFocus()}
        </div>
      </div>
    </div>
  );
}

const {
  currentPageFocus,
} = componentSelectors

const mapStateToProps = state => ({
  currentFocus: currentPageFocus(state),
});

const {
} = actions;

const mapDispatchToProps = dispatch => ({
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


