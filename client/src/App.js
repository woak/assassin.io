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
        <hr className="fullPageBreak" />
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
        {/* TODO TEDDY : WHAT IF TARGET CHANGES (NOW HANDLED IN KILL ACTION? 
        Currently only runs if no target -> Need a better solution for when to 
        set target in state*/}
        {this.props.currentTarget.name ?
          null :
          this.props.retreiveTarget(this.props.currentUsername)}
        <h1 className="bodyElementTitle">Your Profile</h1>
        <hr className="fullPageBreak" />
        <b className="profileInfo">Your name: &nbsp;
          {this.props.currentUsername}</b>
        <b className="profileInfo">Your target: &nbsp;
          {this.props.currentTarget.name}</b>
        <b className="profileInfo">Your target's email (for mischief): &nbsp;
          {this.props.currentTarget.email}</b>
        {/* TODO TEDDY : ALLOW FOR UPDATING INFO */}
      </div>

      case "createGame": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">CREATE</h1>
        <hr className="fullPageBreak" />
      </div>

      case "rules": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">RULES</h1>
        <hr className="fullPageBreak" />

        <p className="rulesText">Welcome to the first annual EPO water gun
        assassin tournament. Your mission should you choose to accept it is to
        become the ultimate EPO assassin.
        PLEASE READ ALL THE RULES - IF YOU VIOLATE THEM EGREGIOUSLY THE GUILD
        POLICE FORCE WILL HUNT YOU DOWN AND YOU WILL GET WET.</p>
        <p className="rulesText">The game will begin at 12AM on Friday April
        5th, 2019 and continue until the winner is crowned or until 11:59 PM
        on spring fling.
        </p>
        <p className="rulesText">Please venmo @Teddy-Laurita $1 to play -
        the winner will take the pot. The rules are as follows:</p>
        <p className="rulesText">Basic rules:</p>
        <p className="rulesText">- All participants will be assigned a target</p>
        <p className="rulesText">- When one assassin kills their target, that 
        assassin will fill out the death form to inform the guild that the 
        target is dead</p>
        <p className="rulesText">- When one assassin kills their target that 
        assassin will receive the target's target as their new target</p> 
        <p className="rulesText">- Last assassin standing will be 
        crowned victor and will receive the entire pot (1$ per person).</p>
        <p className="rulesText">Elimination rules:</p>
        <p className="rulesText">This is water assassin</p>
        <p className="rulesText">Eliminations are made by getting your target 
        wet with one of the following: </p>
        <p className="rulesText">- Water gun </p>
        <p className="rulesText">- Water balloon </p>
        <p className="rulesText">- Super soaker </p>
        <p className="rulesText">Don't be a dick, if you get assassinated fess up, don't shoot people 
        egregiously, don't fill out the death form if you didn't actually kill 
        somebody. The game doesn't work if you (yes you) are a dick. </p>
        <p>- Guns: http://bfy.tw/MzJd </p>
      </div >

      case "error": return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">THERE WAS AN ERROR -
            TELL TEDDY HE'S A SCRUB AND WHAT HAPPENED</h1>
        <hr className="fullPageBreak" />
      </div>

      // currentFocus = home
      // game overview
      default: return <div className="bodyWrapper">
        {/* TODO TEDDY */}
        <h1 className="bodyElementTitle">HOME</h1>
        <hr className="fullPageBreak" />
        <b className="countdown">Time Remaining: </b> 
        <b className="countdown">{((new Date("April 26, 2019") - 
                                    Date.now())/1000/60/60/24).toFixed(0)}
          &nbsp; days</b>
        <b className="countdown">{(((new Date("April 26, 2019") - 
                                    Date.now())/1000/60/60/24) % 1 * 24).toFixed(0)}
          &nbsp; hours</b>
      </div>
    }
  }

  render = () => (
    <div className="App">
      <div className="homepage">
        <div className="navigatorWrapper">
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
            {/* TODO TEDDY */}
            {/* <b className="navigatorButton"
              onClick={e => this.props.switchViewTo("createGame")}>Create Game</b> */}
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


