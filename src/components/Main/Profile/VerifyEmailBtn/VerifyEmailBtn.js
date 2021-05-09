import React from 'react'
import { connect } from 'react-redux'

import {verifyEmail} from '../../../../actions'

import './VerifyEmailBtn.scss'

const VerifyEmailBtn = ({emailVerified,email,verifyEmail})=>{
    
    const renderBtn = ()=>{
        if(email && !emailVerified){
            return(
                <button className="btn verify-email-btn" onClick={()=>verifyEmail()}>
                    verify email
                </button>
            )
        }
        else return null
    }

    return (
        <>
            {renderBtn()}
        </>
    )
}

const mapStateToProps = state => {
    const {user:{emailVerified,email}} = state
    return {emailVerified,email}
}

export default connect(mapStateToProps,{ verifyEmail })(VerifyEmailBtn)