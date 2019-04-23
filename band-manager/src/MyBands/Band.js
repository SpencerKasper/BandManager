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
      <div className="BandContainer">
        <Card>
            <CardBody>
                <Row>
                    <Col>
                        <CardTitle>{bandName}</CardTitle>
                    </Col>
                    <Col className="ViewCalendarButton">
                        <Button>View {bandName + "'s"} Calendar</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default Band;
