import React, {Component} from 'react';
import {connect} from 'react-redux'

import "./LoginForm.scss";
import EmailBox from '../EmailBox/EmailBox.js'
import {Login} from '../../../actions'

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
                <form className="login-page-form" autoComplete="on">
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
                    />
                    <div className="actionBtnWrapper">
                        {this.renderLoginBtn()}
                    </div>
                </form>
        )
    }
}

const mapStateToProps= state=>{
    return{
        errors: state.errors
    }
}

export default connect(mapStateToProps,{ Login })(LoginForm);