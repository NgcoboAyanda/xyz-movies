import React, { Component } from 'react';
import {gsap} from 'gsap';

import './menu.scss';
import { Link } from 'react-router-dom';

class Menu extends Component {
    state={isOpen:false}; //setting default menu open state to false

    constructor(props){
        super(props);
            //hamburger menu items
        this.top = React.createRef();
        this.middle = React.createRef();
        this.bottom = React.createRef();
    }

    toggleMenu=()=>{
        let isOpen = !this.state.isOpen;
        this.animateToggle(isOpen);
        this.setState({isOpen});
    }

    animateToggle=bool=>{
        const top = this.top.current;
        const middle = this.middle.current;
        const bottom = this.bottom.current;

        if(bool){//if menu is open
            gsap.to(top,{y:10})
            gsap.to(top,{rotate:45,stagger:0})
            gsap.to(middle,{x:-20,opacity:0})
            gsap.to(bottom,{y:-17})
            gsap.to(bottom,{rotate:-45})
        }
        else{//if menu is closed
            gsap.to(top,{y:0})
            gsap.to(top,{rotate:0,stagger:0})
            gsap.to(middle,{x:0,opacity:1})
            gsap.to(bottom,{y:0})
            gsap.to(bottom,{rotate:0})
        }
    }

    render(){
        return(
            <>
                <div className="menu" ref={this.menu} onClick={this.toggleMenu}>
                    <span className="top" ref={this.top}>
                    </span>
                    <span className="middle" ref={this.middle} >
                    </span>
                    <span className="bottom" ref={this.bottom}>
                    </span>
                </div>
                <div className="subMenu">
                    <ul className="subMenu-links">
                        <li className="link">
                            <Link to></Link>
                        </li>
                        <li className="link"></li>
                        <li className="link"></li>
                        <li className="link"></li>
                    </ul>
                </div>
            </>
        )
    }
}

export default Menu;