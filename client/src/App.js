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
        <b className="loginTitle">Please Successfully Login or Signup!!</b>
        {/* login */}
        <div className="inputWrapper">
          <b className="pleaseLogin">Login</b>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputStagedUsername(value)}
            placeholder="name">
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
        <hr className="fullPageBreak" />
        {/* signup */}
        <div className="inputWrapper">
          <b className="pleaseLogin">Sign up</b>
          <input className="inputForm"
            type="text"
            onChange={({ target: { value } }) =>
              this.props.inputStagedUsername(value)}
            placeholder="name">
          </input>
          <input className="inputForm"
            type="password"
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
          <h1 className="bodyElementTitle">Secret pin of your kill?</h1>
          <input className="inputForm"
            type="number"
            onChange={({ target: { value } }) =>
              this.props.inputStagedPin(value)}
            placeholder="Pin">
          </input>
          <b onClick={e => this.props.eliminate(this.props.currentPin, 
                                                this.props.currentUsername)}
             className="inputButton">
             ELIMINATE!!
          </b>
      </div>

      case "profile": return <div className="bodyWrapper">
        {this.props.retreiveTarget(this.props.currentUsername)}
        <h1 className="bodyElementTitle">Your Profile</h1>
        <hr className="fullPageBreak"/>
        <b className="profileInfo">Name: {this.props.currentUsername}</b>
        <b className="profileInfo">Target: {this.props.currentTarget}</b>
        {/* TODO TEDDY : ALLOW FOR UPDATING INFO */}
      </div>

      case "rules": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">RULES</h1>
      </div>

      case "createGame": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">CREATE</h1>
      </div>

      // currentFocus = home
      // game overview
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
               onClick={e => this.props.switchViewTo("kills")}>GOT A KILL?!</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("profile")}>Profile</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("rules")}>Rules</b>
            <b className="navigatorButton"
               onClick={e => this.props.switchViewTo("createGame")}>Create Game</b>
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

  getCurrentTarget,
} = componentSelectors

const mapStateToProps = state => ({
  currentFocus: currentPageFocus(state),
  userIsLoggedIn: isLoggedIn(state),

  currentUsername: stagedUsername(state),
  currentPassword: stagedPassword(state),
  currentPin: stagedPin(state),
  currentEmail: stagedEmail(state),

  currentTarget: getCurrentTarget(state),
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

  eliminateAction,

  retreiveTargetAction,
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

  eliminate: (targetPin, assassinUsername) => dispatch(eliminateAction(
                                                        targetPin, 
                                                        assassinUsername)),

  retreiveTarget: username => dispatch(retreiveTargetAction(username)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


