import React, {Component} from 'react'
import {BrowserRouter as Router,Link,withRouter} from 'react-router-dom';

import './Navbar.scss';
import Searchbar from './Searchbar/Searchbar';
import Menu from './Menu/Menu.js';

class Navbar extends Component {

    render(){
        return(
            <nav className="nav">
                    <div className="nav-logo">
                        <Link to="/">XYZ movies</Link>
                    </div>
                    <Searchbar
                        placeholder = "search movies/tv shows"
                        onSubmit = {this.submitSearch}
                    />
                    <ul className="nav-list">
                        <li className="nav-list-link">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-list-link genre">
                            <a href="#" className="genre">Browse</a>
                            <div className="arrow"></div>
                            <div className="genre-menu">
                                <ul className="genre-menu-list">
                                    <div className="genre-menu-list-1">
                                        <li>all</li>
                                        <li>history</li>
                                        <li>horror</li>
                                        <li>drama</li>
                                        <li>thriller</li>
                                        <li>documentary</li>
                                    </div>
                                    <div className="genre-menu-list-2">
                                        <li>anime</li>
                                        <li>action</li>
                                        <li>comedy</li>
                                        <li>romance</li>
                                        <li>sci-fi</li>
                                        <li>fantasy</li>
                                    </div>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul className="nav-menu">
                        <li className="nav-menu-link">
                            <Link>
                                <Menu/>
                            </Link>
                        </li>
                    </ul>
            </nav>
        )
    }
}

export default withRouter(Navbar);