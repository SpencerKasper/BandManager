import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import Axios from 'axios';
import './Register.css';
import {Redirect} from 'react-router-dom';

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
            passwordsMatch: true,
            errors: [],
            errorMessages: [],
            validatePassword: true,
            validUser: true
        }
    
        this.handleUserName = this.handleUserName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName= this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.validatePasswordsAndBuildMessages = this.validatePasswordsAndBuildMessages.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
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
          }, () => {
              //alert(this.state.phoneNumber);
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
            // SPENCER TO DO: Add error messages to top
        })
      }
    
      validateUser(){
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
        this.validateUser();
    
        if(this.state.validUser){
            Axios.post("http://localhost:3000/users", {
                "userName": this.state.userName,
                "password": this.state.password1,
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "dateOfBirth": this.state.birthday,
                "email": this.state.email,
                "phoneNumber": this.state.phoneNumber
            }).then(response => {

            })
        }
      }
    
      render() {
        return (
          <div className="registrationPage">
                <div className="registerWelcome">
                    <p>Please sign up with all of your info below.  When you're finished, go ahead and attempt to log in!</p>
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
                    registerUser={this.registerUser}
                    />
          </div>
        );
    }
}

export default Register;
