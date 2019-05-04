import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AudioUpload from '../AudioUpload/AudioUpload';
import './MyBands.css';

const loggedInText = {
  color: "white"
};

class UserAudioUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="secondary">Upload Media to User Account</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="UserMediaUploadModal">
          <ModalHeader toggle={this.toggle}>Upload Audio to User Account</ModalHeader>
          <ModalBody>
            <AudioUpload />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UserAudioUploadModal;