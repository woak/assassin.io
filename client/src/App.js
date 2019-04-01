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
    
    if (!this.props.userIsLoggedIn) {
      return <div className="bodyElementWrapper">
        {/* login */}
        <div className="inputWrapper">
          <b id="pleaseLogin">Login</b>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputLoginUsername(value)}
            placeholder="username">
          </input>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputLoginPassword(value)}
            placeholder="password">
          </input>
          <b onClick={this.props.loginUser}
            className="inputButton">Login</b>
        </div>
        {/* signup */}
        <div className="inputWrapper">
          <b id="pleaseLogin">Sign up</b>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputSignupUsername(value)}
            placeholder="username">
          </input>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputSignupPassword(value)}
            placeholder="password">
          </input>
          <b onClick={this.props.loginUser}
            className="inputButton">Sign up</b>
        </div>
      </div>
    }

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
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("home")}>Home</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("gotOne")}>GOT ONE?!</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("gameOverview")}>Game overview</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("profile")}>Profile</b>
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
  isLoggedIn,
} = componentSelectors

const mapStateToProps = state => ({
  currentFocus: currentPageFocus(state),
  userIsLoggedIn: isLoggedIn(state),
});

const {
  changePageView,

  inputLoginUsernameAction,
  inputLoginPasswordAction,
  inputSignupUsernameAction,
  inputSignupPasswordAction,
} = actions;

const mapDispatchToProps = dispatch => ({
  switchViewTo: target => dispatch(changePageView(target)),

  inputLoginUsername: value => dispatch(inputLoginUsernameAction(value)),
  inputLoginPassword: value => dispatch(inputLoginPasswordAction(value)),
  inputSignupUsername: value => dispatch(inputSignupUsernameAction(value)),
  inputSignupPassword: value => dispatch(inputSignupPasswordAction(value)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


