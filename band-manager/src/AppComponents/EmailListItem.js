import React from 'react';
import {Row, Col, Card, CardTitle, Button} from 'reactstrap';

class EmailListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const emailAddress = this.props.emailAddress;

    return (
      <div className="EmailListItemContainer">
          <Card>
            <Row>
                <Col>
                    {emailAddress}
                </Col>
                <Col>
                    <Button close />
                </Col>
            </Row>
          </Card>
      </div>
    );
  }
}

export default EmailListItem;