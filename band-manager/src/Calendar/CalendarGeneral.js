import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import PropTypes from 'prop-types';
import "./CalendarGeneral.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

class CalendarGeneral extends Component {
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
          onEventDrop={this.props.onEventDrop}
          onEventResize={this.props.onEventResize}
          localizer={localizer}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

CalendarGeneral.propTypes = {
    calendarLoadStartDate: PropTypes.object,
    defaultView: PropTypes.string,
    calendarEvents: PropTypes.array,
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func
};

export default CalendarGeneral;