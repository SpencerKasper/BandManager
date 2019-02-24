import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginForm from './LoginForm';
import '../App.css';
import Axios from 'axios';
import {AsyncStorage} from 'AsyncStorage';
import AppHeader from '../AppComponents/AppHeader';

const loggedInText = {
  color: "white"
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loggedIn: false,
      loggedInUserName: "",
      userName: "",
      password: ""
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  logIn(){
    Axios.get("http://localhost:3000/users/" + this.state.userName + "/" + this.state.password)
      .then(response => {
        if(response.data.validUser == true){
          AsyncStorage.setItem("isLoggedIn", true);
          AsyncStorage.setItem("loggedInUsername", response.data.userName);
          AsyncStorage.setItem("loggedInUserFullName", response.data.fullName);
          this.props.handleAuthentication(true);
          window.location.href = "http://localhost:3001/mybands";
        } else {
          alert("The user name and password cannot be determined to be valid.");
        }
      })
  }

  handleUserName(userName){
    this.setState({
      userName: userName
    })
  }

  handlePassword(password){
    this.setState({
      password: password
    })
  }

  render() {
    return (
      <div>
        <AppHeader 
          title={"Log In"}/>
        <div>
          <p>
            Please enter your info below to log in.  If you don't have an account, click the link below to sign up!
          </p>
        </div>
        <LoginForm 
          handleUserName={this.handleUserName}
          handleLogIn={this.logIn}
          handlePassword={this.handlePassword}/>
      </div>
    );
  }
}

export default Login;