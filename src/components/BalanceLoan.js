import React, {Component} from 'react';
import {DatePicker, Dialog, FlatButton} from "material-ui";

class NewPayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelected: new Date().toISOString(),
            interestAmount: false,
            totalAmount: false,
            paymentMonthly: false,
            diffAmount: false,
            finishLoanDate: false
        }
    }

    componentWillMount() {
        this.getLoanData();
        setTimeout(() => {
            this.calculateBalance(new Date(this.state.dateSelected))
        })
    }

    getLoanData() {
        const principal = parseFloat(this.props.loan.amount);
        const interest = parseFloat(this.props.loan.rate) / 12;
        const payments = parseFloat(this.props.loan.terms);

        const x = Math.pow(1 + interest, payments); //Math.pow computes powers
        const monthly = (principal * x * interest) / (x - 1);

        this.setState({interestAmount: ((monthly * payments) - principal).toFixed(2), totalAmount: (monthly * payments).toFixed(2), paymentMonthly: monthly.toFixed(2)});
    }

    calculateBalance(date) {
        this.setState({dateSelected: date.toISOString()});
        setTimeout(() => {
            const date = new Date(this.props.loan.date);
            const dateTmp = new Date(this.props.loan.date);
            this.setState({finishLoanDate: new Date(date.setMonth(date.getMonth() + this.props.loan.terms))});
            const getDiff = () => {
                const date1 = new Date(this.state.dateSelected);
                const date2 = new Date(dateTmp.setMonth(dateTmp.getMonth() + this.props.loan.terms));
                return date2.getMonth() - date1.getMonth()
                    + (12 * (date2.getFullYear() - date1.getFullYear()));
            };
            const monthly_payment = this.state.paymentMonthly;
            const term_remaining = getDiff();


            return this.setState({diffAmount: (monthly_payment * term_remaining).toFixed(2)});
        })
    }

    static round_decimals(original_number, decimals) {
        var result1 = original_number * Math.pow(10, decimals);
        var result2 = Math.round(result1);
        var result3 = result2 / Math.pow(10, decimals);
        return (result3)
    }

    getBeautyDate() {
        let date = new Date(this.state.dateSelected);

        const mm = date.getMonth() + 1; // getMonth() is zero-based
        const dd = date.getDate();

        return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('/');
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.handler}
            />,
        ];

        let datepicker = null;
        if(this.state.finishLoanDate){
            console.log(this.state.finishLoanDate);
            datepicker = <DatePicker
                onChange={(event, newValue) => this.calculateBalance(newValue)}
                floatingLabelText="Date"
                fullWidth={true}
                value={new Date(this.state.dateSelected)}
                maxDate={this.state.finishLoanDate}
            />
        }

        return <Dialog
            title={'Loan balance at ' + this.getBeautyDate()}
            modal={true}
            actions={actions}
            open={this.props.open}
        >
            <form name={'newPayForm'}>
                {datepicker}
                <br/>
            </form>
            <br/>

            <div><h2>Balance until a date: USD {this.state.diffAmount}</h2></div>

        </Dialog>
    }
}

export default NewPayModal