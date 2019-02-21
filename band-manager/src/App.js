import React, { Component } from 'react';
import Home from './Home/Home';
import './App.css';
import AppNavBar from './AppComponents/AppNavBar';
import {BrowserRouter, Route} from 'react-router-dom'
import AppHeader from './AppComponents/AppHeader';
import Register from './Registration/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppHeader />
          <AppNavBar />

          <div>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
