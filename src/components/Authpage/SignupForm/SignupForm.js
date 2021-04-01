import React, { Component } from 'react'
import SubmitBtn from '../SubmitBtn/SubmitBtn'

class SignupForm extends Component {
    state={username: '', password: '', password2:''}


    updateInputBox(e,stateProperty){
        this.setState({[stateProperty]: e.target.value})
    }

    render(){
        return(
            <form className="login-page-form">
                        <div className="input username">
                            <input 
                                type='text'
                                className="username-input"
                                placeholder="Username/Email"
                                value={this.state.username}
                                onChange={this.setState()}
                            />
                        </div>
                        <div className="input password">
                            <input
                                className="password-input"
                                placeholder="Password"
                                value={this.state.password}
                            />
                            <button 
                                className="toggle-password" >
                            </button>
                        </div>
                        <div className="input password">
                            <input
                                className="password-input"
                                placeholder="Repeat password"
                                value={this.state.password2}
                            />
                            <button 
                                className="toggle-password" >
                            </button>
                        </div>
                        <SubmitBtn text="Login"/>
                    </form>
        ) 
    }   
}

export default SignupForm