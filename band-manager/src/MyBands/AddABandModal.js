import React, { Component } from 'react';
import AppModal from '../AppComponents/AppModal';
import {AsyncStorage} from 'AsyncStorage';
import AddABandForm from './AddABandForm';
import Axios from 'axios';
import {Alert} from 'reactstrap';
import ErrorMessage from '../Error/ErrorMessage';
import '../App.css';

class AddABandModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      band: {
        bandName: "",
        bandMemberEmails: [],
        bandOwnerID: ""
      }
    }

    this.setBandState = this.setBandState.bind(this);
    this.addBand = this.addBand.bind(this);
    this.handleBandName = this.handleBandName.bind(this);
    this.handleBandMemberEmailAddress = this.handleBandMemberEmailAddress.bind(this);
  }

  componentDidMount(){
    const band = this.state.band;

    AsyncStorage.getItem("loggedInUserID").then((value) => 
      band.bandOwnerID = value
    ).then(() => {
      this.setBandState(band);
    });
  }

  setBandState(band){
    this.setState({
      band
    });
  }

  addBand(){
    Axios.post("http://localhost:3000/bands", this.state.band)
        .then(response => {
          if(response.data.valid){
            this.props.updateList(response.data.band);
            this.props.setBandMessages([
              <Alert color="success" className="AlignCenter">
                You have successfully added a band and become the owner.
              </Alert>
            ]);
          } else {
            this.props.setBandMessages(response.data.errorMessages.map(errorMessage =>
              <ErrorMessage errorMessage={errorMessage} />
            ));
          }
        })
  }

  handleBandName(bandName){
    var band = this.state.band;
    band.bandName = bandName;

    this.setBandState(band);
  }

  handleBandMemberEmailAddress(emailAddress){
    var band = this.state.band;
    band.bandMemberEmails.push(emailAddress);
    
    this.setBandState(band);
  }

  render() {
    return (
      <div className="AddABandModal">
        <div>
          <AppModal 
            modalTitle={"Add a Band"}
            submitButtonName={"Submit"}
            modalOpenButtonName={"Add a Band"}
            submitFunction={this.addBand}
            modalBody={
                <AddABandForm 
                  handleBandName={this.handleBandName}
                  handleEmailAddresses={this.handleBandMemberEmailAddress}/>
            }/>
        </div>

      </div>
    );
  }
}

export default AddABandModal;
