import React, { Component } from 'react';
import '../App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button} from 'reactstrap';
import {AsyncStorage} from 'AsyncStorage';
import AppHeader from './AppHeader';

  const appLink = {
    color: "white",
    fontSize: 20
  }

  const homeButton = {
    color: "white"
  }

class AppNavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
      loggedInUsername: "",
      loggedInFullName: ""
    }

    this.signOut = this.signOut.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem("loggedInUsername").then((value) => this.setState({loggedInUsername: value}));
    AsyncStorage.getItem("loggedInUserFullName").then((value) => this.setState({loggedInFullName: value}));
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  signOut(){

  }

  render() {
    let navbarContent;

    if(this.props.isAuthenticated === true || this.props.isAuthenticated === "true") {
      navbarContent =
      <Navbar className="navBar" color="primary" light expand="*" fixed={"top"}>
          <NavbarBrand href="/myBands" style={homeButton}>Band Manager</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="App">
              <p style={appLink}>Welcome back, {this.state.loggedInFullName}!</p>
            </NavItem>
            <NavItem className="App">
              <p style={appLink}>Logged in as {this.state.loggedInUsername}</p>
            </NavItem>
            <NavItem className="App">
              <NavLink href="/upload" style={appLink}>Upload</NavLink>
            </NavItem>
            <NavItem className="App">
              <NavLink href="/playback" style={appLink}>Audio Player</NavLink>
            </NavItem>
            <NavItem className="App">
              <NavLink href="/signOut" style={appLink}>Sign Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>;
    } else {
      navbarContent =
      <Navbar className="navBar" color="primary" light expand="*" fixed={"top"}>
          <NavbarBrand href="/login" style={homeButton}>Band Manager</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="App">
                <NavLink href="/register" style={appLink}>Register</NavLink>
              </NavItem>

              <NavItem className="App">
                <NavLink href="/login" style={appLink}>Log In</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>;
    }

    return (
      <div>
        {navbarContent}
      </div>
    );
  }
}

export default AppNavBar;