import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import InputItemGroup from '../AppComponents/InputItemGroup';
import '../Login/Login.css';

class LoginForm extends Component {

  render() {
    return (
      <div className="logInForm">
        <Form>
          <InputItemGroup
                labelName={"User Name:"}
                inputType={"text"}
                placeholder={"Enter your user name here."}
                errorMessage={""}
                shareItemValue={this.props.handleUserName}
            />

            <InputItemGroup
              labelName={"Password:"}
              inputType={"password"}
              shareItemValue={this.props.handlePassword}
              placeholder={"Enter your password here."}
              errorMessage={""}
            />

            <FormGroup>
              <Button onClick={this.props.handleLogIn}>Log In</Button>
            </FormGroup>

            <FormGroup>
                <a href="/register">Don't have an account? Click here!</a>
            </FormGroup>
        </Form>
      </div>
    );
  }
}
export default LoginForm;