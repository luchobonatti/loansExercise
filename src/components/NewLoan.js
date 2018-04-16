import React, {Component} from 'react';
import {DatePicker, Dialog, FlatButton, TextField} from "material-ui";

class NewLoadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.lastid,
            amount: false,
            terms: false,
            rate: false,
            date: false,
        }
    }

    sendNewLoan(event) {
        if (!this.state.id ||
            !this.state.amount ||
            !this.state.terms ||
            !this.state.rate ||
            !this.state.date
        ) {
            alert('Complete all fields');
            return false
        } else {
            this.setState({rate:this.state.rate / 100});
            setTimeout(()=>{
                this.props.new(this.state);
                this.props.handler(event);
            })
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handler}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={(event) => this.sendNewLoan(event)}
            />,
        ];
        return <Dialog
            title="New Loan"
            modal={true}
            actions={actions}
            open={this.props.open}
        >
            <form name={'newLoanForm'}>
                <TextField
                    disabled={true}
                    fullWidth={true}
                    value={this.props.lastid}
                    hintText="Loan ID"
                    floatingLabelText="ID"
                    name={'id'}
                />
                <TextField
                    fullWidth={true}
                    floatingLabelText="Amount (in USD)"
                    name={'amount'}
                    onChange={(event, newValue) => this.setState({amount: newValue})}
                />
                <TextField
                    fullWidth={true}
                    floatingLabelText="Terms"
                    name={'terms'}
                    onChange={(event, newValue) => this.setState({terms: newValue})}
                />
                <TextField
                    fullWidth={true}
                    hintText="Rate"
                    floatingLabelText="Rate"
                    name={'rate'}
                    onChange={(event, newValue) => this.setState({rate: newValue})}
                />
                <br/>
                <DatePicker
                    onChange={(event, newValue) => this.setState({date: newValue.toISOString()})}
                    floatingLabelText="Date"
                    fullWidth={true}
                    hintText="Portrait Inline Dialog"
                />
            </form>
            <br/>
        </Dialog>
    }
}

export default NewLoadModal