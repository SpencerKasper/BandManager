import React, { Component } from 'react';
import {Card, CardBody, CardTitle, Button, Row, Col} from 'reactstrap';
import './MyBands.css';

class Band extends Component {
  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  render() {
    const bandName = this.props.bandName;
    const bandID = this.props.bandID;

    return (
      <div>
        <Card>
            <CardBody>
                <Row className="BandContainer">
                    <Col>
                        <CardTitle>{bandName}</CardTitle>
                    </Col>
                    <Col className="ViewCalendarButton">
                        <Button>View Calendar</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default Band;
