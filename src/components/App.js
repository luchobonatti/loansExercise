import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './Navigation';

import LoginPage from './Login';
import HomePage from './Home';
// import ProfilePage from './Profile';

import * as routes from '../constants/routes';
import Redirect from "react-router-dom/es/Redirect";
import Logout from "./Logout";


class App extends Component {
    componentWillMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            logged: !!window.localStorage.getItem('logged')
        };
    }

    render() {
        return <Router>
            <div>


                <Navigation title={window.location.pathname.toUpperCase().replace('/', '')}/>
                <Route exact path={routes.HOME.path} render={() => (
                    !this.state.logged ? (
                        <Redirect to={routes.LOGIN.path}/>
                    ) : (
                        <HomePage/>
                    )
                )}/>

                <Route exact path={routes.LOGOUT.path} render={() => (
                    <Logout/>
                )}/>

                <Route
                    exact path={routes.LOGIN.path}
                    component={() => <LoginPage/>}
                />
            </div>
        </Router>
    }
}

export default App;
