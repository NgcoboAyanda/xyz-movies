import React, {Component, useEffect, useState} from 'react'

import LoginForm from './LoginForm/LoginForm.js'
import SignupForm from './SignupForm/SignupForm.js'
import ResetForm from './ResetForm/ResetForm.js'

import './Authpage.scss'
import { connect } from 'react-redux'
import history from '../../../history.js'

const Redirect = ()=>{
    const[count,setCount] = useState(4)

    const redirect = ()=>{
        if(count === 0){
            history.push('/')
        }
    }

    useEffect(()=>{
        while (count > 0){
            setTimeout(() => {
                setCount(count-1)
            }, 1000);
            redirect()
        }
    }) 

    return (
        <>
            <h1>You will be redirected soon in {count}</h1>
        </>
    )
}

class Authpage extends Component {
    state = {current: 'login'}//

    renderForms({current}){
        const {notifications} = this.props 
        if(current == 'login') return <LoginForm notifications={notifications}/> //if state.current is 'login' then return login component
        else if(current == 'signup') return <SignupForm notifications={notifications} />
        else if(current == 'resetpass') return <ResetForm notifications={notifications} />
    }

    show(component){
        if(component == this.state.current){
            return "selected"
        }
    }

    changeTo(component){
        this.setState({current: component})
    }

    renderPage = () =>{
        const {loggedIn} = this.props
        if(!loggedIn){
            return(
                <div className="authpage-form">
                    <div className="authpage-form-heading">
                        <span className={this.show('login')} onClick={e=>this.changeTo('login')} >Login</span>
                        <span className={this.show('signup')} onClick={()=>this.changeTo('signup')} >Sign Up</span>
                        <span className={this.show('resetpass')} onClick={()=>this.changeTo('resetpass')} >Reset Password</span>
                    </div>
                    {this.renderForms(this.state)}
                </div>
            )
        }
        else{
            return <Redirect/>
        }
    }

    render(){
        return(
            <main className="authpage">
                {this.renderPage()}
            </main>
        )
    }
}

const mapStateToProps = state => {
    const {notifications,user:{loggedIn}} = state
    return {
        notifications,
        loggedIn
    }
}

export default connect(mapStateToProps)(Authpage)