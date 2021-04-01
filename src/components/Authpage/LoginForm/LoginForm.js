import React, {Component} from 'react';
import {connect} from 'react-redux'

import "./LoginForm.scss";
import EmailInput from '../EmailBox/EmailBox.js'
import {Login} from '../../../actions'

//SVGs
import {showPasswordIcon, hidePasswordIcon} from './icons'
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
    }

    showHidePass=(e)=>{//function to toggle password visibity property in the state
        let {show} = this.state.password;
       this.setState({password: {show: !show} })
       e.preventDefault();
    }

    signUp = (e)=>{//submitting the signUp form
        const {email, password} = this.state
        this.props.Login(email.value,password.value)
        e.preventDefault()
    }

    updateInputBox=(e,stateProperty)=>{//updating input box values in the state
        this.setState({[stateProperty]: e.target.value})
    }

    render(){
        return(
                <form className="login-page-form">
                    <EmailInput //email input box 
                        type='email' 
                        email={this.state.email} updateInputBox={this.updateInputBox} 
                        className='username-input' 
                        placeholder='Email'
                        borderColor='rgba(0, 0, 0, 0.178)'
                    />

                    <PasswordBox //password input box
                        type='password'
                        password={this.state.password}
                        updateInputBox={this.updateInputBox}
                        borderColor='rgba(0, 0, 0, 0.178)'
                        showHidePass={this.showHidePass}
                    />
                    
                    <SubmitBtn 
                        text="Login" 
                        onSubmit={this.signUp}
                        loading={this.state.loading}
                    />
                </form>
        )
    }

}

export default connect(null,{Login})(LoginForm);