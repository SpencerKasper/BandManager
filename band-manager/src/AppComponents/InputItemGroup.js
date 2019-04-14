import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import ErrorMessage from '../Error/ErrorMessage';

class InputItemGroup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            labelName: this.props.labelName,
            inputType: this.props.inputType,
            placeholder: this.props.placeholder,
            errorMessage: [],
            itemValue: this.props.itemValue
        }

        this.accessItem = this.accessItem.bind(this);
        this.setErrorValue = this.setErrorValue.bind(this);
    }

    setErrorValue(errorValue){
        if(errorValue !== ""){
            this.setState({
                errorMessage: <ErrorMessage errorMessage={errorValue} />
            })
        } else {
            this.setState({
                errorMessage: []
            })
        }
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
            <FormGroup style={{paddingLeft: "25%", paddingRight: "25%", textAlign: "center"}}>
                <div>
                    {this.state.errorMessage}
                </div>
                <Label for={this.state.labelName}>{this.state.labelName}</Label>
                <Input id={this.state.labelName} 
                    name={this.state.labelName}
                    type={this.state.inputType}
                    placeholder={this.state.placeholder}
                    onBlur={this.accessItem}
                    className={this.props.overrideClass}
                    />
            </FormGroup>
        );
    }

}

export default InputItemGroup;