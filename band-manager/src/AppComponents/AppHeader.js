import React, { Component } from 'react';
import '../App.css';

class AppHeader extends Component {
  render() {
    return (
      <div className="App-header">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default AppHeader;