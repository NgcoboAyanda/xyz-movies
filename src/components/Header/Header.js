import React from 'react';
import {withRouter,Link} from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import './Header.scss';

const Header = ()=>{

    return(
        <header>
            <Navbar/>
        </header>
    )
}

export default withRouter(Header);