import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import './AudioPlayback.css';

class Song extends Component {
  render() {
    const songTitle = this.props.songTitle;
    const album = this.props.album;

    return (
      <div className="SongContainer">
        <Container>
            <Row>
                <Col>
                    <h4>{songTitle}</h4>
                </Col>

                <Col>
                    <h5>{album}</h5>
                </Col>
            </Row>

            {this.props.audioPlayer}
        </Container>
      </div>
    );
  }
}

export default Song;