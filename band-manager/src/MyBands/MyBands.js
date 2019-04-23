import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import AddABandModal from './AddABandModal';
import CalendarGeneral from '../Calendar/CalendarGeneral';
import Axios from 'axios';
import {AsyncStorage} from 'AsyncStorage';
import URLHelper from '../Helpers/URLHelper';
import Band from './Band';
import'./MyBands.css';

class MyBands extends Component {
  constructor(props){
    super(props);

    this.state = {
      ownedBands: [],
      getOwnedBandsURL: "",
      userID: "",
      ownedBandComponents: []
    }

    this.addABandToOwnedBands = this.addABandToOwnedBands.bind(this);
    this.setGetOwnedBandsURL = this.setGetOwnedBandsURL.bind(this);
    this.setOwnedBands = this.setOwnedBands.bind(this);
    this.buildOwnedBandsList = this.buildOwnedBandsList.bind(this);
  }

  componentDidMount(){
    this.setOwnedBands();
  }

  setGetOwnedBandsURL(URL){
    this.setState({
      getOwnedBandsURL: URL
    }, () => {
      Axios.get(URL)
        .then((response) => {
          this.setState({
            ownedBands: response.data
          }, () => {
            this.buildOwnedBandsList();
          })
        })
    })
  }

  setOwnedBands(){
    AsyncStorage.getItem("loggedInUserID").then((value) => this.setState({userID: value},() => {
      URLHelper.buildAPIURL("bands", ["userID=" + this.state.userID], this.setGetOwnedBandsURL);
    }));
  }

  buildOwnedBandsList(){
    const bands = this.state.ownedBands;
    const bandComponents = [];

    for(const band of bands){
      bandComponents.push(
        <Band bandName={band.bandName} 
          bandID={band._id}/>
      );
    }

    this.setState({
      ownedBandComponents: bandComponents
    })
  }

  addABandToOwnedBands(band){
    var bands = this.state.ownedBands;

    bands.push(band);

    this.setState({
      ownedBands: bands
    }, () => {
      this.buildOwnedBandsList();
    })
  }

  render() {
    return (
      <div className="MyBands">
        <div>
          <AppHeader
            title={"My Bands"}/>
        </div>
        <div>
          <AddABandModal 
            updateList={this.addABandToOwnedBands}/>
          <div>
            <h4 className="OwnedBandsTitle">Your Bands</h4>
            <div>
              {this.state.ownedBandComponents}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MyBands;
