import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Header from './Header/Header.js';
import Homepage from './Homepage/Homepage.js';
import './App.scss';
import Footer from './Footer/Footer.js';
import Loginpage from './Loginpage/Loginpage.js';

class App extends Component{
    render(){
        return(
                <Router>
                    <div className="app">
                        <Header/>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/login" component={Loginpage}/>
                        <Footer/>
                    </div>
                </Router>       
        )
    }
}

export default App;