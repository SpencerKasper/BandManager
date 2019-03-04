import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import BandList from './BandList';
import AppModal from '../AppComponents/AppModal';
import AddABandForm from './AddABandForm';

class AddABandModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      bandName: "",
      bandMemberEmails: []
    }

    this.handleBandName = this.handleBandName.bind(this);
    this.handleBandMemberEmailAddress = this.handleBandMemberEmailAddress.bind(this);
  }

  handleBandName(bandName){
    this.setState({
        bandName: bandName
    })
  }

  handleBandMemberEmailAddress(emailAddress){
    var bandMemberEmailsList = this.state.bandMemberEmails;
    bandMemberEmailsList.push(emailAddress);
    this.setState({
        bandMemberEmails: bandMemberEmailsList
    }, () => {
        alert(this.state.bandMemberEmails);
    })
  }

  render() {
    return (
      <div className="AddABandModal">
        <div>
          <AppModal 
            modalTitle={"Add a Band"}
            submitButtonName={"Submit"}
            modalOpenButtonName={"Add a Band"}
            modalBody={
                <AddABandForm handleBandName={this.handleBandName}
                    handleBandMemberEmailAddress={this.handleBandMemberEmailAddress}/>
            }/>
          <BandList />
        </div>

      </div>
    );
  }
}

export default AddABandModal;
