import React, { Component } from 'react';
import MyBands from './MyBands/MyBands';
import './App.css';
import AppNavBar from './AppComponents/AppNavBar';
import {BrowserRouter, Route} from 'react-router-dom';
import Register from './Registration/Register';
import Login from './Login/Login';
import {AsyncStorage} from 'AsyncStorage';
import SignOut from './Login/SignOut';
import AudioUpload from './AudioUpload/AudioUpload';
import AudioPlayback from './AudioPlayback/AudioPlayback';

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

  componentWillMount(){
    AsyncStorage.getItem("isLoggedIn").then((value) => this.setState({authenticated: value}));
  }

  handleAuthentication(isAuthed){
    this.setState({
      authenticated: isAuthed
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <AppNavBar 
              loggedInUserName={this.state.loggedInUserName}
              isAuthenticated={this.state.authenticated}/>
          </div>

          <div>
            <Route path='/upload' component={AudioUpload}/>
            <Route path='/playback' component={AudioPlayback}/>
            <Route exact path='/mybands' 
              render={(props) => <MyBands authenticated={this.state.authenticated}/>}/>
            <Route path='/register' component={Register} />
            <Route path='/login' 
              render={(props) => <Login handleAuthentication={this.handleAuthentication}/>}/>
            <Route path='/signOut' component={SignOut} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
