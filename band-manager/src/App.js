import React, { Component } from 'react';
import MyBands from './MyBands/MyBands';
import './App.css';
import AppNavBar from './AppComponents/AppNavBar';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import Register from './Registration/Register';
import Login from './Login/Login';
import {AsyncStorage} from 'AsyncStorage';
import SignOut from './Login/SignOut';
import AudioUpload from './AudioUpload/AudioUpload';
import AudioPlayback from './AudioPlayback/AudioPlayback';
import LandingPage from './LandingPage/LandingPage';

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb){
    this.isAuthenticated = false;
    setTimeout(cb,100);
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props}/>
      : <Redirect to='/login'/>
  )}/>
)

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

          <div className="flex-wrapper">
            <ul>
              <li><Link to="/public">Public Page</Link></li>
              <li><Link to="/protected">Protected Page</Link></li>
            </ul>
            <Route path='/public' component={Public} />
            <Route exact path="/" component={LandingPage} />
            <Route path='/upload' component={AudioUpload}/>
            <Route path='/playback' component={AudioPlayback}/>
            <Route exact path='/mybands' 
              render={(props) => <MyBands authenticated={this.state.authenticated}/>}/>
            <Route path='/register' component={Register} />
            <Route path='/login' 
              render={(props) => <Login handleAuthentication={this.handleAuthentication}/>}/>
            <Route path='/signOut' component={SignOut} />
            <PrivateRoute path='/protected' component={Protected} />
          </div>

          <footer className="AppFooter">A Spencer Kasper Music Technology Minor Capstone Project</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
