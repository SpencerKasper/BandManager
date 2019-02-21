import React from 'react';

class ErrorMessageList extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            errorMessages: this.props.errorMessages
        }
    }

    render(){
        return (
            <div>
                {this.state.errorMessages}
            </div>
        );
    }
}

export default ErrorMessageList;