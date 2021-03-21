import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './menu.scss';
import InputBox from './InputBox/InputBox.js'
import history from '../../../../history.js';



//icons
    //hamburger menu icon
const hamburgerIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z"/></svg>;

    //close menu icon (X)
const closeMenuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z"/></svg>;






class Menu extends Component {
    state = {menuOpen: false, browseMovies: false, searchBox:true}

    renderMenuBtn=()=>{
        //boolean... if menu is open or not
        let isOpen = this.state.menuOpen;
        //Changing open/close icon based on state    
        if(!isOpen){ return hamburgerIcon }
        else { return closeMenuIcon }
    }

    toggleMenu = ()=>{
        //boolean.... 
        let isOpen = this.state.menuOpen;
        isOpen = !isOpen;//changes true to false and vice versa
        this.setState( {menuOpen: isOpen })
    }

    navigateTo = (location)=>{
        this.toggleMenu();
        history.push(location)
    }

    renderSearchBox = () => {
        let isVisible = this.state.searchBox;
        if(!isVisible){
            return <div>Search</div>
        }
        else {
            return <InputBox/>
        }
    }

    //showing the menu
    renderMenu = ()=>{
        let isOpen = this.state.menuOpen;
        if(isOpen){
            return(
                <nav className="menu-submenu">
                    <div className="bg"></div>
                    <ul className="links">
                        <li className="link">
                            <a onClick={()=>this.navigateTo('/')}>
                                Home
                            </a>
                        </li>
                        <li className="link">
                            <a>Browse movies</a>
                        </li>
                        <li className="link">
                            {this.renderSearchBox()}
                        </li>
                        <li className="link">
                            <a onClick={()=>this.navigateTo('/login')}>
                                Login
                            </a>
                        </li>
                        <li className="link"></li>
                    </ul>
                </nav>
            )
        }
    }

    render(){
        return(
            <div className="menu">
                <button className="menu-btn" onClick={this.toggleMenu}>
                    {this.renderMenuBtn()}
                </button>
                {this.renderMenu()}
            </div>
        )
    }
}

export default Menu;