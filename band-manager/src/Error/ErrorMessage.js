import React from 'react';
import './Error.css';
import {Alert} from 'reactstrap';

class ErrorMessage extends React.Component{
    render(){
        const errorMessage = this.props.errorMessage;

        return (
            <div>
                <Alert className="ErrorMessage" color="danger">
                    {errorMessage}
                </Alert>
            </div>
        );
    }
}

export default ErrorMessage;