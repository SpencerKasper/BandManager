import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import InputItemGroup from '../AppComponents/InputItemGroup';
import ErrorMessage from '../Error/ErrorMessage';
import 'react-phone-number-input/style.css';
import PhoneInput  from 'react-phone-number-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
var validator = require("email-validator");

const errorStyle = {
    color: "red",
    fontWeight: "bold",
    fontSize: "12px",
    textAlign: "center"
};

class RegistrationForm extends Component {
    //Add code here to set the state values of each of th form inputs
  constructor(props){
      super(props);

      this.state = {
          userName: "",
          userNameError: "",
          firstName: "",
          firstNameError: "",
          lastName: "",
          lastNameError: "",
          email: "",
          emailError: "",
          birthday: new Date(),
          birthdayError: "",
          password1: "",
          password2: "",
          password1Error: "",
          password2Error: "",
          allowPasswordSubmit: false,
          phoneNumber: "",
          phoneNumberError: "",
          type: "Regular"
      }
      
      this.handleUserName = this.handleUserName.bind(this);
      this.handleFirstName = this.handleFirstName.bind(this);
      this.handleLastName = this.handleLastName.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handlePassword1 = this.handlePassword1.bind(this);
      this.handlePassword2 = this.handlePassword2.bind(this);
      this.handleBirthday = this.handleBirthday.bind(this);
  }

  handleUserName(userName, setUserNameError){
    this.setState({
        userName: userName
    }, () => {
        var userNameError = "";

        if(this.state.userName == ""){
            userNameError = "You must enter a user name.";
        }

        setUserNameError(userNameError);

        this.setState({
            userNameError: userNameError
        }, () => {
            this.props.handleUserName(this.state.userName);
        })
    })
  }

  handleFirstName(firstName, setFirstNameError){
    this.setState({
        firstName: firstName
    }, () => {
        var firstNameError = "";

        if(this.state.firstName == ""){
            firstNameError = "You must enter a first name.";
        }

        setFirstNameError(firstNameError);

        this.setState({
            firstNameError: firstNameError
        }, () => {
            this.props.handleFirstName(this.state.firstName);
        })
    })
  }

  handleLastName(lastName, setLastNameError){
    this.setState({
        lastName: lastName
    }, () => {
        var lastNameError = "";

        if(this.state.lastName == ""){
            lastNameError = "You must enter a last name.";
        }

        setLastNameError(lastNameError);

        this.setState({
            lastNameError: lastNameError
        }, () => {
            this.props.handleLastName(this.state.lastName);
        })
    })
  }

  handleEmail(email, setEmailError){
    this.setState({
        email: email
    }, () => {
        var emailError = "";

        if(this.state.email == ""){
            emailError = "You must enter an email";
        }

        if(!validator.validate(this.state.email) && !(this.state.email == "")){
            emailError = "Your email must be in the following form: test@test.com"
        }

        setEmailError(emailError);

        this.setState({
            emailError: emailError
        }, () => {
            this.props.handleEmail(this.state.email);
        })
    })
  }

  handleBirthday(birthday){
      this.setState({
          birthday: birthday
      }, () => {
          this.props.handleBirthday(this.state.birthday);
      })
  }

  handlePassword1(password1, setPassword1Error){
    this.setState({
        password1: password1
    }, () => {
        var password1Error = "";

        if(this.state.password1 == ""){
            password1Error = "You must enter a password.";
        }

        if(this.state.password1.length < 7 && this.state.password1 != ""){
            password1Error = "Your password must be at least 7 characters long.";
        }

        setPassword1Error(password1Error);

        this.setState({
            password1Error: password1Error
        }, () => {
            this.props.handlePassword1(this.state.password1);

            if(this.state.password1Error == "" && this.state.password2Error == ""){
                this.setState({
                    allowPasswordSubmit: true
                }, () => {
                    //alert(this.state.allowPasswordSubmit);
                })
            }
        })
    })
  }

  handlePassword2(password2, setPassword2Error){
    this.setState({
        password2: password2
    }, () => {
        var password2Error = "";

        if(this.state.password1 != this.state.password2){
            password2Error = "Passwords do not currently match.";
        }

        setPassword2Error(password2Error);

        this.setState({
            password2Error: password2Error
        }, () => {
            this.props.handlePassword2(this.state.password2);

            if(this.state.password1Error == "" && this.state.password2Error == ""){
                this.setState({
                    allowPasswordSubmit: true
                }, () => {
                    //alert(this.state.allowPasswordSubmit);
                })
            }
        })
    })
  }
  
  render() {
    return (
      <div>
        <Form>
            <InputItemGroup 
                labelName={"User Name:"}
                inputType={"text"}
                placeholder={"Enter your desired user name here."}
                errorMessage={this.state.userNameError}
                shareItemValue={this.handleUserName}
            />

            <InputItemGroup 
                labelName={"First Name:"}
                inputType={"text"}
                placeholder={"Enter your first name here."}
                errorMessage={this.state.firstNameError}
                shareItemValue={this.handleFirstName}
            />

            <InputItemGroup
                labelName={"Last Name:"}
                inputType={"text"}
                placeholder={"Enter your last name here."}
                errorMessage={this.state.lastNameError}
                shareItemValue={this.handleLastName}
            />

            <InputItemGroup
                labelName={"Email:"}
                inputType={"email"}
                placeholder={"Enter your email here. (Ex: myemail@email.com)"}
                errorMessage={this.state.emailError}
                shareItemValue={this.handleEmail}
            />

            <FormGroup>
                <Label for="phoneNumber">Phone Number:</Label>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={this.state.phoneNumber}
                    onChange={phoneNumber => 
                        this.setState({phoneNumber}, 
                        () => {
                            this.props.handlePhoneNumber(this.state.phoneNumber);

                            if(this.state.phoneNumber == ""){
                                this.setState({
                                    phoneNumberError: "You must enter a phone number."
                                }, () => {
                                    
                                })
                            }

                            else{
                                this.setState({
                                    phoneNumberError: ""
                                })
                            }
                        })
                    }
                />
                <div>
                    <p style={errorStyle}>{this.state.phoneNumberError}</p>
                </div>
            </FormGroup>

            <FormGroup>
                <Label for="birthdayPicker">Birthday:</Label><br></br>
                <DatePicker
                    id="birthdayPicker"
                    selected={this.state.birthday}
                    onChange={this.handleBirthday}
                />
            </FormGroup>

            <InputItemGroup
                labelName={"Password:"}
                inputType={"password"}
                placeholder={"Enter your password here."}
                errorMessage={this.state.passwordError}
                shareItemValue={this.handlePassword1}
            />

            <InputItemGroup
                labelName={"Re-enter Password:"}
                inputType={"password"}
                placeholder={"Re-enter your password here."}
                errorMessage={this.state.passwordError2}
                shareItemValue={this.handlePassword2}
            />

            <Button onClick={this.props.registerUser}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default RegistrationForm;