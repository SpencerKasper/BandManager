import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import AddABandModal from './AddABandModal';
import CalendarGeneral from '../Calendar/CalendarGeneral';
import Axios from 'axios';
import {AsyncStorage} from 'AsyncStorage';
import URLHelper from '../Helpers/URLHelper';
import Band from './Band';
import'./MyBands.css';
import moment from 'moment';
import AddEventModal from './AddEventModal';

class MyBands extends Component {
  constructor(props){
    super(props);

    this.state = {
      ownedBands: [],
      getOwnedBandsURL: "",
      getAllUserEventsURL: "",
      userID: "",
      ownedBandComponents: [],
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "hours")),
          title: "Band Practice"
        }
      ]
    }

    this.getOwnedBands = this.getOwnedBands.bind(this);
    this.addABandToOwnedBands = this.addABandToOwnedBands.bind(this);
    this.setGetOwnedBandsURL = this.setGetOwnedBandsURL.bind(this);
    this.buildOwnedBandsList = this.buildOwnedBandsList.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.onEventDrop = this.onEventDrop.bind(this);
    this.addEventToCalendar = this.addEventToCalendar.bind(this);
    this.getAllUserEvents = this.getAllUserEvents.bind(this);
    this.setGetUserEventsURL = this.setGetUserEventsURL.bind(this);
  }

  componentWillMount(){
    // Set userID and set URLs
    AsyncStorage.getItem("loggedInUserID").then((value) => this.setState({userID: value},() => {
      URLHelper.buildAPIURL("bands", ["userID=" + this.state.userID], this.setGetOwnedBandsURL);
      URLHelper.buildAPIURL("events/" + this.state.userID, null, this.setGetUserEventsURL);
    }));
  }

  getAllUserEvents(URL){
    alert(URL);

    Axios.get(URL)
      .then((response) => {
        alert(JSON.stringify(response.data));
        this.setState({
          events: response.data
        })
      })
  }

  getOwnedBands(URL){
    Axios.get(URL)
        .then((response) => {
          this.setState({
            ownedBands: response.data
          }, () => {
            this.buildOwnedBandsList();
          })
        })
  }

  setGetUserEventsURL(URL){
    this.setState({
      getAllUserEventsURL: URL
    }, () => {
      this.getAllUserEvents(URL);
    })
  }

  setGetOwnedBandsURL(URL){
    this.setState({
      getOwnedBandsURL: URL
    }, () => {
      this.getOwnedBands(URL);
    })
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

  onEventResize = (type, { event, start, end }) => {
    alert("resize");
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    this.setState(state => {
        state.events[0].start = start;
        state.events[0].end = end;
        return {events: state.events};
    })
  };

  addEventToCalendar(event){
    var events = this.state.events;

    events.push(event);

    this.setState({
      events
    }, () => {
      
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
          <div className="OwnedBandsContainer">
            <h4 className="OwnedBandsTitle">Your Bands</h4>
            <div className="BandListContainer">
              {this.state.ownedBandComponents}
            </div>
          </div>
          <hr></hr>
          <div>
            <h4 className="OwnedBandsTitle">Your Calendar</h4>
            <AddEventModal 
              addEventToCalendar={this.addEventToCalendar}
              userID={this.state.userID}/>
            <CalendarGeneral 
              calendarLoadStartDate={new Date()}
              defaultView={"week"}
              calendarEvents={this.state.events}
              onEventDrop={this.onEventDrop}
              onEventResize={this.onEventResize}/>
          </div>
        </div>

      </div>
    );
  }
}

export default MyBands;
