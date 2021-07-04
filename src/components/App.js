import React, {Component} from 'react';
import {Router,Route, Switch} from 'react-router-dom';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/analytics' //firebase analytics

import Header from './Header/Header.js';
import Homepage from './Main/Homepage/Homepage.js';
import './App.scss';
import Footer from './Footer/Footer.js';
import Authpage from './Main/Authpage/Authpage.js';
import Searchpage from './Main/SearchPage/Searchpage.js'
import history from '../history.js'
import Profile from './Main/Profile/Profile.js';
import { LoginSuccess } from '../actions/index.js';
import { connect } from 'react-redux';
import UploadBtn from './UploadBtn/UploadBtn.js';
import Upload from '../portals/Upload/Upload.js';
import Notification from '../portals/Notification/Notification.js';

class App extends Component{
    state = {ref:null, showUpload:false}

    componentDidMount(){
        const {LoginSuccess,checkSignIn} = this.props
        checkSignIn(LoginSuccess)
        this.setState({ref: this.appRef})
    }

    toggleUpload = () =>{
        this.setState( {showUpload: !this.state.showUpload} )
    }

    render(){
        return(
                <Router history={history}>
                    <div className="app" ref={ref=>this.appRef=ref}>
                        <Header/>
                            <Notification/>
                            <Upload show={this.state.showUpload} parent={this.state.ref} dismiss={this.toggleUpload} />
                            <Switch>
                                <Route exact path="/" component={Homepage}/>
                                <Route exact path="/search/:term" component={Searchpage}/>
                                <Route exact path="/auth" component={Authpage}/>
                                <Route exact path="/profile" component={Profile} />
                            </Switch>
                            <UploadBtn loggedIn={this.props.loggedIn} onClick={this.toggleUpload}/>
                        <Footer/>
                    </div>
                </Router>       
        )
    }
}

const mapStateToProps = state => {
    const{user:{loggedIn,emailVerified}} = state
    return {loggedIn,emailVerified}
}

export default connect(mapStateToProps,{LoginSuccess})(App);