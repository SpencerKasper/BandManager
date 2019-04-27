import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import AddABandModal from './AddABandModal';
import CalendarGeneral from '../Calendar/CalendarGeneral';
import Axios from 'axios';
import {AsyncStorage} from 'AsyncStorage';
import URLHelper from '../Helpers/URLHelper';
import Band from './Band';
import'./MyBands.css';
import '../App.css';
import {Alert} from 'reactstrap';
import AddEventModal from './AddEventModal';
import ErrorMessage from '../Error/ErrorMessage';

class MyBands extends Component {
  constructor(props){
    super(props);

    this.state = {
      ownedBands: [],
      getOwnedBandsURL: "",
      getAllUserEventsURL: "",
      userID: "",
      ownedBandComponents: [],
      events: [],
      calendarMessages: [],
      bandMessages: []
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
    this.displayValidEventMessage = this.displayValidEventMessage.bind(this);
    this.setBandMessages = this.setBandMessages.bind(this);
  }

  componentWillMount(){
    // Set userID and set URLs
    AsyncStorage.getItem("loggedInUserID").then((value) => this.setState({userID: value},() => {
      URLHelper.buildAPIURL("bands", ["userID=" + this.state.userID], this.setGetOwnedBandsURL);
      URLHelper.buildAPIURL("events/" + this.state.userID, null, this.setGetUserEventsURL);
    }));
  }

  getAllUserEvents(URL){
    Axios.get(URL)
      .then((response) => {
        const events = response.data;
        
        if(events.length > 0){
          for(var i = 0; i < events.length; i++){
            events[i].start = new Date(events[i].start);
            events[i].end = new Date(events[i].end);
          }
          
          this.setState({
            events: events
          })
        } else {
          this.setState({
            calendarMessages: [
              <Alert color="warning" className="AlignCenter">
                It looks like you haven't added any events to your calendar.  Click the "Add Events" button below and get organized.
              </Alert>
            ]
          })
        }
      })
  }

  getOwnedBands(URL){
    Axios.get(URL)
        .then((response) => {
          this.setState({
            ownedBands: response.data
          }, () => {
            if(response.data.length > 0){
              this.buildOwnedBandsList();
            } else {
              this.setState({
                bandMessages: [
                  <Alert color="warning" className="AlignCenter">
                    It seems you don't own any bands...Click above to create one!
                  </Alert>
                ]
              })
            }
            
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

  displayValidEventMessage(){
    this.setState({
        calendarMessages: [
            <Alert color="success" className="AlignCenter">
                You have successfully added an event to your calendar!
            </Alert>
        ]
    })
  }

  displayErrorEventMessage(){
    this.setState({
      calendarMessages: [
        <ErrorMessage errorMessage="There was an error adding the event to your calendar!"/>
      ]
    })
  }

  setBandMessages(bandMessages){
    this.setState({
      bandMessages
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
            updateList={this.addABandToOwnedBands}
            setBandMessages={this.setBandMessages}/>
          <h4 className="OwnedBandsTitle">Your Bands</h4>
          <div>
            {this.state.bandMessages}
          </div>
          <div className="OwnedBandsContainer">
            <div className="BandListContainer">
              {this.state.ownedBandComponents}
            </div>
          </div>
          <hr></hr>
          <div>
            <h4 className="OwnedBandsTitle">Your Calendar</h4>
            <div>
              {this.state.calendarMessages}
            </div>
            <AddEventModal 
              addEventToCalendar={this.addEventToCalendar}
              userID={this.state.userID}
              displayValidEventMessage={this.displayValidEventMessage}
              displayErrorEventMessage={this.displayValidEventMessage}/>
            <CalendarGeneral 
              calendarLoadStartDate={new Date()}
              defaultView={"agenda"}
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
