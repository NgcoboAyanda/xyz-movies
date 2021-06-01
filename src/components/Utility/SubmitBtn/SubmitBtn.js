import React from 'react'

import gif from './load.gif'
import './SubmitBtn.scss'

const SubmitBtn = ({className, text, loading, onSubmit})=>{

    const renderLoading=()=>{
        if(loading){
            return <img src={gif} />
        }
        else return text
    }


    return(
            <button
                onClick={e=>onSubmit(e)}
                type="submit" 
                className={`btn ${className}`}>
                {renderLoading()}
            </button>
    )
}

export default SubmitBtn