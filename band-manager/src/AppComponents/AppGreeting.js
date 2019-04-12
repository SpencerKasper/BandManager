import React, { Component } from 'react';
import '../App.css';
import {Container, Row, Col} from 'reactstrap';

class AppGreeting extends Component {
  render() {
    const userName = this.props.userName;
    const fullName = this.props.fullName;

    return (
      <div className="AppGreeting">
              <Row>
                  <Col>
                    <div >
                        Welcome back, {fullName}!
                    </div>
                  </Col>
                  <Col style={{textAlign: "right"}}>
                    <div>
                        Logged in as {userName}
                    </div>
                  </Col>
              </Row>
      </div>
    );
  }
}

export default AppGreeting;