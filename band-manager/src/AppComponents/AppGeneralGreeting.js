import React, { Component } from 'react';
import '../App.css';
import {Row, Col} from 'reactstrap';

class AppGeneralGreeting extends Component {
  render() {
    return (
      <div className="AppGreeting">
              <Row >
                  <Col>
                  <div>
                    <p style={{textAlign: "center"}}>
                        Please sign in or sign up to gain access to the full features of the site!
                    </p>
                  </div>
                  </Col>
              </Row>
      </div>
    );
  }
}

export default AppGeneralGreeting;