import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div>
          <AppHeader
            title={"My Bands"}/>
        </div>
      </div>
    );
  }
}

export default Home;
