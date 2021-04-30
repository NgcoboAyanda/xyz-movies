import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NotifyError, updateDisplayName, updatePhotoURL } from '../../../../actions'
import EmailBox from '../EmailBox/EmailBox'
import TextBox from '../TextBox/TextBox'
import VerifyEmailBtn from '../VerifyEmailBtn/VerifyEmailBtn'

import './ProfileInfo.scss'


const ProfileInfo = ({ notifs,NotifyError, defDisplayName,updateDisplayName, defPhotoURL,updatePhotoURL, defEmail,emailVerified})=> {

    

    return(
        <div className="profile-info-main">
            <div className="profile-info-main-content">
                <TextBox
                    notifs={notifs}
                    label="Display Name"
                    defValue={defDisplayName}
                    submit={updateDisplayName}
                    showError={NotifyError}
                />
                <TextBox
                    notifs={notifs}
                    label="Photo URL"
                    defValue={defPhotoURL}
                    submit={updatePhotoURL}
                    showError={NotifyError}
                />
                <EmailBox
                    notifs={notifs}
                    label="Email"
                    defValue={defEmail}
                    submit={console.log}
                    showError={NotifyError}
                    verified={emailVerified}
                />
                <VerifyEmailBtn verified={emailVerified} defEmail={defEmail}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const {user: {displayName,photoURL,email,emailVerified}} = state
    return {defDisplayName: displayName,defPhotoURL:photoURL,defEmail:email, emailVerified}
}

export default connect(mapStateToProps,{updateDisplayName,updatePhotoURL,NotifyError})(ProfileInfo)