import React from 'react';
import './Error.css';

class ErrorMessage extends React.Component{
    render(){
        const errorMessage = this.props.errorMessage;

        return (
            <div className="ErrorMessageContainer">
                <p className="ErrorMessage">{errorMessage}</p>
            </div>
        );
    }
}

export default ErrorMessage;