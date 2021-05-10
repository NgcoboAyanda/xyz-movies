import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'

import picIcon from '../../Header/Navbar/UserPhoto/picIcon'
import './Profile.scss'
import Info from './Info/Info.js'
import Settings from './Settings/Settings.js'
import Delete from './Delete/Delete.js'


class Profile extends Component {
    state = {current:'Info'}

    renderUsername=()=>{
        const {user: {displayName}} = this.props
        if(displayName) return displayName
        else return '_______'
    }

    renderActiveLinkClass = (current)=>{
        if(current == this.state.current) return 'link-active'
    }
    selectLink = (currentElem) =>{
        this.setState({current: currentElem})
    }

    renderProfileSettings = () => {
        const {current} = this.state
        const {notifications} = this.props
        if(current === 'Info') return <Info notifs={notifications}/>
        else if(current === 'Sett') return <Settings notifs={notifications}/>
        else if(current === 'delAcc') return <Delete notifs={notifications}/>
    }

    renderProfilePhoto = () => {
        const {user: {photoURL}} = this.props
        if(!photoURL) return <img src={picIcon} alt=""/>
        else return <img src={photoURL} alt=""/>
    }

    render(){
        return(
            <main>
                <div className="profile-page">
                    <div className="profile-page-title">
                        Profile information
                    </div>
                    <div className="profile-page-main">
                        <section className="profile-info-wrapper">
                            <div className="profile-info">
                                <div className="profile-info-photo">
                                    {this.renderProfilePhoto()}
                                </div>
                                <div className="profile-info-username">{`@${this.renderUsername()}`}</div>
                            </div>
                            <div className="profile-settings-nav">
                                <div 
                                    className={`profile-settings-nav-link ${this.renderActiveLinkClass('Info')}`}
                                    onClick={e=>this.selectLink('Info')}>
                                        Profile information
                                </div>
                                <div 
                                    className={`profile-settings-nav-link ${this.renderActiveLinkClass('Sett')}`}
                                    onClick={e=>this.selectLink('Sett')}>
                                        Account settings
                                </div>
                                <div className={`profile-settings-nav-link ${this.renderActiveLinkClass('delAcc')}`}
                                onClick={e=>this.selectLink('delAcc')}>
                                        Delete account
                                </div>
                            </div>
                        </section>
                        <section className="profile-settings-wrapper">
                            {this.renderProfileSettings()}
                        </section>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    const {user,notifications} = state
    return {user,notifications}
}

export default connect(mapStateToProps)(Profile)