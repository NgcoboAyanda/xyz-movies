import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteAccount, NotifyError, reAuthenticate } from '../../../../actions'
import PasswBox from '../PasswBox/PasswBox'

import './Delete.scss'

const DeleteAccount = ({deleteAccount, notifs, NotifyError, email}) => {
    const[password,setPassword] = useState('')

    const submitDelete = () =>{
        let confirmation = window.confirm('Are you sure you want to delete your account?')
        if(confirmation){
            deleteAccount(email,password)
        }
    }

    return(
        <div className="delete-account-page">
            <div className="delete-btn-wrapper">
                <div className="title">
                    delete account
                </div>
                <div className="password">
                    <PasswBox
                        notifs={notifs}
                        label="Enter password"
                        defValue={password}
                        onChange={setPassword}
                        showError={NotifyError}
                        allowEdit={true}
                    />
                </div>
                <button className="btn delete-acc-btn"
                    onClick={()=>submitDelete()}
                    >
                    Delete Account
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { notifications, user:{email}} = state
    return {notifs: notifications, email}
}

const mapDispatchToProps = {
    NotifyError,
    deleteAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount)