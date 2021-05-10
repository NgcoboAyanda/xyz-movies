import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NotifyError, updateDisplayName, updateEmail, updatePhotoURL } from '../../../../actions'
import EmailBox from '../EmailBox/EmailBox'
import PasswBox from '../PasswBox/PasswBox'
import TextBox from '../TextBox/TextBox'
import VerifyEmailBtn from '../VerifyEmailBtn/VerifyEmailBtn'

import './Info.scss'


const ProfileInfo = ({ notifs,NotifyError, defDisplayName,updateDisplayName, defPhotoURL,updatePhotoURL, updateEmail, defEmail,emailVerified, loggedIn})=> {
    const[password,setPassword] = useState('')

    const submitUpdateEmail = (newEmail) => {
        if(password){
            updateEmail(defEmail, password, newEmail)
        }
        else{
            NotifyError('Password is required to update email')
        }
    }

    if(loggedIn){
        return(
            <div className="profile-info-main">
                <div className="profile-info-main-content">
                    <TextBox
                        notifs={notifs}
                        label="Display Name"
                        defValue={defDisplayName}
                        submit={updateDisplayName}
                        showError={NotifyError}
                        allowEdit={true}
                    />
                    <TextBox
                        notifs={notifs}
                        label="Photo URL"
                        defValue={defPhotoURL}
                        submit={updatePhotoURL}
                        showError={NotifyError}
                        allowEdit={true}
                    />
                    <div className="password password-current">
                        <PasswBox
                            notifs={notifs}
                            label="Current Password"
                            defValue={password}
                            onChange={setPassword}
                            showError={NotifyError}
                            allowEdit={true}
                        />
                    </div>
                    <EmailBox
                        notifs={notifs}
                        label="Email"
                        defValue={defEmail}
                        submit={submitUpdateEmail}
                        showError={NotifyError}
                        verified={emailVerified}
                        allowEdit={true}
                    />
                    <VerifyEmailBtn verified={emailVerified} defEmail={defEmail}/>
                </div>
            </div>
        )
    }
    else if (!loggedIn){
        return(
            <div className="profile-info-main">
                <div className="logged-out">User is logged out</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {user: {loggedIn,displayName,photoURL,email,emailVerified}} = state
    return { defDisplayName: displayName,
            defPhotoURL: photoURL,
            defEmail: email, 
            emailVerified,
            loggedIn
        }
}

export default connect(mapStateToProps,{updateDisplayName,updatePhotoURL, updateEmail, NotifyError})(ProfileInfo)