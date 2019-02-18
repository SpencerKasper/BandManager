import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LoginForm extends Component {

  render() {
    return (
      <div>
        <Form>
            <FormGroup>
                <Label for="userName">User Name:</Label>
                <Input  type="text" name="userName" id="userName" placeholder="Enter your user name here."/>
            </FormGroup>

            <FormGroup>
                <Label for="password">Password:</Label>
                <Input type="password" name="password" id="password" placeholder="Enter your password here."></Input>
            </FormGroup>

            <FormGroup>
                <a href="#">Don't have an account? Click here!</a>
            </FormGroup>
        </Form>
      </div>
    );
  }
}
export default LoginForm;