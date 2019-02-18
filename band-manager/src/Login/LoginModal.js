import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginForm from './LoginForm';
import '../App.css';

const loggedInText = {
  color: "white"
};

class Login extends React.Component {
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
        <a onClick={this.toggle} className="App-link">{this.props.buttonLabel}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Log In</ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.submitRecipe}>Log In</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Login;