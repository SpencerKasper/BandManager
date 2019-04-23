import React, { Component } from 'react';
import AppHeader from '../AppComponents/AppHeader';

class Band extends Component {
  constructor(props){
    super(props);

    this.state = {
      bands: []
    }
  }

  render() {
    const bandName = this.props.bandName;

    return (
      <div className="Band">
        <AppHeader title={bandName}/>

        {this.state.bands}
      </div>
    );
  }
}

export default Band;
