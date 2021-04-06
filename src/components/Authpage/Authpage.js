import React, {Component} from 'react'

import LoginForm from './LoginForm/LoginForm.js'
import SignupForm from './SignupForm/SignupForm.js'
import ResetForm from './ResetForm/ResetForm.js'

import './Authpage.scss'

class Authpage extends Component {
    state = {current: 'login'}//

    renderForms({current}){ 
        if(current == 'login') return <LoginForm/> //if state.current is 'login' then return login component
        else if(current == 'signup') return <SignupForm/>
        else if(current == 'resetpass') return <ResetForm/>
    }

    show(component){
        if(component == this.state.current){
            return "selected"
        }
    }

    changeTo(component){
        this.setState({current: component})
    }


    render(){
        return(
            <main className="authpage">
                <div className="authpage-form">
                    <div className="authpage-form-heading">
                        <span className={this.show('login')} onClick={e=>this.changeTo('login')} >Login</span>
                        <span className={this.show('signup')} onClick={()=>this.changeTo('signup')} >Sign Up</span>
                        <span className={this.show('resetpass')} onClick={()=>this.changeTo('resetpass')} >Reset Password</span>
                    </div>
                    {this.renderForms(this.state)}
                </div>
            </main>
        )
    }
}

export default Authpage