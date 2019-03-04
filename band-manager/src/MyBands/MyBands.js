import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';
import BandList from './BandList';
import AddABandModal from './AddABandModal';

class MyBands extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: "",
      
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
          <BandList />
        </div>

      </div>
    );
  }
}

export default MyBands;
