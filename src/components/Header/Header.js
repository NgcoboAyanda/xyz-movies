import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import './Header.scss';

class Header extends Component{

    render(){
        return(
            <header>
                <Navbar/>
            </header>
        )
    } 
}



export default withRouter(Header);