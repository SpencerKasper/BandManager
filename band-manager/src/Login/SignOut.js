import React, { Component } from 'react';
import {AsyncStorage} from 'AsyncStorage';

class SignOut extends Component {
  componentDidMount(){
    AsyncStorage.setItem("isLoggedIn", false).then(
    AsyncStorage.setItem("loggedInUserFullName", "").then(
    AsyncStorage.setItem("loggedInUsername", "").then(window.location.href = "http://localhost:3001/")));
}

  render() {
    return (
      <div className="SignOut">
        <div>
            <p>Signing out...</p>
        </div>
      </div>
    );
  }
}

export default SignOut;
