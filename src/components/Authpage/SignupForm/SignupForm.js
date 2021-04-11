import React, { Component } from 'react'
import {connect} from 'react-redux'

import SubmitBtn from '../SubmitBtn/SubmitBtn'
import EmailInput from '../EmailBox/EmailBox.js'
import PasswordBox from '../PasswordBox/PasswordBox'

import {NotifyError, signUp} from '../../../actions'


class SignupForm extends Component {
    state = {
        email: {
            value: '',
        }
        ,
        password1: {
            value:'',
            show: false, 
        }
        ,
        password2: {
            value: '',
            show: false
        }
        ,
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

    showHidePass=(e,state,stateProperty)=>{//function to toggle password visibity property in the state
        let passwState = state[stateProperty].show;
        const statePropCopy = {...state[stateProperty]}
        statePropCopy.show = !passwState
        this.setState({[stateProperty]: statePropCopy })
       e.preventDefault(); 
    }

    signUp=(e)=>{
        this.setState({loading:true})
        const {email,password1, password2} = this.state
        if(email.value){//if email and password boxes are not empty
            if(password1.value.length >= 6 && password2.value.length >= 6){//if both password boxes are valid
                if(password1.value === password2.value){//if both passwords match
                    this.props.signUp(email.value,password1.value)
                }
                else{//if passwords don't match
                    this.props.NotifyError("Passwords don't match!")
                }
            }
            else if(password1.value && !password2.value){
                this.props.NotifyError("Repeat password!")
            }
            else if(password1.value.length < 6 || password2.value.length < 6){
                this.props.NotifyError("Password must be at least 6 characters!")
            }
        }
        else{//if all input boxes are empty
            this.props.NotifyError("Enter email!")
        }
        e.preventDefault()
    }

    renderSignupBtn=()=>{
        const {loading} = this.state
        if(!loading){//if the app is not loading, it shows the button
            return (
                <SubmitBtn 
                    text="Sign up" 
                    onSubmit={this.signUp}
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
                        <EmailInput //email input box 
                            stateProperty='email' 
                            formState={this.state}
                            updateInputBox={this.updateInputBox} 
                            className='username-input' 
                            placeholder='Email'
                            borderColor='rgba(0, 0, 0, 0.178)'
                        />
                        <PasswordBox
                            formState={this.state}
                            updateInputBox={this.updateInputBox}
                            borderColor='rgba(0,0,0,0.178)'
                            stateProperty='password1'
                            showHidePass={this.showHidePass}
                            placeholder='Password'
                        />
                        <PasswordBox
                            formState={this.state}
                            updateInputBox={this.updateInputBox}
                            borderColor='rgba(0,0,0,0.178)'
                            stateProperty='password2'
                            showHidePass={this.showHidePass}
                            placeholder='Repeat password'
                        />
                        <div className="actionBtnWrapper">
                             {this.renderSignupBtn()}
                        </div>
                    </form>
        ) 
    }   
}

const mapDispatchToProps = {
    signUp,
    NotifyError
}

export default connect(null,mapDispatchToProps)(SignupForm)