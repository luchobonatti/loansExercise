import React, {Component} from 'react';
import {DatePicker, Dialog, FlatButton, MenuItem, SelectField, TextField} from "material-ui";

class NewPayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: 'made',
            date: false,
            amount: false,
            loan_id: false
        }
    }

    componentWillMount() {
        this.getAmountByTerm();
    }

    handleChange = (event, index, value) => {
        this.setState({payment: value});
    };

    sendNewPay(event) {
        if (!this.state.payment ||
            !this.state.amount ||
            !this.state.date
        ) {
            alert('Complete all fields');
            return false
        } else {
            const loan = this.props.loan;
            this.setState({loan_id: loan.id});
            setTimeout(() => {
                this.props.new(this.state);
                this.props.handler(event);
            }, 1)
        }
    }

    getAmountByTerm() {
        const principal = parseFloat(this.props.loan.amount);
        const interest = parseFloat(this.props.loan.rate) / 12;
        const payments = parseFloat(this.props.loan.terms);

        const x = Math.pow(1 + interest, payments); //Math.pow computes powers
        const monthly = (principal * x * interest) / (x - 1);

        const paymentMonthly = monthly.toFixed(2);
        this.setState({amount: paymentMonthly});
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
                onClick={(event) => this.sendNewPay(event)}
            />,
        ];
        return <Dialog
            title={'New Pay in loan #'+this.props.loan.id}
            modal={true}
            actions={actions}
            open={this.props.open}
        >
            <form name={'newPayForm'}>
                <SelectField
                    floatingLabelText="Payment"
                    value={this.state.payment}
                    onChange={this.handleChange}
                    fullWidth={true}
                >
                    <MenuItem value={'made'} primaryText="Made"/>
                    <MenuItem value={'missed'} primaryText="Missed"/>
                </SelectField>

                <DatePicker
                    onChange={(event, newValue) => this.setState({date: newValue.toISOString()})}
                    floatingLabelText="Date"
                    fullWidth={true}
                    hintText="Portrait Inline Dialog"
                    minDate={new Date(this.props.loan.date)}
                />

                <TextField
                    fullWidth={true}
                    floatingLabelText="Amount"
                    name={'amount'}
                    value={this.state.amount}
                    readOnly
                />
                <br/>
            </form>
            <br/>
        </Dialog>
    }
}

export default NewPayModal