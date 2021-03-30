import React, {Component} from 'react';
import {Router,Route, Switch} from 'react-router-dom';

import Header from './Header/Header.js';
import Homepage from './Homepage/Homepage.js';
import './App.scss';
import Footer from './Footer/Footer.js';
import Loginpage from './Loginpage/Loginpage.js';
import Searchpage from './SearchPage/Searchpage.js'
import history from '../history.js'

class App extends Component{
    render(){
        return(
                <Router history={history}>
                    <Switch>
                        <div className="app">
                            <Header/>
                            <Route exact path="/" component={Homepage}/>
                            <Route exact path="/search/:term" component={Searchpage}/>
                            <Route exact path="/login" component={Loginpage}/>
                            <Footer/>
                        </div>
                    </Switch>
                </Router>       
        )
    }
}

export default App;