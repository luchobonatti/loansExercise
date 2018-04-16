import React,{Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";


class LogoutPage extends Component{
    render(){
        window.localStorage.removeItem('logged');
        return <Redirect to='/login'/>;
    }
}
export default LogoutPage;