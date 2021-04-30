import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'

import picIcon from '../../Header/Navbar/UserPhoto/picIcon'
import './Profilepage.scss'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import AccountSettings from './AccountSettings/AccountSettings'
import DeleteAccount from './DeleteAccount/DeleteAccount'


class Profilepage extends Component {
    state = {current:'profInfo'}

    componentDidMount=()=>{
        console.log(this.props)
        //const { user:{displayName,emailVerified} } = this.props
        //console.log(displayName,emailVerified)
    }

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
        if(current === 'profInfo') return <ProfileInfo notifs={this.props.notifications}/>
        else if(current === 'accSett') return <AccountSettings/>
        else if(current === 'delAcc') return <DeleteAccount/>
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
                                    className={`profile-settings-nav-link ${this.renderActiveLinkClass('profInfo')}`}
                                    onClick={e=>this.selectLink('profInfo')}>
                                        Profile information
                                </div>
                                <div 
                                    className={`profile-settings-nav-link ${this.renderActiveLinkClass('accSett')}`}
                                    onClick={e=>this.selectLink('accSett')}>
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

export default connect(mapStateToProps)(Profilepage)