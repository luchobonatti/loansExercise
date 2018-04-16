import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Redirect from "react-router-dom/es/Redirect";

const divStyle = {
    margin: "0 auto",
    width: "400px",
    maxWidth: '100%'
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            errorMsg: false,
            redirect: false,
        };
    }

    componentWillMount() {

    }

    handleClick(event) {
        event.preventDefault();
        if (this.state.username === 'user' && this.state.password === 'user') {
            window.localStorage.setItem('logged', true);
            this.setState({redirect: true});
        } else {
            this.setState({errorMsg: 'Bad credentials!'});
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/'/>;
        } else {
            return <div className={'formContainer'}>
                <MuiThemeProvider>
                    <form style={divStyle}>
                        <TextField
                            fullWidth={true}
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue, errorMsg: false})}
                        />
                        <br/>
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue, errorMsg: false})}
                        />
                        <br/>
                        <span>{this.state.errorMsg}</span>
                        <div style={style}>
                            <RaisedButton type={'submit'} label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </form>
                </MuiThemeProvider>
            </div>
        }
    }
};

const style = {
    textAlign: 'right',
    margin: 15
};
export default LoginPage;