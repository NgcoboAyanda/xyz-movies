import React, {Component} from 'react';
import {connect} from 'react-redux'

import "./LoginForm.scss";
import EmailBox from '../EmailBox/EmailBox.js'
import {Login} from '../../../../actions'

import SubmitBtn from '../SubmitBtn/SubmitBtn.js';
import PasswordBox from '../PasswordBox/PasswordBox';



class LoginForm extends Component {
    state = {
        email: {
            value: '',
        },
        password: {
            value:'',
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

    showHidePass=(e,state,stateProperty)=>{//function to toggle password visibity property in the state
        let passwState = state[stateProperty].show;
        const statePropCopy = {...state[stateProperty]}
        statePropCopy.show = !passwState
        this.setState({[stateProperty]: statePropCopy })
       e.preventDefault(); 
    }

    Login = (e)=>{//submitting the Login form
        const {email, password} = this.state
        this.setState({loading: true})
        if(email && password){
            this.props.Login(email.value,password.value)
        }
        e.preventDefault()
    }

    updateInputBox=(e,formState,stateProperty)=>{//updating input box values in the state
        let inputCopy = formState[stateProperty]
        inputCopy.value = e.target.value
        this.setState({[stateProperty]: inputCopy})
    }

    renderLoginBtn=()=>{
        const {loading} = this.state
        if(!loading){//if the app is not loading, it shows the button
            return (
                <SubmitBtn 
                    text="Login" 
                    onSubmit={this.Login}
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
                <form className="login-page-form" ref={ref=> this.form = ref} autoComplete="on">
                    <EmailBox //email input box 
                        stateProperty='email'
                        formState={this.state} 
                        updateInputBox={this.updateInputBox} 
                        className='username-input' 
                        placeholder='Email'
                        borderColor='rgba(0, 0, 0, 0.178)'
                    />

                    <PasswordBox //password input box 
                        formState={this.state}
                        updateInputBox={this.updateInputBox}
                        borderColor='rgba(0, 0, 0, 0.178)'
                        stateProperty='password'
                        showHidePass={this.showHidePass}
                        placeholder="Password"
                    />
                    <div className="actionBtnWrapper">
                        {this.renderLoginBtn()}
                    </div>
                </form>
        )
    }
}

export default connect(null,{ Login })(LoginForm);