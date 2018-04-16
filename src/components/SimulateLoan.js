import React, {Component} from 'react';
import {Dialog, FlatButton, TextField} from "material-ui";

class NewPayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InterestAmount: false,
            MonthlyPayment: false,
            TimeToClearDebt: false,
            totalAmount: false,
            amount: false,
            rate: false,
            terms: false,
            send: false
        }
    }

    componentWillMount() {
    }

    simulateLoan = () => {
        if (!this.state.amount ||
            !this.state.terms ||
            !this.state.rate
        ) {
            alert('Complete all fields');
            return false
        } else {
            const principal = parseFloat(this.state.amount);
            const interest = parseFloat(this.state.rate / 100) / 12;
            const payments = parseFloat(this.state.terms);


            const x = Math.pow(1 + interest, payments); //Math.pow computes powers
            const monthly = (principal * x * interest) / (x - 1);

            const totalPayment = principal + parseFloat(((monthly * payments) - principal).toFixed(2));

            this.setState({InterestAmount: ((monthly * payments) - principal).toFixed(2)});
            this.setState({MonthlyPayment: monthly.toFixed(2)});
            this.setState({totalAmount: totalPayment.toFixed(2)});
            this.setState({TimeToClearDebt: this.state.terms});
            this.setState({send: true});
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.handler}
            />,
        ];

        let calcSimulation = null;
        if (this.state.send) {
            calcSimulation =
                <div>
                    Interest Amount: <strong>USD {this.state.InterestAmount}</strong><br/><br/>
                    Monthly Payment: <strong>USD {this.state.MonthlyPayment}</strong><br/><br/>
                    Total Payment: <strong>USD {this.state.totalAmount}</strong><br/><br/>
                    Time to clear debt: <strong>{this.state.TimeToClearDebt} months</strong>
                </div>

        }

        return <Dialog
            title={'Loan Simulator'}
            modal={true}
            actions={actions}
            open={this.props.open}
        >
            <form name={'newPayForm'}>
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
                <div style={{textAlign: 'right'}}>
                    <FlatButton
                        label="Calculate"
                        primary={true}
                        onClick={this.simulateLoan}
                    />,
                </div>
            </form>
            <br/>

            {calcSimulation}

        </Dialog>
    }
}

export default NewPayModal