import React, { Component } from 'react'
import {connect} from 'react-redux'
import { resetPassword } from '../../../actions'

import EmailBox from '../EmailBox/EmailBox'
import SubmitBtn from '../SubmitBtn/SubmitBtn'

class ResetForm extends Component {
    state={
        email: {
            value: ''
        },
        loading: false
    }

    updateInputBox=(e,formState,stateProperty)=>{//updating input box values in the state
        let inputCopy = formState[stateProperty]
        inputCopy.value = e.target.value
        this.setState({[stateProperty]: inputCopy})
    }

    ResetPassw=(e)=> {
        const {email} = this.state
        if(email){
            console.log(this.props)
            const {resetPassword} = this.props
            resetPassword(email.value)
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