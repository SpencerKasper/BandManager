import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ErrorMessage from '../Error/ErrorMessage';

const errorStyle = {
    color: "red",
    fontWeight: "bold",
    fontSize: "12px",
    textAlign: "center"
};

class InputItemGroup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            labelName: this.props.labelName,
            inputType: this.props.inputType,
            placeholder: this.props.placeholder,
            errorMessage: this.props.errorMessage,
            itemValue: this.props.itemValue
        }

        this.accessItem = this.accessItem.bind(this);
        this.setErrorValue = this.setErrorValue.bind(this);
    }

    setErrorValue(errorValue){
        this.setState({
          errorMessage: errorValue  
        })
    }

    accessItem(event){
        this.setState({
            itemValue: event.target.value
        }, () => {
            this.props.shareItemValue(this.state.itemValue, this.setErrorValue);
        })
    }

    render(){
        return(
            <FormGroup>
                <Label for={this.state.labelName}>{this.state.labelName}</Label>
                <Input id={this.state.labelName} 
                    name={this.state.labelName}
                    type={this.state.inputType}
                    placeholder={this.state.placeholder}
                    onBlur={this.accessItem}
                    />
                <div>
                    <p style={errorStyle}>{this.state.errorMessage}</p>
                </div>
            </FormGroup>
        );
    }

}

export default InputItemGroup;