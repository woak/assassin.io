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
      return <div className="bodyWrapper">
        <b className="loginTitle">Please Login or Signup!!</b>
        {/* login */}
        <div className="inputWrapper">
          <b className="pleaseLogin">Login</b>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputStagedUsername(value)}
            placeholder="username">
          </input>
          <input className="inputForm"
            type="password"
            onChange={({ target: { value } }) =>
              this.props.inputStagedPassword(value)}
            placeholder="password">
          </input>
          <b onClick={e => this.props.loginUser(this.props.currentUsername, 
                                                this.props.currentPassword)}
            className="inputButton">Login</b>
        </div>
        {/* signup */}
        <div className="inputWrapper">
          <b className="pleaseLogin">Sign up</b>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputStagedUsername(value)}
            placeholder="username">
          </input>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputStagedPassword(value)}
            placeholder="password">
          </input>
          <input className="inputForm"
            type="number"
            onChange={({ target: { value } }) =>
              this.props.inputStagedPin(value)}
            placeholder="Pin">
          </input>
          <input className="inputForm"
            type="email"
            onChange={({ target: { value } }) =>
              this.props.inputStagedEmail(value)}
            placeholder="email">
          </input>
          <b onClick={e => this.props.signupUser(this.props.currentUsername, 
                                                 this.props.currentPassword,
                                                 this.props.currentPin,
                                                 this.props.currentEmail)}
            className="inputButton">Sign up</b>
        </div>
      </div>
    }

    switch (this.props.currentFocus) {

      case "kills": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">KILLS</h1>
      </div>

      case "gameOverview": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">GAME OVERVIEW</h1>
      </div>

      case "profile": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">PROFILE</h1>
      </div>

      case "rules": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">RULES</h1>
      </div>

      case "createGame": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">CREATE</h1>
      </div>

      // home
      default: return <div className="bodyWrapper">
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
               onClick={e => this.props.switchViewTo("kills")}>KILLS?!</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("gameOverview")}>Game overview</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("profile")}>Profile</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("rules")}>Rules</b>
            <b className="navigatorButton"
               onClick={e => this.props.logoutUser()}>Logout</b>
          </div>
        </div>
        {this.pageFocus()}
      </div>
    </div>
  );
}

const {
  currentPageFocus,
  isLoggedIn,

  stagedUsername,
  stagedPassword,
  stagedPin,
  stagedEmail,
} = componentSelectors

const mapStateToProps = state => ({
  currentFocus: currentPageFocus(state),
  userIsLoggedIn: isLoggedIn(state),

  currentUsername: stagedUsername(state),
  currentPassword: stagedPassword(state),
  currentPin: stagedPin(state),
  currentEmail: stagedEmail(state),
});

const {
  changePageView,

  inputStagedUsernameAction,
  inputStagedPasswordAction,
  inputStagedPinAction,
  inputStagedEmailAction,

  validateUserAction,
  signupUserAction,
  logoutUserAction,
} = actions;

const mapDispatchToProps = dispatch => ({
  switchViewTo: target => dispatch(changePageView(target)),

  inputStagedUsername: value => dispatch(inputStagedUsernameAction(value)),
  inputStagedPassword: value => dispatch(inputStagedPasswordAction(value)),
  inputStagedPin: value => dispatch(inputStagedPinAction(value)),
  inputStagedEmail: value => dispatch(inputStagedEmailAction(value)),

  loginUser: (username, password) => dispatch(
                                      validateUserAction(username, password)),
  signupUser: (username, password, pin, email) => dispatch(
                                                    signupUserAction(username, 
                                                                     password, 
                                                                     pin, 
                                                                     email)),
  logoutUser: () => dispatch(logoutUserAction()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


