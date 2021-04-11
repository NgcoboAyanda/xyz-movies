import React, {Component} from 'react'
import {connect} from 'react-redux'

class NotifBox extends Component{
    state = {mount:false}

    componentDidUpdate(prevProps){
        const {notifications} = prevProps
        const prevNotifId = Object.keys(notifications)[0]
        const currentNotifId = Object.keys(this.props.notifications)[0]
        if(prevNotifId !== currentNotifId){//checking if it's a different notification by comparing previousProps notifId and currentProps notifId
            this.setState({mount:true})//if there is a new notification, make the notification box visible
        }
    }

    renderNotifs=()=>{
        const notificObj = this.props.notifications
        const notif = Object.values(notificObj)[0]
        if(notif){//if there's a notification
            if(this.state.mount){
                setTimeout(() => {//unmounting component after 5 secs
                    this.setState({mount: false}) 
                }, 5000);
            }
            return <div className={`${notif.type}`}>{notif.msg}</div>
        }
        else{
            return null
        }
    }

    render(){
        const {mount} = this.state
        if(mount){//if mount is true
            return (
                <div className='app-notification'>
                    {this.renderNotifs()}
                </div>
            )
        }
        return null 
    }
}

const mapStateToProps = state => {
    const {notifications} = state
    return {
        notifications
    }
}

export default connect(mapStateToProps)(NotifBox)