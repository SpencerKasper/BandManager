import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import Axios from 'axios';
import './Register.css';
import {Redirect} from 'react-router-dom';
import AppHeader from '../AppComponents/AppHeader';
import URLHelper from '../Helpers/URLHelper';

class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            birthday: "",
            phoneNumber: "",
            password1: "",
            password2: "",
            passwordsMatch: false,
            errors: [],
            errorMessages: [],
            validatePassword: false,
            validUser: false,
            redirect: false,
            registerUserURL: "",
            loginRedirectURL: ""
        }
    
        this.setLoginRedirectURL = this.setLoginRedirectURL.bind(this);
        this.setRegisterURL = this.setRegisterURL.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName= this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.validatePasswordsAndBuildMessages = this.validatePasswordsAndBuildMessages.bind(this);
        this.validateAndRegisterUser = this.validateAndRegisterUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    componentDidMount(){
        URLHelper.buildAPIURL("users", null, this.setRegisterURL);
        URLHelper.buildRedirectURL("login", null, this.setLoginRedirectURL);
    }

    setRegisterURL(URL){
        this.setState({
            registerUserURL: URL
        })
    }

    setLoginRedirectURL(URL){
        this.setState({
            loginRedirectURL: URL
        })
    }
    
      handleUserName(userName){
        this.setState({
            userName: userName
        });
      }
    
      handleFirstName(firstName){
        this.setState({
            firstName: firstName
        }, () => {
    
        })
      }
    
      handleLastName(lastName){
        this.setState({
            lastName: lastName
        })
      }
    
      handleEmail(email){
          this.setState({
              email: email
          })
      }
    
      handleBirthday(birthday){
          this.setState({
              birthday: birthday
          })
      }
    
      handlePhoneNumber(phoneNumber){
          this.setState({
              phoneNumber: phoneNumber
          })
      }
    
      handlePassword1(password1){
        this.setState({
            password1: password1
        })
      }
    
      handlePassword2(password2){
        this.setState({
            password2: password2
        })
      }
    
      validatePasswordsAndBuildMessages(password1, password2, validUser){
        var messages = this.state.errors;
        var validPassword = true;
        var passwordsMatch = true;
    
        if(password1 == ""){
            validPassword = false;
            messages.push("You must enter a password!");
        }
    
        if(password2 == ""){
            validPassword = false;
            messages.push("You must re-enter your password!");
        }
    
        if(password1 != password2){
            validPassword = false;
            messages.push("Passwords must match!");
            passwordsMatch = false;
        }
    
        this.setState({
            validatePassword: validPassword,
            errors: messages,
            passwordsMatch: passwordsMatch,
            validUser: validUser
        }, () => {
            this.registerUser();
        })
      }
    
      validateAndRegisterUser(){
        var validUser = true;
        var messages = [];
    
        if(this.state.userName == ""){
            validUser = false;
            messages.push("You must enter a user name!");
        }
    
        if(this.state.firstName == ""){
            validUser = false;
            messages.push("You must enter a first name!");
        }
    
        if(this.state.lastName == ""){
            validUser = false;
            messages.push("You must enter a last name!");
        }
    
        if(this.state.email == ""){
            validUser = false;
            messages.push("You must enter an email!");
        }
    
        if(this.state.birthday == ""){
            validUser = false;
            messages.push("You must enter a birthday!");
        }
        
        this.setState({
            errors: messages
        }, () => {
            this.validatePasswordsAndBuildMessages(this.state.password1, this.state.password2, validUser);
        })
      }
    
      registerUser(){
        if(this.state.validUser){
            Axios.post(this.state.registerUserURL, {
                "userName": this.state.userName,
                "password": this.state.password1,
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "dateOfBirth": this.state.birthday,
                "email": this.state.email,
                "phoneNumber": this.state.phoneNumber
            }).then(response => {
                if(response.data.message !== null && response.data.message != "undefined" && response.data.message !== undefined){
                    alert(response.data.message);
                } else {
                    window.location.href = this.state.loginRedirectURL;
                }
            })
        }
      }
    
      render() {
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return (
          <div>
            <AppHeader 
                title={"Registration"}/>
            <div className="registrationPage">
                <div className="registerWelcome">
                    <p>Please sign up with all of your info below.  When you're finished, go ahead and attempt to log in!</p>
                    <a href="/login">Already have an account? Click here to login!</a>
                </div>

                <RegistrationForm
                    handleUser={this.handleUser}
                    handleUserName={this.handleUserName}
                    handlePassword1={this.handlePassword1}
                    handlePassword2={this.handlePassword2}
                    handleFirstName={this.handleFirstName}
                    handleLastName={this.handleLastName}
                    handleEmail={this.handleEmail}
                    handleBirthday={this.handleBirthday}
                    handlePhoneNumber={this.handlePhoneNumber}
                    registerUser={this.validateAndRegisterUser}
                    />
                </div>
          </div>
        );
    }
}

export default Register;
