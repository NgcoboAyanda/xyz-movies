import React, { Component } from 'react'
import {connect} from 'react-redux'
import { resetPassword } from '../../../../actions'

import EmailBox from '../EmailBox/EmailBox'
import SubmitBtn from '../SubmitBtn/SubmitBtn'

class ResetForm extends Component {
    state={
        email: {
            value: ''
        },
        loading: false
    }

    componentDidUpdate(prevProps){
        const {notifications} = prevProps
        const prevNotifId = Object.keys(notifications)[0]
        const currentNotifId = Object.keys(this.props.notifications)[0]
        if(prevNotifId !== currentNotifId){//checking if there is a new notification
            this.setState({loading:false})//if there is a new notification, it means the request is complete and the app can stop loading
        }
    }

    updateInputBox=(e,formState,stateProperty)=>{//updating input box values in the state
        let inputCopy = formState[stateProperty]
        inputCopy.value = e.target.value
        this.setState({[stateProperty]: inputCopy})
    }

    ResetPassw=(e)=> {
        this.setState({loading:true})
        const {email} = this.state
        if(email){
            this.props.resetPassword(email.value)
        }
        e.preventDefault()
    }

    renderResetBtn=()=>{
        const {loading} = this.state
        if(!loading){//if the app is not loading, it shows the button
            return (
                <SubmitBtn 
                    text="Reset" 
                    onSubmit={this.ResetPassw}
                    loading={this.state.loading}
                />
            )
        }
        else if(loading){// if app is loading it shows a loading animation
            return(
                <div className="loading">
                    <div className="animation"></div>
                </div>
            )
        }
    }
     
    render(){
        return(
            <form className="login-page-form">
                <EmailBox
                    stateProperty='email'
                    formState={this.state}
                    updateInputBox={this.updateInputBox}
                    className='username-input'
                    placeholder='Email'
                    borderColor='rgba(0,0,0,0.178)'
                />
                <div className="actionBtnWrapper">
                    {this.renderResetBtn()}
                </div>
                
            </form>
        )
    }
}


export default connect(null,{resetPassword})(ResetForm)