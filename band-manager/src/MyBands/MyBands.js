import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import AddABandModal from './AddABandModal';
import CalendarGeneral from '../Calendar/CalendarGeneral';

class MyBands extends Component {
  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
      <div className="MyBands">
        <div>
          <AppHeader
            title={"My Bands"}/>
        </div>
        <div>
          <AddABandModal />
          <CalendarGeneral />
        </div>

      </div>
    );
  }
}

export default MyBands;
