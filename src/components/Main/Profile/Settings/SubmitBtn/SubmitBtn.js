import React from 'react'
import './SubmitBtn.scss'

import image from './load.gif'

const SubmitBtn = ({text, loading, onSubmit, passw})=>{
    const renderLoad = () => {
        if(!loading){
            return text
        }
        else {
            return <img src={image}/>
        }
    }


    return(
        <>
            <button
                onClick={()=>onSubmit(passw)}
                type="submit" 
                className="btn login-btn">
                {renderLoad()}
            </button>
        </>
    )
}

export default SubmitBtn