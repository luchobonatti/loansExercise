import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {MuiThemeProvider, RaisedButton} from "material-ui";

import NewLoadModal from './NewLoan'
import NewPayModal from "./PayLoan";
import BalanceLoan from "./BalanceLoan";
import SimulateLoanModal from "./SimulateLoan";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLoadModal: false,
            newPayModal: false,
            currentLoanToPay: false,
            balanceModal: false,
            currentLoanPayments: false,
            simulateModal: false,
            loans: [{id: 1, amount: 10000, rate: 0.05, terms: 12, date: new Date('2018','01','10').toISOString()}],
            payments: []
        };

        this.handlerLoan = this.handlerLoan.bind(this);
        this.handlerPay = this.handlerPay.bind(this);
        this.handlerBalance = this.handlerBalance.bind(this);
        this.handlerSimulate = this.handlerSimulate.bind(this);

        this.newLoan = this.newLoan.bind(this);
        this.newPay = this.newPay.bind(this);

        this.getCurrentPayLoan = this.getCurrentPayLoan.bind(this)
    }

    componentWillMount() {

    }


    handlerLoan(e) {
        this.setState({newLoadModal: false})
    }

    handlerPay(e) {
        this.setState({newPayModal: false})
    }

    handlerBalance(e) {
        this.setState({balanceModal: false})
    }
    handlerSimulate(e) {
        this.setState({simulateModal: false})
    }

    newLoan = (loan) => {
        this.setState({loans: [...this.state.loans, loan]});
    };

    newPay = (pay) => {
        this.setState({payments: [...this.state.payments, pay]});
    };

    getLastLoanID() {
        if (this.state.loans.length) {
            return this.state.loans[this.state.loans.length - 1].id + 1
        } else {
            return 1
        }
    }

    togglePayModal(event, loan) {
        event.preventDefault();
        this.setState({currentLoanToPay: loan, newPayModal: true});
    }

    getLoanPays(loan_id) {
        return this.state.payments.filter(val => {
            return val.loan_id === loan_id;
        })
    }

    toggleBalanceModal(event, loan) {
        event.preventDefault();
        const loanPayments = this.getLoanPays(loan.id);
        this.setState({balanceModal: true, currentLoanPayments: loanPayments, currentLoanToPay: loan});
    }

    getCurrentPayLoan() {
        return this.state.currentLoanToPay
    }


    render() {
        let myLoans;
        if (this.state.loans.length) {
            myLoans = (<Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                        <TableHeaderColumn>Terms</TableHeaderColumn>
                        <TableHeaderColumn>Rate</TableHeaderColumn>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.loans.map((loan, i) =>
                        <TableRow key={i}>
                            <TableRowColumn>{loan.id}</TableRowColumn>
                            <TableRowColumn>{loan.amount}</TableRowColumn>
                            <TableRowColumn>{loan.terms}</TableRowColumn>
                            <TableRowColumn>{loan.rate * 100 + '%'}</TableRowColumn>
                            <TableRowColumn>{loan.date}</TableRowColumn>
                            <TableRowColumn>
                                <a href="">View</a>
                                <span> | </span>
                                <a href="" onClick={(event) => this.togglePayModal(event, loan)}>Pay</a>
                                <span> | </span>
                                <a href="" onClick={(event) => this.toggleBalanceModal(event, loan)}>Balance</a>
                            </TableRowColumn>
                        </TableRow>)
                    }
                </TableBody>
            </Table>)
        } else {
            myLoans = (<div><p style={{textAlign: 'center', margin: '30px 0'}}>No Loans</p></div>)
        }

        let modalPay = null;
        if (this.state.newPayModal && this.state.currentLoanToPay) {
            modalPay = (<NewPayModal open={this.state.newPayModal} loan={this.state.currentLoanToPay} handler={this.handlerPay} new={this.newPay}/>)
        }

        let modalBalance = null;
        if (this.state.balanceModal && this.state.currentLoanPayments && this.state.currentLoanToPay) {
            modalBalance = (<BalanceLoan loan={this.getCurrentPayLoan()} open={this.state.balanceModal} payments={this.state.currentLoanPayments} handler={this.handlerBalance}/>)
        }

        let modalSimulate = null;
        if (this.state.simulateModal) {
            modalSimulate = (<SimulateLoanModal open={this.state.simulateModal} handler={this.handlerSimulate}/>)
        }

        return <MuiThemeProvider>
            <div>
                <br/>
                <RaisedButton label="New Loan" primary={true} onClick={(event) => this.setState({newLoadModal: true})}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <RaisedButton label="Simulate Loan" primary={true} onClick={(event) => this.setState({simulateModal: true})}/>
                <NewLoadModal open={this.state.newLoadModal} handler={this.handlerLoan} new={this.newLoan} lastid={this.getLastLoanID()}/>
                {modalPay}
                {myLoans}
                {modalSimulate}
                {modalBalance}
            </div>

        </MuiThemeProvider>
    }
}

export default Homepage;