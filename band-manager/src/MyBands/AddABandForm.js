import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import InputItemGroup from '../AppComponents/InputItemGroup';
import '../Login/Login.css';

class AddABandForm extends Component {
  constructor(props){
      super(props);

      this.state = {
          currentEmailAddress: ""
      }

      this.addCurrentEmailToEmailAddressList = this.addCurrentEmailToEmailAddressList.bind(this);
      this.setCurrentEmailAddress = this.setCurrentEmailAddress.bind(this);
  }

  setCurrentEmailAddress(emailAddress){
      this.setState({
          currentEmailAddress: emailAddress
      })
  }

  addCurrentEmailToEmailAddressList(){
      if(this.state.currentEmailAddress === ""){
        alert("Please enter an email address first!");
      } else {
        this.props.handleBandMemberEmailAddress(this.state.currentEmailAddress);
        this.setState({
          currentEmailAddress: ""
        })
      }
  }

  render() {
    return (
      <div className="AddABandForm">
        <Form>
          <InputItemGroup
                labelName={"Band Name:"}
                inputType={"text"}
                placeholder={"Enter your band name here."}
                errorMessage={""}
                shareItemValue={this.props.handleBandName}
            />

            <InputItemGroup
              labelName={"Band Member Email Address:"}
              inputType={"dropdown"}
              shareItemValue={this.setCurrentEmailAddress}
              placeholder={"Enter your band member's email address."}
              errorMessage={""}
            />

            <Button onClick={this.addCurrentEmailToEmailAddressList}>Invite Band Member</Button>
        </Form>
      </div>
    );
  }
}
export default AddABandForm;