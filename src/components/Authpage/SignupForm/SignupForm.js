import React, { Component } from 'react'
import {connect} from 'react-redux'

import SubmitBtn from '../SubmitBtn/SubmitBtn'
import EmailInput from '../EmailBox/EmailBox.js'
import PasswordBox from '../PasswordBox/PasswordBox'

import {signUp} from '../../../actions'


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
        if(email.value && password1.value){
            console.log('both valid')
            if(password1.value === password2.value){
                console.log('both passwords the same')
                this.props.signUp(email.value,password1.value)
            }
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
            setTimeout(() => {
                this.setState({loading:  false})
            }, 3000);//stop load after 3secs
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
                        />
                        <PasswordBox
                            formState={this.state}
                            updateInputBox={this.updateInputBox}
                            borderColor='rgba(0,0,0,0.178)'
                            stateProperty='password2'
                            showHidePass={this.showHidePass}
                        />
                        <div className="actionBtnWrapper">
                             {this.renderSignupBtn()}
                        </div>
                    </form>
        ) 
    }   
}

export default connect(null,{signUp})(SignupForm)