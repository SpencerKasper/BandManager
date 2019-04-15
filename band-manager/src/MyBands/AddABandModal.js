import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import BandList from './BandList';
import AppModal from '../AppComponents/AppModal';
import {AsyncStorage} from 'AsyncStorage';
import AddABandForm from './AddABandForm';
import Axios from 'axios';

class AddABandModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      band: {
        band:{
        bandName: "",
        bandMemberEmails: [],
        bandOwner: {},
        members: []
      }
    }
    }

    this.addBandFunction = this.addBandFunction.bind(this);
    this.handleBandName = this.handleBandName.bind(this);
    this.handleBandMemberEmailAddress = this.handleBandMemberEmailAddress.bind(this);
  }

  addBandFunction(){
    Axios.post("http://localhost:3000/bands", this.state.band)
        .then(response => {

        })
  }

  handleBandName(bandName){
    var band = this.state.band;
    band.bandName = bandName;

    this.setState({
        band: band
    }, () => {
        alert(JSON.stringify(this.state.band));
    })
  }

  handleBandMemberEmailAddress(emailAddress){
    var band = this.state.band;
    band.bandMemberEmails.push(emailAddress);
    this.setState({
        band: band
    }, () => {
        alert(JSON.stringify(this.state.band));
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
            submitFunction={this.addBandFunction}
            modalBody={
                <AddABandForm />
            }/>
          <BandList />
        </div>

      </div>
    );
  }
}

export default AddABandModal;
