import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./CalendarGeneral.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

class CalendarGeneral extends Component {
  constructor(props){
      super(props);

      this.state = {
        events: [
          {
            start: new Date(),
            end: new Date(moment().add(1, "hours")),
            title: "Band Practice"
          }
        ]
      };

      this.onEventResize = this.onEventResize.bind(this);
      this.onEventDrop = this.onEventDrop.bind(this);
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

  render() {
    const calendarLoadStartDate = this.props.calendarLoadStartDate;
    const defaultView = this.props.defaultView;
    const calendarEvents = this.props.calendarEvents;

    return (
      <div className="CalendarGeneral">
        <DnDCalendar
          defaultDate={calendarLoadStartDate}
          defaultView={defaultView}
          events={calendarEvents}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable={true}
          localizer={localizer}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default CalendarGeneral;