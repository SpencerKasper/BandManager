import React, { Component } from 'react';
import AppModal from '../AppComponents/AppModal';
import Axios from 'axios';
import AddEventForm from './AddEventForm';
import URLHelper from '../Helpers/URLHelper';
import {Alert} from 'reactstrap';

class AddEventModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      event: {
        title: "",
        start: {},
        end: {},
        eventType: ""
      },
      addEventURL: ""
    }

    this.setEventName = this.setEventName.bind(this);
    this.setEventStartDate = this.setEventStartDate.bind(this);
    this.setEventStartTime = this.setEventStartTime.bind(this);
    this.setEventEndDate = this.setEventEndDate.bind(this);
    this.setEventEndTime = this.setEventEndTime.bind(this);
    this.setEventType = this.setEventType.bind(this);
    this.tryBuildDateTime = this.tryBuildDateTime.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.setAddEventURL = this.setAddEventURL.bind(this);
}

componentDidMount(){
    URLHelper.buildAPIURL("events", null, this.setAddEventURL);
}

setAddEventURL(URL){
    this.setState({
        addEventURL: URL
    })
}

  setEventName(eventName){
      this.setState(state => {
        state.event.eventName = eventName;
        state.event.title = eventName;
      })
  }

  setEventStartDate(startDate){
      this.setState(state => {
          state.event.startDate = startDate;
      }, () => {
        this.tryBuildDateTime("start");
      })
  }

  setEventStartTime(startTime){
      this.setState(state => {
          state.event.startTime = startTime;
      }, () => {
        this.tryBuildDateTime("start");
      })
  }

  setEventEndDate(endDate){
      this.setState(state => {
          state.event.endDate = endDate;
      }, () => {
          this.tryBuildDateTime("end");
      })
  }

  setEventEndTime(endTime){
      this.setState(state => {
          state.event.endTime = endTime;
      }, () => {
          this.tryBuildDateTime("end");
      })
  }

  setEventType(eventType){
      this.setState(state => {
          state.event.eventType = eventType;
      })
  }

  tryBuildDateTime(sStartOrEnd){
    var date = "";
    var time = "";

    if(sStartOrEnd === "start"){
        if(this.state.event.startDate != undefined && this.state.event.startTime != undefined){
            date = this.state.event.startDate;
            time = this.state.event.startTime;

            const dateTimeAttempt = date + " " + time;
            const dateTime = new Date(dateTimeAttempt);

            this.setState(state => {
                state.event.start = dateTime;
            })
        } else {
            return;
        }
    } else {
        if(this.state.event.endTime != undefined && this.state.event.endDate != undefined){
            date = this.state.event.endDate;
            time = this.state.event.endTime;

            const dateTimeAttempt = date + " " + time;
            const dateTime = new Date(dateTimeAttempt);
        
            this.setState(state => {
                state.event.end = dateTime;
            })
        } else {
            return;
        }
    }

  }

  addEvent(){
    const event = this.state.event;
    this.props.addEventToCalendar(event);
    
    Axios.post(this.state.addEventURL, {
        title: event.title,
        start: event.start,
        end: event.end,
        userID: this.props.userID,
        eventType: event.eventType
    }).then(response => {
        if(response.valid){
            this.props.displayValidEventMessage();
        } else {
            this.props.displayErrorEventMessage();
        }
    })
  }

  render() {
    return (
      <div className="AddEventModalContainer">
        <div>
          <AppModal 
            modalTitle={"Add an Event"}
            submitButtonName={"Submit"}
            modalOpenButtonName={"Add an Event"}
            submitFunction={this.addEvent}
            modalBody={
                <AddEventForm 
                    shareEventName={this.setEventName}
                    shareEventStartDate={this.setEventStartDate}
                    shareEventStartTime={this.setEventStartTime}
                    shareEventEndDate={this.setEventEndDate}
                    shareEventEndTime={this.setEventEndTime}
                    shareEventType={this.setEventType}/>
            }/>
        </div>

      </div>
    );
  }
}

export default AddEventModal;
