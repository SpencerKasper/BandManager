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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

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
      isOpen: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    let navbarContent;

    if(this.props.isAuthenticated) {
      navbarContent =
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/" style={appLink}>Home</NavLink>
        </NavItem>
      </Nav>;
    } else {
      navbarContent = 
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/register" style={appLink}>Register</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/login" style={appLink}>Log In</NavLink>
        </NavItem>
      </Nav>;
    }

    return (
      <div>
        <Navbar color="primary" light expand="md">
          <NavbarBrand href="/" style={homeButton}>Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {navbarContent}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavBar;