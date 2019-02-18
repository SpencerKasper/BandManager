import React, { Component } from 'react';
import RecipeAddModal from '../Recipes/RecipeAddModal.js';
import '../Styles/App.css';
import RegistrationModal from '../Registration/RegistrationModal';
import LoginModal from '../Login/LoginModal';

class AppNavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInUserName: ""
    }
  }

  render() {
    return (
      <div className="topnav">
        <a className="Applink">Home</a>
        <LoginModal buttonLabel="Log In" />
        <p style={loggedInText}>{this.state.loggedInUserName}</p>
      </div>
    );
  }
}

export default AppNavBar;