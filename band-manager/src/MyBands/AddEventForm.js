import React, { Component } from 'react';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';

class AddEventForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            eventName: "",
            eventStartDate: "",
            eventStartTime: "",
            eventEndDate: "",
            eventEndTime: ""
        }

        this.accessEventName = this.accessEventName.bind(this);
        this.accessEventStartDate = this.accessEventStartDate.bind(this);
        this.accessEventStartTime = this.accessEventStartTime.bind(this);
        this.accessEventEndDate = this.accessEventEndDate.bind(this);
        this.accessEventEndTime = this.accessEventEndTime.bind(this);
    }

    accessEventName(event){
        this.setState({
            eventName: event.target.value
        }, () => {
            this.props.shareEventName(this.state.eventName);
        })
    }

    accessEventStartDate(event){
        this.setState({
            eventStartDate: event.target.value
        }, () => {
            this.props.shareEventStartDate(this.state.eventStartDate);
        })
    }

    accessEventStartTime(event){
        this.setState({
            eventStartTime: event.target.value
        }, () => {
            this.props.shareEventStartTime(this.state.eventStartTime);
        })
    }

    accessEventEndDate(event){
        this.setState({
            eventEndDate: event.target.value
        }, () => {
            this.props.shareEventEndDate(this.state.eventEndDate);
        })
    }

    accessEventEndTime(event){
        this.setState({
            eventEndTime: event.target.value
        }, () => {
            this.props.shareEventEndTime(this.state.eventEndTime);
        })
    }

  render() {
    return (
        <div className="AddEventFormContainer">
            <Form>
                <FormGroup>
                    <Label for="eventType">Event Type</Label>
                    <Input type="select" name="eventType" id="eventType">
                        <option></option>
                        <option>Gig</option>
                        <option>Practice</option>
                        <option>Meeting</option>
                        <option>Deadline</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="eventName">Event Name</Label>
                    <Input type="text"
                        name="eventName"
                        id="eventName"
                        onBlur={this.accessEventName}
                        placeholder="Enter an event name"/>
                </FormGroup>

                <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input type="date"
                        name="startDate"
                        id="startDate"
                        onBlur={this.accessEventStartDate}
                        placeholder="Enter the event's start date"/>
                </FormGroup>

                <FormGroup>
                    <Label for="startTime">Start Time</Label>
                    <Input type="time"
                        name="startTime"
                        id="startTime"
                        onBlur={this.accessEventStartTime}
                        placeholder="Enter the event's start time"/>
                </FormGroup>

                <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <Input type="date"
                        name="endDate"
                        id="endDate"
                        onBlur={this.accessEventEndDate}
                        placeholder="Enter the event's end date"/>
                </FormGroup>

                <FormGroup>
                    <Label for="endTime">End Time</Label>
                    <Input type="time"
                        name="endTime"
                        id="endTime"
                        onBlur={this.accessEventEndTime}
                        placeholder="Enter the event's end time"/>
                </FormGroup>
            </Form>
      </div>
    );
  }
}

export default AddEventForm;