import React, { Component } from 'react';
import '../App.css';
import LoginModal from '../Login/LoginModal';
import {Row, Col, Container} from 'reactstrap';

class AppNavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInUserName: "Spencer Kasper"
    }
  }

  render() {
    return (
      <div className="topnav">
        <Container>
            <Row>
                <Col>
                    <a className="App-link">Home</a>
                </Col>
                <Col>
                    <LoginModal buttonLabel="Log In" />
                </Col>
                <Col>
                    <p className="App-link">{this.state.loggedInUserName}</p>
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default AppNavBar;