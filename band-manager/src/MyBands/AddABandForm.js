import React, { Component } from 'react';
import {Form} from 'reactstrap';
import InputItemGroup from '../AppComponents/InputItemGroup';
import EmailListItem from '../AppComponents/EmailListItem';

class AddABandForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            emailItems: [],
            maxKey: 0
        }

        this.addEmailItem = this.addEmailItem.bind(this);
    }

    addEmailItem(emailAddress){
        var emailItems = this.state.emailItems;

        emailItems.push(<EmailListItem emailAddress={emailAddress} key={this.state.maxKey + 1}/>);

        this.setState({
            emailItems,
            maxKey: this.state.maxKey + 1
        }, () => {
            this.props.handleEmailAddresses(emailAddress);
        })
    }
  render() {
    return (
        <div className="AddABandFormContainer">
            <Form>
                <InputItemGroup
                    labelName={"Band Name:"}
                    inputType={"text"}
                    placeholder={"Enter a unique band name."}
                    errorMessage={""}
                    shareItemValue={this.props.handleBandName}
                />

                <InputItemGroup
                    labelName={"Band Member Email Address"}
                    inputType={"text"}
                    placeholder={"Enter a band member email address"}
                    errorMessage={""}
                    shareItemValue={this.addEmailItem}
                    bClearInput={true}
                />

                {this.state.emailItems}
            </Form>
      </div>
    );
  }
}

export default AddABandForm;