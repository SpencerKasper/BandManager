import React from 'react';

const style = {
    color: "red",
    fontWeight: "bold",
    fontSize: "12px"
};

class ErrorMessage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            errorMessage: this.props.errorMessage
        }
    }

    render(){
        return (
            <div>
                <p style={style}>{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default ErrorMessage;