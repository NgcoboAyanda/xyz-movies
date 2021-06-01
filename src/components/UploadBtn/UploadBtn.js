import React from 'react'
import SubmitBtn from '../Utility/SubmitBtn/SubmitBtn'

import './UploadBtn.scss'

const addIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>

const UploadBtn = ({loggedIn, onClick})=>{

    if(!loggedIn){
        return null
    }

    return (
        <div className="upload-btn-wrapper">
            {addIcon}
            <button className="upload-btn" onClick={()=>onClick()}>
                Upload
            </button>
        </div>
    )
}

export default UploadBtn