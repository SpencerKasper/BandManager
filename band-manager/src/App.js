import React, { Component } from 'react';
import Home from './Home/Home';
import './App.css';
import AppNavBar from './AppComponents/AppNavBar';
import {BrowserRouter, Route} from 'react-router-dom'
import AppHeader from './AppComponents/AppHeader';
import Register from './Registration/Register';
import Login from './Login/Login';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInUserName: "",
      onLogInPage: false,
      showLogIn: true,
      showRegister: true,
      authenticated: false
    }

    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication(isAuthed){
    this.setState({
      authenticated: isAuthed
    }, () => {
      alert("Authenticated: " + this.state.authenticated);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppHeader />
          <AppNavBar 
            loggedInUserName={this.state.loggedInUserName}
            isAuthenticated={this.state.authenticated}/>

          <div>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' 
              render={(props) => <Login handleAuthentication={this.handleAuthentication}/>}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
