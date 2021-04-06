import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import './Header.scss';
import NotifBox from './Notifications';

class Header extends Component{

    render(){
        return(
            <header>
                <Navbar/>
                <NotifBox notifications={this.props.notifications}/>
            </header>
        )
    } 
}



export default withRouter(Header);