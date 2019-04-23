import React, { Component } from 'react';
import AppModal from '../AppComponents/AppModal';
import {AsyncStorage} from 'AsyncStorage';
import AddABandForm from './AddABandForm';
import Axios from 'axios';
import AddEventForm from './AddEventForm';

class AddEventModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      event: {
        id: 1,
        title: "",
        start: new Date(),
        end: new Date()
      }
    }

    this.setEventName = this.setEventName.bind(this);
    this.setEventStartDate = this.setEventStartDate.bind(this);
    this.setEventStartTime = this.setEventStartTime.bind(this);
    this.tryBuildDateTime = this.tryBuildDateTime.bind(this);
  }

  setEventName(eventName){
      this.setState(state => {
        state.event.eventName = eventName;
        state.event.title = eventName;
      }, () => {
          alert(JSON.stringify(this.state.event));
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
        } else {
            return;
        }
    }

  }

  render() {
    return (
      <div className="AddEventModalContainer">
        <div>
          <AppModal 
            modalTitle={"Add an Event"}
            submitButtonName={"Submit"}
            modalOpenButtonName={"Add an Event"}
            submitFunction={this.addBand}
            modalBody={
                <AddEventForm 
                    shareEventName={this.setEventName}
                    shareEventStartDate={this.setEventStartDate}
                    shareEventStartTime={this.setEventStartTime}/>
            }/>
        </div>

      </div>
    );
  }
}

export default AddEventModal;
