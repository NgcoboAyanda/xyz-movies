import React, {Component} from 'react'
import {connect} from 'react-redux'

class NotifBox extends Component{
    renderNotifs=()=>{
        const notificObj = this.props.notifications
        if(notificObj){
             console.log(Object.values(notificObj)[0])
            return <div>aaaaaahhh</div>
        }
        else{
            return null
        }
    }

    render(){
        return (
            <>
                {this.renderNotifs()}
            </>
        ) 
    }
}

const mapStateToProps = state => {
    const {notifications} = state
    return {
        notifications
    }
}

export default connect(mapStateToProps)(NotifBox)