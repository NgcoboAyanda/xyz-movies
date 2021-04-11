import React, {Component} from 'react';
import {Router,Route, Switch} from 'react-router-dom';

import Header from './Header/Header.js';
import Homepage from './Homepage/Homepage.js';
import './App.scss';
import Footer from './Footer/Footer.js';
import Authpage from './Authpage/Authpage.js';
import Searchpage from './Main/SearchPage/Searchpage.js'
import history from '../history.js'

class App extends Component{
    render(){
        return(
                <Router history={history}>
                    <div className="app">
                        <Header/>
                            <Switch>
                                <Route exact path="/" component={Homepage}/>
                                <Route exact path="/search/:term" component={Searchpage}/>
                                <Route exact path="/auth" component={Authpage}/>
                                <Route exact path="/user/:id" component={Profile} />
                            </Switch>
                        <Footer/>
                    </div>
                </Router>       
        )
    }
}

export default App;