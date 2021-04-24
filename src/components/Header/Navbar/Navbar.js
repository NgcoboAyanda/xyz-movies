import React, {Component} from 'react'
import {BrowserRouter as Router,Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.scss';
import Searchbar from './Searchbar/Searchbar';
import Menu from './Menu/Menu.js';
import UserPhoto from './UserPhoto/UserPhoto.js'

import { LogOut } from '../../../actions';

class Navbar extends Component {

    logOut = ()=>{
        this.props.LogOut()
    }

    renderLoginBtn=()=>{
        const {loggedIn} = this.props.user
        if(!loggedIn){//if user is not logged in
            return <Link to="/auth">Login</Link>
        }
        else{//if user is logged in
            return(
                <button className="btn logout-btn" onClick={e=>this.logOut()}>
                    Logout
                </button>
            )
        }
    }

    renderUserPhoto=()=>{
        const {loggedIn,userId} = this.props.user
        if(loggedIn){
            return <UserPhoto id={userId} photo=""/>
        }
    }

    render(){
        return(
            <nav className="nav">
                    <div className="nav-logo">
                        <Link to="/">XYZ movies</Link>
                    </div>
                    <Searchbar/>
                    <ul className="nav-list">
                        {this.renderUserPhoto()}
                        <li className="nav-list-link">
                            {this.renderLoginBtn()}
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
                            <Menu/>
                        </li>
                    </ul>
            </nav>
        )
    }
}

const mapStateToProps = state=>{
    return {
        user: state.user
    }
}

export default  connect(mapStateToProps, {LogOut})( withRouter(Navbar) );