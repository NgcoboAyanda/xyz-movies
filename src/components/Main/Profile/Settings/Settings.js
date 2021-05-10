import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { NotifyError, changePassword } from '../../../../actions'
import PasswBox from '../PasswBox/PasswBox'
import SubmitBtn from './SubmitBtn/SubmitBtn.js'
import './Settings.scss'

const AccountSettings = ({notifs, NotifyError, changePassword, email}) => {
    const[password1,setPass1] = useState('')
    const[password2,setPass2] = useState('')
    const[oldPassword, setOldPassw] = useState('')
    const[loading, setLoading] = useState(false)

    useEffect( ()=>{
        setLoading(false)
    }, [notifs] )

    const submitNewPass = (newPass) => {
        if(newPass && oldPassword){
            if(password1 === password2){
                if(newPass.length >= 6){
                    setLoading(true)
                    changePassword(email,oldPassword,newPass)
                }
                else{
                    NotifyError('New Password must be at least 6 characters')
                }
            }
            else{
                NotifyError('New passwords must match')
            }
        }
        else{
            NotifyError('Passwords must be valid')
        }
    }
    
    return(
        <div className="profile-settings">
            <div className="profile-settings-content">
                <div className="title">
                    Change password
                </div>
                <div className="password password-old">
                    <PasswBox
                        notifs={notifs}
                        label="Old Password"
                        defValue={oldPassword}
                        onChange={setOldPassw}
                        showError={NotifyError}
                        allowEdit={true}
                    />
                </div>
                <div className="password password-1">
                    <PasswBox
                        notifs={notifs}
                        label="New Password"
                        defValue={password1}
                        onChange={setPass1}
                        showError={NotifyError}
                        allowEdit={true}
                    />
                </div>
                <div className="password password-2">
                    <PasswBox
                        notifs={notifs}
                        label="Repeat New Password"
                        defValue={password2}
                        onChange={setPass2}
                        showError={NotifyError}
                        allowEdit={true}
                    />
                </div>
                <SubmitBtn
                    text="Change password"
                    onSubmit={submitNewPass}
                    loading ={loading}
                    passw = {password1}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    const {user:{loggedIn, email}} = state
    return {loggedIn, email}
}

export default connect( mapStateToProps, { NotifyError, changePassword })(AccountSettings)