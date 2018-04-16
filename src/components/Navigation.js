import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {IconButton} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppBar from 'material-ui/AppBar';
import Link from "react-router-dom/es/Link";

const NavMenu =
    <IconMenu iconButtonElement={
        <IconButton><MoreVertIcon/></IconButton>
    }>
        <MenuItem primaryText="Home" containerElement={<Link to="/" />}/>
        <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />}/>
        <MenuItem primaryText="Logout" containerElement={<Link to="/logout" />}/>
    </IconMenu>;

const Navigation = (props) =>
    <MuiThemeProvider>
        <AppBar title={props.title} iconElementRight={NavMenu} showMenuIconButton={false}/>
    </MuiThemeProvider>;
export default Navigation;